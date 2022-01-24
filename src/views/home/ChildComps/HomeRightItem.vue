<template>
  <div class="right-item">
    <div class="singer">
      <div class="title">
        <h4>推荐歌手</h4>
        <router-link class="to" to="/discover/artist">查看全部</router-link>
      </div>
      <ul class="siner-item">
        <li @click="toArtist(item.id)" v-for="item in artist">
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
    </div>
    <div class="The-host"></div>
  </div>
</template>

<script>
import { artistList } from '../../../network/home'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeRightItem',
  setup () {
    const router = useRouter()
    let artist = ref([])
    // 歌手id 
    artistList().then(res => {
      artist.value = res.artists.slice(0, 5)
    })

    // 跳转歌手页面
    const toArtist = (id) => {
      router.push({ path: '/artist', query: { id } })
    }
    return {
      artist,
      toArtist
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
    .to {
      font-size: 12px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
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