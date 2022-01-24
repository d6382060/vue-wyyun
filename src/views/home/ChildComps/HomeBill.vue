<template>
  <div class="home-bill">
    <div class="bill">
      <div class="pai">
        <img
          src="	https://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100"
          alt=""
        />
        <span title="飙升榜">飙升榜</span>
      </div>
      <ul>
        <li v-for="(item, index) in allList.soaring_list" :key="item.id">
          <a @click="toSong(item.id)" :title="item.name" href="javascript:;"
            >{{ index + 1 }}.{{ item.name }}</a
          >
        </li>
      </ul>
      <span @click="LookAtAll(19723756)" class="all">查看全部></span>
    </div>
    <div class="bill">
      <div class="pai">
        <img
          src="https://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100"
          alt=""
        />
        <span title="新歌榜">新歌榜</span>
      </div>
      <ul>
        <li v-for="(item, index) in allList.newsong_list" :key="item.id">
          <a @click="toSong(item.id)" :title="item.name" href="javascript:;"
            >{{ index + 1 }}.{{ item.name }}</a
          >
        </li>
      </ul>
      <span @click="LookAtAll(3779629)" class="all">查看全部></span>
    </div>
    <div class="bill">
      <div class="pai">
        <img
          src="https://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100"
          alt=""
        />
        <span title="原创榜"> 原创榜</span>
      </div>
      <ul>
        <li v-for="(item, index) in allList.original_list" :key="item.id">
          <a @click="toSong(item.id)" :title="item.name" href="javascript:;"
            >{{ index + 1 }}.{{ item.name }}</a
          >
        </li>
      </ul>
      <span @click="LookAtAll(2884035)" class="all">查看全部></span>
    </div>
  </div>
</template>

<script>
import { topList, topListdetail } from '../../../network/home';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'HomeBill',
  setup () {
    const router = useRouter()
    let allList = reactive({
      original_list: [], // 原创榜
      soaring_list: [], // 飙升榜
      newsong_list: [] // 新歌榜
    });
    const topLists = ref([])
    const getTopList = async () => {
      let { list } = await topList();
      list.forEach(item => {
        switch (item.name) {
          case '原创榜':
            topLists.value.push(item)
            break;
          case '飙升榜':
            topLists.value.push(item)
            break;
          case '新歌榜':
            topLists.value.push(item)
            break;
          default:
            break;
        }
      });

      topLists.value.forEach(item => {
        topListdetail(item.id).then(res => {
          let id = { playlist: res.playlist }
          switch (id.playlist.name) {
            case '原创榜':
              allList.original_list = id.playlist.tracks.splice(0, 10)
              break;
            case '飙升榜':

              allList.soaring_list = id.playlist.tracks.splice(0, 10)
              break;
            case '新歌榜':
              allList.newsong_list = id.playlist.tracks.splice(0, 10)
              break;

            default:
              break;
          }

        })
      })


    }
    const toSong = (id) => {
      router.push({ path: "/song", query: { id } })
    }
    getTopList()

    const LookAtAll = (id) => {
      router.push({ path: "/discover/toplist", query: { id } })

    }
    return {
      allList,
      toSong,
      LookAtAll
    }

  }
}
</script>

<style scoped lang='scss'>
.home-bill {
  display: flex;
  padding: 30px;

  justify-content: space-between;
  .bill:nth-last-child(1) {
    border-right: 1px solid #d2d2d2;
  }
  .bill {
    border: 1px solid #d2d2d2;
    border-right: none;
    .pai {
      background-color: #f4f4f4;
      position: relative;
      padding: 10px;
      display: block;
      width: 230px;
      height: 120px;
      span {
        position: absolute;
        left: 50%;
        right: 0;
        top: 50px;
      }
      span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
a:hover {
  text-decoration: underline;
}

li {
  width: 100%;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  font-size: 14px;
  a {
    margin-left: 15px;
  }
}
li:nth-child(odd) {
  background-color: #f4f4f4;
}
.all {
  font-size: 14px;
  position: relative;
  right: 0;
  left: 160px;
}
.all:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>