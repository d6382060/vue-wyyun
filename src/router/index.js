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
const Artist = () => import('../views/artist/Artist.vue')
const Song = () => import('../views/singleSong/Song.vue')
const DiscovertopList = () => import('../views/discover/DiscovertopList.vue')
const DiscoverArtist = () => import('../views/discover/DiscoverArtist.vue')
const DiscoverAlbum = () => import('../views/discover/DiscoverAlbum.vue')
const Album = () => import('../views/album/Album.vue')
const Mv = () => import('../views/Mv/mv.vue')
const DiscoverDjradio = () => import('../views/discover/DiscoverDjradio.vue')
const Djradio = () => import('../views/discover/DiscoverDjradio/Djradio.vue')
const Category = () => import('../views/discover/DiscoverDjradio/Category.vue')
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
      },
      {
        path: '/artist/:tabs?',
        name: 'Artist',
        component: Artist,
        meta: {
          title: '歌手'
        }
      },
      {
        path: '/song',
        name: 'Song',
        component: Song,
        meta: {
          title: '单曲'
        }
      },
      {
        path: '/discover/toplist',
        name: 'DiscovertopList',
        component: DiscovertopList,
        meta: {
          title: '排行榜'
        }
      },
      {
        path: '/discover/artist',
        name: 'DiscoverArtist',
        component: DiscoverArtist,
        meta: {
          title: '歌手'
        }
      },
      {
        path: '/discover/album',
        name: 'DiscoverAlbum',
        component: DiscoverAlbum,
        meta: {
          title: '新碟上架'
        }
      },
      {
        path: '/album',
        name: 'Album',
        component: Album,
        meta: {
          title: '专辑'
        }
      },
      {
        path: '/mv',
        name: 'Mv',
        component: Mv,
        meta: {
          title: 'mv'
        }
      },
      {
        path: '/discover',
        name: 'DiscoverDjradio',
        component: DiscoverDjradio,
        meta: {
          title: '主播电台'
        },
        children: [
          {
            path: 'djradio',
            name: 'Djradio',
            component: Djradio
          },
          {
            path: 'djradio/category',
            name: 'Category',
            component: Category
          }
        ]
      }
    ]
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
