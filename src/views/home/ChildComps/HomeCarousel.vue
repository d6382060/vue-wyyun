<template>
  <div class="barnn">
    <div
      :style="{
        backgroundImage: `url('${bckImg}?imageView&blur=40x20')`,
      }"
      class="bgi"
    ></div>
    <el-carousel @change="changeCampus" :interval="5000" arrow="always">
      <el-carousel-item
        ref="initial_index"
        @click="topage(item.typeTitle, item.targetId)"
        v-for="(item, index) in bannerLists"
        :key="item.id"
      >
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- <el-carousel :interval="5000" arrow="always">
      <el-carousel-item
        @click="topage(item.typeTitle, item.targetId)"
        ref="imgs"
        v-for="item in bannerLists"
        :key="item.id"
      >
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
import { banner } from '../../../network/home'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeCarousel',
  setup (props, { emit }) {
    const router = useRouter()
    let bannerLists = ref([])
    // 获取轮播图数据
    const bannerList = () => {
      banner().then(res => {
        bannerLists.value = res.banners
      })
    }
    bannerList()
    const topage = (t, id) => {
      switch (t) {
        case '新碟首发':
          router.push({ path: 'album', query: { id } })
          break;
        case '新歌首发':
          router.push({ path: 'song', query: { id } })
          break;
        case '独家':
          router.push({ path: 'mv', query: { id } })
          break;
        case '热门单曲':
          router.push({ path: 'song', query: { id } })
          break;
        case '热门推荐':
          router.push({ path: 'album', query: { id } })
          break;

        default:
          break;
      }
    }
    let bckImg = ref(bannerLists.value[0]?.imageUrl)
    const initial_index = ref(null)
    const changeCampus = (e) => {
      bckImg.value = bannerLists.value[e].imageUrl

    }
    onMounted(() => {

    })
    return {
      initial_index,
      bannerLists,
      topage,
      changeCampus,
      bckImg
    }
  }
}
</script>

<style scoped lang='scss'>
.barnn {
  height: 300px;
  .bgi {
    background-position: center center;
    background-size: 6000px;
    height: 300px;
  }
}
.el-carousel {
  width: 1100px;
  margin: -300px auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
// .w {
//   width: 1100px;
//   margin: 0 auto;
// }
img {
  width: 1100px;
  &:hover {
    cursor: pointer;
  }
}
</style>