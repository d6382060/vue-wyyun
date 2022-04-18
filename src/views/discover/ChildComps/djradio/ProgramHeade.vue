<template>
  <div class="detailed">
    <div class="imgs">
      <img :src="headeInfo.coverUrl + '?param=140y140'" alt="" />
    </div>
    <div class="info">
      <div class="title">
        <el-tag type="success">{{ tag }}</el-tag>
        <h3 class="h3-title">{{ headeInfo.name }}</h3>
      </div>
      <div class="user-info">
        <div class="name">
          <a :href="'#/djradio?id=' + headeInfo.radio?.id"
            ><p class="ovf">
              <i class="iconfont icon-music"></i>{{ headeInfo.dj?.brand }}
            </p></a
          >
          <el-button @click="sortClick(true)" size="mini" plain
            ><i class="iconfont icon-shoucang"></i>订阅</el-button
          >
        </div>
      </div>
      <div class="btns">
        <el-button @click="emit('allplay')" size="mini" round
          >播放({{ timeInit(headeInfo.duration) }})</el-button
        >
        <el-button size="mini" round
          >点赞({{ headeInfo.likedCount }})</el-button
        >
        <el-button size="mini" round
          >评论({{ headeInfo.commentCount }})</el-button
        >
        <el-button size="mini" round>下载</el-button>
      </div>
    </div>
  </div>
  <div class="album-desc-more">
    <a :href="'#/discover/djradio/category?id=' + headeInfo.categoryId">
      {{ headeInfo.categoryName }}
    </a>
    <div class="detailed-desc">
      <!-- style="width: 400px; word-wrap: break-word" -->
      <h3 class="ovf">
        {{ headeInfo.dj?.brand }} 第{{ headeInfo.serialNum }}期
      </h3>
      <span class="time"
        >{{ dateInit(headeInfo.scheduledPublishTime) }} 创建
      </span>
      <span class="plycount"
        >播放：<em>{{ headeInfo.listenerCount }}</em
        >次</span
      >
    </div>
  </div>
  <div class="des">
    <p style="width: 100%; word-wrap: break-word">
      介绍： {{ headeInfo.description }}
    </p>
  </div>
</template>

<script>
import { timeInit, dateInit } from '@/utils/playsong'
export default {
  name: 'ProgramHeade',
  props: {
    tag: String,
    headeInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['allplay'],
  setup (props, { emit }) {


    return {
      timeInit,
      dateInit,
      emit
    }
  }
}
</script>

<style scoped lang='scss'>
.detailed {
  display: flex;
  .imgs {
    border: 1px solid #d5d5d5;
    width: 145px;
    height: 145px;
    img {
      position: relative;
      top: 2px;
      left: 2px;
      width: 140px;
      height: 140px;
    }
  }
  .info {
    flex: 1;
    margin-left: 20px;

    .title {
      display: flex;
      align-items: center;
      .h3-title {
        flex: 1;
        color: #000;
        font-weight: normal;
        font-size: 20px;
        margin-left: 25px;
      }
    }
    .user-info {
      height: 35px;
      display: flex;
      margin-top: 20px;
      margin-bottom: 15px;
      .name {
        display: flex;
        line-height: 30px;
        margin-right: 10px;
        a {
          width: 300px;
          font-size: 20px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.album-desc-more {
  margin-top: 25px;
  display: flex;
  a {
    position: relative;
    top: -1px;
    height: 20px;
    overflow: hidden;
    padding: 0 6px;
    border: 1px solid #cc0000;
    line-height: 20px;
    *line-height: 18px;
    color: #cc0000;
    vertical-align: middle;
    font-size: 12px;
    &:hover {
      background-color: #fbeeee;
    }
  }
  h3 {
    color: #000;
    width: 320px;
    font-weight: normal;
  }
  .detailed-desc {
    color: #999;
    display: flex;
    margin-left: 7px;
    font-size: 14px;
    line-height: 20px;
    .plycount {
      margin-left: 20px;
      em {
        color: #cc0000;
        font-weight: bold;
        font-style: normal;
      }
    }
  }
}
.des {
  margin-top: 10px;
  p {
    font-size: 14px;
    line-height: 23px;
    color: #666;
  }
}
</style>