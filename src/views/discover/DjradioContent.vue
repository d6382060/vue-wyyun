<template>
  <div class="content">
    <div class="L">
      <div class="L_content">
        <djadio-heafer :detail="djData.datas" tag="电台" />
        <song-list
          @playsong="playsong"
          :size="djData.size"
          :hotsongs="djData.songs"
        >
          <template v-slot:sort>
            <div class="sort">
              <el-button @click="sortClick(false)" size="mini" plain
                ><i class="iconfont icon-paixujiangxu"></i></el-button
              ><el-button @click="sortClick(true)" size="mini" plain
                ><i class="iconfont icon-paixushengxu"></i
              ></el-button>
            </div>
          </template>
        </song-list>
      </div>
    </div>
    <div class="R">
      <div class="R_content">
        <aside-list
          title="你可能也喜欢"
          @todjradio="todjradio"
          :djData="djData.hotAlbums"
        />
      </div>
    </div>
  </div>
  <play-bar :url="url" ref="ply_num" :play_list="play_list" />
</template>

<script>
import { detailDj, programlDj, hotDjRadio } from "@/network/dj"
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, reactive, ref, watch } from '@vue/runtime-core'
import DjadioHeafer from './ChildComps/djradio/DjadioHeafer.vue'
import SongList from '../../components/common/song_list/SongList.vue'
import PlayBar from '../../components/common/play-bar/playBar.vue'
import AsideList from './ChildComps/djradio/AsideList.vue'
export default {
  name: 'DjradioContent',
  components: {
    DjadioHeafer,
    SongList,
    PlayBar,
    AsideList
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // 获取 电台id
    let djId = ref(route.query.id);
    watch(route, (o, n) => {
      djId.value = route.query.id
      pramsProgramlDj.rid = route.query.id
      init_dj()
      getProgramlDj()
    })
    // 电台内容数据
    let djData = reactive({
      datas: {}, // 电台信息
      songs: [], // 电台歌曲列表
      size: 0,// 电台歌曲数量
      hotAlbums: [], //你可能也喜欢

    })
    // 请求电台数据
    const init_dj = async () => {
      let { data } = await detailDj(djId.value);
      djData.datas = data

      let res = await hotDjRadio({ cateId: data.categoryId, limit: 5 });
      djData.hotAlbums = res.djRadios
    }
    // 请求参数
    let pramsProgramlDj = reactive({
      limit: 30,
      offset: 0,
      asc: false,
      rid: djId.value
    })
    // 节目列表
    const getProgramlDj = async () => {
      let res = await programlDj(pramsProgramlDj);
      djData.songs = res.programs
      djData.size = res.count

    }

    // 排序
    const sortClick = (asc) => {
      pramsProgramlDj.asc = asc;
      getProgramlDj()
    }

    // 单曲播放
    // 单曲播放
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const playsong = (row) => {
      store.dispatch('getSongUrls', row.mainSong)
    }
    const todjradio = (id) => {
      router.replace({ path: "djradio", query: { id } })

    }
    onMounted(() => {
      init_dj()
      getProgramlDj()

    })
    return {
      djData,
      sortClick,
      playsong,
      ply_num,
      play_list,
      url,
      todjradio
    }
  }
}
</script>

<style scoped lang='scss'>
.content {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  display: flex;
  .L {
    padding: 40px;
    width: 800px;
    border-right: 1px solid #d3d3d3;
    .L_content {
      .sort {
        width: 100%;
        text-align: right;
      }
    }
  }
  .R {
    flex: 1;
    padding: 20px 40px 40px 30px;
  }
}
.avatimg {
  width: 35px;
  height: 35px;
}
</style> 