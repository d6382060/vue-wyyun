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
              <el-button size="mini" round>播放</el-button>
              <el-button size="mini" round
                >收藏({{ detail.detail_info.subscribedCount }})</el-button
              >
              <el-button size="mini" round>下载</el-button>
              <el-button size="mini" round
                >评论({{ detail.detail_info.commentCount }})</el-button
              >
            </div>
            <div class="tags">
              <span>标签:</span>
              <el-tag v-for="item in detail.detail_tags" type="success">{{
                item
              }}</el-tag>
            </div>
            <div class="album-desc-more">
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
        <play-list-music-list-is-login v-if="islogin" :ids="loginList" />
        <play-list-music-list v-else :tracks="detail.detail_tracks" />

        <!-- 评论 -->
        <play-list-comment :cid="id" />
      </div>
    </div>

    <div class="r">
      <playlist-right />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, reactive } from 'vue';
import { playlistDetail, getSongDetail } from '../../network/playlist'
import PlayListMusicList from './ChildComps/PlayListMusicList.vue';
import PlayListComment from './ChildComps/PlayListComment.vue';
import PlaylistRight from './ChildComps/PlaylistRight.vue';
import PlayListMusicListIsLogin from './ChildComps/PlayListMusicListIsLogin.vue';
export default {
  components: { PlayListMusicList, PlayListComment, PlaylistRight, PlayListMusicListIsLogin },
  name: 'Playlist',
  setup (props) {

    const route = useRoute()
    let id = computed(() => {
      return route.query.id
    })
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
      detail['detail_trackIds'] = res.playlist.trackIds
      detail['detail_info'] = res.playlist
      detail['detail_tags'] = res.playlist.tags
      detail['detail_user'] = res.playlist.creator;
      detail['detail_tracks'] = res.playlist.tracks;
      getLoginMusic(res.playlist.trackIds)
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
      loginList.value = res.songs;


    }

    /// 时间戳转换为日期
    let createTime = computed(() => {
      let time = new Date(1625152129672);
      let year = time.getFullYear();
      let mount = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + mount + '-' + day;
    })
    onMounted(() => {
    })


    // 获取登录状态
    const islogin = ref(window.sessionStorage.getItem('isLogin'))

    return {
      createTime,
      detail,
      id,
      islogin,
      loginList,
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