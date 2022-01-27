<template>
  <div class="artist_name">
    <h2 class="name">{{ sdiner_data.names }}</h2>
    <h3 class="alias">{{ sdiner_data.alias }}</h3>
  </div>
  <div class="img">
    <img :src="sdiner_data.cover_img + '?param=640y300'" alt="" />
    <div class="tabs">
      <ul class="tabs_list">
        <li
          @click="tabsClick(index)"
          :class="{ active: route.path == item.p }"
          v-for="(item, index) in tab_list"
        >
          <a href="javascript:;">
            <em>{{ item.t }}</em></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { artistDetail, getSingeAlbum } from '../../../network/artist'
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: "ArtistImg",
  emits: ['tabsClick'],
  setup (props, { emit }) {
    const route = useRoute()
    let currIndex = ref(0)
    const tabsClick = (index) => {
      emit('tabsClick', index)
    }
    // 歌手数据
    let sdiner_data = reactive({
      names: '',
      alias: '',
      cover_img: ''
    })
    // 歌手详情
    const getSinerDetail = async () => {
      let { data } = await artistDetail(route.query.id);
      sdiner_data.names = data.artist.name;
      sdiner_data.cover_img = data.artist.cover;

      // 歌手别名
      let { artist } = await getSingeAlbum({ id: route.query.id });
      sdiner_data.alias = artist.alias[0]
    }
    onMounted(() => {
      getSinerDetail()
    })
    return {
      tab_list: ref([{
        t: '热门作品',
        p: '/artist/hot'
      }, {
        t: '所有专辑',
        p: '/artist/album'
      }, {
        t: '相关MV',
        p: '/artist/mv'
      }, {
        t: '艺人介绍',
        p: '/artist/desc'
      }]),
      currIndex,
      tabsClick,
      sdiner_data,
      route
    }
  }
}
</script>

<style scoped lang='scss'>
.artist_name {
  display: flex;
  .name {
    max-width: 100%;
    height: 34px;
    line-height: 24px;
    font-weight: normal;
    font-size: 24px;
    color: #333;
  }
  .alias {
    max-width: 23%;
    padding-left: 10px;
    font-size: 14px;
    line-height: 32px;
    color: #999;
    font-weight: normal;
  }
}
.img {
  display: flex;
  flex-direction: column-reverse;
  height: 350px;
  position: relative;
  img {
    position: absolute;
    display: block;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 300px;
  }
  .tabs {
    height: 48px;
    .tabs_list {
      display: flex;
      height: 48px;
      background-color: #f8f8f8;
      border: 1px solid #ccc;
      border-width: 0 1px;
      background-position: 0 0;
      background-repeat: repeat-x;

      li {
        border-bottom: 2px solid #ccc;
        width: 137px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        &:hover {
          border-top: 2px solid #d13030;
        }
      }
      a {
        padding-left: 2px;
      }
      em {
        height: 37px;
        width: 134px;
        padding: 2px 2px 0 0;
        line-height: 37px;
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
.active {
  border-top: 2px solid #d13030;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: none !important;
}
</style>