<template>
  <div class="aside">
    <div class="aside_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutAside"
}
</script>

<style scoped lang='scss'>
.aside {
  flex: 1;
  .aside_content {
    padding: 20px 40px 40px 30px;
  }
}
</style>