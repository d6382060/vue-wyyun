<template>
  <div id="sub-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SubNava'
}
</script>

<style scoped>
#sub-bar {
  width: 1100px;
  margin: 0 auto;
  background-color: #c20c0c;
  display: flex;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.2);
}
</style>