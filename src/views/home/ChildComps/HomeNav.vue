<template>
<tab-bar>
  <tab-bar-item path=/home>
 <template v-slot:item-text>
   <div>发现音乐</div>
 </template>
  </tab-bar-item>
    <tab-bar-item path="/my">
 <template v-slot:item-text>
   <div>我的音乐</div>
 </template>
  </tab-bar-item>
    <tab-bar-item path="/download">
 <template v-slot:item-text>
   <div>下载客户端</div>
 </template>
  </tab-bar-item>
    <tab-bar-item>
 <template v-slot:item-text>
  <search/>
 </template>
  </tab-bar-item>
    <tab-bar-item >
 <template v-slot:item-btn>
<login/>
 </template> 
  </tab-bar-item>                     

</tab-bar>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import tabBar from '../../../components/common/tabbar/TabBar.vue'
import TabBarItem from '../../../components/common/tabbar/TabBarItem.vue'
import Search from './search/Search.vue'
import Login from '../../../components/common/login/Login.vue'

export default {
  components: { tabBar, TabBarItem, Search, Login },
  name: 'TabNavBar',
  setup (props, { emit }) {

    return {
    }
  }
}
</script>

<style scoped lang='scss'>
.s {
  position: absolute;
  width: 160px;
  height: 242px;
  background-color: #2b2b2b;
  border: 1px solid #202020;
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
  z-index: 999;
  right: 85px;
  top: 55px;
  li:nth-last-child(n + 2) {
    border-bottom: 1px solid #202020;
  }
  li:hover {
    background-color: #353535;
    color: #fff;
  }
  li {
    font-size: 12px;
    color: #cccc;
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 34px;
    line-height: 34px;
    i {
      margin-right: 5px;
    }
  }
}
.avatarImg {
  position: relative;
  top: 10px;
  left: 0;
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}
</style>