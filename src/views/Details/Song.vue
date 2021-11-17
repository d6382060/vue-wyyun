<template>
  <div>
    <tab-nav-bar @opstion="opstion" />
    <el-card class="box-card">
      <table class="musicTable">
        <tr>
          <td>序号</td>
          <td>封面</td>
          <td>歌名</td>
          <td>歌手</td>
          <td>所属专辑</td>
          <td>播放</td>
        </tr>
        <tr v-for="(item, index) in musciList">
          <th>{{ index + 1 }}</th>
          <th><img :src="item.al.picUrl" alt="" /></th>
          <th>
            <span>{{ item.name }}</span>
          </th>
          <th>
            <span>{{ item.ar[0].name }}</span>
          </th>
          <th>
            <span>{{ item.al.name }}</span>
          </th>
          <th>
            <el-button class="btn" @click="playMusic(index, item.id)" round
              >播放</el-button
            >
          </th>
        </tr>
      </table>
      <div class="playQ">
        <audio
          class="audios"
          :src="url"
          autoplay="autoplay"
          controls="controls"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </el-card>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { searchMusic, getMusciUrl } from '../../network/Details'
import TabNavBar from '../../components/content/navBar/TabNavBar.vue'
export default {
  components: { TabNavBar },
  name: 'Song',
  setup () {
    const route = useRoute()
    let musicName = route.params.name
    const musciList = ref([])
    let ss = reactive({
      limit: 30,
      offset: 0
    })

    // 歌曲总数
    let total = ref(0)
    // id
    let Id = ref([])
    const init = () => {
      searchMusic(musicName, ss).then(res => {
        console.log(res);
        musciList.value = res.result.songs
        total.value = res.result.songCount
        musciList.value.forEach(item => {
          Id.value.push(item.id)
        })

      })
    }


    onMounted(() => {
      init()


    })



    //每页条数
    const handleSizeChange = (value) => {
      ss.limit = value
      init()
    }
    // 分页
    const page = computed(() => {
      return (currentPage4.value - 1) * ss.limit
    })

    // 当前页数
    let currentPage4 = ref(1)
    // 页码
    const handleCurrentChange = (value) => {
      console.log(value);
      currentPage4.value = value
      ss.offset = page.value
      console.log(page.value);
      init()
    }
    // 歌曲的URL
    let url = ref('')
    // 点击的Id
    let oldId = ref(0)
    const playMusic = (index, id) => {
      btn.value = index
      oldId.value = id
      getMusciUrl(id).then(res => {
        console.log(res);
        res.data.forEach(item => {
          url.value = item.url
        })
      })
      console.log(url.value);
    }

    const opstion = (value) => {
      musicName = value
      init()
    }



    return {
      musciList,
      playMusic,
      opstion,
      url,
      handleSizeChange,
      currentPage4,
      handleCurrentChange,
      total,
    }
  }
}
</script>

<style scoped lang='scss'>
img {
  width: 45px;
}
.musicTable {
  td {
    text-align: center;
  }
  th {
    font-weight: 400;
  }
}
.playQ {
  audio {
    width: 100%;
  }
}
</style>