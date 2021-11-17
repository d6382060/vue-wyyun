<template>
  <div class="search">
    <el-popover placement="bottom" :width="400" trigger="click">
      <template #reference>
        <el-input
          class="search-inp"
          slot="reference"
          placeholder="请输入歌名、歌词、歌手或专辑"
          v-model="keyVal"
          @input="getListHandle"
          clearable
        >
        </el-input>
      </template>
      <div v-if="!keyVal" class="search-key-list">
        <div class="hot">
          <h2>热门搜索</h2>
          <ul>
            <li class="hot-list" :key="index" v-for="(item, index) in hotMusic">
              <span class="hot-index">{{ index + 1 }}.</span
              ><span>{{ item.searchWord }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="search-delite">
        <div class="delite-a">
          <h4 class="delite-title">单曲</h4>
          <ul>
            <li v-for="item in musicInfo.single" class="delite-list">
              <a href="javascript:;"
                >{{ item.name }}-{{
                  item.ar.length === 1
                    ? item.ar[0].name
                    : item.ar[0].name + "/" + item.ar[1].name
                }}</a
              >
            </li>
          </ul>
        </div>
        <div class="delite-singer">
          <h4 class="delite-title">歌手</h4>
          <ul>
            <li class="delite-list">
              <a href="javascript:;">
                {{ musicInfo.singer.name }}
              </a>
            </li>
          </ul>
        </div>
        <div class="delite-album">
          <h4 class="delite-title">专辑</h4>
          <ul>
            <li v-for="item in musicInfo.album" class="delite-list">
              <a href="javascript:;">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div class="delite-playlist">
          <h4 class="delite-title">歌单</h4>
          <ul>
            <li v-for="item in musicInfo.playlist" class="delite-list">
              <a href="javascript:;">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { searchHotDetail, serach } from '../../../../network/home'
import { ref, onMounted, reactive } from 'vue'
export default {
  name: 'search',
  setup () {

    let musicInfo = reactive({
      single: [], // 1 单曲
      album: [], // 10专辑
      singer: [],  // 100歌手
      playlist: [] // 1000歌单
    })

    // 热搜歌曲
    const hotMusic = ref()
    searchHotDetail().then(res => {
      console.log(res);
      hotMusic.value = res.data.slice(0, 10)
    })

    // 双向绑定的数据
    const keyVal = ref('')
    // 搜索接口
    const initSearch = async (type) => {
      let res = await serach(keyVal.value, type);
      try {
        switch (type) {
          case 1:
            musicInfo['single'] = res.result.songs.slice(0, 4)
            break;
          case 10:
            musicInfo['album'] = res.result.albums.slice(0, 2)
            break;
          case 100:
            musicInfo['singer'] = res.result.artists[0]
            break;
          case 1000:
            musicInfo['playlist'] = res.result.playlists.slice(0, 2)
            break;

          default:
            break;
        }

      } catch (error) {

      }
    }
    // input 事件
    const getListHandle = () => {
      initSearch(1)
      initSearch(10)
      initSearch(100)
      initSearch(1000)
      if (keyVal.value === '') {
        musicInfo['single'] = [];
        musicInfo['album'] = [];
        musicInfo['singer'] = [];
        musicInfo['playlist'] = [];
      }

    }



    return {
      hotMusic,
      keyVal,
      getListHandle,
      musicInfo
    }
  }
}
</script>

<style lang='scss'>
.search-inp {
  width: 220px;
  input {
    border-radius: 4px 0 0 4px;
  }
}
.el-popover__title {
  font-weight: 700;
}
.el-popper__arrow {
  left: -50%;
  transform: translate(225px, 0px);
}
.el-popper,
.is-light {
  width: auto !important;
}
li {
  height: 28px;
  line-height: 28px;
}
li:hover {
  cursor: pointer;
}

li:nth-child(1) .hot-index {
  font-weight: bold;
  color: red;
}
li:nth-child(2) .hot-index {
  font-weight: bold;
  color: rgba(255, 0, 0, 0.6);
}
li:nth-child(3) .hot-index {
  font-weight: bold;
  color: rgba(255, 0, 0, 0.4);
}
.search-delite {
  .delite-title {
    margin-left: 15px;
    height: 36px;
    line-height: 36px;
  }
  .delite-lis {
    height: 36px;
    line-height: 36px;
  }
  li:hover {
    background-color: #ff641e;
  }
  a:hover {
    color: #ffff;
  }
  a {
    color: #999;
    display: block;
    margin-left: 30px;
  }
}
</style>