import { createStore } from 'vuex'
import { getSongUrl } from '../network/playlist'
export default createStore({
  state: {
    centerDialogVisible: false,// 弹出登录框
    islogin: JSON.parse(window.sessionStorage.getItem('isLogin')) || false,
    play_list: [], // 播放URL
    list: [], // 播放列表

  },
  mutations: {
    islogDialog (state) {
      state.centerDialogVisible = !state.centerDialogVisible
    },
    get_play_list (state, url) {
      state.play_list.unshift(url)
    },
    listps (state, obj) {
      if (obj instanceof Array) {
        obj.forEach(item => {
          state.list.push({
            url: item.url, singer: item.singer,
            music_name: item.music_name, row_id: item.row_id
          })
        })
      } else {
        state.list.unshift(obj);

      }
    },
    // 是否登录
    setislogin (state, islogin) {
      state.islogin = islogin || JSON.parse(window.sessionStorage.getItem('isLogin'))
    }

  },
  actions: {
    async getSongUrls (conxt, row) {
      console.log(row);
      if (row instanceof Array) {
        // let islist = conxt.state.list.some(values => {
        //   return values.row_id == row
        // })
        let islist = false
        conxt.state.list.forEach(item => {
          row.forEach(v => {
            if (item.row_id == v.id) {
              islist = true
            }
          })
        })
        if (islist) return
        let all_id = row.map(item => item.id)
        let { data } = await getSongUrl(all_id.join(',') || row);
        // 创建播放对象
        let playBoj = [
          // {
          //   url: res.data[0].url,
          //   singer: row.ar[0].name,
          //   music_name: row.name,
          // }
        ]


        data.forEach(item => {
          conxt.commit('get_play_list', item.url);
          row.forEach(value => {
            value.url = item.url
          })

        })

        row.map(item => {
          playBoj.push({
            url: item.url, singer: item.ar[0].name,
            music_name: item.name, row_id: item.id
          })

        })
        conxt.commit('listps', playBoj);
      } else {
        let islist = conxt.state.list.some(values => {
          return values.row_id == row.id
        })
        if (islist) return
        let res = await getSongUrl(row.id);

        // 创建播放对象
        let playBoj = {
          url: res.data[0].url,
          singer: row.ar[0].name,
          music_name: row.name,
          row_id: row.id
        }

        conxt.commit('listps', playBoj);
        conxt.commit('get_play_list', res.data[0].url,);
      }






    },
  },
  getters: {
    islogin: state => state.islogin,
  }
})
