<template>
  <div class="title">
    <h3>
      <span>我的视频（{{ count }}）</span>
    </h3>
  </div>
  <ul class="list">
    <li v-for="(item, index) in data" :key="item.vid" class="item">
      <div class="cover">
        <img :src="item.coverUrl + '?param=159y90'" alt="" />
        <p class="num">
          <i class="iconfont icon-shipin"></i>
          {{ item.playTime > 100000 ? num(item.playTime) : item.playTime }}
        </p>
        <a :href="'#/mv?id=' + item.vid" class="msk">66</a>
        <p class="time">00:00</p>
      </div>
      <h4 class="ovf">
        <i class="iconfont icon-MV"></i>
        <a :href="'#/mv?id=' + item.vid">{{ item.title }}</a>
      </h4>
      <h5>
        <a :href="'#/artist?id=' + item.creator[0].userId">{{
          item.creator && item.creator[0].userName
        }}</a>
      </h5>
    </li>
  </ul>
</template>

<script>
import { num } from "@/utils/playsong"
import { subMvList } from "@/network/mv"
import { onMounted, reactive, toRefs } from '@vue/runtime-core';
export default {
  name: "MyLikeMv",
  setup (props) {

    let subMvData = reactive({
      data: [],
      count: 0,
    })
    const getSubMvList = async () => {
      let res = await subMvList();
      if (res.code === 200) {
        subMvData.data = res.data;
        subMvData.count = res.count

      }
      console.log(res);
    }
    onMounted(() => {
      getSubMvList()
    })
    return {
      num,
      ...toRefs(subMvData)
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  h3 {
    color: #000;
    font-size: 24px;
    font-weight: normal;
  }
}
.list {
  display: flex;
  padding-top: 11px;
  flex-wrap: wrap;
  .item {
    height: 165px;
    padding: 0 0 25px 8px;
    .cover {
      position: relative;
      img {
        width: 159px;
        height: 90px;
      }
      .num {
        position: absolute;
        background-color: rgba($color: #1b1916, $alpha: 0.4);
        top: 0;
        right: 0;
        padding-right: 5px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        box-sizing: border-box;
        text-align: right;
        text-shadow: -2px 1px rgb(0 0 0 / 40%);
      }
      .msk {
        position: absolute;
        left: 0;
        width: 159px;
        height: 90px;
      }
      .time {
        font-size: 13px;
        color: #fff;
        position: absolute;
        bottom: 2px;
        left: 2px;
      }
    }
    h4 {
      height: 30px;
      width: 160px;
      font-weight: normal;
      i {
        position: relative;
        top: 3px;
        font-size: 20px;
        color: red;
      }
      a {
        font-size: 13px;
        color: #000;
        margin-left: 9px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    h5 {
      font-weight: normal;
      a {
        color: #666;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>