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
    <div class="hot-playlist">
      <div class="list-title">
        <h4>热门歌单</h4>
      </div>
      <div v-for="item in hotPlayList" class="listInfo">
        <div class="list-img">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="info">
          <a :title="item.name" href="javascript:;">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { personalized } from '../../../network/home'
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
      subscribers.value = res.subscribers
    })

    const hotPlayList = ref()
    // 获取热门歌单
    personalized(8).then(res => {
      hotPlayList.value = res.result.slice(3, 8);

    })

    return {
      subscribers,
      hotPlayList
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
.list-title {
  margin-top: 25px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
  h4 {
    font-size: 14px;
  }
}
.listInfo {
  margin-top: 15px;
  display: flex;
}
.list-img {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  img {
    width: 50px;
    height: 50px;
  }
}
.info {
  a {
    font-size: 14px;
    overflow: hidden;
  }
  a:hover {
    text-decoration: underline;
  }
}
.el-row {
  position: inherit;
}
</style>