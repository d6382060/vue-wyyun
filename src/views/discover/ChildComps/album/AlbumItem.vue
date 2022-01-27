<template>
  <div class="alblist">
    <div class="tit">
      <h3>{{ title }}</h3>
      <div>
        <slot name="tab"></slot>
      </div>
    </div>
    <div class="list">
      <div :key="item.id" v-for="(item, index) in AlbumData" class="item">
        <img :src="item.blurPicUrl + '?param=130y130'" alt="" />

        <div class="des">
          <a @click="toalbum(item.id)" class="name ovf" href="javascript:;">{{
            item.name
          }}</a>
          <a class="singer" :href="'/artist?id=' + item.artists[0].id">{{
            item.artists[0].name
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: "AlbumItem",
  props: {
    title: String,
    AlbumData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const router = useRouter()
    const toalbum = (id) => {
      router.push({ path: "/album", query: { id } })
    }


    return {
      toalbum
    }
  }
}
</script>

<style scoped lang='scss'>
.alblist {
  .tit {
    display: flex;
    padding-bottom: 7px;
    border-bottom: 2px solid #c20c0c;
    height: 35px;
    // .tab {
    //   line-height: 25px;
    //   margin-left: 15px;
    // }
    h3 {
      font-size: 24px;
      font-weight: normal;
    }
  }
  .list {
    padding: 20px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      padding-bottom: 30px;
      img {
        width: 130px;
        height: 130px;
      }
      .des {
        width: 150px;
        display: flex;
        flex-direction: column;
        .name {
          padding-top: 5px;
          padding-bottom: 10px;
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
        .singer {
          font-size: 12px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>