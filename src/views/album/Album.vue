<template>
  <div class="album">
    <div class="album_L">
      <list-info
        :commNum="commentData.total"
        @allplay="allplay"
        tag="专辑"
        :detail="albumData.album"
      >
        <template v-slot:userImg> 歌手： </template>
        <template v-slot:inittime
          >发行时间：{{ dateInit(albumData.album.publishTime) }}</template
        >
        <template v-slot:company>
          发行公司：{{ albumData.album.company }}
        </template>
      </list-info>
      <el-alert title="已过滤不能播放的歌曲" type="success" :closable="false">
      </el-alert>
      <song-list
        :size="albumData.size"
        @playsong="playsong"
        :hotsongs="albumData.songs"
      />
      <comment
        @commentContent="commentContent"
        @replyCommentContent="replyCommentContent"
        :commentType="3"
        @page="page"
        :songCommentData="commentData"
      />
    </div>
    <div class="album_R">
      <div class="pd_R">
        <recommended-list
          @toartistalbum="toartistalbum"
          @toplaylistdetail="toplaylistdetail"
          :hotAlbums="albumData.hotAlbums"
          title="Ta的其他热门专辑"
        />
      </div>
    </div>
  </div>
  <play-bar :url="url" ref="ply_num" :play_list="play_list" />
</template>

<script>
import { dateInit } from "@/utils/playsong"
import { albumComment } from "@/network/comment";
import { albumContent, singerAlbum } from "@/network/album"
import ListInfo from '../../components/common/listInfo/ListInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import SongList from '../../components/common/song_list/SongList.vue'
import PlayBar from '../../components/common/play-bar/playBar.vue'
import Comment from '../../components/common/comment/comment.vue'
import RecommendedList from '../../components/Recommendedlist/RecommendedList.vue';
export default {
  components: { ListInfo, SongList, PlayBar, Comment, RecommendedList },
  name: 'Album',
  setup (props) {
    const store = useStore()
    // 获取专辑id
    const route = useRoute()
    const router = useRouter()
    // 专辑ID
    let albumId = ref(route.query.id)
    // 专辑内容数据
    let albumData = reactive({
      album: {}, // 专辑信息
      songs: [], // 专辑歌曲列表
      size: 0,// 歌曲数量
      singer_id: '',// 歌手id
      hotAlbums: [] //ta 的其他专辑
    })
    // 获取专辑内容
    const getAlbumContent = async () => {
      let { album, songs, code } = await albumContent(albumId.value)
      if (code == 200) {
        albumData.album = album
        albumData.songs = songs.filter(item => {
          return item.privilege.chargeInfoList.length !== 0
        })
        console.log(albumData.album);
      }
      albumData.size = albumData.songs.length
      albumData.singer_id = album.artist.id
      // ta 的其他专辑
      let res = await singerAlbum(albumData.singer_id)
      if (res.code == 200) {
        albumData.hotAlbums = res.hotAlbums
      }
    }

    // 评论参数
    let commentParams = reactive({
      id: albumId.value,
      limit: 35,
      offset: 0
    })
    // 评论数据
    const commentData = reactive({
      total: 0, // 评论数量
      hotComments: [],// 精彩评论
      comments: [] // 最新评论
    })
    // 专辑评论信息
    const getalbumComment = async () => {
      let { total, hotComments, comments, code } = await albumComment(commentParams);
      if (code == 200) {
        commentData.total = total;
        commentData.hotComments = hotComments;
        commentData.comments = comments
      }
    }
    // 翻页
    const page = (indexpage) => {
      commentParams.offset = (indexpage - 1) * 35;
      getalbumComment()
    }

    // 评论
    const commentContent = () => {
      setTimeout(() => {
        getalbumComment()
      }, 1000);
    }
    // 回复
    const replyCommentContent = () => {
      setTimeout(() => {
        getalbumComment()
      }, 1000);
    }
    // 单曲播放
    const ply_num = ref(null)
    let url = ref(store.state.play_list);
    let play_list = ref(store.state.list);
    // 播放
    const playsong = (row, Clickindex) => {
      store.dispatch('getSongUrls', row)

      if (play_list.value.length === albumData.songs.length) {
        ply_num.value.url_index = Clickindex
      }

      play_list.value.some((item, index) => {
        if (item.row_id === row.id) {
          ply_num.value.url_index = index
        }
      });
    }
    // 全部播放
    const allplay = () => {
      store.dispatch('getSongUrls', albumData.songs)
    }

    // 其他专辑
    const toplaylistdetail = (id) => {
      router.replace({ path: '/album', query: { id } })
      commentParams.id = id
      albumId.value = id
      getAlbumContent()
      getalbumComment()
    }

    // 跳转歌手专辑页面
    const toartistalbum = () => {
      router.replace({ path: '/artist/album', query: { id: albumData.singer_id } })
    }
    onMounted(() => {
      getAlbumContent()
      getalbumComment()
    })
    return {
      toartistalbum,
      dateInit,
      albumData,
      playsong,
      url,
      ply_num,
      play_list,
      allplay,
      page,
      commentData,
      replyCommentContent,
      commentContent,
      toplaylistdetail
    }
  }
}
</script>

<style scoped lang='scss'>
.album {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid red;

  display: flex;
  .album_L {
    width: 70%;
    padding: 47px 30px 40px 39px;
  }
  .album_R {
    flex: 1;
    border-left: 1px solid red;
    .pd_R {
      padding: 20px 40px 40px 30px;
    }
  }
}
</style>