<template>
  <div class="music-list">
    <div class="title">
      <h4>歌曲列表</h4>
      <span>{{ ids.length }}首歌</span>
    </div>
    <div class="musci-table">
      <el-table :data="ids" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="name" label="歌曲" width="250">
          <template #default="scope">
            <span @click="playsong(scope.row.id, scope.row)">{{
              scope.row.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" />
        <el-table-column prop="al.name" label="专辑" />
      </el-table>
    </div>
    <play-bar :url="url" :play_list="play_list" />
  </div>
</template>

<script>
import { getSongUrl } from '../../../network/playlist'
import { ref, computed } from 'vue'
import playBar from '../../../components/common/play-bar/playBar.vue'
export default {
  components: { playBar },
  name: "PlayListMusicListIsLogin",
  props: {
    ids: {
      type: Array,
      defaulat () {
        return []
      }
    }
  },

  setup (props) {
    let url = ref([]);
    let play_list = ref([])
    const playsong = async (id, row) => {
      let res = await getSongUrl(id);

      // 创建播放对象
      let playBoj = {
        url: res.data[0].url,
        singer: row.ar[0].name,
        music_name: row.name,
      }
      url.value.unshift(res.data[0].url)
      play_list.value.unshift(playBoj)
    }

    return {
      playsong,
      url,
      play_list
    }

  }
}
</script>

<style scoped lang='scss'>
:deep(.cell) {
  cursor: pointer;
}
:deep(.cell):hover {
  text-decoration: underline;
}
</style>