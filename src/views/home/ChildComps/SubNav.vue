<template>
  <div id="nav-w">
    <div class="m-subnav">
      <sub-nava>
        <sub-nav-item path=/home>
          <template v-slot:item-text>
          推荐
          </template>
        </sub-nav-item>
        <sub-nav-item path="/discover/toplist">
          <template v-slot:item-text>
          排行榜
          </template>
        </sub-nav-item>
        <sub-nav-item path="/playlist/table">
          <template v-slot:item-text>
            歌单
          </template>
        </sub-nav-item>
        <sub-nav-item path="/discover/djradio" >
          <template v-slot:item-text>
           主播电台
          </template>
        </sub-nav-item>
        <sub-nav-item path="/discover/artist">
          <template v-slot:item-text>
           歌手
          </template>
        </sub-nav-item>
        <sub-nav-item path="/discover/album">
          <template v-slot:item-text>
         新碟上架
          </template>
        </sub-nav-item>
      </sub-nava>
      <!-- <div v-for="(item, index) in ItemArr">
        <span
          :key="index"
          class="item"
          :class="{ active: index === current }"
          @click="navClick(index)"
          >{{ item }}</span
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import SubNava from '../../../components/common/SubNav/SubNava.vue'
import SubNavItem from '../../../components/common/SubNav/SubNavItem.vue'
export default {
  components: { SubNava, SubNavItem },

  name: 'subnav',
  setup () {


    return {
    }
  }
}
</script>

<style scoped lang='scss'>
#nav-w {
  width: 100%;
  height: 35px;
  background-color: #c20c0c;
  .m-subnav {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    z-index: 99;
    height: 35px;
    background-color: #c20c0c;
    border-bottom: 1px solid #a40011;
    div {
      flex: 1;
      text-align: center;
      line-height: 35px;
      color: #fff;
    }
  }
}
</style>