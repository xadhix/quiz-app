import React from 'react';
import { connect } from 'dva';
import styles from './QuizPage.css';
import Question from "../components/Question";
import { Button, Row, Col } from "antd";
import ShowTimer from '../components/Timer';
const rowStyle = {
  margin: "16px",
}

class QuizPage extends React.Component {
  submitQuiz = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'quiz/submit_quiz'})
  }
  saveAnswer = (questionId, answer) => {
    const { dispatch } = this.props;
    dispatch({ type: 'quiz/save_answer', payload: { questionId, answer } })
  }
  render() {
    const { questions, quiz_submitting, quiz_loading, quiz_result } = this.props;
    return (
      <div>
        {!quiz_result ?
          <div>
            <Row>
              <Col span={12}>
                <h1>Question List</h1>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <ShowTimer start={Date.now()} />
              </Col>
            </Row>
            {questions.map((question) =>
              <Row style={rowStyle} key={question.id} type="flex" justify="space-around" align="middle">
                <Col span={24}>
                  <Question question={question} onSaveAnswer={this.saveAnswer} />
                </Col>
              </Row>)}
            <Row style={rowStyle} type="flex" justify="space-around" align="middle">
              <Col span={24} style={{ textAlign: "center" }}>
                <Button type="primary" size="large" loading={quiz_submitting} disabled={quiz_submitting} onClick={this.submitQuiz}>Submit Quiz</Button>
              </Col>
            </Row>
          </div> : <div style={{ textAlign: "center" }}>
            <h1>{quiz_result}</h1>
          </div>}
      </div>
    );
  }
}

QuizPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    questions: state.quiz.questions,
    quiz_submitting: state.quiz.quiz_submitting,
    quiz_loading: state.quiz.quiz_loading,
    quiz_result: state.quiz.quiz_result,
  };
}
function mapDispatchToProps(dispatch) {
  return { dispatch: dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
