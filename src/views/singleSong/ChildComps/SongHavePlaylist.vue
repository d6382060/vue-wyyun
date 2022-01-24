<template>
  <div v-if="playlists_data.length !== 0" class="SongHavePlaylist">
    <div class="title">
      <h4>包含这首歌的歌单</h4>
    </div>
    <div class="list">
      <div v-for="(item, index) in playlists_data" class="item">
        <div class="img">
          <img :src="item.coverImgUrl + '?param=50y50'" alt="" />
        </div>
        <div class="des">
          <div
            @click="toplaylistdetail(item.id)"
            :key="item.id"
            class="playlist_name ovf"
          >
            {{ item.name }}
          </div>
          <div @click="tohome(item.creator.userId)" class="singer_name ovf">
            by{{ item.creator.nickname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { simiPlaylist } from '@/network/singleSong'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'SongHavePlaylist',
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    let song_id = ref(route.query.id)
    // 获取相似歌单
    const playlists_data = ref([])
    const getsimiPlaylist = async () => {
      let res = await simiPlaylist(song_id.value);
      playlists_data.value = res.playlists
      console.log();
    }
    // 页面跳转
    const toplaylistdetail = (id) => {
      router.push({ path: '/playlist/detail', query: { id } })
    }
    const tohome = (id) => {
      router.push({ path: '/user/home', query: { id, t: 0 } })
      console.log(id);

    }

    onMounted(() => {
      getsimiPlaylist()
    })

    return {
      playlists_data,
      toplaylistdetail,
      tohome
    }
  }
}
</script>

<style scoped lang='scss'>
.SongHavePlaylist {
  .title {
    padding-bottom: 5px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #666;
  }
  .list {
    margin-top: 20px;
    .item {
      padding-bottom: 15px;
      display: flex;
      .des {
        padding: 5px 0 5px 15px;
        flex: 1;
        .playlist_name {
          font-size: 14px;
          width: 204px;
          height: 14px;
          margin-bottom: 10px;
          color: #333;
          &:hover {
            cursor: pointer;
          }
        }
        .singer_name {
          font-size: 12px;
          width: 204px;
          height: 12px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>