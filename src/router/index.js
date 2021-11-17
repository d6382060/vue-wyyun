import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Details = () => import('../views/Details/MusicDetails')
const Album = () => import('../views/Details/MusicAlbum')
const Song = () => import('../views/Details/Song')
const routes = [
  { path: '/', redirect: '/home' }, // 重定向
  {
    path: '/home',
    name: 'Home',
    component: Home,

  },
  {
    path: '/playlist/:id',
    name: 'Details',
    component: Details,
    meta: {
      title: '欢迎使用'
    }
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
    meta: {
      title: '专辑'
    }
  },
  {
    path: '/song/:name',
    name: 'Song',
    component: Song,
    meta: {
      title: '专辑'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
