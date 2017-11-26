import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "dva";
import '../index.css';
require('antd/dist/antd.css');

class ShowTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }
    componentDidMount() {
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        const { start } = this.props;
        if( start ) {
          this.setState({ currentDate: new Date() });
        }
    }
    render() {
      const { currentDate } = this.state;
      const { start } = this.props;
      if( start && currentDate ){
        var elapsed = Math.round( (currentDate - start) / 100);
        var seconds = (elapsed / 10).toFixed(1);
        return <p><b><div id="timerDiv">{seconds}</div> seconds</b></p>;
      }
      return null;
    }
}

export default connect((state)=>({ start : state.quiz.quiz_start }))(ShowTimer);
