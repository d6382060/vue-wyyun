<template>
  <div class="detailed">
    <div class="imgs">
      <img :src="detail.picUrl + '?param=177y177'" alt="" />
    </div>
    <div class="info">
      <div class="title">
        <el-tag type="success">{{ tag }}</el-tag>
        <h3 class="h3-title ovf">{{ detail.name }}</h3>
      </div>
      <div class="user-info">
        <div class="user-img">
          <img :src="detail.dj?.avatarUrl" alt="" />
        </div>
        <div class="name">
          <a :href="'/user/home?id=' + detail.dj?.userId">{{
            detail.dj?.nickname
          }}</a>
        </div>
      </div>
      <div class="btns">
        <el-button @click="emit('allplay')" size="mini" round
          >全部播放</el-button
        >
        <el-button size="mini" round>订阅</el-button>
      </div>
      <div v-if="detail.tags" class="tags">
        <span>标签:</span>
        <el-tag type="success">{{ detail.tags }}</el-tag>
      </div>
      <div class="album-desc-more">
        <a :href="'/discover/djradio/category?id=' + detail.categoryId">{{
          detail.category
        }}</a>
        <div class="detailed-desc">
          <p style="width: 400px; word-wrap: break-word">
            {{ detail.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DjadioHeafer",
  props: {
    detail: {
      type: Object,
      default () {
        return {}
      }
    },
    tag: String,
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
      margin-bottom: 15px;
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

      .detailed-desc {
        margin-left: 7px;
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