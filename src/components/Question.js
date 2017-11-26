import React from 'react';
import { Card, Radio } from "antd";
const RadioGroup = Radio.Group;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export default class Question extends React.Component {
  onChange = (e) => {
    this.props.onSaveAnswer(this.props.question.id, e.target.value);
  }
  render() {
    const { question } = this.props;
    const options = [];
    for (const key in question.options) {
      options.push(question.options[key]);
    }
    return (
      <Card title={question.questionText}>
        <RadioGroup onChange={this.onChange} value={question.answer}>
          {options.map((optionText, index) => <Radio style={radioStyle} value={optionText} name={this.props.questionId} key={index}>{optionText}</Radio>)}
        </RadioGroup>
      </Card>
    );
  }
}
