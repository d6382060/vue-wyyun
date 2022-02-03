<template>
  <div class="Main">
    <div class="Main_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutMain"
}
</script>

<style scoped lang='scss'>
.Main {
  width: 800px;
  border-right: 1px solid #d3d3d3;
  .Main_content {
    padding: 47px 30px 40px 39px;
  }
}
</style>