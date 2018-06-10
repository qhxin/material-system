import { delay } from 'dva/saga';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
  getInformation,
  addItem,
  deleteItem,
} from '../services/app';

export default {
  namespace: 'app',

  state: {
    webExtensionWallet: null,
    user: null,
    map: null,
    // user: true,
    // map: {
    //   '螺丝': 3,
    //   '锁': '2个',
    // },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateMp(state, { payload: { key, num } }) {
      return {
        ...state,
        map: {
          ...state.map,
          [key]: num,
        },
      };
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *checkUserLogin({ payload = {} }, { put, select }) {
      const { user } = yield select(state => state.app);
      if (!user) {
        yield put(routerRedux.push('/login'));
      }
    },
    *checkWalletExt({ payload = {} }, { put, call }) {
      let wallet = null;
      do {
        wallet = window.webExtensionWallet;
        yield put({
          type: 'update',
          payload: {
            webExtensionWallet: wallet,
          },
        });
        yield call(delay, 500);
      } while (!wallet);
    },
    *login({ payload = {} }, { put, call }) {
      try {
        const data = yield call(getInformation);
        yield put({
          type: 'update',
          payload: {
            user: true,
            map: JSON.parse(data),
          },
        });
        yield call(delay, 500);
        yield put(routerRedux.push('/'));
      } catch (e) {
        message.error(e.message);
      }
    },
    *deleteItem({ payload }, { put, select, call }) {
      try {
        const data = yield call(deleteItem, payload);
        console.log('del tx', data);

        const { map } = yield select(state => state.app);
        delete map[payload];
        yield put({
          type: 'update',
          payload: {
            map: {
              ...map,
            },
          },
        });
      } catch (e) {
        message.error(e.message);
      }
    },
    *addItem({ payload: { key, num } }, { put, call }) {
      try {
        const data = yield call(addItem, key, num);
        console.log('add tx', data);
        yield put({
          type: 'updateMp',
          payload: { key, num },
        });
      } catch (e) {
        message.error(e.message);
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'checkUserLogin' });
      dispatch({ type: 'checkWalletExt' });
    },
  },

};
