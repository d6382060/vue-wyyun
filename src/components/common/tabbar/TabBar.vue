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

<style>
.w {
  height: 70px;
  width: 100%;
  background-color: #242424;
}
</style>