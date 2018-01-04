import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Single from '@/components/Single'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/:id',
      name: 'Single',
      component: Single
    }
  ]
})
