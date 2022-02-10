<template>
  <div class="w">
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang='scss'>
.w {
  height: 70px;
  width: 100%;
  background-color: #242424;
  #tab-bar {
    height: 70px;
  }
}
</style>