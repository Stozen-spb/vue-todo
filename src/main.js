import Vue from 'vue'
import App from './App.vue'
import {store} from './store/'
import {router} from './routes.js'
import axios from 'axios'
import AppHeader from './AppHeader.vue'
import toDoList from './toDoList.vue'
import toDoListArchive from './toDoListArchive.vue'
import toDoItem from './toDoItem.vue'
import AppFilter from './AppFilter.vue'
import AlertComponent from './AlertComponent.vue'
import EditForm from './EditForm.vue'
import ValidationInput from './ValidationInput.vue'
import E404 from './E404.vue'
import datetime from 'vuejs-datetimepicker'
import moment from 'moment/min/moment.min.js'

window.axios = axios;
window.moment = moment;

Vue.component('AppHeader', AppHeader)
Vue.component('toDoList', toDoList)
Vue.component('toDoListArchive', toDoListArchive)
Vue.component('toDoItem', toDoItem)
Vue.component('AppFilter', AppFilter)
Vue.component('AlertComponent', AlertComponent)
Vue.component('EditForm', EditForm)
Vue.component('ValidationInput', ValidationInput)
Vue.component('datetime', datetime)
Vue.component('E404',E404)




new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
