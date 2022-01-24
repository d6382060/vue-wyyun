<template>
  <div class="table">
    <playlist-table-title @showCityName="showCityName" />
    <playlist-table-list
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :result="result_data"
    />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getTopPlaylist } from "../../network/playlistTable";
import PlaylistTableTitle from './ChildComps/PlaylistTableTitle.vue'
import PlaylistTableList from './ChildComps/PlaylistTableList.vue';
export default {
  name: 'PlaylistTable',
  components: {
    PlaylistTableTitle,
    PlaylistTableList,
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    // 创建请求参数
    const getTopPlaylist_data = reactive({
      order: 'hot',
      cat: route.query.cat,
      limit: 35,
      offset: 0
    })
    // 接收响应数据
    let total = ref()
    let result_data = ref([])
    const TopPlaylist = async () => {
      let res = await getTopPlaylist(getTopPlaylist_data);
      console.log(res);
      if (res.code == 200) {
        result_data.value = res.playlists
        total.value = res.total
      }
    }

    const showCityName = (name) => {
      router.push({ path: '/playlist/table', query: { cat: name } })
      getTopPlaylist_data.cat = name
      TopPlaylist()
    }
    const handleCurrentChange = (index) => {
      console.log(index);
      getTopPlaylist_data.offset = (index - 1) * 35
      TopPlaylist()
    }
    onMounted(() => {
      TopPlaylist()
    })
    return {
      result_data,
      showCityName,
      total,
      handleCurrentChange
    }
  }
}
</script>

<style scoped lang='scss'>
.table {
  width: 1200px;
  margin: 0 auto;
  padding: 20px 25px;
  border: 1px solid #d3d3d3;
}
</style>