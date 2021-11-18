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
     <tab-bar-item @mouseout='showInfo = false' v-if="userInfoav && infoImg !=''">
 <template v-slot:item-text>
   <div @mouseover.native="shouwInfo" class="avatarImg" >
     <img :src="userInfoav" alt="">
   </div>
 </template> 
  </tab-bar-item>
    <tab-bar-item v-else @click="login">
 <template v-slot:item-text>
   <div>登录</div>
 </template> 
  </tab-bar-item>

</tab-bar>
<div v-if="showInfo" class="s" >
  <ul >
    <li><i class="iconfont icon-wode"></i><div>我的主页</div></li>
    <li><i class="iconfont icon-xiaoxitongzhi"></i><div>我的消息</div></li>
    <li><i class="iconfont icon-dengji"></i><div>我的等级</div></li>
    <li><i class="iconfont icon-vip"></i><div>vip会员</div></li>
    <li><i class="iconfont icon-gerenshezhi"></i><div>个人设置</div></li>
    <li><i class="iconfont icon-shimingrenzheng"></i><div>实名认证</div></li>
    <li><i class="iconfont icon-tuichu"></i><div>退出</div></li>
 </ul>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import tabBar from '../../../components/common/tabbar/TabBar.vue'
import TabBarItem from '../../../components/common/tabbar/TabBarItem.vue'
import Search from './search/Search.vue'
export default {
  components: { tabBar, TabBarItem, Search },
  props: {
    isName: {
      type: Boolean,
      defalut: true
    },
    logName: String,
    profile: {
      type: Object,
      defalut () {
        return {}
      }
    }
  },
  emits: {
    login: null,
  },
  name: 'TabNavBar',
  setup (props, { emit }) {
    const login = () => {
      emit('login')

    }

    const store = useStore()
    let infoImg = ref(store.state.isCookie)
    // 用户头像
    const userInfoav = ref(sessionStorage.getItem('userImg'))
    // 是否显示信息框
    const showInfo = ref(false)
    // 获得焦点
    const shouwInfo = () => {

      showInfo.value = true

    }

    return {
      login,
      showInfo,
      userInfoav,
      infoImg,
      shouwInfo
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