import React from 'react';
import '../index.css';
import { Table } from 'antd';
require('antd/dist/antd.css');

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

const data = [{
    key: '1',
    name: 'John Brown',
    userid: 'i23145',
    points: 9,
    timetaken: 120,
}, {
    key: '2',
    name: 'Obama',
    userid: 'i325235',
    points: 10,
    timetaken: 150,
}, {
    key: '3',
    name: 'Trump',
    userid: 'i12342',
    points: 2,
    timetaken: 89,
}];

class LeaderBoard extends React.Component {
    createRow(sn, uname, userId, pointTotal, time) {
        let rowObj = {
            key: sn,
            name: uname,
            userid: userId,
            points: pointTotal,
            timetaken: time
        };
        data.push(rowObj);
    }
    sortData() {
        var cmp = function (x, y) {
            return x > y ? 1 : x < y ? -1 : 0;
        }
        data.sort(function (a, b) {
            return cmp(
                [-cmp(a.points, b.points), cmp(a.timetaken, b.timetaken)],
                [-cmp(b.points, a.points), cmp(b.timetaken, a.timetaken)]
            );
        })
    }
    render() {
        return (
            <div>{this.createRow(4, 'jay', 'i32423', 8, 90)}{this.createRow(5, 'ajay', 'i765553', 8, 70)}
                {this.createRow(6, 'beta', 'i765553', 10, 50)}
                {this.sortData()}
                <Table columns={columns} dataSource={data} bordered title={() => 'Leader Board'} />
            </div>
        );
    }
}

export default LeaderBoard;