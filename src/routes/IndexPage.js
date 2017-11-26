import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import StartPage from '../components/StartPage';
function IndexPage() {
  return (
    <div>
      <StartPage/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
