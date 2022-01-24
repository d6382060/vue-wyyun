<template>
  <div class="user_box">
    <div class="user_info">
      <div class="img">
        <img :src="user_info.avatarUrl" alt="" />
      </div>
      <div class="info">
        <div class="name">
          <span class="user_name">{{ user_info.nickname }}</span>
          <span class="user_lv">Lv.{{ user_info.user_lv }}</span>
          <i
            v-if="user_info.user_gender == 1"
            style="color: skyblue"
            class="user_gender iconfont icon-xingbienan"
          ></i>
          <i
            v-else
            style="color: #ff3ec9"
            class="user_gender iconfont icon-xingbienv"
          ></i>
        </div>
        <div class="subcount">
          <div class="subcount_box">
            <div class="count">{{ user_info.subcount.eventCount }}</div>
            <div class="des">动态</div>
          </div>
          <div class="subcount_box">
            <div class="count">{{ user_info.subcount.follows }}</div>
            <div class="des">关注</div>
          </div>
          <div class="subcount_box">
            <div class="count">{{ user_info.subcount.followeds }}</div>
            <div class="des">粉丝</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="music_ranking.length !== 0" class="music_ranking">
      <music-ranking @types="types" :music_ranking="music_ranking" />
      <div @click="look_all">查看更多</div>
    </div>
    <div class="my_create_playlist">
      <userplaylist
        :list="user_info.createdPlaylist"
        :count="user_info.createdPlaylistCount"
        title="我创建的歌单"
      />
    </div>
    <div v-if="user_info.subPlaylistCount !== 0" class="my_collection_playlist">
      <userplaylist
        :list="user_info.subPlaylist"
        :count="user_info.subPlaylistCount"
        title="我收藏的歌单"
      />
    </div>
  </div>
</template>

<script>
import MusicRanking from './ChildComps/MusicRanking.vue'
import Userplaylist from './ChildComps/Userplaylist.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getaccount, getlevel, getsubcount, getuserPlaylist, getuserRecord } from '../../network/user'
export default {
  components: { MusicRanking, Userplaylist },
  name: "user",
  setup (props) {
    const route = useRoute();
    const router = useRouter()
    // 获取用户ID
    const user_id = ref(route.query.id);
    //用户信息shuju
    let user_info = reactive({
      avatarUrl: '', //头像
      nickname: "",  // 名称
      user_gender: '', // 性别
      user_lv: '', //等级
      subcount: [], // 动态，关注，粉丝
      createdPlaylistCount: 0, //创建的歌单数量
      subPlaylistCount: 0, //收藏的歌单数量
      createdPlaylist: [], //创建的歌单
      subPlaylist: []  // 收藏的歌单
    })
    // 请求参数
    let pramsDATA = reactive({
      uid: user_id.value,
      limit: 0
    })
    // 初始化数据
    const init = async () => {
      //账号信息
      let res = await getaccount(user_id.value);
      console.log(res);
      user_info.subcount = {
        eventCount: res.profile.eventCount,
        follows: res.profile.follows,
        followeds: res.profile.followeds

      }
      user_info.createdPlaylistCount = res.profile.playlistCount
      user_info.avatarUrl = res.profile.avatarUrl;
      user_info.nickname = res.profile.nickname;
      user_info.user_gender = res.profile.gender  // 1：男
      // 等级信息
      user_info.user_lv = res.level;

      // 获取用户歌单
      pramsDATA.limit = user_info.createdPlaylistCount * 2
      let { playlist } = await getuserPlaylist(pramsDATA);
      console.log(playlist);
      // 收藏和创建总数
      user_info.createdPlaylist = playlist.slice(0, user_info.createdPlaylistCount)
      user_info.subPlaylistCount = playlist.length - user_info.createdPlaylist.length
      user_info.subPlaylist = playlist.slice(user_info.createdPlaylistCount)
      console.log(playlist.length - user_info.createdPlaylist.length);
    }

    // music-ranking 组件
    let index = ref(1)
    // 接口参数
    let api_data = reactive({
      uid: route.query.id,
      type: 1
    })
    // my ID
    let myId = JSON.parse(window.sessionStorage.getItem('userInfo'))
    // 听歌排行前 10 首
    let music_ranking = ref([])
    // 获取用户播放记录
    const getUserPlay = async () => {
      let res = await getuserRecord(api_data);
      if (!res) return
      if (index.value == 2) {
        music_ranking.value = res.allData.slice(0, 10)
      } else {
        music_ranking.value = res.weekData.slice(0, 10)
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
    // 查看更多
    const look_all = () => {
      router.push({ path: '/user/songs/rank', query: { id: api_data.uid } })
    }
    onMounted(() => {
      init();
      // if (route.query.id != myId.userId || '') return
      getUserPlay()

    })
    return {
      user_info,
      types,
      music_ranking,
      index,
      look_all
    }
  }
}
</script>

<style scoped lang='scss'>
.user_box {
  width: 1100px;
  margin: 0 auto;
  padding: 40px;
  color: #333;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-top: none;
  .user_info {
    display: flex;
    .img {
      width: 195px;
      height: 195px;
      border: 1px solid #d3d3d3;
      img {
        width: 190px;
        height: 190px;
      }
    }
    .info {
      margin-left: 20px;
      width: 100%;
      .name {
        display: flex;
        padding-bottom: 10px;
        width: 100%;
        border-bottom: 1px solid #dddddd;
        .user_name {
          color: #000;
          margin-top: 3px;
          font-size: 22px;
          font-weight: normal;
          line-height: 30px;
        }
        .user_lv {
          width: 50px;
          text-align: center;
          margin: 0 15px;
          height: 20px;
          border: 1px solid #e23a24;
          border-radius: 15px;
          color: #e23a24;
        }
      }
      .subcount {
        margin-top: 15px;

        display: flex;
        .subcount_box {
          text-align: center;
          padding: 0 20px 0 10px;
          border-right: 1px solid #dddddd;
          .count {
            font-size: 20px;
          }
          .des {
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }
  .music_ranking {
    div {
      font-size: 14px;
      color: #333;
      text-align: right;
      margin-top: 5px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
.user_gender {
  font-size: 25px;
}
</style>