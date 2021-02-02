import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Axios from 'axios'
import * as VueGoogleMaps from "vue2-google-maps";
import VueSweetalert2 from 'vue-sweetalert2'

require('@/store/subscriber')

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.config.productionTip = false
Axios.defaults.baseURL = "http://localhost:5000/api"
// API_KEY = AIzaSyAtJyVCq8AR9YuQCqvMk87M-LkKrYZ7sjI
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA7tV3PhHFhNj2yqQEzh4jFYhl5MMa1WIA",
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueSweetalert2,options)
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

});

