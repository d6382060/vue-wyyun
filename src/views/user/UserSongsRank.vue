<template>
  <div class="rank">
    <div class="rank_list">
      <music-ranking @types="types" :music_ranking="music_ranking" />
    </div>
  </div>
</template>

<script>
import MusicRanking from './ChildComps/MusicRanking.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getuserRecord } from '../../network/user'
export default {
  components: { MusicRanking },
  name: 'UserSongsRank',
  setup (props) {
    const route = useRoute();
    const router = useRouter()
    // music-ranking 组件
    let index = ref(1)
    // 接口参数
    let api_data = reactive({
      uid: route.query.id,
      type: 1
    })
    // 听歌排行前 10 首
    let music_ranking = ref([])
    // 获取用户播放记录
    const getUserPlay = async () => {
      let res = await getuserRecord(api_data);
      if (index.value == 2) {
        music_ranking.value = res.allData
      } else {
        music_ranking.value = res.weekData
      }
    }
    const types = (e) => {
      index.value = e.target.getAttribute("data-index");
      if (index.value == 1) {
        api_data.type = 1;
        getUserPlay();
      } else {
        api_data.type = 0;
        getUserPlay()
      }

    }
    onMounted(() => {
      getUserPlay()
    })

    return {
      types,
      music_ranking
    }
  }
}
</script>

<style scoped lang='scss'>
.rank {
  width: 1100px;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
  padding: 15px;
  margin-bottom: 50px;
}
</style>