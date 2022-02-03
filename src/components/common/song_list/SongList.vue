<template>
  <div class="title">
    <span>歌曲列表</span>
    <span>{{ size }}首歌</span>
    <slot name="sort"></slot>
    <div>
      <slot name="playnum"></slot>
    </div>
  </div>
  <div class="song_list_com">
    <ul>
      <li v-for="(item, index) in hotsongs" class="list_item">
        <span class="item_index">{{ item.serialNum || index + 1 }}</span>
        <i @click="playsong(item, index)" class="iconfont icon-bofang1"></i>
        <div class="item_name">
          <i title="VIP歌曲" v-if="item.fee == 1" class="iconfont icon-vip"></i>
          <a @click="toSong(item.id)" href="javascript:;">{{ item.name }} </a>
          <span
            :title="item.alia ? item.alia[0] : ''"
            class="alia ovf"
            v-show="item.alia && item.alia.length > 0 ? true : false"
            >-{{ item.alia ? item.alia[0] : "" }}</span
          >
          <a
            title="播放MV"
            class="iconfont icon-MV"
            v-if="item.mv && item.mv !== 0"
            @click="toMv(item.mv, item.st)"
            href="javascript:;"
          ></a>
        </div>

        <!-- 专辑 -->
        <a v-if="isalbum" class="item_album" href="javascript:;">{{
          item.al.name
        }}</a>

        <!-- 歌手 -->
        <a @click="toArtist" class="item_singer" href="javascript:;"
          ><span :data-id="item.ar && item.ar[0].id">{{
            item.ar && item.ar[0].name
          }}</span
          ><span :data-id="item.ar && item.ar[1] ? item.ar[1].id : ''">{{
            item.ar && item.ar[1] ? "/ " + item.ar[1].name : ""
          }}</span>
        </a>
      </li>
    </ul>
    <div v-if="hotsongs.length == 0">暂无歌曲!!</div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
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
    isalbum: Boolean,
    size: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const route = useRoute()
    const router = useRouter();
    const playsong = (row, index) => {
      if (row.fee === 4) {
        ElMessage({
          message: '此专辑为数字专辑，请前往网易云购买',
          type: 'warning',
        })
        return
      }
      if (row.st === -1) {
        ElMessage({
          message: '由于版权保护，您所在的地区暂时无法使用。',
          type: 'warning',
        })
        return
      }
      emit('playsong', row, index)
    }
    // 跳转单曲详情
    const toSong = (id) => {
      if (route.path === '/djradio') {
        router.push({ path: '/program', query: { id } })

      } else {
        router.push({ path: '/song', query: { id } })

      }

    }
    // 跳转歌手页面
    const toArtist = (e) => {
      let id = e.target.dataset.id
      router.push({ path: '/artist', query: { id } })
    }

    // 跳转mv页面 
    const toMv = (mvid, st) => {
      if (st === -1) {
        ElMessage({
          message: '由于版权保护，您所在的地区暂时无法使用。',
          type: 'warning',
        })
        return
      }
      router.push({ path: '/mv', query: { id: mvid } })
    }
    return {
      toMv,
      playsong,
      toSong,
      toArtist
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  margin-top: 25px;
  height: 35px;
  display: flex;
  span:nth-child(1) {
    color: #000;
    font-size: 20px;
    line-height: 28px;
    width: 150px;
  }
  span:nth-child(2) {
    margin: 8px 0 0 20px;
    color: #666;
    font-size: 14px;
    width: 150px;
  }
  div {
    font-size: 14px;
    flex: 1;
    text-align: right;
    margin: 9px 0 0 20px;
    strong {
      color: #c20c0c;
    }
  }
}
.song_list_com {
  margin-top: 10px;
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
      display: flex;
      gap: 10px;
      a:hover {
        text-decoration: underline;
      }
      .icon-vip {
        font-size: 20px;
        color: #eccf64;
      }
      .alia {
        width: 170px;
        color: #3333;
        &:hover {
          cursor: text;
        }
      }
      .icon-MV {
        color: #c54646;
        font-size: 18px;
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