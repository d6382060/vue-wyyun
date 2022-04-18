<template>
  <div class="detailed">
    <div class="imgs">
      <img :src="playlist.coverImgUrl + '?param=200y200'" alt="" />
    </div>
    <div class="info">
      <div class="title">
        <el-tag type="success">歌单</el-tag>
        <h3 class="h3-title">{{ playlist.name }}</h3>
      </div>
      <div class="user-info">
        <div class="user-img">
          <img :src="creator.avatarUrl + '?param=200y200'" alt="" />
        </div>
        <div class="name">
          <a :href="'#/user/home?id=' + creator.userId">{{
            creator.nickname
          }}</a>
        </div>
        <span class="user-date">{{ dateInit(playlist.createTime) }} 创建</span>
      </div>
      <div class="bt">
        <el-button @click="allplay" size="mini" round>全部播放</el-button>
      </div>
    </div>
    <play-bar :url="url" ref="ply_num" :play_list="play_list" />
  </div>
  <song-list @playsong="playsong" :size="trackCount" :hotsongs="tracks">
    <template v-slot:playnum
      >播放：<strong>{{ playCount }}</strong
      >次</template
    >
  </song-list>
  <comment />
</template>

<script>
import { dateInit } from "@/utils/playsong"
import { playlistDetail } from '@/network/playlist'
import SongList from '../../../components/common/song_list/SongList.vue'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import { useStore } from "vuex"
import PlayBar from '../../../components/common/play-bar/playBar.vue'
import Comment from '../../../components/common/comment/comment.vue'
export default {
  components: { SongList, PlayBar, Comment },
  name: 'MycreatePlayList',
  setup (props) {
    const route = useRoute()
    const store = useStore()
    // 获取歌单id
    let playListId = ref(route.query.id)
    watch(route, () => {
      if (route.path === '/my/music/playlist') {
        playListId.value = route.query.id
        getPlayListDetail()
      }
    })
    let playListData = reactive({
      tracks: [], // 歌单歌曲列表
      playlist: {}, // 歌单详情
      creator: {}, // 歌单创建者信息
      trackCount: 0, // 歌曲数量
      playCount: 0 //播放数量
    })
    // 获取歌单详情
    const getPlayListDetail = async () => {
      let { code, playlist } = await playlistDetail(playListId.value);
      if (code === 200) {
        playListData.playlist = playlist
        playListData.tracks = playlist.tracks
        playListData.creator = playlist.creator
        playListData.trackCount = playlist.trackCount
        playListData.playCount = playlist.playCount


      }
      console.log(playListData);
    }
    // 单曲播放
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const playsong = (row, Clickindex) => {
      console.log(row);
      store.dispatch('getSongUrls', row)
      if (play_list.value.length === playListData.tracks.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === row.id) {
          ply_num.value.url_index = index
        }
      });
    }
    // 全部播放
    const allplay = () => {
      // store.dispatch('getSongUrls', playListData['tracks'])
    }
    onMounted(() => {
      getPlayListDetail()
    })
    return {
      ...toRefs(playListData),
      allplay,
      dateInit,
      playsong,
      play_list,
      url,
      ply_num
    }
  }
}
</script>
 
<style scoped lang='scss'>
strong {
  color: #c20c0c;
}
.detailed {
  display: flex;
  height: 303px;
  .imgs {
    border: 1px solid #d5d5d5;
    width: 215px;
    height: 215px;
    img {
      position: relative;
      top: 2px;
      left: 2px;
      width: 208px;
      height: 208px;
    }
  }
  .info {
    flex: 1;
    margin-left: 20px;
    .title {
      display: flex;
      .h3-title {
        margin-left: 25px;
      }
    }
    .user-info {
      height: 35px;
      display: flex;
      margin-top: 20px;
      .user-img {
        position: relative;
        top: 4px;
        margin-right: 10px;
        width: 25px;
        height: 25px;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .name {
        line-height: 35px;
        margin-right: 10px;
        a {
          font-size: 12px;
          color: #0c73c2;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .user-date {
        line-height: 35px;
        font-size: 12px;
        color: #999;
      }
    }
    .bt {
      margin-top: 30px;
    }
  }
}
</style>