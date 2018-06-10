import dva from 'dva';
import createLoading from 'dva-loading';
import createHashHistory from 'history/createHashHistory';
import './index.less';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHashHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
