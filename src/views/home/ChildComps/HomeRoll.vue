<template>
  <div class="home-roll">
    <el-scrollbar style="height: 198px">
      <div class="flex-content">
        <div
          v-for="item in newAlbumInfo"
          :key="item"
          class="scrollbar-demo-item"
        >
          <img :title="item.name" :src="item.blurPicUrl" alt="" />
          <p>
            <a :title="item.name" href="javascript:;">{{ item.name }}</a>
          </p>
          <span>{{ item.artist.name }}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { newAlbum } from '../../../network/home'
import { ref } from 'vue'
export default {
  name: 'HomeRoll',
  setup () {
    const newAlbumInfo = ref()
    const getinfo = async () => {
      let { weekData } = await newAlbum()
      newAlbumInfo.value = weekData.slice(0, 10)

    }
    getinfo()


    return {
      newAlbumInfo
    }
  }
}
</script>

<style scoped lang='scss'>
.home-roll {
  height: 180px;
  padding: 30px;
  margin-bottom: 70px;
}
.roll {
  background-color: red;
  height: 180px;
}
.flex-content {
  display: flex;
}
img {
  cursor: pointer;
  width: 100px;
  height: 100px;
}
.el-scrollbar {
  border: 1px solid #eee;
}
.scrollbar-demo-item {
  margin: 45px 25px 0 25px;
}
p {
  font-size: 14px;
  height: 16px;
  overflow: hidden;
  overflow-wrap: inherit;
}
a:hover {
  text-decoration: underline;
}
span {
  font-size: 12px;
}
</style>