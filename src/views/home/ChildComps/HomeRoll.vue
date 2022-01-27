<template>
  <div class="home-roll">
    <div class="flex-content">
      <i @click="next" class="iconfont icon-fanhuijiantou"></i>

      <ul :style="{ transform: `translateX(${tranX}%)` }" class="list">
        <li
          v-for="item in newAlbumInfo.AlbumInfoOne"
          :key="item.id"
          class="item"
        >
          <img
            :title="item.name"
            :src="item.blurPicUrl + '?param=100y100'"
            alt=""
          />
          <p>
            <a :title="item.name" :href="'/album?id=' + item.id">{{
              item.name
            }}</a>
          </p>
          <span @click="toASrtist(item.artist.id)">{{ item.artist.name }}</span>
        </li>
      </ul>

      <i @click="next" class="iconfont icon-xiangyoujiantou"></i>
      <ul :style="{ transform: `translateX(${tranX}%)` }" class="list">
        <li
          v-for="item in newAlbumInfo.AlbumInfoTow"
          :key="item.id"
          class="item"
        >
          <img
            :title="item.name"
            :src="item.blurPicUrl + '?param=100y100'"
            alt=""
          />
          <p>
            <a :title="item.name" :href="'/album?id=' + item.id">{{
              item.name
            }}</a>
          </p>
          <span @click="toASrtist(item.artist.id)">{{ item.artist.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { newAlbum } from '../../../network/home'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeRoll',
  setup () {
    const router = useRouter()
    const newAlbumInfo = reactive({
      AlbumInfoOne: [],
      AlbumInfoTow: []

    })
    const getinfo = async () => {
      let { albums } = await newAlbum()
      newAlbumInfo.AlbumInfoOne = albums.slice(0, 5)
      newAlbumInfo.AlbumInfoTow = albums.slice(5, 10)
    }
    let isNetx = ref(false)
    let tranX = ref(0)
    const next = () => {

      isNetx.value = !isNetx.value
      if (!isNetx.value) {
        tranX.value = -109
      } else {
        tranX.value = 0

      }


    }

    const toASrtist = (id) => router.push({ path: "artist", query: { id } })
    onMounted(() => {
      getinfo()
    })
    return {
      newAlbumInfo,
      toASrtist,
      next,
      tranX
    }
  }
}
</script>

<style scoped lang='scss'>
.home-roll {
  height: 180px;
  padding: 30px;
  margin-bottom: 70px;
  .flex-content {
    width: 645px;
    display: flex;
    overflow: hidden;
    height: 200px;
    align-items: center;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    i {
      z-index: 999;
      font-size: 25px;
      padding: 10px;
    }
    .list {
      gap: 15px;
      transform: translateX(0);
      transition: all 2s;
      margin-top: 20px;
      height: 160px;
      display: flex;
      align-items: center;
      .item {
        height: 160px;
        width: 20%;
        text-align: center;
        img {
          cursor: pointer;
          width: 100px;
          height: 100px;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          height: 20px;
          overflow: hidden;
          overflow-wrap: inherit;
          &:hover {
            text-decoration: underline;
          }
        }
        span {
          font-size: 12px;
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