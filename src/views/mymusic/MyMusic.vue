<template>
  <div class="scroll">
    <layout>
      <layout-aside>
        <my-music-list />
      </layout-aside>

      <layout-main>
        <!-- <my-like-artist /> -->
        <router-view></router-view>
        <!-- <p v-for="item in 300" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p> -->
      </layout-main>
    </layout>
  </div>
</template>

<script>
import MyMusicList from './ChildComps/MyMusicList.vue'
import Layout from '../../components/common/layout/Layout.vue'
import LayoutAside from '../../components/common/layout/LayoutAside.vue'
import LayoutMain from '../../components/common/layout/LayoutMain.vue'
import MyLikeArtist from './ChildComps/MyLikeArtist.vue'
import { provide } from '@vue/runtime-core'
export default {
  components: { Layout, LayoutMain, LayoutAside, MyMusicList, MyLikeArtist },
  name: 'MyMusic',
  setup (props) {

  }
}
</script>

<style scoped lang='scss'>
body {
  overflow-y: hidden;
}
.scroll {
  height: 831px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  .layout {
    border-bottom: none;
    .aside {
      height: 100%;
      width: 300px;
      background-color: #f9f9f9;
      position: fixed;
      .aside_content {
        padding: 0;
        padding-bottom: 54px;
      }
    }
    .Main {
      position: relative;
      left: 300px;
      border-right: none;
      border-left: 1px solid #d3d3d3;
      .Main_content {
        padding-bottom: 54px;
      }
    }
  }
}
</style>