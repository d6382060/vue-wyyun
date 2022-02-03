<template>
  <div class="mv_box">
    <div class="mv_L">
      <div class="mvl_content">
        <div class="title">
          <h2 class="ovf">
            <i class="iconfont icon-MV"></i>
            {{ mvDetailData.name }}
          </h2>
          <div class="singer">
            <a :href="'/artist?id=' + mvDetailData.artistId">{{
              mvDetailData.artistName
            }}</a>
          </div>
        </div>
        <video-play :poster="mvDetailData.cover" :videourl="mvUrldata" />
        <div class="btn">
          <el-button size="mini" round>点赞({{ mvInfo.likedCount }})</el-button>
          <el-button size="mini" round
            >收藏({{ mvDetailData.subCount }})</el-button
          >
        </div>
        <!-- 评论 -->
        <comment
          :playId="mvId"
          :commentType="1"
          @Page="Page"
          :songCommentData="songCommentData"
        />
      </div>
    </div>
    <div class="mv_R">
      <div class="mvr_content">
        <h3 class="introduce">
          <span>mv简介</span>
        </h3>
        <div class="mvintr">
          <p>发布时间：{{ mvInfo.publishTime }}</p>
          <p>播放次数：{{ like(mvInfo.playCount) }}</p>
        </div>
        <mv-recommended :mvs="mvs" />
      </div>
    </div>
  </div>
</template>

<script>
import { mvComment } from '@/network/comment'
import { mvUrl, detailmv, mvDetailInfo, mvSimi } from '@/network/mv'
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted, provide } from '@vue/runtime-core'
import VideoPlay from '../../components/common/VideoPlay/VideoPlay.vue'
import Comment from '../../components/common/comment/comment.vue'
import MvRecommended from './ChildComp/MvRecommended.vue'
export default {
  components: { VideoPlay, Comment, MvRecommended },
  name: 'mv',
  setup (props) {
    // 解析数量
    function like (num) {
      let str = (num / 10000).toFixed(0) + '万';
      return str
    }
    const route = useRoute()
    // mv id
    let mvId = ref(route.query.id)
    // mv 详情 数据
    let mvDetailData = ref([])
    // 初始化mv 详情数据
    const initMvDetail = async () => {
      let res = await detailmv(mvId.value);
      if (res.code == 200) {
        mvDetailData.value = res.data
        mvInfo.playCount = res.data.playCount;
        mvInfo.publishTime = res.data.publishTime
      }
    }
    // 获取 mv 点赞转发评论数数据
    let mvInfo = reactive({
      commentCount: 0,// 评论数量
      likedCount: 0, // 点赞熟数量
      playCount: 0, // 播放数量
      publishTime: '' // 发布时间
    })
    const getMvDetail = async () => {
      let res = await mvDetailInfo(mvId.value);
      mvInfo.commentCount = res.commentCount;
      mvInfo.likedCount = res.likedCount;
    }
    // 请求数据
    let mvUrlParams = reactive({
      id: mvId.value,
    })
    // mv url 数据
    let mvUrldata = ref('')
    // mv url
    const getmvUrl = async () => {
      let res = await mvUrl(mvUrlParams)

      mvUrldata.value = res.data.url

    }
    // 获取mv 评论
    //mv评论参数
    let mvCommentParams = reactive({
      id: mvId.value,
      limit: 35,
      offset: 0
    })
    // 评论数据
    let songCommentData = reactive({
      comments: [], // 评论内容
      total: 0, // 评论数量
      hotComments: [],  // 热门评论
    })
    // 请求
    const getMvComment = async () => {
      let { code, comments, hotComments, total } = await mvComment(mvCommentParams);
      if (code == 200) {
        songCommentData.comments = comments;
        songCommentData.total = total;
        songCommentData.hotComments = hotComments

      }
    }
    // provide 数据给 评论组件 
    provide('updataComment', getMvComment)
    // 切换 页码
    const Page = (currentPage1) => {
      songCommentPrams.offset = (currentPage1 - 1) * 20;
      getMvComment()
    }
    let mvs = ref([])
    // 相似MV
    const getSimiMv = async () => {
      let res = await mvSimi(mvId.value);
      mvs.value = res.mvs

    }
    onMounted(() => {
      initMvDetail()
      getmvUrl()
      getMvDetail()
      getMvComment()
      getSimiMv()
    })
    return {
      mvId,
      Page,
      mvDetailData,
      mvUrldata,
      mvInfo,
      songCommentData,
      like,
      mvs

    }
  }
}
</script>

<style scoped lang='scss'>
.mv_box {
  display: flex;
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  .mv_L {
    flex: 1;
    border-right: 1px solid #d3d3d3;
    width: 500px;
    .mvl_content {
      padding: 20px 40px 40px 30px;
      .title {
        color: #000;
        h2 {
          width: 720px;
          font-weight: normal;
          font-size: 24px;
          line-height: 32px;
          .icon-MV {
            color: red;
            font-size: 25px;
          }
        }
        .singer {
          font-size: 13px;
          margin-top: 10px;
          a {
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .btn {
        margin-top: 25px;
      }
    }
  }
  .mv_R {
    width: 300px;
    .mvr_content {
      padding: 20px 40px 40px 30px;
      .introduce {
        font-weight: normal;
        color: #000;
        font-size: 14px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
      }
      .mvintr {
        padding-bottom: 34px;
        p {
          line-height: 18px;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>