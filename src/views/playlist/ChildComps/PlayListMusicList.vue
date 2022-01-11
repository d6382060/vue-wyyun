<template>
  <div class="music-list">
    <div class="title">
      <h4>歌曲列表</h4>
      <span>{{ tracks.length }}首歌</span>
    </div>
    <div class="musci-table">
      <el-table :data="tracks" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="name" label="歌曲" width="250">
          <template #default="scope">
            <span @click="playsong(scope.row.id, scope.row, scope.$index)">{{
              scope.row.name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" />
        <el-table-column prop="al.name" label="专辑" />
      </el-table>
    </div>
    <div class="btn">
      <el-button v-show="!isshowBtn" @click="login" type="warning" round
        >登录查看更多歌曲</el-button
      >
    </div>
    <play-bar :url="url" ref="ply_num" :play_list="play_list" />
  </div>
</template>

<script>
import { getSongUrl } from '../../../network/playlist'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import playBar from '../../../components/common/play-bar/playBar.vue'
export default {
  components: { playBar },
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
    const store = useStore()

    const login = () => {
      store.commit("islogDialog");
    }
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const playsong = async (id, row, Clickindex) => {
      store.dispatch('getSongUrls', row)

      if (play_list.value.length === props.tracks.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === id) {
          ply_num.value.url_index = index
        } else {
          ply_num.value.url_index = 0
        }
      });




      // let res = await getSongUrl(id);
      // // 创建播放对象
      // let playBoj = {
      //   url: res.data[0].url,
      //   singer: row.ar[0].name,
      //   music_name: row.name,
      // }
      // play_list.value.unshift(playBoj)

    }

    return {
      isshowBtn: computed(() => store.getters),
      login,
      playsong,
      url,
      play_list,
      ply_num
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
:deep(.cell) {
  cursor: pointer;
}
:deep(.cell):hover {
  text-decoration: underline;
}
</style>