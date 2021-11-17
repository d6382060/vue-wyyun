import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const MyMusic = () => import('../views/mymusic/MyMusic')
const routes = [
  { path: '', redirect: '/home' }, // 重定向
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {

        path: '/my',
        name: 'MyMusic',
        component: MyMusic,
        meta: {
          title: '欢迎使用'

        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
