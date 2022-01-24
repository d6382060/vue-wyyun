<template>
  <div class="comment">
    <div class="title">评论 <span>共76707条评论</span></div>
    <div class="release">
      <div class="text-area">
        <div class="avatar">
          <img
            v-if="!userAvatarUrl"
            src="@/assets/img/default_avatar.jpg"
            alt=""
          />
          <img v-else :src="userAvatarUrl" alt="" />
        </div>
        <textarea
          @click="islogin"
          v-model="value"
          placeholder="评论"
          name="评论框"
          id="plk"
        ></textarea>
      </div>
      <div class="release-btns">
        <div class="release-coment">
          <div :style="{ color: colora }" class="num">{{ coment_num }}</div>
          <div class="bt">
            <el-button @click="commentContent" size="small" type="danger" round
              >评论</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 精彩评论 -->
    <div
      v-if="
        songCommentData.hotComments?.length !== 0 && songCommentData.hotComments
      "
      class="content"
    >
      <div class="content_title">精彩评论</div>
      <div class="content_list">
        <div
          v-for="(item, index) in songCommentData.hotComments"
          class="content_item"
          :key="item.id"
        >
          <div class="img">
            <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
          </div>
          <div class="item">
            <div class="top">
              <a class="name" href="javascript:;">{{ item.user.nickname }}：</a>
              <span>{{ item.content }}</span>
            </div>
            <!-- 回复的内容 -->
            <div v-for="v in item.beReplied" class="reply">
              <a
                :title="v.user.nickname"
                class="reply_name ovf"
                href="javascript:;"
                >{{ v.user.nickname }}：</a
              >
              <p class="reply_comentent">{{ v.content }}</p>
            </div>
            <!-- 回复 -->
            <div v-if="item.beReplied.length !== 0" class="bott_beReplied">
              <a class="name" href="javascript:;"
                >{{ item.beReplied[0].user.nickname }}：</a
              >
              <span>{{ item.beReplied[0].content }}</span>
            </div>
            <div class="bott">
              <span class="time">{{ item.timeStr }}</span>
              <span class="btn2">
                <span
                  ><i
                    @click="giveaLike(item.commentId)"
                    class="iconfont icon-31dianzan"
                  ></i
                  >({{
                    item.likedCount > 100000
                      ? like(item.likedCount)
                      : item.likedCount
                  }})</span
                >
                <a
                  @click="shouwbeReplied(index, item.user.nickname)"
                  href="javascript:;"
                  >回复</a
                >
              </span>
            </div>
            <!-- 回复 -->
            <div v-show="isbeReplied == index" class="bott_beReplied">
              <el-input
                resize="none"
                v-model="textarea1"
                autosize
                type="textarea"
                placeholder="回复纽蒙迦德在逃圣徒Agnes灵岐:"
              />
              <el-button
                style="float: right"
                @click="replyCommentContent(item.commentId)"
                size="small"
                type="danger"
                round
                >回复</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div v-if="songCommentData" class="new_content">
      <div class="content_title">最新评论({{ songCommentData.total }})</div>
      <div class="content_list">
        <div
          v-for="(item, index) in songCommentData.comments"
          class="content_item"
          :key="item.id"
        >
          <div class="img">
            <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
          </div>
          <div class="item">
            <div class="top">
              <a class="name" href="javascript:;">{{ item.user.nickname }}：</a>
              <span>{{ item.content }}</span>
            </div>
            <!-- 回复的内容 -->
            <div v-for="v in item.beReplied" class="reply">
              <a
                :title="v.user.nickname"
                class="reply_name ovf"
                href="javascript:;"
                >{{ v.user.nickname }}：</a
              >
              <p class="reply_comentent">{{ v.content }}</p>
            </div>
            <div class="bott">
              <span class="time">{{ item.timeStr }}</span>
              <span class="btn2">
                <span
                  ><i
                    @click="giveaLike(item.commentId)"
                    class="iconfont icon-31dianzan"
                  ></i
                  >({{
                    item.likedCount > 100000
                      ? like(item.likedCount)
                      : item.likedCount
                  }})</span
                >
                <a
                  @click="shouwbeReplied(index, item.user.nickname)"
                  href="javascript:;"
                  >回复</a
                >
              </span>
            </div>

            <!-- 回复 -->
            <div v-show="isbeReplied == index" class="bott_beReplied">
              <el-input
                resize="none"
                v-model="textarea1"
                autosize
                type="textarea"
              />
              <el-button
                style="float: right"
                @click="replyCommentContent(item.commentId, item)"
                size="small"
                type="danger"
                round
                >回复</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!songCommentData">暂无评论!!!</div>
    <el-pagination
      @click="page"
      :page-size="20"
      layout="prev, pager, next"
      :total="songCommentData.total"
      v-model:currentPage="currentPage1"
    ></el-pagination>
  </div>
</template>

<script>
import { giveLike } from '@/network/comment'
import { sendComment } from '@/network/singleSong'
import { ElMessage } from 'element-plus'
import { computed, ref, watch, reactive, toRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'comment',
  props: {
    songCommentData: {
      type: Object,
      default () {
        return {}
      }
    },
    commentType: {
      type: Number,
      default: 0
    },
    playId: {
      type: [Number, String],
    }
  },
  emits: ['page', 'commentContent', 'replyCommentContent', 'giveaLike'],
  setup (props, { emit }) {
    const store = useStore()
    const route = useRoute()
    // 输入框数据
    let value = ref('')
    // 是否显示回复框
    let isbeReplied = ref(-1)
    // 评论字数
    let coment_num = computed(() => {
      return 137 - value.value.length
    })
    // 字体颜色
    let colora = ref('#999')

    // 监听数字变化
    watch(coment_num, (newValue, oldValue) => {
      if (coment_num.value <= 0) {
        colora.value = '#c20c0c'
      }
    })
    let userAvatarUrl = ref('')
    if (store.getters.islogin) {
      let { avatarUrl } = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userAvatarUrl.value = avatarUrl
    }
    // 发送/删除评论 参数
    let comment_params = reactive({
      t: 1, // 1 发送, 2 回复
      type: props.commentType, //type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
      id: route.query.id || props.playId,  // 对应资源的ID
      content: '',  // 要发送的内容
      commentId: '',  //回复的评论 id (回复评论时必填)
    })
    // 发表评论
    async function fnCommentPrams (t, id, va) {
      comment_params.t = t
      comment_params.content = va.slice(va.indexOf(':') + 1);
      comment_params.commentId = id
      let res = await sendComment(comment_params);
      if (res.code !== 200) {
        ElMessage.error(res.msg)
      } else if (res.code == 200) {
        ElMessage.success('评论成功')

      }
    }
    // 评论
    const commentContent = async (id) => {
      comment_params.id = props.playId
      if (coment_num.value <= 0) {
        ElMessage.error('字数不能超过137')
        return
      }
      if (!value.value) {
        ElMessage.error('回复内容不能为空')
        return
      }
      if (!store.state.islogin) {
        store.commit('islogDialog')
      } else {
        fnCommentPrams(1, id, value.value)
        value.value = '';
      }

      emit('commentContent')
    }

    // 解析点赞
    function like (num) {
      let str = (num / 10000).toFixed(1) + '万';
      return str
    }
    // 分页
    let currentPage1 = ref(1);
    const page = () => {
      emit('page', currentPage1.value)
    }

    // 是否登录
    const islogin = () => {
      if (!store.state.islogin) {
        store.commit('islogDialog')
      }
    }
    // 显示回复框
    let currber = ref(false)
    // 回复的内容
    let textarea1 = ref('')
    // 点击显示回复框
    const shouwbeReplied = (index, name) => {
      currber.value = !currber.value
      if (currber.value) {
        isbeReplied.value = index
      } else {
        isbeReplied.value = -1
      }
      textarea1.value = `回复${name}:`
    }
    // 回复
    const replyCommentContent = (id) => {
      let sliceStart = textarea1.value.indexOf(':')
      let reply = textarea1.value.slice(sliceStart + 1)
      fnCommentPrams(2, id, reply)
      textarea1.value = '';
      isbeReplied.value = -1
      emit('replyCommentContent')
    }
    // 点赞参数
    // 是否点赞
    let islike = ref(false)
    let comentLikePrams = reactive({
      id: route.query.id || props.playId,
      t: 1,// 是否点赞 , 1 为点赞 ,0 为取消点赞
      cid: '', // 评论 id
      type: props.commentType // 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应类型
    })


    // 点赞
    const giveaLike = async (id) => {
      comentLikePrams.cid = id
      let res = await giveLike(comentLikePrams)
      emit('giveaLike')
    }
    return {
      giveaLike,
      comment_params,
      coment_num,
      value,
      commentContent,
      colora,
      like,
      currentPage1,
      page,
      islogin,
      shouwbeReplied,
      isbeReplied,
      textarea1,
      replyCommentContent,
      userAvatarUrl
    }
  }
}
</script>

<style scoped lang='scss'>
.comment {
  .title {
    border-bottom: 2px solid #c20c0c;
    padding: 15px 0 5px 0;
    font-size: 20px;
    line-height: 28px;
    span {
      margin-left: 15px;
      font-size: 14px;
      color: #666;
    }
  }
  .release {
    margin-top: 20px;
    width: 640px;
    height: 110px;
    .text-area {
      display: flex;
      .avatar {
        margin-right: 15px;
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      textarea {
        outline: none;
        resize: none;
        width: 100%;
        height: 60px;
        margin: 0;
        padding: 5px 6px 6px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        line-height: 20px;
        box-sizing: content-box;
      }
    }
    .release-btns {
      padding-left: 60px;
      justify-content: right;
      display: flex;
      height: 35px;
      line-height: 35px;
      .release-coment {
        display: flex;
        .num {
          font-size: 14px;
          color: #999;
        }
        .bt {
          margin-left: 15px;
        }
      }
    }
  }
  .content {
    margin-top: 50px;
    .content_title {
      padding-bottom: 5px;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #999;
    }
    .content_list {
      .content_item {
        padding: 15px 0 15px;
        &:not(:nth-child(1)) {
          border-top: 1px dotted #ccc;
        }
        display: flex;
        .img {
          margin-right: 15px;
          width: 50px;
          height: 50px;
        }
        .item {
          flex: 1;
          font-size: 14px;
          .top {
            margin-bottom: 15px;
            .name {
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
            span {
              white-space: pre-line; // 解析 \n
              cursor: text;
            }
          }

          .bott {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            .btn2 {
              span {
                padding-right: 15px;
                border-right: 1px solid #666;
                i {
                  font-size: 18px;
                  color: #0c73c2;
                }
                &:hover {
                  cursor: pointer;
                }
              }
              a {
                padding-left: 15px;
                color: #0c73c2;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
.new_content {
  margin-top: 50px;
  .content_title {
    padding-bottom: 5px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #999;
  }
  .content_list {
    .content_item {
      padding: 15px 0 15px;
      &:not(:nth-child(1)) {
        border-top: 1px dotted #ccc;
      }
      display: flex;
      .img {
        margin-right: 15px;
        width: 50px;
        height: 50px;
      }
      .item {
        flex: 1;
        font-size: 14px;
        .top {
          margin-bottom: 15px;
          .name {
            color: #0c73c2;
            &:hover {
              text-decoration: underline;
            }
          }
          span {
            white-space: pre-line; // 解析 \n
            cursor: text;
          }
        }
        .bott {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          .btn2 {
            span {
              padding-right: 15px;
              border-right: 1px solid #666;
              i {
                font-size: 18px;
                color: #0c73c2;
              }
              &:hover {
                cursor: pointer;
              }
            }
            a {
              padding-left: 15px;
              color: #0c73c2;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
.bott_beReplied {
  font-size: 12px;
  border: 1px solid #eee;
  margin-top: 5px;
  padding: 10px 10px;
  height: 78px;
  background-color: #f4f4f4;
}
.reply {
  border: 1px solid #dedede;
  display: flex;
  width: 624px;
  padding: 15px;
  background-color: #f4f4f4;
  .reply_name {
    color: #0c73c2;
    margin-right: 10px;
    max-width: 120px;
    &:hover {
      text-decoration: underline;
    }
  }
  .reply_comentent {
    flex: 1;
    font-size: 13px;
    line-height: 20px;
  }
}
</style>