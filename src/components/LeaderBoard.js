import React from 'react';
import '../index.css';
import { Table } from 'antd';
require('antd/dist/antd.css');
import { connect } from 'dva';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'UserID',
    dataIndex: 'userid',
    key: 'userid',
}, {
    title: 'Points',
    dataIndex: 'points',
    key: 'points',
}, {
    title: 'Time Taken',
    dataIndex: 'timetaken',
    key: 'timetaken',
}];

class LeaderBoard extends React.Component {
    sortData = ()=>{
      const { data } = this.props;
      const sortedData = [...data];
        var cmp = function (x, y) {
            return x > y ? 1 : x < y ? -1 : 0;
        }
      sortedData.sort(function (a, b) {
            return cmp(
                [-cmp(a.points, b.points), cmp(a.timetaken, b.timetaken)],
                [-cmp(b.points, a.points), cmp(b.timetaken, a.timetaken)]
            );
        })
      return sortedData;
    }
    render() {
      const sortedData = this.sortData();
      const { userRank } = this.props;
        return (
            <div>
                <Table columns={columns} dataSource={sortedData} bordered title={() => 'Leader Board'} />
              { userRank != null ? <h2 style={{textAlign: "center"}}>
                You got { userRank.points} points in { userRank.timetaken } seconds.
              </h2> : 'You have not participated.' }
            </div>
        );
    }
}


function mapStateToProps(state) {
  let data = [];
  const quizId = state.quiz.quizId;
  let userRank = null;

  if( state.quiz.leaderboard && state.quiz.leaderboard[quizId] ){
    const leaderBoard = state.quiz.leaderboard[quizId];

    for( const key in leaderBoard ){
      if( state.quiz.userId ) {
        if (key === state.quiz.userId) {
          userRank = leaderBoard[key]
        }
      }
      data.push({...leaderBoard[key], key});
    }
  }
  return {
    userId: state.quiz.userId,
    userName: state.quiz.userName,
    userRank,
    data
  };
}
function mapDispatchToProps(dispatch) {
  return { dispatch: dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
