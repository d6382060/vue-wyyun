<template>
  <div class="audio">
    <div
      @mouseover="hiddenPlay"
      @mouseout="showPlay"
      :style="{ transform: `translateY(${Ys}px)` }"
      class="play-audio"
    >
      <el-alert
        :closable="false"
        :title="
          play_list[url_index] ? play_list[url_index].music_name : '没有播放'
        "
        type="success"
        :description="play_list[url_index] ? play_list[url_index].singer : ''"
      >
      </el-alert>
      <div class="play_goto">
        <span>
          <el-button @click="switch_song('s')" type="info" round
            >上一首</el-button
          ></span
        >
        <span>
          <el-button @click="switch_song('x')" type="info" round
            >下一首</el-button
          ></span
        >
      </div>
      <audio
        ref="audio"
        @pause="emit('ispause')"
        @timeupdate="getTime"
        @ended="onabort"
        :autoplay="true"
        controls
        :src="urls"
      ></audio>
      <div class="play_list">
        <el-button
          type="primary"
          style="margin-left: 16px"
          @click="drawer = true"
        >
          播放列表
        </el-button>
      </div>
      <div @click="lockClick" class="lock">
        <div v-if="isShowLock" class="iconfont icon-suoding"></div>
        <div v-else class="iconfont icon-jiesuo"></div>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-scrollbar height="50%">
      <el-table
        :highlight-current-row="true"
        :data="play_list"
        style="width: 100%; height: 40%"
      >
        <el-table-column label="歌名" width="180">
          <template #default="scope">
            <span
              @click="playClick(scope.$index, scope.row.url, scope.row.row_id)"
              >{{ scope.row.music_name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="180" />
        <el-table-column label="" width="180">
          <template #default="scope">
            <div
              v-show="url_index == scope.$index"
              class="ain animate__animated animate__pulse animate__infinite"
            ></div>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useStore } from 'vuex';
export default {
  name: 'playBar',
  props: {
    url: {
      type: Array,
      default () {
        return ['1']
      }
    },
    play_list: {
      type: Array,
      default () {
        return ['2']
      }
    },
  },
  emits: ['playClick', 'getTime', 'onabort', 'ispause'],
  setup (props, { emit }) {
    // 播放的歌曲
    let url_index = ref(0)
    let urls = ref(props.url[url_index.value])
    const onabort = () => {
      url_index.value++
      urls.value = props.url[url_index.value]
      if (!urls.value) {
        url_index.value = 0
      }
      emit('onabort')
    }
    watch(() => props.url[url_index.value], (oldVlaue, newVlaue) => {
      urls.value = oldVlaue
    })

    // });
    // 切换
    const switch_song = (on) => {
      if (on == 'x' && props.play_list.length > 1) {
        if (url_index.value == props.play_list.length - 1) {
          ElMessage({
            message: '已经到头了',
            type: 'warning',
          })
          return
        }
        url_index.value++
        urls.value = props.url[url_index.value]

      } else if (on == 's' && props.play_list.length > 1) {
        if (url_index.value == 0) {
          ElMessage({
            message: '前面已经没有了',
            type: 'warning',
          })
          return
        }
        url_index.value--
        urls.value = props.url[url_index.value]

      }
    }
    // 点击播放
    const playClick = (index, url, id) => {
      url_index.value = index
      urls.value = props.url[url_index.value]
      emit('playClick', id)
    }
    // 是否锁定播放控件
    let isShowLock = ref(true)
    // 锁定播放控件 
    const lockClick = () => {
      isShowLock.value = !isShowLock.value
    }
    let Ys = ref(50)
    const showPlay = () => {
      if (!isShowLock.value) return
      Ys.value = 50

    }
    const hiddenPlay = () => {
      Ys.value = 0

    }
    // 追踪播放时间
    const audio = ref(null)
    const getTime = () => {
      emit('getTime', audio.value.currentTime)
    }
    return {
      onabort,
      urls,
      drawer: ref(false),
      switch_song,
      playClick,
      url_index,
      isShowLock,
      lockClick,
      showPlay,
      hiddenPlay,
      Ys,
      getTime,
      audio,
      emit

    }
  }

}
</script>

<style scoped lang='scss'>
.play-audio {
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .play_list {
    line-height: 54px;
  }
  .play_goto {
    line-height: 54px;
  }
  audio {
    width: 1200px;
  }
}
.ain {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: skyblue;
}
.lock {
  position: relative;
  left: -72px;
  top: -43px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  &:hover {
    color: skyblue;
    cursor: pointer;
  }
}
</style>