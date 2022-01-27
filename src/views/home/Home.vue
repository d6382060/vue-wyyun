<template>
  <div id="home">
    <!-- 轮播 -->
    <home-carousel class="home-car" />

    <div class="list">
      <div class="left">
        <home-list
          @toToplist="toToplist('热门推荐')"
          title="热门推荐"
          :item="item"
        />
        <home-list-item />
        <home-list @toToplist="toToplist('新碟上架')" title="新碟上架" />
        <home-roll />
        <home-list @toToplist="toToplist('榜单')" title="榜单" />
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
import { useRouter } from 'vue-router'
export default {
  components: { HomeCarousel, HomeList, HomeListItem, HomeRoll, HomeBill, HomeRightItem, PlayBar },
  name: "Home",
  setup () {
    const router = useRouter()

    const item = ref(["华语", "流行", "摇滚", "民谣", "电子"])
    const toToplist = (name) => {
      switch (name) {
        case '热门推荐':
          router.push('/playlist/table')
          break;
        case '新碟上架':
          router.push('/discover/album')
          break;
        case '榜单':
          router.push('/discover/toplist')
          break;

        default:
          break;
      }
    }
    return {
      item,
      toToplist
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