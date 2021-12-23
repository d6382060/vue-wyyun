<template>
  <div class="list_play">
    <div class="flex_box">
      <div v-for="item in result" class="content_liast">
        <div @click="toPlaylist(item.id)" class="img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div @click="toPlaylist(item.id)" class="title">
          <a :title="item.name" href="javascript:;">{{ item.name }}</a>
        </div>
        <div class="des">
          <span>{{ item.creator.nickname }}</span>
        </div>
      </div>
    </div>
    <el-pagination
      v-model:currentPage="currentPage1"
      :page-size="35"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default {
  name: "PlaylistTableList",
  props: ['result', 'total'],
  setup (props, { emit }) {
    const router = useRouter()
    let currentPage1 = ref(1)
    const handleCurrentChange = (val) => {
      emit('handleCurrentChange', val)
    }

    const toPlaylist = (id) => {
      router.push({ path: '/playlist/detail', query: { id } })
      console.log(id);
    }
    return {
      currentPage1,
      handleCurrentChange,
      toPlaylist
    }
  }
}
</script>

<style scoped lang='scss'>
.list_play {
  margin-top: 25px;

  .flex_box {
    display: flex;
    flex-flow: wrap;
    text-align: center;
    .content_liast {
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
      .title {
        width: 140px;
        margin-top: 10px;
        a {
          display: inline-block;
          width: 140px;
          height: 17px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
        }
      }
      .des {
        width: 140px;
        span {
          font-size: 12px;
          display: inline-block;
          width: 140px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #666;
        }
      }
    }
  }
}
.el-pagination {
  width: 100%;
  text-align: center;
}
</style>