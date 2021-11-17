<template>
  <div id="nav-w">
    <div class="m-subnav">
      <div v-for="(item, index) in ItemArr">
        <span
          :key="index"
          class="item"
          :class="{ active: index === current }"
          @click="navClick(index)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
export default {

  name: 'subnav',
  setup () {
    const ItemArr = ref(['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'])
    let current = ref(0)

    const navClick = (index) => {
      current.value = index
    }


    return {
      current,
      ItemArr,
      navClick,
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
    .item {
      cursor: pointer;
      display: inline-block;
      height: 20px;
      padding: 0 13px;
      margin: 7px 17px 0;
      line-height: 21px;
      border-radius: 20px;
      font-size: 14px;
    }
    div {
      flex: 1;
      text-align: center;
      line-height: 35px;
      color: #fff;
    }
  }
}
.item:hover {
  background-color: #9b0909;
}
.active {
  background-color: #9b0909;
}
</style>