<template>
  <div class="Hader">
    <div class="Hader_info">
      <div class="img">
        <img :src="playlist.coverImgUrl + '?param=150y150'" alt="" />
      </div>
      <div class="dec">
        <div class="title">{{ playlist.name }}</div>
        <div class="time">
          <i class="iconfont icon-shijian"></i>
          <span class="update">最近更新：{{ dateInit(1642812804325) }}</span>
          <span class="des">({{ playlist.description }})</span>
        </div>
        <btns
          @rolling="rolling"
          @allplay="allplay"
          :trackIds="trackIds"
          :num="playlist"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { dateInit } from '@/utils/playsong'
import Btns from '../../../../components/common/btns/Btns.vue';
import { toRef, toRefs } from 'vue';
export default {
  components: { Btns },
  name: "TopListHader",
  props: {
    playlist: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  setup (props, { emit }) {
    const store = useStore()
    let { trackIds } = toRefs(props.playlist)
    // 全部播放
    const allplay = () => {

      store.dispatch('getSongUrls', props.playlist.tracks)
    }
    const rolling = () => {
      emit('rolling')
    }
    return {
      dateInit,
      trackIds,
      allplay,
      rolling
    }
  }
}
</script>

<style scoped lang='scss'>
.Hader {
  padding: 40px;
  .Hader_info {
    display: flex;
    .img {
      border: 1px solid #cccccc;
      height: 160px;
      width: 160px;
      img {
        position: relative;
        top: 4px;
        left: 4px;
        height: 150px;
        width: 150px;
      }
    }
    .dec {
      padding-left: 25px;
      .title {
        padding: 15px 0 5px;
      }
      .time {
        margin-top: 25px;
        font-size: 14px;
        .update {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .btn {
        margin-top: 25px;
      }
    }
  }
}
</style>