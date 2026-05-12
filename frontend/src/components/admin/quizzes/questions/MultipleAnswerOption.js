import React from 'react';
import { Form, Input, Checkbox, Space, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const MultipleAnswerOption = ({ form, name, optionField, index, removeOption, restField }) => {
  const isCorrect = Form.useWatch(['questions', name, 'options', optionField.name, 'is_correct'], form);

  return (
    <div key={optionField.key} className={`quiz-option-row ${isCorrect === true ? 'is-correct' : ''}`}>
      <Form.Item
        {...restField}
        name={[optionField.name, 'option_text']}
        rules={[{ required: true, message: 'Vui lòng nhập đáp án' }]}
        style={{ flex: 1 }}
      >
        <Input placeholder={`Đáp án ${index + 1}`} />
      </Form.Item>

      <Form.Item
        {...restField}
        name={[optionField.name, 'is_correct']}
        valuePropName="checked"
      >
        <Checkbox>Đáp án đúng</Checkbox>
      </Form.Item>

      <Button
        type="text"
        danger
        onClick={() => removeOption(optionField.name)}
        icon={<MinusCircleOutlined />}
        className="btn-action-round danger"
        size="small"
      />
    </div>
  );
};

export default MultipleAnswerOption; 