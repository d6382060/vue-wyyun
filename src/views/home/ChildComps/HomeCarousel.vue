<template>
  <div>
    <div class="w">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item ref="imgs" v-for="item in bannerLists" :key="item">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { banner } from '../../../network/home'
import { ref, onMounted } from 'vue'
export default {
  name: 'HomeCarousel',
  setup (props, { emit }) {
    let bannerLists = ref(null)
    // 获取轮播图数据
    const bannerList = () => {
      banner().then(res => {
        bannerLists.value = res.banners
      })
    }
    bannerList()


    return {
      bannerLists,
    }
  }
}
</script>

<style scoped>
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
.w {
  width: 1100px;
  margin: 0 auto;
}
img {
  width: 1100px;
}
</style>