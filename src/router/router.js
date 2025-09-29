import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const constantRouterMap = [
    // 重定向
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../pages/index'],resolve)
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../pages/index'], resolve),
      meta: {
          keepAlive: true
      }
    },
    //手机
    {
      path: '/Tkvalue',
      name: 'Tkvalue',
      component: resolve => require(['../pages/Tkvalue'], resolve)
    },
    //电脑
    {
      path: '/TkvalueCp',
      name: 'TkvalueCp',
      component: resolve => require(['../pages/TkvalueCp'], resolve)
    },
    //all
    {
      path: '/allpage',
      name: 'allpage',
      component: resolve => require(['../pages/allpage'], resolve)
    },  //all
    {
      path: '/dmgpage',
      name: 'dmgpage',
      component: resolve => require(['../pages/dmgpage'], resolve)
    },
    // Error page
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['../pages/Error'], resolve),
      props: route => ({ 
        errorType: route.query.type || 'general',
        errorDetails: route.query.details || ''
      })
    },
    // 404 catch-all
    {
      path: '*',
      redirect: { name: 'error', query: { type: '404' } }
    }
]


const router = new Router({
    mode: 'hash',//去掉#号
    routes: constantRouterMap
})

export default router