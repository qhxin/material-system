import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './style.less';

@connect((state) => {
  return {
    pending: state.loading.effects['app/login'],
  };
})
export default class LoginPage extends React.Component {
  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/login',
    });
  };

  render() {
    const { pending } = this.props;
    return (
      <div className={styles.form}>
        <Button
          className="full-width"
          type="primary"
          onClick={this.handleClick}
          loading={pending}
        >
          {pending ? '链接星云智能合约' : '管理物料库'}
        </Button>
      </div>
    );
  }
}
