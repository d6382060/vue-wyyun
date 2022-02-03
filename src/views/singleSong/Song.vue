<template>
  <div class="bx">
    <div class="Artist">
      <div class="content_box">
        <div class="img">
          <img src="" alt="" />
          <div class="w">
            <div :style="{ transform: `rotate(${rotate_img}deg)` }" class="n">
              <img :src="songInfo.picUrl + '?param=130y130'" alt="" />
            </div>
            <div></div>
          </div>
        </div>
        <div class="delit">
          <div class="tit">
            <el-tag key="item.label" class="mx-1" type="success" effect="plain">
              单曲
            </el-tag>
            <div class="song_name">
              <p class="name">
                {{ songInfo.name }}
                <i
                  v-if="songInfo.mvId !== 0"
                  @click="toMv"
                  :style="{ color: isMusicPlay ? '#cfcfcf' : 'red' }"
                  title="播放MV"
                  class="iconfont icon-MV"
                ></i>
              </p>
              <p v-if="songInfo.alia.length !== 0" class="des">
                {{ songInfo.alia[0] }}
              </p>
            </div>
          </div>
          <div class="singer">
            <span>歌手:</span>
            <a href="javascript:;">{{ songInfo.singer }}</a>
          </div>
          <div class="album">
            <span>所属专辑:</span>
            <a href="">{{ songInfo.album }}</a>
          </div>
          <div class="btns">
            <el-button
              :disabled="isMusicPlay"
              @click="playsong"
              size="mini"
              round
              >播放</el-button
            >
            <el-button size="mini" round>收藏</el-button>
            <el-button size="mini" round>下载</el-button>
            <el-button size="mini" round
              >评论({{ songCommentData.total }})</el-button
            >
          </div>
          <div class="lyrics">
            <div :style="{ top: lyricMove + 'px' }" class="content">
              <p
                :class="{
                  activeColor:
                    currentTime + 1 > s[index].time &&
                    currentTime < s[index + 1]?.time,
                }"
                v-for="(item, index) in s"
              >
                {{ item.lyric }}
              </p>
            </div>
            <div v-if="!islyrics" v-for="item in lyrics">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 评论 -->
      <comment
        @commentContent="commentContent"
        @Page="Page"
        :songCommentData="songCommentData"
      />
    </div>

    <div class="hotArtist">
      <song-have-playlist />

      <!-- //相似歌曲 -->
      <similar-song />
    </div>
  </div>
  <play-bar
    @ispause="ispause"
    @onabort="onabort"
    @getTime="getTime"
    :url="url"
    ref="ply_num"
    :play_list="play_list"
  />
</template>

<script>
import { isMusic } from "@/network/home"
import { getSongDetail } from '@/network/playlist'
import { getLyric, getSongComment } from '../../network/singleSong'
import { ref, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import playBar from '../../components/common/play-bar/playBar.vue'
import Comment from '../../components/common/comment/comment.vue'
import SongHavePlaylist from './ChildComps/SongHavePlaylist.vue'
import SimilarSong from '../../components/common/similarSong/SimilarSong.vue'
export default {
  components: { playBar, Comment, SongHavePlaylist, SimilarSong },
  name: 'Song',
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    let music_id = ref(route.query.id)
    // 单曲播放
    const ply_num = ref(null)


    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    let rotate_img = ref(0)
    let timeInterval = ref(null);
    // 获取单曲对象
    let rows = ref()
    function rotate (isRotate) {
      if (isRotate) {
        timeInterval.value = setInterval(() => {
          rotate_img.value++
        }, 50);
      } else {
        clearInterval(timeInterval.value)
      }

    }
    const playsong = () => {
      rotate(true)
      store.dispatch('getSongUrls', rows.value)
    }

    let lyrics = ref([])
    let s = ref([])

    // 歌曲评论 
    let songCommentPrams = reactive({
      id: route.query.id,
      limit: 20,
      offset: 0,
      timestamp: new Date().valueOf() // 当前时间戳
    })


    let islyrics = ref(false)
    // 获取歌词
    const init_getLyric = async () => {
      var pattern = /\d+:\d+.\d+/
      let res = await getLyric(music_id.value);
      lyrics.value = res.lrc.lyric.split('\n')
      lyrics.value.forEach(item => {
        if (item && item.match(pattern)) {
          islyrics.value = true
          s.value.push({
            time: Number(item.match(pattern)[0].split(':')[0] * 60 + parseInt(item.match(pattern)[0].split(':')[1])),
            lyric: item.split(']')[1]
          })
        }

      })
    }
    let currentTime = ref(0)
    // 歌词移动
    let lyricMove = ref(0)
    // 播放时长
    const getTime = (t) => {
      currentTime.value = parseInt(t);
      // 歌词跟随事件滚动
      s.value.forEach((item, index) => {
        if (currentTime.value == item.time) {
          lyricMove.value = -index * 20
        }
      })
    }
    // 歌曲评论数据
    let songCommentData = reactive({
      comments: [], // 评论内容
      total: 0, // 评论数量
      hotComments: []  // 热门评论
    })
    // 获取歌曲评论
    const getSongCommentData = async () => {
      // 获取歌曲评论
      let { comments, total, hotComments } = await getSongComment(songCommentPrams);
      songCommentData.comments = comments
      songCommentData.total = total
      songCommentData.hotComments = hotComments
    }
    // 暂停播放
    const ispause = () => {
      rotate(false)

    }
    let songInfo = reactive({
      alia: [],
      picUrl: "",
      name: '',
      singer: '',
      album: "",
      mvId: 0
    })
    // 获取歌曲信息
    const init_songInfo = async () => {
      let { songs } = await getSongDetail(music_id.value);
      console.log(songs);
      if (songs.length !== 0) {
        rows.value = songs[0]
        songInfo.alia = songs[0].alia
        songInfo.picUrl = songs[0].al.picUrl
        songInfo.name = songs[0].name
        songInfo.singer = songs[0].ar[0].name
        songInfo.album = songs[0].al.name
        songInfo.mvId = songs[0].mv

      }

    }
    // 切换 页码
    const Page = (currentPage1) => {
      songCommentPrams.offset = (currentPage1 - 1) * 20;
      getSongCommentData()
    }
    // 发送评论
    const commentContent = () => {
      getSongCommentData()
      setTimeout(() => {
        songCommentPrams.timestamp = new Date().valueOf()
        getSongCommentData()
      }, 1000);
    }
    init_songInfo()
    let isMusicPlay = ref(false)
    onMounted(() => {
      init_getLyric()
      getSongCommentData()
      isMusic(music_id.value).then(res => {
        if (!res) {
          isMusicPlay.value = true
        }
      })
    })
    const toMv = () => {
      if (isMusicPlay || songInfo.mvId === 0) return
      router.push({ path: '/mv', query: { id: songInfo.mvId } })
    }
    return {
      toMv,
      isMusicPlay,
      rotate_img,
      playsong,
      lyrics,
      s,
      ply_num,
      url,
      play_list,
      currentTime,
      getTime,
      onabort,
      ispause,
      lyricMove,
      songCommentData,
      Page,
      songInfo,
      commentContent,
      islyrics

    }
  }
}
</script>

<style scoped lang='scss'>
a {
  color: #0c73c2;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.bx {
  margin-bottom: 45px;
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #eee;
  display: flex;
  .Artist {
    flex: 1;
    padding: 47px 30px 40px 39px;
    .content_box {
      display: flex;
      .img {
        width: 210px;
        .w {
          border: 5px solid skyblue;
          position: relative;
          width: 205px;
          height: 205px;
          border-radius: 50%;
          .n {
            transform: rotate(0deg);
            position: absolute;
            left: 16%;
            top: 16%;
            width: 130px;
            height: 130px;
            border-radius: 50%;

            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border: 5px solid #333;
              border-radius: 50%;
            }
          }
        }
      }
      .delit {
        padding: 0 25px 0 25px;
        flex: 1;
        .tit {
          height: 32px;
          display: flex;
          .song_name {
            margin-left: 15px;

            .name {
              font-weight: 600;
              color: #333;
              font-size: 20px;
              line-height: 32px;
            }
            .des {
              margin: 1px 0 5px;
              color: #bababa;
              font-size: 14px;
            }
          }
          .icon-MV {
            margin-left: 7px;
            line-height: 30px;
            font-size: 25px;
            color: red;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .singer {
          margin-top: 40px;
          font-size: 14px;
          span {
            color: #999;
            &:hover {
              cursor: text;
            }
          }
        }
        .album {
          margin-top: 10px;
          font-size: 14px;
          span {
            color: #999;
            &:hover {
              cursor: text;
            }
          }
        }
        .btns {
          margin-top: 15px;
        }
        .lyrics {
          height: 330px;
          overflow: hidden;
          position: relative;
          .content {
            transition: all 0.1s;
            top: 0;
            position: absolute;
            p {
              font-size: 14px;
              line-height: 25px;
            }
          }
        }
      }
    }

    .music_deeail {
      flex: 1;
    }
  }
  .hotArtist {
    border-left: 1px solid #eee;
    padding: 20px 40px 40px 30px;
    width: 340px;
  }
}
.activeColor {
  color: red;
  font-size: 20px !important;
}
</style>