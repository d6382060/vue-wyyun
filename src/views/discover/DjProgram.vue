<template>
  <layout>
    <layout-main>
      <program-heade
        @allplay="allplay"
        :headeInfo="djProgramData.headeInfo"
        tag="电台节目"
      />
<!-- 歌曲列表-->
      <SongList @playsong="playsong" v-if="djProgramData.headeInfo.songs?.length !==0" :size="djProgramData.headeInfo.songs?.length" :hotsongs="djProgramData.headeInfo.songs"/>
      <!-- 评论 -->
      <comment
        ref="commentRef"
        @giveaLike="giveaLike"
        @replyCommentContent="replyCommentContent"
        @commentContent="commentContent"
        :playId="djProgramId"
        :commentType="4"
        @Page="Page"
        :songCommentData="djProgramData"
      />
    </layout-main>
    <layout-aside>
      <aside-list
        @todjradio="toprogram"
        :djData="djProgramData.asideLists"
        title="更多节目"
      >
        <a
          class="all_btn"
          :href="'#/djradio?id=' + djProgramData.headeInfo.radio?.id"
          >全部</a
        >
      </aside-list>
    </layout-aside>
  </layout>
  <play-bar :url="url" ref="ply_num" :play_list="play_list" />
</template>

<script>
import { djComment } from '@/network/comment'
import { djProgramlDetail, programlDj } from '@/network/dj'
import SongList from "../../components/common/song_list/SongList.vue";
import ProgramHeade from './ChildComps/djradio/ProgramHeade.vue'
import AsideList from './ChildComps/djradio/AsideList.vue'
import LayoutAside from '../../components/common/layout/LayoutAside.vue'
import Layout from '../../components/common/layout/Layout.vue'
import LayoutMain from '../../components/common/layout/LayoutMain.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import Comment from '../../components/common/comment/comment.vue'
import PlayBar from '../../components/common/play-bar/playBar.vue'
import { useStore } from 'vuex'
export default {
  components: { Layout, LayoutMain, LayoutAside, ProgramHeade, Comment, PlayBar, AsideList,SongList },
  name: "DjProgram",
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    // 获取 电台节目 ID
    let djProgramId = ref(route.query.id)
    watch(route, () => {
      djProgramId.value = route.query.id
      getdjProgramData()
    })
    // 获取 电台节目 详情数据
    let djProgramData = reactive({
      headeInfo: {},
      comments: [],
      total: 0,  // 评论数量
      asideLists: [] // 更多节目列表

    })
    const getdjProgramData = async () => {
      let { code, program } = await djProgramlDetail(djProgramId.value);
      console.log(program)
      if (code === 200) {
        djProgramData.headeInfo = program
      }
      let res = await programlDj({ rid: program.radio.id, limit: 6 });
      if (res.code === 200) {
        djProgramData.asideLists = res.programs.filter(item => {
          return item.id != djProgramId.value
        })
      }
    }
    // 评论参数
    let djCommentParams = reactive({
      id: djProgramId.value,
      limit: 20,
      offset: 0
    });
    let getDjComment = async () => {
      let res = await djComment(djCommentParams);
      if (res.code === 200) {
        djProgramData.comments = res.comments;
        djProgramData.total = res.total
      }
    }
    // 切换 页码
    const Page = (currentPage1) => {
      djCommentParams.offset = (currentPage1 - 1) * 20;
      getDjComment()
    }
    // 发送评论
    const commentContent = () => {
      setTimeout(() => {
        getDjComment()
      }, 1000);
    }
    // 回复评论
    const replyCommentContent = () => {
      setTimeout(() => {
        getDjComment()
      }, 1000);
    }

    // 点赞
    const giveaLike = () => {
      setTimeout(() => {
        getDjComment()
      }, 1000);
    }

    // 单曲播放
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    const allplay = () => {
      console.log('播放');
      store.dispatch('getSongUrls', djProgramData.headeInfo.mainSong)
    }
    const playsong = (row, Clickindex) => {

      console.log(row);
      store.dispatch('getSongUrls', row)

      if (play_list.value.length === djProgramData.headeInfo.songs.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === row.id) {
          ply_num.value.url_index = index
        }
      });
    }

    const toprogram = (id) => {
      router.replace({ path: "program", query: { id } })
    }
    onMounted(() => {
      getdjProgramData();
      getDjComment()
    })

    return {
      toprogram,
      djProgramData,
      Page,
      commentContent,
      giveaLike,
      djProgramId,
      replyCommentContent,
      allplay,
      playsong,
      url,
      play_list,
      ply_num
    }
  }
}
</script>

<style scoped lang='scss'>
.all_btn {
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
}
</style>