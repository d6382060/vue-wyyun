<template>
  <div id="home">
    <!-- 轮播 -->
    <div class="m">
      <div :style="bcimg"></div>
      <home-carousel class="home-car" />
    </div>
    <div class="list">
      <div class="left">
        <home-list title="热门推荐" :item="item" />
        <home-list-item />
        <home-list title="新碟上架" />
        <home-roll />
        <home-list title="榜单" />
        <home-bill />
      </div>
      <div class="right">
        <home-right-item />
      </div>
    </div>
    <div class="home-login">
      <!-- 登录 -->
    </div>
    <!-- <play-bar /> -->
  </div>
</template>

<script>
import HomeCarousel from './ChildComps/HomeCarousel.vue'
import { ref } from 'vue'
import HomeList from './ChildComps/HomeList.vue'
import HomeListItem from './ChildComps/HomeListItem.vue'
import HomeRoll from './ChildComps/HomeRoll.vue'
import HomeBill from './ChildComps/HomeBill.vue'
import HomeRightItem from './ChildComps/HomeRightItem.vue'
import PlayBar from '../../components/common/play-bar/playBar.vue'
export default {
  components: { HomeCarousel, HomeList, HomeListItem, HomeRoll, HomeBill, HomeRightItem, PlayBar },
  name: "Home",
  setup () {
    let bcimg = ref({
      backgroundImage: 'url(https://img2.baidu.com/it/u=1053855357,1766396589&fm=26&fmt=auto)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: ' blur(4px)',
      position: 'absolute',
      top: '106px',
      left: '0px',
      right: '0px',
      height: '299px'

    })
    const item = ref(["华语", "流行", "摇滚", "民谣", "电子"])


    return {
      bcimg,
      item,
    }
  }
}
</script>

<style scoped lang='scss'>
.m {
  width: 100%;
  height: 300px;

  // background-color: red;
}
.list {
  display: flex;
  justify-content: space-between;
  width: 1100px;

  margin: 0 auto;
  .left {
    margin-bottom: 50px;
    width: 735px;
    border: 1px solid #eee;
    background-color: #fff;
  }
  .right {
    border: 1px solid #eee;
    border-left: none;
    flex: 1;
  }
}
</style>