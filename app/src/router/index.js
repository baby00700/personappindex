import Vue from 'vue'
import Router from 'vue-router'
import todo from '@/components/todo'
import joinin from '@/components/joinin'
import loginin from '@/components/login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/todo',
      name: 'todo',
      component: todo
    },
    {
      path: '/joinin',
      name: 'joinin',
      component: joinin
    },
    {
      path: '/loginin',
      name: 'loginin',
      component: loginin
    }
  ]
})
