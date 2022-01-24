<template>
  <div>
    <div class="album">
      <div
        v-for="(item, index) in SingeAlbum_data.hot_albums"
        :key="item.id"
        class="album_item"
      >
        <div class="img">
          <img :src="item.blurPicUrl" alt="" />
        </div>
        <div class="music_name">{{ item.name }}</div>
        <div class="singer_name">{{ dateInit(item.publishTime) }}</div>
      </div>
    </div>
    <el-pagination
      @click="Page"
      :page-size="15"
      layout="prev, pager, next"
      :total="SingeAlbum_data.albumSize"
      v-model:currentPage="currentPage1"
    ></el-pagination>
  </div>
</template>

<script>
import { dateInit } from '../../../utils/playsong'
import { getSingeAlbum } from '../../../network/artist'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: "ArtistAlbum",
  setup (props) {
    const route = useRoute()
    // 创建请求参数
    const getTopPlaylist_data = reactive({
      id: route.query.id,
      limit: 15,
      offset: 0
    })
    // 数据

    let SingeAlbum_data = reactive({
      hot_albums: [],
      albumSize: 0
    })
    // 初始化
    const init_album = async () => {
      let res = await getSingeAlbum(getTopPlaylist_data);
      SingeAlbum_data.hot_albums = res.hotAlbums
      SingeAlbum_data.albumSize = res.artist.albumSize

    }
    let currentPage1 = ref(1);
    onMounted(() => {
      init_album()
    })
    const Page = () => {
      getTopPlaylist_data.offset = (currentPage1.value - 1) * 15;
      init_album()
    }


    return {
      SingeAlbum_data,
      dateInit,
      currentPage1,
      Page
    }
  }
}
</script>

<style scoped lang='scss'>
.album {
  margin-top: 25px;
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
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .singer_name {
      margin-top: 5px;
      color: #0c73c2;
    }
  }
}
</style>