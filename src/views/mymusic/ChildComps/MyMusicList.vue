<template>
  <el-scrollbar wrap-style="height:831px;padding-bottom:55px">
    <div class="mml">
      <h2 :class="{ bg: route.path === '/my/music/artist' }" class="f-h2">
        <a href="/my/music/artist">我的歌手({{ artistCount }})</a>
      </h2>
      <h2 :class="{ bg: route.path === '/my/music/mv' }" class="f-h2">
        <a href="/my/music/mv">我的视频({{ mvCount + 1 }})</a>
      </h2>
      <!-- 创建的歌单 -->
      <div class="create">
        <h2 @click="isshowCreateList = !isshowCreateList" class="title">
          <span>
            <i v-show="!isshowCreateList" class="iconfont icon-youjiantou"></i>
            <i v-show="isshowCreateList" class="iconfont icon-xiajiantou"></i>

            创建的歌单({{ createdPlaylistCount }})
          </span>
        </h2>
        <ul v-show="isshowCreateList" class="list">
          <li
            @click="toplaylist(item.id)"
            v-for="(item, index) in create"
            :key="item.id"
            :class="{ bg: item.id == currentId }"
            class="item"
          >
            <div class="img">
              <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
            </div>
            <div class="des">
              <p class="n">{{ item.name }}</p>
              <p class="t">{{ item.trackCount }}首</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 收藏的歌单 -->
      <div class="create">
        <h2 @click="isShowlikeList = !isShowlikeList" class="title">
          <span>
            <i v-show="!isShowlikeList" class="iconfont icon-youjiantou"></i>
            <i v-show="isShowlikeList" class="iconfont icon-xiajiantou"></i>

            收藏的歌单({{ subPlaylistCount }})
          </span>
        </h2>
        <ul v-show="isShowlikeList" class="list">
          <li
            @click="toplaylist(item.id)"
            v-for="(item, index) in like"
            :key="item.id"
            :class="{ bg: item.id == currentId }"
            class="item"
          >
            <div class="img">
              <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
            </div>
            <div class="des">
              <p class="n">{{ item.name }}</p>
              <p class="t">{{ item.trackCount }}首</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { getuserPlaylist } from "@/network/user"
import { getsubcount } from '@/network/user'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: "MyMusicList",
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    // 获取用户ID
    let userId = ref(JSON.parse(window.sessionStorage.getItem("userInfo")))
    let currentId = ref(route.query.id)
    // 获取 获取用户信息 , 歌单，收藏，mv, dj 数量
    let countData = reactive({
      artistCount: 0, // 我喜欢的歌手数量
      createdPlaylistCount: 0, // 创建的歌单数量
      subPlaylistCount: 0, // 收藏的歌单数量
      mvCount: 0
    })
    const getCount = async () => {
      let { artistCount, createdPlaylistCount, subPlaylistCount, mvCount } = await getsubcount();
      countData.artistCount = artistCount;
      countData.createdPlaylistCount = createdPlaylistCount;
      countData.subPlaylistCount = subPlaylistCount
      countData.mvCount = mvCount

      let res = await getuserPlaylist({ uid: userId.value.userId })
      if (res.code === 200) {
        userplayData.create = res.playlist.slice(0, countData.createdPlaylistCount);
        userplayData.like = res.playlist.slice(countData.createdPlaylistCount)
      }
      console.log(userplayData.like);
    }
    // 用户歌单
    let userplayData = reactive({
      create: [],
      like: []
    })
    const toplaylist = (id) => {
      currentId.value = id
      router.push({ path: '/my/music/playlist', query: { id } })
    }
    onMounted(() => {
      getCount()
    })
    return {
      isshowCreateList: ref(true),
      isShowlikeList: ref(false),
      ...toRefs(countData),
      ...toRefs(userplayData),
      currentId,
      route,
      toplaylist



    }
  }
}
</script>

<style scoped lang='scss'>
.mml {
  padding-top: 40px;
  .f-h2 {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    a {
      padding: 0 5px 2px 35px;
      color: #000;
    }
    &:hover {
      cursor: pointer;
      background-color: #eeeeee;
    }
  }
  .create {
    .title {
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
    }
    &:hover {
      cursor: pointer;
    }
    .list {
      .item {
        &:hover {
          background-color: #eeeeee;
        }
        gap: 10px;
        display: flex;
        height: 54px;
        padding: 6px 0 6px 20px;
        .img {
          img {
            width: 40px;
            height: 40px;
          }
        }
        .des {
          flex: 1;
          font-size: 14px;
          .n {
            color: #000;
            height: 21px;
          }
          .t {
            color: #999;
            height: 20px;
          }
        }
      }
    }
  }
}
.bg {
  background-color: #eeeeee;
}
</style>