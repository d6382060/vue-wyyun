<template>
  <div class="similarSong">
    <div class="title">
      <h4>相似歌曲</h4>
    </div>
    <div class="song_list">
      <div
        v-for="(item, index) in simiSongData"
        :key="item.id"
        class="song_item"
      >
        <div class="des">
          <div @click="toPage(item.id, item)" class="song_name">
            {{ item.name }}
          </div>
          <div
            @click="toPage(item.artists[0].id, 'singer')"
            class="singer_name"
          >
            {{ item.artists[0].name }}
          </div>
        </div>
        <div class="btn">
          <i
            @click="playsong(item.id)"
            title="播放"
            class="iconfont icon-bofang1 fz"
          ></i>
          <i title="收藏" class="iconfont icon-jiahao fz"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongDetail } from '@/network/playlist'
import { ElMessage } from 'element-plus'
import { simiSong } from '@/network/singleSong'
import { onMounted, ref, } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: "SimilarSong",
  setup (props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let simiSongData = ref([])
    // 获取获取相似音乐
    const init = async () => {
      let res = await simiSong(id.value);
      if (res.code !== 200) {
        ElMessage.error('相似歌曲失败')
      }
      simiSongData.value = res.songs
    }
    let id = ref(route.query.id)
    // 点击跳转
    const toPage = (id, name) => {
      if (name === 'singer') {
        router.push({ path: '/artist', query: { id } })
      } else {
        store.dispatch('getSongDetailData', id)
        router.push({ path: '/song', query: { id } })
        setTimeout(() => {
          location.reload()
        }, 500);
      }
    }

    // 播放
    const playsong = async (id) => {
      let { songs } = await getSongDetail(id);
      store.dispatch('getSongUrls', songs)
      console.log(songs);
    }
    onMounted(() => {
      init()
    })
    return {
      simiSongData,
      toPage,
      playsong
    }
  }
}
</script>

<style scoped lang='scss'>
.similarSong {
  .title {
    padding-bottom: 5px;
    border-bottom: 1px solid #666;
    font-size: 14px;
    color: #333;
  }
  .song_list {
    .song_item {
      padding-top: 20px;
      display: flex;
      .des {
        width: 150px;
        .song_name {
          color: #333;
          font-size: 14px;
          margin-bottom: 5px;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .singer_name {
          font-size: 12px;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .btn {
        flex: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        .fz {
          font-size: 20px;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>