// import request from '../utils/request';

const { NebPay } = window;

const nebPay = new NebPay();
const dappAddress = 'n1rUUhjieB9zv46hEAPGdG9fJgGHjbiu8Uj';

export function getInformation() {
  return new Promise((resolve, reject) => {
    nebPay.simulateCall(dappAddress, '0', 'get', JSON.stringify([]), {
      listener(res) {
        if (res.result === '' && res.execute_err === 'contract check failed') {
          reject(new Error('合约检测失败，请检查浏览器钱包插件环境！'));
          return;
        }

        const map = JSON.parse(res.result);
        resolve(map);
      },
    });
  });
}

export function addItem(key, item) {
  return new Promise((resolve, reject) => {
    nebPay.call(dappAddress, '0', 'add', JSON.stringify([key, item]), {
      listener(res) {
        if (typeof res === 'string') {
          reject(new Error(res));
          return;
        }
        resolve(res.txhash);
      },
    });
  });
}

export function deleteItem(key) {
  return new Promise((resolve, reject) => {
    nebPay.call(dappAddress, '0', 'del', JSON.stringify([key]), {
      listener(res) {
        if (typeof res === 'string') {
          reject(new Error(res));
          return;
        }
        resolve(res.txhash);
      },
    });
  });
}
