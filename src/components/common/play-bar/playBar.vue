<template>
  <div class="audio">
    <div class="play-audio">
      <audio autoplay controls :src="url">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  </div>
</template>

<script>

export default {
  name: 'playBar',
  props: {
    url: String,
  }

}
</script>

<style scoped lang='scss'>
.play-audio {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  audio {
    width: 100%;
  }
}
</style>