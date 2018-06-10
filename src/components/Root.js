import React from 'react';
import { connect } from 'dva';
import { Alert, Layout } from 'antd';
import styles from './style.less';

const { Header, Content, Footer } = Layout;

const Root = ({ children, webExtensionWallet }) => {
  if (typeof webExtensionWallet === 'undefined') {
    return (
      <div className="mg-30">
        <Alert
          message={<div>
            星云钱包环境未运行，请
            <a
              href="https://github.com/nebulasio/WebExtensionWallet"
              target="_blank"
              rel="noopener noreferrer"
            >
              安装钱包插件
            </a>
          </div>}
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <Layout>
      <Header>
        <h1 className="color-white">星云物料</h1>
      </Header>
      <Content>
        { children }
      </Content>
      <Footer>
        <div className={styles.foot}>
          <a
            href="https://github.com/qhxin/material-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            material-system on github
          </a>
        </div>
      </Footer>
    </Layout>
  );
};

export default connect((state) => {
  return {
    webExtensionWallet: state.app.webExtensionWallet,
  };
})(Root);
