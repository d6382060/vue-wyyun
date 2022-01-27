<template>
  <div class="topList">
    <div class="L-title">
      <top-list-item
        ref="topListRes"
        @reTopList="reTopList"
        :list="topListData.featuresList"
        title="云音乐特色榜"
      />
      <top-list-item
        ref="topListRes"
        @reTopList="reTopList"
        :list="topListData.globalList"
        title="全球媒体榜"
      />
    </div>
    <div class="R-info">
      <top-list-hader
        @rolling="rolling"
        :playlist="TopListDetailData.playlist"
      />
      <div class="song_list">
        <song-list
          :size="songNum"
          @playsong="playsong"
          :hotsongs="TopListDetailData.playlist.tracks"
        >
          <template v-slot:playnum
            >播放：<strong>{{ TopListDetailData.playlist.playCount }}</strong
            >次</template
          >
        </song-list>
        <!-- 评论 -->
        <comment
          ref="commentRef"
          @giveaLike="giveaLike"
          @replyCommentContent="replyCommentContent"
          @commentContent="commentContent"
          :playId="ids"
          :commentType="2"
          @Page="Page"
          :songCommentData="songCommentData"
        />
      </div>
    </div>
    <play-bar :url="url" ref="ply_num" :play_list="play_list" />
  </div>
</template>

<script>
import { animate } from '@/utils/animate'
import { playlistComment } from '@/network/comment'
import playBar from '../../components/common/play-bar/playBar.vue'
import SongList from '../../components/common/song_list/SongList.vue'
import TopListHader from './ChildComps/toplist/TopListHader.vue'
import TopListItem from './ChildComps/toplist/TopListItem'
import { topList, topListdetail } from '@/network/home'
import { ref, reactive, watch } from 'vue'
import { onMounted, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Comment from '../../components/common/comment/comment.vue'
export default {
  name: "DiscovertopList",
  components: {
    TopListItem,
    TopListHader,
    SongList,
    playBar,
    Comment
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // 排行榜数据
    let topListData = reactive({
      featuresList: [], // 云音乐特色榜
      globalList: [], // 全球媒体榜
    })
    // 获取全部榜单
    const topListInit = async () => {
      let { list } = await topList();
      topListData.featuresList = list.slice(0, 4)
      topListData.globalList = list.slice(4)
    }
    //获取歌单详情数据
    const TopListDetailData = reactive({
      playlist: {}, // 详细信息
      privileges: [], // 歌曲列表
      tracks: [], // 歌曲
      updatetime: '' // 更新时间
    })
    //获取歌单详情
    const getTopListDetail = async (id) => {
      let res = await topListdetail(id)
      TopListDetailData.playlist = res.playlist
      TopListDetailData.privileges = res.privileges
      TopListDetailData.tracks = res.playlist.tracks

    }
    // 歌曲数量
    let songNum = computed(() => {
      return TopListDetailData.tracks.length
    })
    // 点击列表更新页面
    const reTopList = (id) => {
      songCommentPrams.id = id
      getTopListDetail(id)
      getSongCommentData()
      ids.value = id
      router.push({ path: "/discover/toplist", query: { id } })
    }
    let ids = ref(route.query.id || 19723756)
    // 单曲播放
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    // 播放
    const playsong = (row, Clickindex) => {
      store.dispatch('getSongUrls', row)

      if (play_list.value.length === TopListDetailData.tracks.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === row.id) {
          ply_num.value.url_index = index
        }
      });
    }
    // 评论
    // 获取歌曲评论参数 
    let songCommentPrams = reactive({
      id: ids.value,
      limit: 20,
      offset: 0,
    })

    // 歌曲评论数据
    let songCommentData = reactive({
      comments: [], // 评论内容
      total: 0, // 评论数量
      hotComments: [],  // 热门评论
    })
    // 获取歌曲评论
    const getSongCommentData = async () => {
      // 获取歌曲评论
      let { comments, total, hotComments } = await playlistComment(songCommentPrams);
      songCommentData.comments = comments
      songCommentData.total = total
      songCommentData.hotComments = hotComments
      console.log(songCommentData);
    }
    // 切换 页码
    const Page = (currentPage1) => {
      songCommentPrams.offset = (currentPage1 - 1) * 20;
      getSongCommentData()
    }
    // 发送评论
    const commentContent = () => {
      setTimeout(() => {
        getSongCommentData()
      }, 2000);
    }
    // 回复评论
    const replyCommentContent = () => {
      setTimeout(() => {
        getSongCommentData()
      }, 2000);
    }

    // 点赞
    const giveaLike = () => {
      setTimeout(() => {
        getSongCommentData()
      }, 2000);
    }
    // 滚动
    const commentRef = ref(null)
    const rolling = () => {
      animate(window, commentRef.value.$el.offsetTop)
      // window.scrollTo(0, commentRef.value.$el.offsetTop);
    }
    onMounted(async () => {
      getTopListDetail(ids.value)
      topListInit()
      getSongCommentData()


    })
    return {
      rolling,
      giveaLike,
      ids,
      url,
      ply_num,
      play_list,
      topListData,
      TopListDetailData,
      songNum,
      reTopList,
      playsong,
      songCommentData,
      Page,
      commentContent,
      replyCommentContent,
      commentRef

    }
  }
}

</script>

<style scoped lang='scss'>
.topList {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  border: 1px solid #d3d3d3;
  .L-title {
    width: 240px;
    border-right: 1px solid #d3d3d3;
    background-color: #f9f9f9;
  }
  .R-info {
    flex: 1;
    .song_list {
      padding: 40px;

      .title {
        height: 35px;
        display: flex;
        span:nth-child(1) {
          color: #000;
          font-size: 20px;
          line-height: 28px;
        }
        span:nth-child(2) {
          margin: 9px 0 0 20px;
          color: #666;
          font-size: 14px;
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
    }
  }
}
</style>