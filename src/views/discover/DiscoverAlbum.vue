<template>
  <div class="Discover_album">
    <album-item :AlbumData="AlbumData.newAlbum" title="热门新碟" />
    <album-item :AlbumData="AlbumData.allAlbum" title="全部新碟">
      <template v-slot:tab>
        <ul class="tab">
          <li
            @click="getarea(item.area)"
            v-for="(item, index) in tabArr"
            :key="index"
          >
            <a :class="{ bor: index !== 0 }" href="javascript:;">{{
              item.t
            }}</a>
          </li>
        </ul>
      </template>
    </album-item>
    <el-pagination
      @click="Page"
      :page-size="15"
      layout="prev, pager, next"
      :total="100"
      v-model:currentPage="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { allAlbum, newestAlbum } from '@/network/home'
import { reactive, ref } from '@vue/reactivity'
import AlbumItem from './ChildComps/album/AlbumItem.vue'
import { onMounted } from '@vue/runtime-core'
export default {
  components: { AlbumItem },
  name: 'DiscoverAlbum',
  setup (props) {

    let tabArr = ref([{ t: '全部', area: 'ALL' }, { t: '华语', area: 'ZH' },
    { t: '欧美', area: 'EA' }, { t: '韩国', area: 'KR' }, { t: '日本', area: 'JP' }])
    // 请求参数
    let AlbumParams = reactive({
      limit: 35,
      offset: 0,
      area: 'ALL',
      type: 'hot'
    })
    // 数据
    let AlbumData = reactive({
      newAlbum: [], // 新碟碟片
      allAlbum: [], // 全部碟片

    })

    const initNewAlbum = async () => {
      let { albums } = await newestAlbum()
      AlbumData.newAlbum = albums.slice(0, 10);


    }
    const initAllAlbumAlbum = async () => {
      let { albums } = await allAlbum(AlbumParams)
      AlbumData.allAlbum = albums

    }
    // 当前页码
    let currentPage = ref(1)
    // 切换页码
    const Page = () => {
      AlbumParams.offset = (currentPage.value - 1) * 35
      initAllAlbumAlbum()
    }
    const getarea = (area) => {
      currentPage.value = 1
      AlbumParams.offset = 0
      AlbumParams.area = area
      initAllAlbumAlbum()
      console.log(area);
    }

    onMounted(() => {
      initNewAlbum()
      initAllAlbumAlbum()
    })

    return {
      Page,
      currentPage,
      AlbumData,
      tabArr,
      getarea
    }
  }
}
</script>

<style scoped lang='scss'>
.Discover_album {
  padding: 40px;
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  color: #333;
  .tab {
    display: flex;
    gap: 5px;
    margin-left: 15px;

    li {
      .bor {
        padding-left: 5px;
        border-left: 1px solid #c7d1e0;
      }
      font-size: 13px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>