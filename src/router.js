import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import { Router, Route, Switch, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import QuizPage from './routes/QuizPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="quiz">
              <Link to="quiz">Quiz</Link>
            </Menu.Item>
            <Menu.Item key="leaderboard">
              <Link to="/leaderboard">Leaderboard</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Switch>
              <Route path="/" exact component={IndexPage} />
              <Route path="/quiz" exact component={QuizPage} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2017 Created by Jayant Sable
        </Footer>
      </Layout>
    </Router>
  );
}

export default RouterConfig;
