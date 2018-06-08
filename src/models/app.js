// import nebPay from '../lib/nebPay';
import '../lib/nebulas';

export default {
  namespace: 'app',

  state: {

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
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

};
