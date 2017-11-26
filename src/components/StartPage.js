import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, Row, Col, Button, Icon, Radio, Input } from 'antd';
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
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          {<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} onChange={this.handleNameChange} value={this.state.userName} placeholder="Your Name" />}
        </FormItem>
        <FormItem>
          {<Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} type="user" placeholder="SAP ID" onChange={this.handleIdChange} value={this.state.sapID}/>}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!(this.state.sapID && this.state.userName)}
          >
            Proceed to Quiz
          </Button>
        </FormItem>
      </Form>
    );
  }
}
export default StartPage;