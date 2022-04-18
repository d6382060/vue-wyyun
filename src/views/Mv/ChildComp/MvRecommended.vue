<template>
  <h3 class="MvRecommended">
    <span>相关推荐</span>
  </h3>
  <div class="ilst">
    <div :key="index" v-for="(item, index) in mvs" class="item">
      <div class="img">
        <img :title="item.name" :src="item.cover" alt="" />
        <p><span class="iconfont icon-shipin"></span>{{ item.playCount }}</p>
      </div>
      <div class="mv_des">
        <p style="height: 20px" class="ovf">
          <a style="color: #000" :href="'#/mv?id=' + item.id">{{
            item.name
          }}</a>
        </p>
        <p style="height: 20px; color: #999">{{ dateInt(item.duration) }}</p>
        <p style="height: 17px; color: #999" class="ovf">
          <a style="color: #999" :href="'#/artist?id=' + item.artistId">{{
            item.artistName
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MvRecommended',
  props: {
    mvs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    let dateInt = (time) => {
      let minutes = Math.floor((time % 3600000) / 60000); //分
      let seconds = Math.floor((time % 60000) / 1000); //秒
      return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
    }


    return {
      dateInt
    }
  }
}
</script>

<style scoped lang='scss'>
.MvRecommended {
  font-weight: normal;
  color: #000;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.ilst {
  .item {
    margin-bottom: 15px;
    display: flex;
    gap: 5px;
    .img {
      width: 96px;
      height: 54px;
      position: relative;
      img {
        width: 96px;
        height: 54px;
        &:hover {
          cursor: pointer;
        }
      }
      p {
        font-size: 13px;
        background-color: rgba($color: #524746, $alpha: 0.7);
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 5px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        text-align: right;
      }
    }
    .mv_des {
      width: 134px;
      font-size: 13px;
      p:hover a {
        text-decoration: underline;
      }
      p:nth-child(2) {
        cursor: text;
      }
    }
  }
}
</style>