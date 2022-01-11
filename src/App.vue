<template>
  <router-view />
</template>
<script>
import { logout } from './network/home'
export default {
  setup (props) {

    // 获取token
    const get_token = sessionStorage.getItem('token');
    if (!get_token) {
      logout().then(res => {
        console.log(res);
      })
    }

    return {

    }
  }
}
</script>
<style>
@import "../src/assets/css/base.css";
</style>
