<template>
  <div class="song_list_com">
    <ul>
      <li v-for="(item, index) in hotsongs" class="list_item">
        <span class="item_index">{{ index + 1 }}</span>
        <i @click="playsong(item, index)" class="iconfont icon-bofang1"></i>
        <div class="item_name">
          <a @click="toSong(item.id)" href="javascript:;">{{ item.name }} </a>
          <span class="alia" v-show="item.alia.length > 0 ? true : false"
            >-{{ item.alia[0] }}</span
          >
        </div>
        <!-- 专辑 -->
        <a v-if="isalbum" class="item_album" href="javascript:;">{{
          item.al.name
        }}</a>
        <!-- 歌手 -->
        <a @click="toArtist" class="item_singer" href="javascript:;"
          ><span :data-id="item.ar[0].id">{{ item.ar[0].name }}</span
          ><span :data-id="item.ar[1] ? item.ar[1].id : ''">{{
            item.ar[1] ? "/ " + item.ar[1].name : ""
          }}</span>
        </a>
      </li>
    </ul>
    <div v-if="hotsongs.length == 0">暂无歌曲!!</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: "SongList",
  emits: ['playsong'],
  props: {
    hotsongs: {
      type: Array,
      default () {
        return []
      }
    },
    isalbum: Boolean
  },
  setup (props, { emit }) {
    const router = useRouter();
    const playsong = (row, index) => {
      emit('playsong', row, index)
    }
    // 跳转单曲详情
    const toSong = (id) => {
      router.push({ path: '/song', query: { id } })

    }
    // 跳转歌手页面
    const toArtist = (e) => {
      let id = e.target.dataset.id
      router.push({ path: '/artist', query: { id } })
    }
    return {
      playsong,
      toSong,
      toArtist
    }
  }
}
</script>

<style scoped lang='scss'>
.song_list_com {
  margin-top: 20px;
  border: 1px solid #d5d5d5;
  .list_item {
    &:nth-child(2n) {
      background-color: #f7f7f7;
    }
    font-size: 12px;
    display: flex;
    height: 30px;
    padding: 6px;
    line-height: 18px;
    .item_index {
      width: 50px;
      text-align: center;
      &:hover {
        cursor: text;
      }
    }
    .icon-bofang1 {
      width: 50px;
      text-align: center;
      &:hover {
        color: red;
      }
    }
    .item_name {
      width: 310px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a:hover {
        text-decoration: underline;
      }
      .alia {
        color: #3333;
        &:hover {
          cursor: text;
        }
      }
    }
    .item_album {
      margin-right: 15px;
      flex: 1;
      text-align: right;
      &:hover {
        text-decoration: underline;
      }
    }
    .item_singer {
      margin-right: 15px;
      flex: 1;
      text-align: right;
      span:nth-child(1) {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      span:nth-child(2) {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>