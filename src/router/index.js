import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const MyMusic = () => import('../views/mymusic/MyMusic');
const Playlist = () => import('../views/playlist/Playlist.vue')
const Index = () => import('../views/home/index.vue')
const PlaylistTable = () => import('../views/playlistTable/PlaylistTable.vue')
const search = () => import('../views/search/Search.vue')
const User = () => import('../views/user/User.vue');
const UserSongsRank = () => import('../views/user/UserSongsRank.vue')
const MsgPrivate = () => import('../views/msg/MsgPrivate.vue')
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
      },
      {
        path: '/playlist/table',
        name: 'PlaylistTable',
        component: PlaylistTable,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/search',
        name: 'search',
        component: search,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/user/home',
        name: 'User',
        component: User,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/user/songs/rank',
        name: 'UserSongsRank',
        component: UserSongsRank,
        meta: {
          title: '欢迎使用'
        }
      },
      {
        path: '/mas/MsgPrivate',
        name: 'MsgPrivate',
        component: MsgPrivate,
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
