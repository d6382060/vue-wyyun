<template>
  <div id="home">
    <div class="tab-bar">
      <home-nav
        :profile="profile"
        :logName="logName"
        :isName="isName"
        @login="login"
      />
    </div>
    <sub-nav />
    <!-- 轮播 -->
    <div class="m">
      <div :style="bcimg"></div>
      <home-carousel class="home-car" />
    </div>
    <div class="list">
      <div class="left">
        <home-list title="热门推荐" :item="item" />
        <home-list-item />
        <home-list title="新碟上架" />
        <home-roll />
        <home-list title="榜单" />
        <home-bill />
      </div>
      <div class="right">
        <home-right-item />
      </div>
    </div>
    <div class="home-login">
      <!-- 登录 -->
      <home-login
        @loginClick="loginClick"
        @shutdown="shutdown"
        :theLogin="theLogin"
      />
    </div>
  </div>
</template>

<script>
import HomeCarousel from './ChildComps/HomeCarousel.vue'
import HomeNav from './ChildComps/HomeNav.vue'
import SubNav from './ChildComps/SubNav.vue'
import { ref } from 'vue'
import { phoneLogin } from '../../network/home'
import HomeList from './ChildComps/HomeList.vue'
import HomeListItem from './ChildComps/HomeListItem.vue'
import HomeRoll from './ChildComps/HomeRoll.vue'
import HomeBill from './ChildComps/HomeBill.vue'
import HomeRightItem from './ChildComps/HomeRightItem.vue'
import HomeLogin from './ChildComps/HomeLogin.vue'
export default {
  components: { HomeNav, SubNav, HomeCarousel, HomeList, HomeListItem, HomeRoll, HomeBill, HomeRightItem, HomeLogin },
  name: "Home",
  setup () {
    let bcimg = ref({
      backgroundImage: 'url(https://img2.baidu.com/it/u=1053855357,1766396589&fm=26&fmt=auto)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: ' blur(7px)',
      position: 'absolute',
      top: '105px',
      left: '0px',
      right: '0px',
      height: '300px'

    })

    // 是否弹出
    let theLogin = ref(false)
    // 点击登录弹出登录框
    const login = () => {
      theLogin.value = !theLogin.value
    }
    // 点击关闭
    const shutdown = () => {
      theLogin.value = false
    }


    const item = ref(["华语", "流行", "摇滚", "民谣", "电子"])


    // 登录成功显示昵称
    let logName = ref('')
    let isName = ref(true)
    // 用户信息
    const profile = ref()
    // 点击登录
    const loginClick = (isLoginsuccess, userinfo) => {
      profile.value = userinfo

      if (isLoginsuccess == true) {
        sessionStorage.setItem('userImg', userinfo.profile.avatarUrl)
        theLogin.value = false
        isName.value = false
        console.log('我是父组件的loginClick' + isLoginsuccess);
      } else {
        console.log('失败' + isLoginsuccess);
      }


    }

    return {
      bcimg,
      shutdown,
      profile,
      item,
      login,
      theLogin,
      loginClick,

      isName,
      logName
    }
  }
}
</script>

<style scoped lang='scss'>
.m {
  width: 100%;
  height: 300px;

  // background-color: red;
}
.list {
  display: flex;
  justify-content: space-between;
  width: 1100px;

  margin: 0 auto;
  .left {
    width: 735px;
    border: 1px solid #eee;
    background-color: #fff;
  }
  .right {
    border: 1px solid #eee;
    border-left: none;
    flex: 1;
  }
}
</style>