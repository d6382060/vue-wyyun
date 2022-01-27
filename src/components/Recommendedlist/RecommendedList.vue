<template>
  <div class="SongHavePlaylist">
    <div class="title">
      <h4>{{ title }}</h4>
      <a @click="emit('toartistalbum')" href="javascript:;">全部</a>
    </div>
    <div class="list">
      <div v-for="(item, index) in hotAlbums" :key="item.id" class="item">
        <div class="img">
          <img :src="item.blurPicUrl + '?param=50y50'" alt="" />
        </div>
        <div class="des">
          <div @click="toplaylistdetail(item.id)" class="playlist_name ovf">
            {{ item.name }}
          </div>
          <div v-if="isShow" class="singer_time ovf">
            {{ dateInit(item.publishTime) }}
          </div>
          <div v-else @click="tohome()" class="singer_name ovf">
            {{ item.artist.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateInit } from "@/utils/playsong"
export default {
  name: 'RecommendedList',
  props: {
    title: {
      type: String,
      default: '包含这首歌的歌单'
    },
    isShow: {
      type: Boolean,
      default: true
    },
    hotAlbums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: ['toplaylistdetail', 'toartistalbum'],
  setup (props, { emit }) {
    const toplaylistdetail = (id) => {
      emit('toplaylistdetail', id)
    }

    return {
      emit,
      dateInit,
      toplaylistdetail
    }
  }
}
</script>

<style scoped lang='scss'>
.SongHavePlaylist {
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #666;
    a {
      font-size: 12px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .list {
    margin-top: 20px;
    .item {
      padding-bottom: 15px;
      display: flex;
      .des {
        padding: 5px 0 5px 15px;
        flex: 1;
        .playlist_name {
          font-size: 14px;
          width: 204px;
          height: 14px;
          margin-bottom: 10px;
          color: #333;
          &:hover {
            cursor: pointer;
          }
        }
        .singer_name {
          font-size: 12px;
          width: 204px;
          height: 12px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .singer_time {
          font-size: 12px;
          width: 204px;
          height: 12px;
          cursor: text;
        }
      }
    }
  }
}
</style>