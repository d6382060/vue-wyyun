<template>
  <div class="HotSinger">
    <div
      @click="toArtist(item.id)"
      :key="item.id"
      v-for="(item, index) in HotSinger_data"
      class="mv_item"
    >
      <div class="mv_img">
        <img :src="item.img1v1Url + '?param=50y50'" alt="" />
      </div>
      <p :title="item.name" class="des">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
import { getHotSinger } from '../../../network/artist'
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  name: "HotSinger",
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    //请求参数
    let getParams = reactive({
      limit: 8,
      offset: 0
    })
    let HotSinger_data = ref([])
    // 发送请求
    const getHotData = async () => {
      let { artists } = await getHotSinger(getParams);
      HotSinger_data.value = artists
    }
    const toArtist = (id) => {
      router.push({ path: 'artist', query: { id } });
      setTimeout(() => {
        location.reload();
      }, 300);
    }

    onMounted(() => {
      getHotData()
    })
    return {
      HotSinger_data,
      toArtist
    }
  }
}
</script>

<style scoped lang='scss'>
.HotSinger {
  display: flex;
  flex-wrap: wrap;
  .mv_item {
    padding-bottom: 20px;
    padding-left: 25px;
    .mv_img {
      position: relative;
      width: 50px;
      height: 50px;
      background-color: red;

      &:hover {
        cursor: pointer;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
    .des {
      width: 50px;
      height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      white-space: initial;
      margin: 8px 0 3px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>