<template>
  <div class="ArtistList">
    <div class="btn">
      <el-button @click="emit('allplay')" size="mini" round
        >全部播放
      </el-button>
      <el-button size="mini" round>收藏</el-button>
      <div class="ss">
        <el-dropdown @command="handleCommand">
          <el-button size="mini" round>
            {{ dropdown_item }}<i class="iconfont icon-xiala1"></i>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :class="{ active: dropdown_item == '热门单曲' }"
                command="热门单曲"
                >热门单曲</el-dropdown-item
              >
              <el-dropdown-item
                :class="{ active: dropdown_item == '作词作品' }"
                command="作词作品"
                >作词作品</el-dropdown-item
              >
              <el-dropdown-item
                :class="{ active: dropdown_item == '作曲作品' }"
                command="作曲作品"
                >作曲作品</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <song-list :isalbum="false" @playsong="playsong" :hotsongs="hot_songs" />
    <!-- <div class="song_list">
      <ul>
        <li v-for="(item, index) in hot_songs" class="list_item">
          <span class="item_index">{{ index + 1 }}</span>
          <i
            @click="playsong(item.id, item, index)"
            :class="{ activeColor: item.id === curr_index }"
            class="iconfont icon-bofang1"
          ></i>
          <div class="item_name">
            <a @click="toSong(item.id)" href="javascript:;">{{ item.name }} </a>
            <span class="alia" v-show="item.alia.length > 0 ? true : false"
              >-{{ item.alia[0] }}</span
            >
          </div>
          <a class="item_album" href="javascript:;">{{ item.al.name }}</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { getSingeMusic } from '../../../network/artist'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SongList from '../../../components/common/song_list/SongList.vue'
export default {
  components: { SongList },
  name: "'ArtistList",
  props: ['ids'],
  emits: ['playsong', 'allplay'],
  setup (props, { emit }) {
    const route = useRoute();
    let dropdown_item = ref('热门单曲')

    const handleCommand = (command) => {
      dropdown_item.value = command
    }
    // 歌手ID
    let siner_id = ref(route.query.id)
    // 歌曲数据
    let hot_songs = ref([])
    // 初始化列表
    const init_list = async () => {
      let { hotSongs } = await getSingeMusic(siner_id.value);
      hot_songs.value = hotSongs
    }
    onMounted(() => {
      init_list()
    })
    // 点播放
    const playsong = (row, index) => {
      emit('playsong', row, index)
    }


    return {
      dropdown_item,
      handleCommand,
      hot_songs,
      playsong,
      emit,
    }
  }
}
</script>

<style scoped lang='scss'>
.activeColor {
  color: red;
}
.ArtistList {
  padding-top: 15px;
}
.btn {
  display: flex;
  width: 100%;
}
.ss {
  text-align: right;
  width: 100%;
}

.active {
  color: skyblue;
}
</style>