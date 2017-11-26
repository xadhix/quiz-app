import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Form, Row, Col, Button, Icon, Radio, Input } from 'antd';
import { Link } from 'dva/router';
const FormItem = Form.Item;
require('antd/dist/antd.css');


class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      {
        userName: '',
        sapID: '',
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/quiz');
  }
  handleNameChange = (e) => {
    this.setState({ userName: e.target.value })
  }
  handleIdChange = (e) => {
    this.setState({ sapID: e.target.value })
  }
  render() {
    return (
      <div>
        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} onChange={this.handleNameChange} value={this.state.userName} placeholder="Your Name" />}
            </FormItem>
            <FormItem>
              {<Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} type="user" placeholder="SAP ID" onChange={this.handleIdChange} value={this.state.sapID} />}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!(this.state.sapID && this.state.userName)}
              >
                Proceed to Quiz
          </Button>
              <Link to="quiz">Quiz</Link>
            </FormItem>
          </Form>
        </div>
        <div style={{ margin: '20px' }}>
          <br/>
          <h1>Rules</h1>
          <ul style={{ 'list-style-type': 'disc' }} >
            <li>Quiz will start with a timer once you click Proceed to Quiz.</li>
            <li>You will see 10 Multiple Choice Questions. Each question has 1 mark.</li>
            <li>Once you submit the quiz you will see a link to LeaderBoard.</li>
            <li>LeaderBoard will be sorted by Points scored. If there is a tie in points then it will show results sorted by less time taken.</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default StartPage;