import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import regin from '@/components/regin'
import accessMenu from '@/components/accessMenu.vue'
import profile from '@/components/profile.vue'
import userMenu from '@/components/userMenu.vue'
import upload from '@/components/upload.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/access',
      name: 'accessMenu',
      component: accessMenu,
      children: [
        {
          path: '',
          redirect: 'login'
        },
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'regin',
          name: 'regin',
          component: regin
        },
        {
          path: '*',
          redirect: 'login'
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: userMenu,
      children: [
        {
          path: '',
          redirect: 'profile'
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile
        },
        {
          path: 'upload',
          name: 'upload',
          component: upload
        },
        {
          path: '*',
          redirect: 'profile'
        }
      ]
    },
    {
      path: '*',
      redirect: '/access/login'
    }
  ],
  mode: 'history'
})
