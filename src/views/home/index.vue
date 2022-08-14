<template>

<div v-if="openPage" class="open-ainma">
<div class="open-text" @click="open">
 开启音乐之旅
</div>
</div>



<div v-show="!openPage" class="animate__animated animate__fadeInDownBig">


<div >
  <home-nav />
  <sub-nav />
</div >
  <router-view/>

</div>
</template>

<script>
import HomeNav from './ChildComps/HomeNav.vue'
import SubNav from './ChildComps/SubNav.vue'
import {ref} from 'vue'
export default {
  components: { HomeNav, SubNav, },
setup(){
    let openPage = ref(true)
    const open = ()=>{
      console.log()
      openPage.value = !openPage.value
    }

    return{
      open,
      openPage
    }
}

}
</script>

<style scoped lang="scss">
.open-ainma{
  background-size: 100% 100%;
  background-image: url("../../assets/img/preview.jpg");
  position: fixed;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
  .open-text{
    position: absolute;
    bottom: 100px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 40px;
    color: #fff;
    text-shadow:
        0 0 10px #0ebeff,
        0 0 20px #0ebeff,
        0 0 50px #0ebeff,
        0 0 100px #0ebeff,
        0 0 200px #0ebeff
  }


}
</style>