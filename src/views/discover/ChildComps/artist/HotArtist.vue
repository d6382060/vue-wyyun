<template>
  <div>
    <div class="rz_singer">
      <h3>{{ titleName == "推荐歌手" ? "入驻歌手" : titleName }}</h3>
      <a @click="torzClick" v-if="titleName == '推荐歌手'" href="javascript:;"
        >更多 ></a
      >
    </div>
    <ul
      v-if="titleName !== '推荐歌手' && titleName !== '入驻歌手'"
      class="initial"
    >
      <li
        @click="initiaClick(index, item)"
        :class="{ active: index == currIndex }"
        :key="index"
        v-for="(item, index) in initialSelector"
      >
        <a href="javascript:;">{{ item }}</a>
      </li>
    </ul>
    <div>
      <ul v-infinite-scroll="load" class="list">
        <li v-for="(item, index) in rzartist" :key="item.id" class="item">
          <div class="img">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <a class="msk" :href="'/artist?id=' + item.id"></a>
          </div>
          <p>
            <a class="ovf" :href="'/artist?id=' + item.id">{{ item.name }}</a>
            <a
              v-if="item.accountId"
              class="grzx"
              :href="'/user/home?id=' + item.accountId"
            >
              <i title="个人中心" class="iconfont icon-wode"></i
            ></a>
          </p>
        </li>
      </ul>
      <div v-loading="loading"></div>
    </div>
  </div>
  <div v-if="titleName == '推荐歌手'" class="re">
    <div class="rz_singer">
      <h3>热门歌手</h3>
    </div>
    <div>
      <ul class="list">
        <li v-for="(item, index) in rmSinger.slice(0, 10)" class="item">
          <div class="img">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <a class="msk" :href="'/artist?id=' + item.id"></a>
          </div>
          <p>
            <a class="ovf" :href="'/artist?id=' + item.id">{{ item.name }}</a>
            <a
              v-if="item.accountId"
              class="grzx"
              :href="'/user/home?id=' + item.accountId"
            >
              <i title="个人中心" class="iconfont icon-wode"></i
            ></a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
  name: "HotArtist",
  props: {
    rzartist: {
      type: Array,
    },
    rmSinger: {
      type: Array,
      defalut () {
        return []
      }
    },
    titleName: String
  },
  emits: ['initiaClick', 'torzClick', 'load'],
  setup (props, { emit }) {

    const initialSelector = ref(['热门', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S',
      'T', 'U', 'V', 'W', 'X', 'Y',
      'Z', '其他'])


    let currIndex = ref(0)
    const initiaClick = (index, item) => {
      currIndex.value = index
      emit('initiaClick', item)
    }

    const torzClick = () => {
      emit('torzClick', '入驻歌手')
    }
    let loading = ref(false)
    const load = () => {
      emit('load')
    }
    return {
      loading,
      initialSelector,
      currIndex,
      initiaClick,
      torzClick,
      load
    }
  }
}
</script>

<style scoped lang='scss'>
.rz_singer {
  display: flex;
  padding-bottom: 5px;
  border-bottom: 2px solid #c20c0c;
  color: #333;
  h3 {
    font-size: 24px;
    font-weight: normal;
  }
  a {
    font-size: 12px;
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
    &:hover {
      text-decoration: underline;
    }
  }
}
.list {
  display: flex;
  margin-top: 25px;
  flex-wrap: wrap;
  .item {
    margin-bottom: 25px;
    width: 20%;
    height: 170px;
    .img {
      width: 130px;
      height: 130px;
      .msk {
        width: 130px;
        height: 130px;
        display: inline-block;
        position: relative;
        top: -139px;
      }
    }
  }
  p {
    display: flex;
    height: 25px;
    width: 140px;
    margin-top: 8px;
    font-size: 13px;
    a {
      display: inline-block;
      width: 90px;
      &:hover {
        text-decoration: underline;
      }
    }
    .grzx {
      position: relative;
      right: -35px;
    }
  }
}
.initial {
  .active {
    background-color: #c20c0c;

    a {
      color: #fff;
    }
  }
  color: #000;
  font-size: 14px;
  height: 25px;
  margin-top: 25px;
  display: flex;
  gap: 5px;
  text-align: center;
  li {
    width: 20px;
    &:nth-child(1) {
      width: 45px !important;
    }
    &:last-child {
      width: 45px !important;
    }
  }
}
</style>