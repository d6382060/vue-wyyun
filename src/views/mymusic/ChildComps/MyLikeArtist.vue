<template>
  <div class="title">
    <h3>
      <span>我的歌手（{{ count }}）</span>
    </h3>
  </div>
  <div v-for="(item, index) in data" class="item">
    <div class="img">
      <img
        src="http://p1.music.126.net/ycGFxvvwtmi3EiWRgHjyDg==/3438172861925131.jpg?param=80y80"
        alt=""
      />
    </div>
    <div class="cnt">
      <h4 class="tit">
        <a class="name" :href="'#/artist?id=' + item.id">{{ item.name }}</a>
        <span class="f">{{ item.trans }}</span>
      </h4>
      <p class="de">
        {{ item.albumSize }}个专辑&nbsp;&nbsp;&nbsp;&nbsp;{{ item.mvSize }}个MV
      </p>
    </div>
  </div>
</template>

<script>
import { subArtist } from "@/network/artist"
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'MyLikeArtist',
  setup (props) {
    let subArtistData = reactive({
      data: [],
      count: 0
    })
    // 收藏的歌手列表
    const getsubList = async () => {
      let res = await subArtist();
      if (res.code === 200) {
        subArtistData.data = res.data;
        subArtistData.count = res.count
      }
    }
    onMounted(() => {
      getsubList()
    })
    return {
      ...toRefs(subArtistData)
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  h3 {
    color: #000;
    font-size: 24px;
    font-weight: normal;
  }
}
.item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 15px;
  img {
    width: 80px;
    height: 80px;
  }
  .cnt {
    .tit {
      margin: 10px 0;
      .name {
        font-size: 18px;
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
      .f {
        margin-left: 15px;
        color: #999;
        font-size: 13px;
        &:hover {
          cursor: text;
        }
      }
    }
    .de {
      font-size: 14px;
      &:hover {
        cursor: text;
      }
    }
  }
}
</style>