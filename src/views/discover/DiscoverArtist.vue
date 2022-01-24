<template>
  <div class="artist">
    <div class="L_box">
      <div class="artist-type-list">
        <singer-cat-nav ref="singerRef" @catnavClick="catnavClick" />
      </div>
    </div>
    <div class="artist-list">
      <hot-artist
        ref="hotRef"
        @load="load"
        @torzClick="torzClick"
        @initiaClick="initiaClick"
        :titleName="titleName"
        :rmSinger="artistDaata.rmSinger"
        :rzartist="artistDaata.rzSinger"
      />
    </div>
  </div>
</template>

<script>
import { artistList } from '@/network/discover'
import SingerCatNav from './ChildComps/artist/SingerCatNav.vue'
import { reactive, onMounted, ref, watch } from 'vue'
import HotArtist from './ChildComps/artist/HotArtist.vue'
export default {
  components: { SingerCatNav, HotArtist },
  name: "DiscoverArtist",
  setup (props) {

    // 歌手分类列表 参数
    let artistListPrams = reactive({
      limit: 30,
      offset: 0,
      initial: '',
      type: -1,
      area: -1
    })

    // 歌手数据
    let artistDaata = reactive({
      rzSinger: [], // 入驻歌手
      rmSinger: [] // 热门歌手
    })
    // 请求 歌手分类
    const getArtistList = async () => {
      // accountId 字段 可用来判断是否为入驻
      let res = await artistList(artistListPrams);
      if (titleName.value == '推荐歌手' || titleName.value == '入驻歌手') {
        artistDaata.rmSinger = res.artists
        artistDaata.rzSinger.push(...res.artists.filter(item => {
          return item.accountId
        }))
        res.code == 200 ? isload.value = false : true
      } else {
        artistDaata.rzSinger = res.artists

      }

    }
    let titleName = ref('推荐歌手')
    const catnavClick = (type, area, v) => {
      if (v == '入驻歌手') {
        artistListPrams.limit = 50
      } else {
        artistListPrams.limit = 30
      }
      titleName.value = v
      artistListPrams.type = type
      artistListPrams.area = area
      getArtistList()
    }
    // 按字母查询
    const initiaClick = (item) => {
      artistListPrams.initial = item == '热门' ? -1 : item == '其他' ? 0 : item
      getArtistList()
    }
    // 更多
    const singerRef = ref(null)
    const torzClick = (v) => {
      singerRef.value.activetype = v
      titleName.value = v
      artistListPrams.limit = 50
      getArtistList()
    }

    // 加载
    const hotRef = ref(null)
    let isload = ref(true)
    /// 页码
    let page = ref(1)
    //到底加载
    const load = () => {
      if (titleName.value !== '入驻歌手') return
      hotRef.value.loading = isload.value
      page.value++
      artistListPrams.offset = (page.value - 1) * 5
      getArtistList()
    }
    onMounted(() => {
      getArtistList()
    })

    return {
      singerRef,
      catnavClick,
      artistDaata,
      titleName,
      initiaClick,
      torzClick,
      load,
      hotRef
    }
  }
}
</script>

<style scoped lang='scss'>
.artist {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  display: flex;
  .L_box {
    background-color: #f9f9f9;
    border-right: 1px solid #d3d3d3;
    .artist-type-list {
      width: 180px;
      padding: 0 10px 40px;
      margin-top: 51px;
    }
  }

  .artist-list {
    padding: 40px;
    flex: 1;
  }
}
</style> 