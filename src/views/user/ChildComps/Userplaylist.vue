<template>
  <div class="title">{{ title }}({{ count }})</div>
  <div class="list">
    <div v-for="item in list" :key="item.id" class="list_item">
      <div @click="toPlay_list(item.id)" class="img">
        <img :title="item.name" :src="item.coverImgUrl" alt="" />
      </div>
      <div @click="toPlay_list(item.id)" :title="item.name" class="name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Userplaylist',
  props: ['title', 'count', 'list'],
  setup (props) {

    const router = useRouter()
    // 跳转歌单
    const toPlay_list = (id) => {
      router.push({ path: '/playlist/detail', query: { id } })
    }
    return {
      toPlay_list
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 5px;
}
.list {
  padding-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  .list_item {
    width: 20%;
    .img {
      width: 140px;
      height: 140px;
      cursor: pointer;
      img {
        width: 140px;
        height: 140px;
      }
    }
    .name {
      width: 140px;
      height: 17px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      margin-top: 5px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>