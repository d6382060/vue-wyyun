<template>
  <div class="detailed">
    <div class="imgs">
      <img :src="detail.blurPicUrl + '?param=177y177'" alt="" />
    </div>
    <div class="info">
      <div class="title">
        <el-tag type="success">{{ tag }}</el-tag>
        <h3 class="h3-title ovf">{{ detail.name }}</h3>
      </div>
      <div class="user-info">
        <div class="user-img">
          <slot name="userImg"></slot>
        </div>
        <div class="name">
          <a :href="'/artist?id=' + detail.artist?.id">{{
            detail.artist?.name
          }}</a>
        </div>
        <span class="user-date">
          <slot name="userDate"></slot>
        </span>
      </div>
      <div class="issue_time">
        <slot name="inittime"></slot>
      </div>
      <!-- 发行公司 -->
      <div class="company">
        <slot name="company"></slot>
      </div>
      <div class="btns">
        <el-button @click="emit('allplay')" size="mini" round
          >全部播放</el-button
        >
        <el-button size="mini" round>收藏</el-button>
        <el-button size="mini" round>下载</el-button>
        <el-button size="mini" round>评论({{ commNum }})</el-button>
      </div>
      <div v-if="detail.tags" class="tags">
        <span>标签:</span>
        <el-tag type="success">{{ detail.tags }}</el-tag>
      </div>
      <div class="album-desc-more">
        <b>介绍:</b>
        <div class="detailed-desc">
          <p style="width: 400px; word-wrap: break-word">
            {{ detail.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListInfo",
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    tag: String,
    commNum: Number
  },
  emits: ['allplay'],
  setup (props, { emit }) {

    return {
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
    width: 215px;
    height: 215px;
    img {
      position: relative;
      top: 2px;
      left: 2px;
      width: 208px;
      height: 208px;
    }
  }
  .info {
    flex: 1;
    margin-left: 20px;
    .title {
      display: flex;
      align-items: center;
      .h3-title {
        width: 300px;
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
      .user-img {
        line-height: 25px;
        font-size: 14px;
        position: relative;
        top: 4px;
        margin-right: 10px;
        height: 25px;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .name {
        line-height: 30px;
        margin-right: 10px;
        a {
          font-size: 12px;
          color: #0c73c2;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .user-date {
        line-height: 31px;
        font-size: 12px;
        color: #999;
      }
    }
    .tags {
      margin-top: 20px;
    }
    .album-desc-more {
      margin-top: 25px;
      .detailed-desc {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .issue_time {
      font-size: 12px;
      margin-top: 4px;
      margin-bottom: 10px;
      line-height: 18px;
      color: #666;
    }
    .company {
      font-size: 12px;
      margin-top: 4px;
      margin-bottom: 10px;
      line-height: 18px;
      color: #666;
    }
  }
}
</style>