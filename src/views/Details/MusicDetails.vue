<template>
  <div>
    <el-container>
      <el-header> <tab-nav-bar /></el-header>
      <div class="red">
        <el-row class="row" :gutter="0">
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">推荐</div></el-col
          >
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">排行榜</div></el-col
          >
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">歌单</div></el-col
          >
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">主播电台</div></el-col
          >
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">歌手</div></el-col
          >
          <el-col class="col" :span="3"
            ><div class="grid-content bg-purple">新碟上线</div></el-col
          >
        </el-row>
      </div>
      <el-main>
        <div class="mainBox">
          <!-- 基础信息 -->
          <div class="m-info">
            <div class="g-mn4c">
              <div class="wrap">
                <div class="cover">
                  <img :src="playlist.coverImgUrl" alt="" />
                  <div class="cnt">
                    <h2>{{ playlist.name }}</h2>

                    <div class="infos">
                      <img :src="creator.avatarUrl" alt="" />
                      <a href="javascript:;">{{ creator.nickname }}</a>
                      <span>
                        {{ playlist.createTime + "&nbsp;" + "创建" }}
                      </span>
                    </div>
                    <div class="btnc">
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-video-play"
                        >播放</el-button
                      >
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-folder-add"
                        >({{ playlist.subscribedCount }})</el-button
                      >
                      <el-button size="mini" type="primary" icon="el-icon-link"
                        >({{ playlist.shareCount }})</el-button
                      >
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-download"
                        >下载</el-button
                      >
                      <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-s-comment"
                        >({{ playlist.commentCount }})</el-button
                      >
                    </div>
                    <div>
                      <el-tag v-for="item in tags" :key="item">{{
                        item
                      }}</el-tag>
                    </div>
                    <p class="description">
                      <span> {{ playlist.description }}</span>
                    </p>
                  </div>
                </div>
                <div class="musicList">
                  <span><h2>歌曲列表</h2></span>
                  <span>{{ playlist.trackCount + "首歌" }}</span>
                  <span class="playCount">{{
                    "播放" + playlist.playCount + "次"
                  }}</span>
                  <el-table :data="tracks" stripe style="width: 100%">
                    <el-table-column prop="date" type="index" width="65">
                    </el-table-column>
                    <el-table-column prop="name" label="歌曲标题" width="180">
                      <template v-slot:default="{ row }">
                        <i
                          @click="playMusic(row)"
                          class="el-icon-video-play plays"
                        ></i>
                        <span>{{ row.name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="时长" width="60">
                    </el-table-column>
                    <el-table-column prop="ar[0].name" label="歌手">
                    </el-table-column>
                    <el-table-column prop="al.name" label="专辑">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="playQ">
                  <audio :src="URL.url" autoplay="autoplay" controls="controls">
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <!-- 评论 -->
                <el-row>
                  <el-col>
                    <div class="demo-basic--circle">
                      <div class="block">
                        <el-avatar
                          class="avatarImg"
                          shape="square"
                          :size="50"
                          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                        ></el-avatar>

                        <input
                          class="textInput"
                          placeholder="评论"
                          type="text"
                        />
                        <el-button size="mini" type="primary">评论</el-button>
                      </div>
                    </div>
                  </el-col>
                  <el-row class="pd">
                    <el-col class="commentInfo" v-for="item in comment">
                      <el-avatar
                        class="avatarImg"
                        shape="square"
                        :size="50"
                        :src="item.user.avatarUrl"
                      ></el-avatar>
                      <span
                        ><a href="javascript:;"
                          >{{ item.user.nickname }}： &nbsp;
                        </a></span
                      >
                      <span>{{ item.content }}</span>
                    </el-col>
                  </el-row>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { getPlaylistDetails } from '../../network/home'
import { getMusciUrl, getComment } from '../../network/Details'
import { showDate } from '../../components/common/utils'
import TabNavBar from '../../components/content/navBar/TabNavBar.vue'
import { computed, ref, reactive, onMounted } from 'vue'




export default {
  components: { TabNavBar },
  name: 'MusicDetails',
  setup () {
    let route = useRoute()
    const showDates = computed(() => {
      return showDate(musicList.playlist.createTime)
    })


    // 歌单详情
    // 歌单详情数据
    const playlist = ref({})
    // 歌单创建者信息
    const creator = ref({})
    // 标签
    const tags = ref([])
    // 非完整的歌曲列表
    const tracks = ref([])
    // 歌手信息
    const arName = ref([])

    console.log(arName.value);
    let Id = route.params.id
    console.log(Id);
    const init = () => {
      getPlaylistDetails(Id).then(res => {
        playlist.value = res.playlist
        creator.value = res.playlist.creator
        tags.value = res.playlist.tags
        tracks.value = res.playlist.tracks

        // console.log(playlist.value);

      })
    }
    // 点击播放
    //音乐的ID
    const musicId = ref('')
    // 获取音乐的URL
    const URL = ref({})
    const playMusic = (row) => {
      let { id: id } = row
      // console.log('获取ID');
      // console.log(id);
      musicId.value = id
      getMusciUrl(musicId.value).then(res => {
        // console.log(res);
        res.data.forEach(item => {
          //  console.log(item);
          URL.value = item
        });
      })
      init()
      console.log(musicId.value);
      // console.log(URL.value.url);
    }
    // 评论
    //评论信息
    const comment = ref([])
    // 用户信息
    const commentUserInfo = ref({})
    const getComments = () => {
      getComment(Id).then((res) => {
        console.log(res);
        comment.value = res.comments
        commentUserInfo.value = res.comments.user
      })
    }
    //   console.log(commentUserInfo.value);

    onMounted(() => {
      init()
      getComments()
    })
    return {
      playlist,
      commentUserInfo,
      comment,
      creator,
      URL,
      tags,
      tracks,
      playMusic

    }


  }
}
</script>

<style scoped lang='scss'>
.el-header {
  background-color: #242424;
  height: 70px;
}
.el-main {
  height: 100vh;
}
.el-footer {
  background-color: pink;
}
.red {
  cursor: pointer;
  color: #fff;
  height: 34px;
  background-color: #c20c0c;
  text-align: center;
}
.el-carousel {
  position: relative;
  left: 50%;
  width: 730px;
  transform: translateX(-50%);
}
.el-main {
  padding-top: 0;
}
.el-card {
  margin-top: -26px;
}
.card-header {
  a {
    padding-left: 5px;
    margin: 10px;
    text-align: center;
    border-left: 1px solid red;
  }
}

.image {
  width: 140px;
  text-align: center;
  cursor: pointer;
}
.el-col-offset-2 {
  margin-left: 0;
}
.m-info {
  margin-top: 35px;
  margin-left: 35px;
  width: 640px;
  height: 255px;
}
.cover {
  display: flex;
  img {
    height: 208px;
    width: 208px;
  }
}
.mainBox {
  margin: 0 auto;
  width: 1200px;
  height: 100vh;
}
.g-mn4c {
  height: 1200px;
  width: 710px;
  margin-right: 271px;
}
.wrap {
  height: 1200px;
  width: 710px;
  padding: 47px 30px 40px 39px;
}
.cnt {
  width: 100%;
  .infos {
    height: 70px;
    display: flex;
    img {
      margin: 15px;
    }
    span {
      color: #999;
      font-size: 14px;
      text-align: center;
      line-height: 70px;
    }
    a {
      margin-right: 15px;
      font-size: 14px;
      text-align: center;
      line-height: 70px;
    }
  }
  h2 {
    margin-left: 15px;
  }
}
.infos {
  img {
    width: 35px;
    height: 35px;
  }
}
.el-tag {
  margin: 15px 0 15px 15px;
}
.btnc {
  width: 435px;
  .el-button {
    margin-left: 5px;
  }
}
.description {
  margin-left: 15px;
  span {
    line-height: 25px;
  }
}
.musicList {
  span {
    font-size: 14px;
    h2 {
      margin-right: 15px;
      display: inline-block;
    }
  }
}
.playCount {
  position: relative;
  left: 360px;
}
.playQ {
  margin-top: 45px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  audio {
    width: 100%;
  }
}
.plays {
  cursor: pointer;
}
.el-col {
  border-top: 2px solid red;
}
.textInput {
  margin: 0 10px 10px 10px;
  width: 80%;
  height: 63px;
}
.pd {
  padding-bottom: 65px;
  .commentInfo {
    margin-top: 10px;
    a {
      font-size: 14px;
    }
  }
}
</style>