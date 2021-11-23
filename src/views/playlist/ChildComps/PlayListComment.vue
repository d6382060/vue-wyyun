<template>
  <div class="play-list-comment">
    <div class="title">
      <h4>评论</h4>
      <span>共{{ CommentInfo.length }}条评论</span>
    </div>
    <div class="comment-list">
      <div class="list-title">最新评论({{ CommentInfo.length }})</div>
      <div v-for="item in CommentInfo" class="info">
        <div class="pd">
          <div class="comment-user-img">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="comment-info">
            <a class="name" href="javascript:;"
              ><span>{{ item.user.nickname }} <b>:</b></span></a
            >
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { playlistComment } from '../../../network/playlist'
export default {
  name: 'PlayListComment',
  props: {
    cid: String
  },
  setup (props) {
    const iid = computed(() => {
      return props.cid
    })

    // 获取评论信息
    const CommentInfo = ref([])
    playlistComment(iid.value).then(res => {
      CommentInfo.value = res.comments
    })
    return {
      CommentInfo

    }
  }
}
</script>

<style lang="scss" scoped>
.play-list-comment {
  margin-top: 50px;
}
.title {
  h4 {
    display: inline-block;
    margin-right: 30px;
  }
}
.list-title {
  border-bottom: 1px solid #cfcfcf;
}
.info {
  border-bottom: 1px dotted #cfcfcf;

  .comment-user-img {
    height: 50px;
    width: 50px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .comment-info {
    margin-left: 15px;
    display: flex;
    p {
      font-size: 14px;
    }
  }
}
.pd {
  display: flex;
  padding: 25px 0;
}
.name {
  font-size: 12px;
  color: #0c73c2;
}
.name:hover {
  text-decoration: underline;
}
</style>