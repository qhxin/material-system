import React from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
// import styles from './style.less';

const { webExtensionWallet } = window;

@connect()
export default class IndexPage extends React.Component {

  render() {
    if (1 || typeof webExtensionWallet === 'undefined') {
      return (
        <div className="mg-30">
          <Alert
            message="Error"
            description={<div>
              星云钱包环境未运行，请
              <a
                href="https://github.com/nebulasio/WebExtensionWallet"
                target="_blank"
                rel="noopener noreferrer"
              >
                安装钱包插件
              </a>
            </div>}
            type="error"
            showIcon
          />
        </div>
      );
    }

    return (
      <div>
        123
      </div>
    );
  }
}
