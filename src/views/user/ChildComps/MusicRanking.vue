<template>
  <div class="title">
    <span>听歌排行</span>
    <div @click="types" class="weekData">
      <span
        data-index="1"
        :class="{ title_name_color: index == 1 }"
        class="curs_pointer"
        >最近一周</span
      >
      <span
        :class="{ title_name_color: index == 2 }"
        data-index="2"
        class="curs_pointer"
        >所有时间</span
      >
    </div>
  </div>
  <div class="ranking_list">
    <ul>
      <li :key="item.song.id" v-for="(item, index) in music_ranking">
        <div class="l">
          <div class="curs_txt index">{{ index + 1 }}.</div>
          <div class="music_name">
            <span
              @click="play_music(item.song.id, item.song)"
              class="curs_pointer name"
              >{{ item.song.name }}</span
            >
            -
            <span class="curs_pointer singer">{{ item.song.ar[0].name }} </span>
            <span class="curs_pointer singer" v-if="item.song.ar.length == 2">
              / {{ item.song.ar[1].name }}</span
            >
          </div>
        </div>
        <div class="r">
          <span class="curs_txt">{{ item.playCount }}次</span>
        </div>
      </li>
    </ul>
  </div>
  <play-bar :url="url" :play_list="play_list" />
</template>

<script>
import { getSongUrl } from '../../../network/playlist'
import { ref } from 'vue';
import PlayBar from '../../../components/common/play-bar/playBar.vue';
export default {
  name: "MusicRanking",
  components: { PlayBar },
  props: ['music_ranking', 'index'],
  emits: {
    types: null,//click事件没有检验
  },
  setup (props, { emit }) {

    let index = ref(1)
    const types = (e) => {
      index.value = e.target.getAttribute("data-index");
      emit('types', e)
    }

    // 播放
    let url = ref([]);
    let play_list = ref([])
    const play_music = async (id, item) => {
      let res = await getSongUrl(id);
      // //  创建播放对象
      let playBoj = {
        url: res.data[0].url,
        singer: item.ar[0].name,
        music_name: item.name,
      }
      url.value.unshift(res.data[0].url)
      play_list.value.unshift(playBoj)
    }
    return {
      types,
      url,
      play_list,
      play_music,
      index
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  margin-top: 30px;
  display: flex;
  .title_name {
    font-size: 12px;
    color: #666;
    margin-left: 15px;
  }
  .title_name_color {
    color: #333 !important;
    font-weight: 700;
  }
  .weekData {
    text-align: right;
    flex: 1;
    span {
      font-size: 14px;
      color: #7a8a9c;
      &:nth-child(1) {
        padding-right: 5px;
        border-right: 1px solid #999999;
      }
      &:nth-child(2) {
        padding-left: 5px;
      }
    }
  }
}
.ranking_list {
  margin-top: 10px;
  border: 1px solid #e2e2e2;
  border-top: 1px solid #c20c0c;
  ul {
    padding-left: 10px;
    li {
      cursor: default;
      display: flex;
      justify-content: space-between;
      height: 28px;
      &:nth-child(2n) {
        background-color: #f7f7f7;
      }
      &:hover {
        background-color: #eeeeee;
      }
      .l {
        display: flex;
        width: 70%;
        .index {
          width: 15px;
        }
        .music_name {
          margin-left: 10px;
          .name {
            font-size: 12px;
            font-weight: 700;
            &:hover {
              text-decoration: underline;
            }
          }
          .singer {
            font-size: 12px;
            color: #aeaeae;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .r {
        width: 30%;
        background-color: rgba(#4eb4f5, 0.1);

        span {
          margin-left: 10px;
          font-size: 12px;
          text-align: left;
          color: #333;
        }
      }
    }
  }
}
// 鼠标变手的样式
.curs_pointer {
  cursor: pointer;
}
.curs_txt {
  cursor: text;
}
</style>