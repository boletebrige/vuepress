// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'

Vue.use(VueResource)

Vue.config.productionTip = false

// Mixins are a flexible way to distribute reusable functionalities for Vue components
Vue.mixin({
  methods: {
    filter (date, format) {
      return moment(date).format(format)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
