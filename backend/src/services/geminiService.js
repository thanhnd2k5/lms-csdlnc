const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiService = {
    generateQuizJSON: async (description, fileData) => {
        // Định nghĩa Schema để Gemini trả về đúng cấu trúc Mapping
        const schema = {
            description: "Danh sách câu hỏi trắc nghiệm",
            type: SchemaType.OBJECT,
            properties: {
                questions: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            question_text: { type: SchemaType.STRING, description: "Nội dung câu hỏi" },
                            points: { type: SchemaType.NUMBER, description: "Số điểm của câu hỏi (mặc định 1)" },
                            allows_multiple_correct: { type: SchemaType.BOOLEAN, description: "Câu hỏi có nhiều đáp án đúng hay không" },
                            options: {
                                type: SchemaType.ARRAY,
                                items: {
                                    type: SchemaType.OBJECT,
                                    properties: {
                                        option_text: { type: SchemaType.STRING, description: "Nội dung lựa chọn" },
                                        is_correct: { type: SchemaType.BOOLEAN, description: "Đây có phải là đáp án đúng không" }
                                    },
                                    required: ["option_text", "is_correct"]
                                }
                            }
                        },
                        required: ["question_text", "points", "allows_multiple_correct", "options"]
                    }
                }
            },
            required: ["questions"]
        };

        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema // Ép kiểu dữ liệu bằng Schema
            }
        });

        const prompt = `Bạn là một chuyên gia giáo dục. Hãy tạo danh sách các câu hỏi trắc nghiệm dựa trên yêu cầu sau: "${description}". 
        Nếu có tài liệu đính kèm (hình ảnh hoặc văn bản), hãy phân tích kỹ và lấy kiến thức từ đó để đặt câu hỏi.
        Yêu cầu: Các câu hỏi phải đa dạng, bao quát nội dung. Trả về đúng định dạng JSON đã định nghĩa.`;

        const parts = [{ text: prompt }];

        if (fileData) {
            parts.push({
                inlineData: {
                    data: fileData.buffer.toString("base64"),
                    mimeType: fileData.mimetype
                }
            });
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        try {
            return JSON.parse(text);
        } catch (error) {
            // Fallback xử lý markdown block nếu AI không tuân thủ responseMimeType hoàn toàn (dù flash 1.5 thường tuân thủ tốt)
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        }
    },

    explainQuestion: async (courseContext, questionText, options, userAnswers = null) => {
        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || "gemini-1.5-flash"
        });

        const correctOptions = options.filter(opt => opt.is_correct).map(opt => opt.option_text);
        const allOptions = options.map(opt => opt.option_text).join(", ");

        let prompt = `Bạn là một giáo viên hướng dẫn trong khóa học: "${courseContext}". 
        Hãy giải thích chi tiết câu hỏi sau:
        Câu hỏi: "${questionText}"
        Các lựa chọn: ${allOptions}
        Đáp án đúng là: ${correctOptions.join(", ")}.
        
        Yêu cầu: Giải thích tại sao đáp án đó lại đúng và tại sao các lựa chọn khác lại sai. 
        Phải dựa vào bối cảnh của khóa học để giải thích.`;

        if (userAnswers) {
            prompt += `\nHọc viên đã chọn: ${userAnswers}. 
            Nếu học viên chọn sai, hãy chỉ ra lỗ hổng kiến thức. Nếu học viên chọn đúng, hãy củng cố thêm kiến thức cho họ.`;
        }

        prompt += `\nTrả về lời giải thích bằng tiếng Việt, trình bày rõ ràng, sư phạm.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }
};

module.exports = geminiService;
