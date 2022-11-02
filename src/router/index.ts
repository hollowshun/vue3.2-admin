import { createRouter, createWebHashHistory } from 'vue-router'
import Layouts from '@/layouts/index.vue'
import { GlobalStore } from '../stores'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/',
      name: '首页',
      component: Layouts,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/notFound.vue')
    }
  ]
})
router.beforeEach(async (to, from, next) => {

  // 1.如果访问登录页,直接过
  if (to.path == '/login') return next();

  // 2.如果没有token,重定向到login
  const globalStore = GlobalStore()
  if (!globalStore.token) return next({
    path: '/login',
    replace: true
  })

  // 3.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  // const authStore = AuthStore();
	// if (!authStore.authMenuListGet.length) {
  //   await initDynamicRouter();
	// 	return next({ ...to, replace: true });
  // }
  
	// 4.正常访问页面
	next();
})
export default router
