<template>
  <div class="search_box">
    <div class="desc">搜索“{{ keyVal }}”</div>
    <el-tabs @tab-click="tab_click" type="border-card">
      <el-tab-pane label="单曲">
        <ul>
          <li
            v-for="(item, index) in musicInfo.single"
            :key="item.id"
            class="table"
          >
            <a
              @click="play_music(item.id, item, index)"
              class="name"
              href="javascript:;"
              >{{ item.name }}
            </a>

            <a class="ar" href="javascript:;">
              <span>{{ item.ar[0].name }} </span>
              <span v-if="item.ar[1]"> / {{ item.ar[1].name }}</span>
            </a>

            <a class="al" href="javascript:;">《{{ item.al.name }}》</a>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="专辑">
        <div class="album">
          <div v-for="item in musicInfo.album" class="album_item">
            <div class="img">
              <a :href="'/album?id=' + item.id">
                <img :src="item.blurPicUrl" alt="" :title="item.name" />
              </a>
            </div>
            <div class="music_name">
              <a :href="'/album?id=' + item.id">{{ item.name }}</a>
            </div>
            <div class="singer_name">
              <a :href="'/artist?id=' + item.artist.id">
                {{ item.artist.name }}</a
              >
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手">
        <div class="songer">
          <div
            @click="toArtist(item.id)"
            v-for="item in musicInfo.singer"
            :key="item.id"
            class="soner_item"
          >
            <div class="img">
              <img :src="item.img1v1Url" alt="" />
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单">
        <div class="playlist">
          <div
            @click="toPlay_list(item.id)"
            v-for="item in musicInfo.playlist"
            class="playlist_item"
          >
            <div class="img">
              <img :src="item.coverImgUrl" :title="item.name" alt="" />
            </div>
            <div :title="item.name" class="playlist_name">{{ item.name }}</div>
            <div class="playlist_count">{{ item.trackCount }}首</div>
            <div :title="item.creator.nickname" class="playlist_master">
              by {{ item.creator.nickname }}
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <play-bar :url="url" ref="ply_num" :play_list="play_list" />
</template>

<script>
import { ElMessage } from 'element-plus'
import { serach, isMusic } from '../../network/home'
import { useStore } from 'vuex'
import { ref, onMounted, reactive, watch, computed } from "vue"
import { useRoute, useRouter } from 'vue-router'
import playBar from '../../components/common/play-bar/playBar.vue'
export default {
  components: { playBar },
  name: "search",
  setup (props) {
    const store = useStore()
    const route = useRoute();
    const router = useRouter()
    let musicInfo = reactive({
      single: [], // 1 单曲
      album: [], // 10专辑
      singer: [],  // 100歌手
      playlist: [] // 1000歌单
    })
    // 获取qurey
    let keyVal = ref(route.query.name)
    //初始化数据
    const init = async (type) => {
      let res = await serach(keyVal.value, type);
      switch (type) {
        case 1:
          musicInfo['single'] = res.result.songs
          break;
        case 10:
          musicInfo['album'] = res.result.albums
          break;
        case 100:
          musicInfo['singer'] = res.result.artists
          break;
        case 1000:
          musicInfo['playlist'] = res.result.playlists
          break;

        default:
          break;
      }
    }
    // tabs 点击
    const tab_click = (s) => {
      if (s.index == 0) {
        init(1)
      } else if (s.index == 1) {
        init(10)
      } else if (s.index == 2) {
        init(100)
      } else if (s.index == 3) {
        init(1000)
      }
    }

    // 播放歌曲
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const play_music = async (id, row, Clickindex) => {
      let available = await isMusic(id)
      console.log();
      if (!available) {
        ElMessage({
          message: '亲爱的,暂无版权',
          type: 'warning',
        })
        return
      }
      store.dispatch('getSongUrls', row)
      play_list.value.some((item, index) => {
        if (item.row_id === id) {
          ply_num.value.url_index = index
        } else {
          ply_num.value.url_index = 0
        }
      });
    }

    // 跳转歌单
    const toPlay_list = (id) => {
      router.push({ path: '/playlist/detail', query: { id } })
    }
    watch(() => route.query.name, (oldVlaue) => {
      keyVal.value = oldVlaue
      init(1)
    })
    // 跳转歌手
    const toArtist = (id) => {
      router.push({ path: "artist", query: { id } })
    }
    onMounted(() => {
      init(1)
    })
    return {
      tab_click,
      musicInfo,
      keyVal,
      play_music,
      url,
      toPlay_list,
      play_list,
      ply_num,
      toArtist
    }
  }


}
</script>

<style scoped lang='scss'>
.search_box {
  padding: 20px;
  width: 1100px;
  margin: 0 auto 40px;
  border: 1px solid #eee;
  .desc {
    margin-bottom: 20px;
  }
  .table {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .name {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
    .al {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
    .ar {
      width: 150px;
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .songer {
    height: 700px;
    display: flex;
    flex-flow: wrap;
    .soner_item {
      width: 16.6%;
      text-align: center;
      .img {
        img {
          width: 130px;
          height: 130px;
        }
        &:hover {
          cursor: pointer;
        }
      }
      .name {
        font-size: 14px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .album {
    display: flex;
    flex-wrap: wrap;
    .album_item {
      width: 20%;
      text-align: center;
      font-size: 12px;
      margin-bottom: 10px;
      .img {
        img {
          cursor: pointer;
          width: 130px;
          height: 130px;
        }
      }
      .music_name {
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .singer_name {
        a {
          margin-top: 5px;
          color: #0c73c2;
        }

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .playlist {
    .playlist_item {
      font-size: 12px;
      display: flex;
      justify-content: space-between;

      // margin-top: 15px;
      padding: 5px 0;
      &:nth-child(2n) {
        background-color: #f7f7f7;
      }
      &:hover {
        border: 1px solid #d9d9d9;
        background-color: #f7f7f7;
      }
      .img {
        cursor: pointer;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .playlist_name {
        line-height: 50px;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .playlist_master {
        line-height: 50px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .playlist_count {
        line-height: 50px;
      }
    }
  }
}
.el-tabs__content {
  margin-bottom: 40px;
}
.warning {
  width: 150px;
}
</style>