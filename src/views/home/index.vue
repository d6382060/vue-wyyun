<template>
  <div>
    <home-nav />
    <sub-nav />
  </div>
  <router-view />
</template>

<script>
import HomeNav from './ChildComps/HomeNav.vue'
import SubNav from './ChildComps/SubNav.vue'
export default {
  components: { HomeNav, SubNav, },

}
</script>

<style>
</style>