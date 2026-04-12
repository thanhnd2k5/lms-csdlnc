CREATE TABLE IF NOT EXISTS quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  course_id INT,
  chapter_id INT,
  video_id INT,
  duration_minutes INT DEFAULT 30,
  passing_score INT DEFAULT 60,
  quiz_type ENUM('video', 'chapter', 'course') DEFAULT 'video',
  teacher_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE SET NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_quiz_type (quiz_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT NOT NULL,
  question_text TEXT NOT NULL,
  points INT DEFAULT 1,
  allows_multiple_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  status ENUM('completed', 'failed') NOT NULL,
  end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
  INDEX idx_attempt_user_quiz (user_id, quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS quiz_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_option_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE,
  FOREIGN KEY (selected_option_id) REFERENCES quiz_options(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
