<template>
  <div class="msg_box">
    <div class="my_msg_list">
      <h2 class="my_msg_title">我的消息</h2>
      <ul>
        <li
          @click="activeClick(index, item)"
          v-for="(item, index) in li_list"
          :class="{ active_li: list_index == index }"
        >
          <i
            class="iconfont"
            :class="{
              'icon-aite': index == 0,
              ' icon-xiaoxitongzhi': index == 1,
              'icon-pinglun': index == 2,
              'icon-tongzhi': index == 3,
            }"
          ></i
          ><span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="my_msg_detailed">
      <div class="title">
        {{ detailed_title == "我的" ? "@" + detailed_title : detailed_title }}
      </div>
      <div v-show="list_index == 0" class="content">暂时还没有收到@</div>
      <div v-show="list_index == 1" class="content">暂时还没有收到私信</div>
      <div v-show="list_index == 2" class="content">
        <div v-for="item in detailed_data.Comments" class="content_item">
          <div class="img">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="cont">
            <div class="name">
              <span class="name_reply"> {{ item.user.nickname }}</span>
              <span class="time"
                >{{ fn(item.time) }} <i class="iconfont icon-shijian"></i
              ></span>
            </div>
            <div class="reply_comments">回复我:{{ item.content }}</div>
            <div class="my_comments">{{ item.beRepliedContent }}</div>
          </div>
        </div>
      </div>
      <div v-show="list_index == 3" class="content">
        <div v-for="item in detailed_data.notices" class="notice">
          <div class="notice_item">
            <div class="img">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="notice_content">
              <div class="notice_name">
                <span class="names">{{ item.user.nickname }}</span>
                <span class="info">{{
                  item.type == 6 ? "赞了你的评论" : "收藏了你的歌单"
                }}</span>
                <span class="notice_time">{{
                  (item.comment && fn(item.comment.time)) ||
                  fn(item.playlist.trackUpdateTime)
                }}</span>
              </div>
              <div class="des_info">
                {{
                  (item.comment && item.comment.content) ||
                  "[" + item.playlist.name + "]"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forwards, history, getComments, getNotices } from '../../network/msg'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'MsgPrivate',
  setup (props) {
    const li_list = ref(['我的', '私信', '评论', '通知'])
    // 点击添class 属性
    let list_index = ref(0)
    // 动态标题
    let detailed_title = ref('@我的')
    const activeClick = async (index, item) => {
      list_index.value = index;
      detailed_title.value = item;
      if (list_index.value == 2) {
        let s = await getComments(getuserInfos.value.userId);
        detailed_data.Comments = s.comments
      }
      if (list_index.value == 3) {

        let { notices } = await getNotices();
        detailed_data.notices.length == 0 && notices.forEach(item => {
          detailed_data.notices.push(JSON.parse(item.notice))

        })

        console.log(detailed_data.notices);
      } else {
        detailed_data.notices = []
      }

    }
    function fn (s) {
      // 初始化时间戳
      let times = new Date(s)
      return `${times.getMonth() + 1}月${times.getDay()}日${times.getHours()}:${times.getMinutes()}`
    }

    // detailed 数据
    let detailed_data = reactive({
      forwards: null,  // @ 我的数据
      getHistory: null,// 私信内容
      Comments: null, //通知 - 评论
      notices: [] // 通知 - 通知
    })
    // 获取用信息
    const getuserInfos = ref(JSON.parse(window.sessionStorage.getItem('userInfo')));

    // 初始化数据
    const init = async () => {
      let res = await forwards();
      detailed_data.forwards = res
      let r = await history(getuserInfos.value.userId);
      detailed_data.getHistory = r

    }
    onMounted(() => {
      init()
    })
    return {
      list_index,
      li_list,
      activeClick,
      detailed_title,
      detailed_data,
      fn

    }
  }
}
</script>

<style scoped lang='scss'>
.msg_box {
  width: 1100px;
  margin: 0 auto;
  background-color: red;
  display: flex;
  border: 1px solid #d3d3d3;
  .my_msg_list {
    width: 190px;
    background-color: #fcfcfc;
    .my_msg_title {
      padding: 32px 0 14px 40px;
      line-height: 30px;
      font-size: 20px;
      font-weight: normal;
      color: #333;
      border-bottom: 1px solid #dddddd;
    }
    ul li {
      height: 54px;
      line-height: 54px;
      text-align: center;
      background-color: #f7f7f7;
      border-bottom: 1px solid #dddddd;
      &:hover {
        background-color: #fcfcfc;
      }
      i {
        margin-right: 10px;
      }
    }
    .active_li {
      background-color: #fff;
    }
  }
  .my_msg_detailed {
    padding: 40px;
    background-color: #fff;
    width: 100%;
    .title {
      padding-bottom: 10px;
      border-bottom: 2px solid #d13030;
    }
    .content_item {
      display: flex;
      padding: 15px 0;
      .img {
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .cont {
        margin-left: 15px;
        padding: 15px;
        width: 100%;
        height: 100px;
        background-color: #f2f2f2;
        &::after {
          content: "";
          width: 15px;
          height: 15px;
          background-color: #f2f2f2;
          position: relative;
          display: inline-block;
          left: -23px;
          top: -70px;
          transform: rotate(45deg);
        }
        .name {
          display: flex;
          justify-content: space-between;

          .name_reply {
            color: #0c73c5;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .time {
            display: inline-block;
            text-align: right;
            font-size: 14px;
          }
        }
        .reply_comments {
          padding: 10px 0;
          font-size: 14px;
          color: #333;
        }
        .my_comments {
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .notice {
      padding: 15px 0;
      border-bottom: 1px dashed #cccccc;
      &:hover {
        border: none;
        background-color: #f5f5f5;
        cursor: pointer;
      }
      .notice_item {
        display: flex;
        .img {
          width: 40px;
          height: 40px;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .notice_content {
          margin-left: 15px;
          width: 100%;
          display: flex;
          flex-direction: column;
          .notice_name {
            display: flex;
            .notice_time {
              width: 100%;
              text-align: right;
            }
            .info {
              font-size: 14px;
              width: 150px;
              color: #999999;
            }
            .names {
              margin: 0 15px 0 0;
              color: #333;
              font-weight: 600;
              font-size: 12px;
              width: 115px;
              overflow: hidden;
              line-height: 15px;
              height: 15px;
              text-overflow: ellipsis;
            }
          }
        }
        .des_info {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>