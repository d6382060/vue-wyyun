<template>
  <div class="title">
    <h4>{{ title }}</h4>
    <slot></slot>
  </div>
  <ul class="list">
    <li v-for="(item, index) in djData" :key="item.id" class="item">
      <div class="img">
        <a href="javascript:;">
          <img v-if="item.picUrl" :src="item.picUrl + '?param=50y50'" alt="" />
          <img v-else :src="item.coverUrl + '?param=50y50'" alt="" />
        </a>
      </div>
      <div class="des">
        <p @click="todjradio(item.id)" class="dj_name ovf">
          <a href="javascript:;">{{ item.name }}</a>
        </p>
        <p v-if="item.picUrl" class="artist ovf">
          <span>by</span>
          <a :href="'#/user/home?id=' + item.dj.userId">{{
            item.dj.nickname
          }}</a>
        </p>
        <p v-else>
          <span>Vol.{{ item.serialNum }}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AsideList",
  props: {
    djData: {
      type: Array,
      default () {
        return []
      }
    },
    title: String
  },
  emits: ['todjradio'],
  setup (props, { emit }) {

    const todjradio = (id) => {
      emit("todjradio", id)
    }
    return {
      todjradio
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 6px;
  margin-bottom: 20px;
  h4 {
    font-size: 14px;
    color: #000;
    font-weight: normal;
  }
}
.list {
  .item {
    height: 50px;
    line-height: 20px;
    display: flex;
    margin-bottom: 15px;
    .img {
      a {
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
    .des {
      width: 140px;
      margin-left: 15px;
      font-size: 14px;
      .dj_name {
        height: 29px;
        a {
          color: #000;
          font-size: 14px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .artist {
        span {
          margin-right: 6px;
          color: #999;
          &:hover {
            cursor: text;
          }
        }
        a {
          color: #666;
          font-size: 13px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>