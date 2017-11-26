import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import { Router, Route, Switch, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import QuizPage from './routes/QuizPage';
import StartPage from './components/StartPage';
import LeaderBoard from './components/LeaderBoard';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 1000,  textAlign: 'center' }}>
          <h1 style={{color: 'white'}}> Quiz Competition </h1>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64, bottom: '8%' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 600 }}>
            <Switch>
              <Route path="/" exact component={IndexPage} />
              <Route path="/quiz" exact component={QuizPage} />
              <Route path="/startPage" exact component={StartPage} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ position: 'fixed', top: '94%', width: '100%', textAlign: 'center' }}>
          ©2017 Beta Version.
        </Footer>
      </Layout>
    </Router>
  );
}

export default RouterConfig;
