<template>
  <div class="Playlist-right">
    <div class="title">
      <h4>喜欢这个歌单的人</h4>
    </div>
    <el-row :gutter="20">
      <el-col v-for="item in subscribers" :span="6"
        ><div class="grid-content bg-purple">
          <img :title="item.nickname" :src="item.avatarUrl" alt="" /></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { playlistSubScribers } from '../../../network/playlist';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
export default {
  name: 'PlaylistRight',
  setup (props) {
    const route = useRoute()
    const id = computed(() => {
      return route.query.id
    });
    // 保存数据
    const subscribers = ref([])
    playlistSubScribers(id.value).then(res => {
      console.log(res);
      subscribers.value = res.subscribers
    })

    return {
      subscribers
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  font-size: 14px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
}
.grid-content {
  margin-top: 10px;
  width: 40px;
  height: 40px;
  img {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
}
</style>