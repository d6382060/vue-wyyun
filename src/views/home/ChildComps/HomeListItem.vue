<template>
  <div class="list-item">
    <div @click="toplaylist(item.id)" v-for="item in HotRecom" class="item">
      <a href="javascript:;">
        <img :src="item.picUrl" :title="item.name" :alt="item.name"
      /></a>
      <div class="playInfo">
        <span class="playcount"
          ><i class="iconfont icon-24gl-headphones"></i
          >{{
            item.playCount > 100000
              ? (item.playCount / 10000).toFixed() + "万"
              : item.playCount
          }}</span
        >
        <span class="playing"
          ><a href="javascript:;"
            ><i style="color: #fff" class="iconfont icon-bofang"></i></a
        ></span>
      </div>
      <p class="music-title">
        <a :title="item.name" href="javascript:;">{{ item.name }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { personalized } from '../../../network/home'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeListItem',
  setup () {
    const router = useRouter()
    const HotRecom = ref([])
    personalized(8).then(res => {
      HotRecom.value = res.result
    });
    // 点击跳转歌单详情
    const toplaylist = (id) => {
      console.log(666);
      router.push({ path: '/playlist/detail', query: { id } })
    }

    return {
      HotRecom,
      toplaylist
    }
  }
}
</script>

<style scoped lang='scss'>
.list-item {
  margin: 20px;
  display: flex;
  flex-flow: wrap;
  text-align: center;
  .item {
    flex: 1;
    margin-bottom: 30px;
  }
  img {
    width: 140px;
    height: 140px;
  }
}
.playInfo {
  position: relative;
  top: -20px;
  color: #ccc;
  left: 16.8px;
  background-color: #2c2a27;
  width: 140px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  height: 27px;
  line-height: 27px;
  .playcount {
    margin-left: 5px;
    i {
      margin-right: 5px;
    }
  }
  .playing {
    margin-right: 5px;
  }
}
.music-title {
  font-size: 14px;
  color: #000;
  a:hover {
    text-decoration: underline;
  }
}
</style>