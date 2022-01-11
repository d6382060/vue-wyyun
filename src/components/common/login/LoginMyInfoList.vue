<template>
  <div class="info_box">
    <ul>
      <li @click="touserinfoClick(0)">
        <span> <i class="iconfont icon-wode"></i></span>
        <span class="name">我的主页</span>
      </li>
      <li @click="touserinfoClick(1)">
        <span> <i class="iconfont icon-xiaoxitongzhi"></i></span>
        <span class="name">我的消息</span>
      </li>
      <li @click="touserinfoClick(2)">
        <span> <i class="iconfont icon-dengji"></i></span>
        <span class="name">我的等级</span>
      </li>
      <li @click="touserinfoClick(3)">
        <span> <i class="iconfont icon-tuichu"></i></span>
        <span class="name">退出</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from "vue";
export default {
  name: 'LoginMyInfoList',
  setup (props) {
    const router = useRouter();
    // 获取用信息
    const getuserInfos = ref(JSON.parse(window.sessionStorage.getItem('userInfo')));

    const touserinfoClick = (index) => {
      switch (index) {
        case 0:
          router.push({ path: "/user/home", query: { id: getuserInfos.value.userId } })
          break;
        case 1:
          router.push({ path: "/mas/MsgPrivate" })
          console.log(1);
          break;
        default:
          break;
      }
    }

    return {
      touserinfoClick
    }
  }
}
</script>

<style scoped lang='scss'>
</style>