// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index';
import {appRouter} from './router/router';
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css';
import iviewArea from 'iview-area';


Vue.config.productionTip = false
Vue.use(iView);
Vue.use(iviewArea);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
