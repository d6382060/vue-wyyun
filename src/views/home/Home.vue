<template>
  <div class="common-layou">
    <el-container>
      <el-header> <tab-nav-bar /> </el-header>
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
        <!-- 轮播 -->
        <el-carousel arrow="always" indicator-position="outside">
          <el-carousel-item v-for="item in bannerImg" :key="item">
            <img :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
        <!-- 卡片 -->
        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <template #header>
            <div class="card-header">
              <span>热门推荐</span>
              <el-button class="button" type="text">
                <a href="">华语</a>
              </el-button>
              <el-button class="button" type="text">
                <a href="">流行</a>
              </el-button>
              <el-button class="button" type="text">
                <a href="">摇滚</a>
              </el-button>
              <el-button class="button" type="text">
                <a href="">民谣</a>
              </el-button>
              <el-button class="button" type="text">
                <a href="">电子</a>
              </el-button>
              <el-button type="text"> 更多 </el-button>
            </div>
          </template>
          <div>
            <el-row>
              <el-col
                @click="PlaylistDetails(o)"
                class="imgBox"
                :span="5"
                v-for="(o, index) in musicList"
                :key="o"
                :offset="index > 0 ? 2 : 0"
              >
                <img :src="o.picUrl" class="image" />
                <div style="padding: 0px">
                  <span class="names"
                    ><a href="javascript:;">{{ o.name }}</a></span
                  >
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="newCd">
            <div class="title">新碟上架</div>
            <div>
              <el-row>
                <el-col
                  @click="jumpAlbum(o)"
                  class="imgBox"
                  :span="5"
                  v-for="(o, index) in newCdlist"
                  :key="o"
                  :offset="index > 0 ? 2 : 0"
                >
                  <img :src="o.blurPicUrl" class="image" />
                  <div style="padding: 0px">
                    <span class="names"
                      ><a href="javascript:;">{{ o.name }}</a></span
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import store from '../../store/index'
import { getNewCd, getMusicList, getmusic, getBannerImg } from '../../network/home'
import TabNavBar from '../../components/content/navBar/TabNavBar.vue'
import { onMounted, ref, reactive } from '@vue/runtime-core'
export default {
  components: { TabNavBar },
  name: 'Home',
  setup () {
    const router = useRouter()
    let name = ref('')
    let musicName = ref({})
    const getMusciName = () => {
      getmusic(name.value).then(res => {
        // console.log(res);
      })
    }
    const dianji = () => {
      name.value = store.state.musciNmae
      getMusciName()
      console.log(store.state.musciNmae);
    }
    // 轮播图
    const bannerImg = ref([])
    const banner = () => {
      getBannerImg().then(res => {
        bannerImg.value = res.banners
      })
    }

    // 推荐歌单
    // 歌单数据
    let musicList = ref([])
    getMusicList().then(res => {
      // console.log(res);
      musicList.value = res.result
    })
    // 点击进入歌单详情
    const PlaylistDetails = (o) => {
      console.log(o.id);
      router.push({ path: `/playlist/${o.id}` })
    }

    //新碟上架 数据
    const newCdlist = ref([])
    getNewCd().then(res => {
      let weekDatas = res.weekData.slice(0, 10)
      newCdlist.value = weekDatas
      console.log(weekDatas);
    })
    // 点击跳转
    const jumpAlbum = (o) => {
      console.log(o);
      router.push({ path: `/album/${o.id}` })
    }

    onMounted(() => {
      getMusciName()
      banner()

    })

    return {
      musicName,
      jumpAlbum,
      dianji,
      PlaylistDetails,
      newCdlist,
      bannerImg,
      musicList
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
  background-color: skyblue;
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
// .el-col {
//   line-height: 34px;
// }
// .el-col:hover {
//   border-radius: 15px;
//   background-color: #a40011;
// }
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
  // margin-left: 28px;
}
.el-col-offset-2 {
  margin-left: 0;
}
.newCd {
  margin-top: 85px;
  .title {
    margin-bottom: 10px;
    margin-left: 25px;
  }
}
</style>