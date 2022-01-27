<template>
  <div class="djradio">
    <div class="dj_content">
      <djradio-category />
      <router-view />
    </div>
  </div>
</template>

<script>
import DjradioCategory from './ChildComps/djradio/DjradioCategory.vue'
export default {
  components: { DjradioCategory },
  name: 'DiscoverDjradio'
}
</script>

<style scoped lang='scss'>
.djradio {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  .dj_content {
    padding: 40px;
  }
}
</style>