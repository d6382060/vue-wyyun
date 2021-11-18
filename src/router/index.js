import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const MyMusic = () => import('../views/mymusic/MyMusic');
const Playlist = () => import('../views/playlist/Playlist.vue')
const Index = () => import('../views/home/index.vue')
const routes = [
  { path: '', redirect: '/home' }, // 重定向
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/my',
        name: 'MyMusic',
        component: MyMusic,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/playlist/detail',
        name: 'Playlist',
        component: Playlist,
        meta: {
          title: '欢迎使用'
        }
      }
    ]
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
