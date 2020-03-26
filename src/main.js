import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

Vue.config.productionTip = false

export const eventBusEdit = new Vue({
  methods: {
    listEdit(memo, index, mode) {
      this.$emit('listEdit0', memo, index, mode)
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
