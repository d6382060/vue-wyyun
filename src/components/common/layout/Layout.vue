<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "layout"
}
</script>

<style scoped lang='scss'>
.layout {
  width: 1100px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  display: flex;
}
</style>