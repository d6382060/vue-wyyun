<template>
  <div class="bx">
    <div class="left">
      <div class="play-info">
        <div class="detailed">
          <div class="imgs">
            <img :src="detail.detail_info.coverImgUrl" alt="" />
          </div>
          <div class="info">
            <div class="title">
              <i>歌单</i>
              <h3 class="h3-title">{{ detail.detail_info.name }}</h3>
            </div>
            <div class="user-info">
              <div class="user-img">
                <img :src="detail.detail_user.avatarUrl" alt="" />
              </div>
              <div class="name">
                <a href="javascript:;">{{ detail.detail_user.nickname }}</a>
              </div>
              <span class="user-date">{{ createTime }}创建</span>
            </div>
            <div class="btns">
              <el-button @click="allplay" size="mini" round>全部播放</el-button>
              <el-button @click="subList" size="mini" round
                >收藏({{ detail.detail_info.subscribedCount }})</el-button
              >
              <el-button size="mini" round
                >评论({{ detail.detail_info.commentCount }})</el-button
              >
            </div>
            <div v-if="detail.detail_tags.length !== 0" class="tags">
              <span>标签:</span>
              <el-tag v-for="item in detail.detail_tags" type="success">{{
                item
              }}</el-tag>
            </div>
            <div v-if="detail.detail_info.description" class="album-desc-more">
              <b>介绍:</b>
              <div class="detailed-desc">
                <p>
                  {{ detail.detail_info.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 歌曲列表组件 -->
        <play-list-music-list :tracks="detail.detail_tracks" />

        <!-- 评论 -->
        <comment
          :playId="id"
          :commentType="2"
          @Page="Page"
          :songCommentData="songCommentData"
        />
      </div>
    </div>

    <div class="r">
      <playlist-right @replaylist="replaylist" />
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { subPlayList } from "@/network/playlist"
import { playlistComment } from '@/network/comment'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted, reactive, provide } from 'vue';
import { playlistDetail, getSongDetail } from '../../network/playlist'
import PlayListMusicList from './ChildComps/PlayListMusicList.vue';
import PlaylistRight from './ChildComps/PlaylistRight.vue';
import PlayListMusicListIsLogin from './ChildComps/PlayListMusicListIsLogin.vue';
import Comment from '../../components/common/comment/comment.vue';
export default {
  components: { PlayListMusicList, PlaylistRight, PlayListMusicListIsLogin, Comment },
  name: 'Playlist',
  setup (props) {
    // provide 数据给 评论组件 
    provide('updataComment', getSongCommentData)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    let id = ref(route.query.id)
    // 保存数据
    const detail = reactive({
      detail_info: {},
      detail_tags: [],
      detail_user: {},
      detail_tracks: [],

    })


    // 获取歌单详细信息
    const getdetail = async () => {
      let res = await playlistDetail(id.value);
      console.log(res);
      detail['detail_trackIds'] = res.playlist.trackIds
      detail['detail_info'] = res.playlist
      detail['detail_tags'] = res.playlist.tags
      detail['detail_user'] = res.playlist.creator;
      if (islogin) {
        getLoginMusic(res.playlist.trackIds);
      } else {
        detail['detail_tracks'] = res.playlist.tracks;
      }


    }
    getdetail()
    const loginList = ref([])
    // 获取登录后的歌曲
    const getLoginMusic = async (trackIds) => {
      // 数据变为字符串
      let strId = [];
      trackIds.forEach(item => {
        strId.push(item.id)
      })
      let res = await getSongDetail(strId.join(','))
      // console.log(res);
      // loginList.value = res.songs;
      detail['detail_tracks'] = res.songs;


    }

    /// 时间戳转换为日期
    let createTime = computed(() => {
      let time = new Date(1625152129672);
      let year = time.getFullYear();
      let mount = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + mount + '-' + day;
    })

    // 获取歌曲评论参数 
    let songCommentPrams = reactive({
      id: id.value,
      limit: 20,
      offset: 0,
    })

    // 获取评论信息
    const songCommentData = reactive({
      total: 0,
      comments: [],
      hotComments: []
    })
    const getSongCommentData = async () => {
      let { comments, hotComments, total } = await playlistComment(songCommentPrams);
      songCommentData.comments = comments
      songCommentData.hotComments = hotComments
      songCommentData.total = total
    }
    // 切换 页码
    const Page = (currentPage1) => {
      songCommentPrams.offset = (currentPage1 - 1) * 20;
      getSongCommentData()
    }

    onMounted(() => {
      getSongCommentData()
    })


    // 获取登录状态
    const { islogin } = store.getters;
    // 全部播放
    const allplay = () => {
      store.dispatch('getSongUrls', detail['detail_tracks'])
    }

    const replaylist = (ids) => {
      id.value = ids
      router.push({ path: "/playlist/detail", query: { id: ids } })
      getdetail()
      getSongCommentData()
    }
    // 收藏歌单
    const subList = async () => {
      let res = await subPlayList(id.value, 1);
      console.log(res);
      if (!res || res.code !== 200) {
        ElMessage({
          message: "收藏失败",
          type: 'error',
        })
      } else {
        ElMessage({
          message: "收藏成功",
          type: 'success',
        })
      }
    }
    return {
      subList,
      Page,
      songCommentData,
      createTime,
      detail,
      id,
      islogin,
      loginList,
      allplay,
      replaylist
    }
  }
}
</script>

<style scoped lang='scss'>
.bx {
  width: 980px;
  margin: 0 auto;
  display: flex;
  border: 2px solid #eee;
  border-top: none;
}
.left {
  background-color: #fff;
  width: 710px;
  .play-info {
    padding: 47px 30px 40px 39px;
    .detailed {
      display: flex;
      height: 303px;
      .imgs {
        border: 1px solid #d5d5d5;
        width: 215px;
        height: 215px;
        img {
          position: relative;
          top: 2px;
          left: 2px;
          width: 208px;
          height: 208px;
        }
      }
      .info {
        flex: 1;
        margin-left: 20px;
        .title {
          display: flex;
          .h3-title {
            margin-left: 25px;
          }
        }
        .user-info {
          height: 35px;
          display: flex;
          margin-top: 20px;
          .user-img {
            position: relative;
            top: 4px;
            margin-right: 10px;
            width: 25px;
            height: 25px;
            img {
              width: 25px;
              height: 25px;
            }
          }
          .name {
            line-height: 35px;
            margin-right: 10px;
            a {
              font-size: 12px;
              color: #0c73c2;
            }
            a:hover {
              text-decoration: underline;
            }
          }
          .user-date {
            line-height: 35px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
.r {
  border-left: 1px solid #eee;
  width: 270px;
}
.btns {
  margin-top: 25px;
}
.tags {
  height: 25px;
  margin-top: 25px;
  span {
    font-size: 14px;
  }
}
.el-tag {
  height: 25px;
  line-height: 25px;
  margin-left: 10px;
}
.detailed-desc {
  margin-top: 5px;
  width: 160px;
  p {
    line-height: 15px;
    font-size: 12px;
    overflow-wrap: break-word;
  }
}
.album-desc-more {
  margin-top: 15px;
  display: flex;
}
.r {
  padding: 20px 40px 40px 30px;
}
</style>