<template>
  <div class="music-list">
    <div class="title">
      <h4>歌曲列表</h4>
      <span>{{ tracks.length }}首歌</span>
    </div>
    <div class="musci-table">
      <el-table :data="tracks" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="name" label="歌曲" width="180" />
        <el-table-column prop="ar[0].name" label="歌手" />
        <el-table-column prop="al.name" label="专辑" />
      </el-table>
    </div>
    <div class="btn">
      <el-button type="warning" round>登录查看更多歌曲</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "PlayListMusicList",
  props: {
    tracks: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {



    return {
    }
  }
}
</script>

<style scoped lang='scss'>
.music-list {
  margin-top: 30px;
}
.title {
  h4 {
    display: inline-block;
  }
  & span {
    margin-left: 15px;
  }
}
.el-table {
  cursor: pointer;
}
.el-button {
  margin-top: 15px;
  width: 100%;
}
</style>