<template>
  <div class="right-item">
    <div class="login">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <button class="btn1"><span>用户登录</span></button>
    </div>
    <div class="singer">
      <div class="title">
        <h4>入驻歌手</h4>
        <span>查看全部</span>
      </div>
      <ul class="siner-item">
        <li v-for="item in artist">
          <a href="javascript:;">
            <div class="img">
              <img :src="item.img1v1Url" />
            </div>
            <div class="info">
              <h4>{{ item.name }}</h4>
              <p>音乐人{{ item.name }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="btn">
        <button>申请成为音乐人</button>
      </div>
    </div>
    <div class="The-host"></div>
  </div>
</template>

<script>
import { artistList } from '../../../network/home'
import { ref, computed } from 'vue'
export default {
  name: 'HomeRightItem',
  setup () {

    let artist = ref([])
    // 歌手id 
    artistList().then(res => {
      console.log(res);
      artist.value = res.artists.slice(0, 5)
    })
    console.log(artist.value);

    return {
      artist
    }
  }
}
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 126px;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  background-color: #eee;
  p {
    height: 60px;
    font-size: 14px;
    padding: 15px;
  }
  button {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%);
  }
}
.singer {
  margin-top: 15px;
  padding: 15px;
  .btn {
    width: 100%;
    text-align: center;
    button {
      box-shadow: 3px 5px 3px #888888;
      font-size: 14px;
      border-radius: 5px;
      border: 2px solid #eee;
      margin-top: 25px;
      width: 210px;
      height: 30px;
    }
    button:hover {
      cursor: pointer;
      background-color: #fff;
    }
  }

  .title {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 14px;
    }
    span {
      font-size: 14px;
    }
  }
}
.siner-item {
  li:hover {
    background-color: #eee;
  }
  li {
    border: 1px solid #e9e9e9;
    width: 100%;
    height: 62px;
    margin-top: 15px;
    background-color: #fafafa;
    .info {
      flex: 1;
      text-align: center;
      margin-top: 10px;
      p {
        font-size: 14px;
      }
    }
    a {
      display: flex;
    }
  }
}
.btn1 {
  background-color: #e0161e;
  height: 31px;
  border: none;
  border-radius: 5px;
  text-shadow: 0 1px 0 #8a060b;
  span {
    font-size: 14px;
    padding: 10px;
    color: #fff;
  }
}
.btn1:hover {
  cursor: pointer;
  background-color: rgba($color: #e0161e, $alpha: 0.8);
}
img {
  width: 62px;
}
</style>