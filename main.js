import Vue from 'vue'
import App from './App'

import store from './store'
import ExamControl from './utils/ExamControl.js'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

Vue.prototype.$baseUrl = 'http://118.25.96.162:8080';

Vue.prototype.$exam = new ExamControl();
const app = new Vue({
    store,
    ...App
})
app.$mount()
