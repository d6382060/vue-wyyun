<template>
  <div class="bx">
    <div class="Artist">
      <artist-img ref="img" @tabsClick="tabsClick" />
      <artist-list
        @allplay="allplay"
        :ids="ids"
        ref="hot"
        @playsong="playsong"
        v-show="showIndex == 0"
      />
      <artist-album v-show="showIndex == 1" />
      <artist-mv v-show="showIndex == 2" />
      <artist-desc v-show="showIndex == 3" />
    </div>
    <div class="hotArtist">
      <div class="title">
        <div>热门歌手</div>
      </div>
      <hot-singer />
    </div>
    <play-bar
      @playClick="playClick"
      :url="url"
      ref="ply_num"
      :play_list="play_list"
    />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { defineAsyncComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ArtistImg from './childComps/ArtistImg.vue'
import ArtistList from './childComps/ArtistList.vue'
import ArtistDesc from './childComps/ArtistDesc.vue'
import HotSinger from './childComps/HotSinger.vue'
import PlayBar from '../../components/common/play-bar/playBar.vue'
export default {
  components: {
    ArtistImg, ArtistList, ArtistDesc,
    ArtistAlbum: defineAsyncComponent(() =>
      import('./childComps/ArtistAlbum.vue')
    ),
    ArtistMv: defineAsyncComponent(() =>
      import('./childComps/ArtistMv.vue')
    ),
    HotSinger,
    PlayBar,
  },
  name: "Artist",
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    let showIndex = ref(0)
    const img = ref(null)
    const tabsClick = (index) => {
      showIndex.value = index
      let tabs = 'hot'
      switch (index) {
        case 0:
          tabs = 'hot'
          break;
        case 1:
          tabs = 'album'
          break;
        case 2:
          tabs = 'mv'
          break;
        case 3:
          tabs = 'desc'
          break;
        default:
          break;
      }
      img.value.currIndex = index
      router.push({ name: "Artist", params: { tabs }, query: { id: route.query.id } })
    }
    let ids = ref(0)
    // 播放列表
    const playClick = (id) => {
      hot.value.curr_index = id
      console.log(id);
    }
    // 单曲播放
    const ply_num = ref(null)
    const hot = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const playsong = (row, Clickindex) => {
      store.dispatch('getSongUrls', row)

      if (play_list.value.length === hot.value.hot_songs.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === row.id) {
          ply_num.value.url_index = index
        }
      });
    }

    // 全部播放
    const allplay = () => {
      store.dispatch('getSongUrls', hot.value.hot_songs)
    }
    return {
      tabsClick,
      img,
      showIndex,
      playsong,
      ply_num,
      url,
      play_list,
      hot,
      playClick,
      ids,
      allplay
    }
  }

}
</script>

<style scoped lang='scss'>
.bx {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #eee;
  display: flex;
  .Artist {
    flex: 1;
    padding: 47px 30px 40px 39px;
  }
  .hotArtist {
    border-left: 1px solid #eee;
    padding: 20px 0 40px 0;
    width: 270px;
    .title {
      padding: 0 20px 10px 30px;
      div {
        padding-bottom: 5px;
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>