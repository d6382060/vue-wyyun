<template>
  <div class="home-list">
    <div class="left">
      <div>
        <h2>{{ title }}</h2>
      </div>
      <div class="value">
        <a @click="toClick(value)" v-for="value in item" href="javascript:;"
          ><span>{{ value }}</span></a
        >
      </div>
    </div>
    <div class="rigths">更多</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'HomeList',
  props: {
    title: {
      type: String
    },
    item: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const router = useRouter()
    const toClick = (name) => {
      router.push({ path: '/playlist/table', query: { cat: name } })
    }

    return {
      toClick
    }
  }
}
</script>

<style scoped lang='scss'>
.home-list {
  border-bottom: 2px solid red;

  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  .left {
    margin-left: 10px;
    display: flex;
    a {
      margin-right: 15px;
      font-size: 14px;
    }
  }
}
.home-list .left div:nth-child(1) {
  margin-right: 15px;
  font-size: 14px;
}
.rigths {
  font-size: 14px;
  margin-right: 20px;
}
.value a:nth-last-child(n + 2) {
  width: 50px;
  display: inline-block;
  line-height: 15px;
  border-right: 1px solid #cfd0db;
}
.value a:hover {
  text-decoration: underline;
}
</style>