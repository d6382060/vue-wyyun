<template>
  <div>
    <vue3VideoPlay v-bind="options" :poster="poster" />
  </div>
</template>

<script>
import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
import { reactive, ref, onUpdated, nextTick } from "vue";
export default {
  name: "VideoPlay",
  components: {
    vue3VideoPlay,
  },
  props: {
    videourl: {
      type: String,
    },
    poster: String
  },
  setup (props) {
    onUpdated(async () => {
      await nextTick()
      options.src = props.videourl
    })

    let options = reactive({
      width: "750px", //播放器宽度
      height: "450px", //播放器高度
      color: "#409eff", //主题色
      title: "", //视频名称
      src: props.videourl, //视频源
      // muted: true, //静音
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: true, //自动播放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: true, //关灯模式
      volume: 0.3, //默认音量大小
      control: true, //是否显示控制
      controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        "pip",
        "pageFullScreen",
        "fullScreen",
      ], //显示所有按钮,

    });

    return {
      options
    }
  }
}
</script>

<style>
</style>