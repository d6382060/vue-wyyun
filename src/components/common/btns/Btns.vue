<template>
  <div class="btn">
    <el-button @click="allplay" size="mini" round>全部播放</el-button>
    <el-button disabled size="mini" round
      >收藏({{ num.subscribedCount }})</el-button
    >
    <el-button size="mini" round>下载</el-button>
    <el-button @click="rolling" size="mini" round
      >评论({{ num.commentCount }})</el-button
    >
  </div>
</template>

<script>

export default {
  name: "Btns",
  props: {
    num: {
      type: Object,
      default () {
        return {}
      }
    },
    trackIds: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: ['allplay', 'rolling'],
  setup (props, { emit }) {

    // 全部播放
    const allplay = () => {
      emit('allplay')
    }
    const rolling = () => {
      emit('rolling')

    }
    return {
      allplay,
      rolling
    }
  }
}
</script>

<style scoped lang='scss'>
.btn {
  margin-top: 25px;
}
</style>