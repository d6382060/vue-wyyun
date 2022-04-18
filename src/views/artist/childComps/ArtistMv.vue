<template>
  <div class="mv">
    <div v-for="(item, index) in mvs_data" class="mv_item">
      <div class="mv_img">
        <img :src="item.imgurl" alt="" />
        <a class="icon-play iconfont icon-bofang1" href="javascript:;"></a>
        <a class="msk" :href="'#/mv?id=' + item.id"></a>
      </div>
      <p @click="toMv(item.id)" :title="item.name" class="des ovf">
        {{ item.name }}
      </p>
    </div>
    <div v-if="mvs_data.length == 0" class="noMv">
      <i class="iconfont icon-zanwuxinxi"></i> 暂无MV
    </div>
    <el-pagination
      v-if="mvs_data.length !== 0"
      @click="Page"
      :page-size="12"
      layout="prev, pager, next"
      :total="50"
      v-model:currentPage="currentPage1"
    ></el-pagination>
  </div>
</template>

<script>
import { getSingeMv } from '../../../network/artist'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'ArtistMv',
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    // 请求你参数
    let getSingeMv_data = reactive({
      limit: 12,
      offset: 0,
      id: route.query.id
    })
    let mvs_data = ref([])
    console.log(mvs_data.value);
    // 初始化mv
    const init_Mv = async () => {
      let res = await getSingeMv(getSingeMv_data);
      mvs_data.value = res.mvs;
    }
    let currentPage1 = ref(1);
    const Page = () => {
      getSingeMv_data.offset = (currentPage1.value - 1) * 15;
      init_Mv()
    }
    const toMv = (id) => {
      router.push({ path: '/mv', query: { id } })
    }
    onMounted(() => {
      init_Mv()
    })
    return {
      mvs_data,
      Page,
      currentPage1,
      toMv
    }
  }
}
</script>

<style scoped lang='scss'>
.mv {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .mv_item {
    width: 25%;
    padding-bottom: 30px;
    .mv_img {
      position: relative;
      width: 137px;
      height: 103px;
      background-color: red;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 137px;
        height: 103px;
      }
      .icon-play {
        color: #fff;
        font-size: 40px;
        position: absolute;
        width: 44px;
        height: 44px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .msk {
        border-radius: 50%;
        opacity: 0.3;
        background-color: #333;
        position: absolute;
        width: 36px;
        height: 36px;
        top: 50%;
        left: 49%;
        transform: translate(-50%, -50%);
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .des {
      width: 140px;
      height: 20px;
      margin: 8px 0 3px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
.noMv {
  font-size: 50px;
  height: 300px;
  width: 759px;
  text-align: center;
  line-height: 300px;
}
.icon-zanwuxinxi {
  font-size: 50px;
  margin-right: 20px;
}
</style>