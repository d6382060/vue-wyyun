<template>
  <div class="tltie_scel">
    <div class="title">
      {{ cat || "全部" }}
    </div>
    <div class="select">
      <span @click="issclect = !issclect" class="el-dropdown-link">
        选择分类 <i class="iconfont icon-xiala1"></i>
      </span>
      <div v-show="issclect" class="select_list">
        <div class="slelct_title">
          <span>全部分类</span>
        </div>
        <div class="list">
          <div class="categories">
            <div class="categories_list">语种</div>
          </div>
          <div class="name">
            <span
              @click="nameClick(item.name)"
              :key="item.id"
              v-for="item in playlistCatlist_data.Languages"
              class="list_name"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="list">
          <div class="categories">
            <div class="categories_list">风格</div>
          </div>
          <div class="name">
            <span
              @click="nameClick(item.name)"
              v-for="item in playlistCatlist_data.style"
              class="list_name"
              :key="item.id"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="list">
          <div class="categories">
            <div class="categories_list">场景</div>
          </div>
          <div class="name">
            <span
              @click="nameClick(item.name)"
              :key="item.id"
              v-for="item in playlistCatlist_data.scenario"
              class="list_name"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="list">
          <div class="categories">
            <div class="categories_list">情感</div>
          </div>
          <div class="name">
            <span
              @click="nameClick(item.name)"
              :key="item.id"
              v-for="item in playlistCatlist_data.emotional"
              class="list_name"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="list">
          <div class="categories">
            <div class="categories_list">主题</div>
          </div>
          <div class="name">
            <span
              @click="nameClick(item.name)"
              :key="item.id"
              v-for="item in playlistCatlist_data.theme"
              class="list_name"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

import { playlistCatlist } from '../../../network/playlistTable'
import PlaylistTableList from './PlaylistTableList.vue'
export default {
  components: { PlaylistTableList },
  name: "PlaylistTableTitle",
  props: ['cat'],
  setup (props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    // 歌单分类
    let playlistCatlist_data = reactive({
      Languages: [],
      style: [],
      scenario: [],
      emotional: [],
      theme: [],
      all_sub: [],
      alls: null,
      categories: null
    })
    // 创建分类
    function create (res, id) {
      switch (id) {
        case 0:
          playlistCatlist_data.Languages = res.sub.filter(item => {
            return item.category == 0
          })
          break;
        case 1:
          playlistCatlist_data.style = res.sub.filter(item => {
            return item.category == 1
          })
          break;
        case 2:
          playlistCatlist_data.scenario = res.sub.filter(item => {
            return item.category == 2
          })
          break;
        case 3:
          playlistCatlist_data.emotional = res.sub.filter(item => {
            return item.category == 3
          })
          break;
        case 4:
          playlistCatlist_data.theme = res.sub.filter(item => {
            return item.category == 4
          })
          break;
        default:
          break;
      }

    }
    // 初始化数据
    const init = async () => {
      let res = await playlistCatlist();
      playlistCatlist_data.alls = res.all
      playlistCatlist_data.categories = res.categories
      playlistCatlist_data.all_sub = res.sub
      create(res, 0)
      create(res, 1)
      create(res, 2)
      create(res, 3)
      create(res, 4)
    }
    // 显示分类选择宽
    let issclect = ref(false)

    // 获取query
    let cat = ref(route.query.cat)
    // 选择
    const nameClick = (name) => {
      emit('showCityName', name)
      cat.value = name
      issclect.value = !issclect.value

    }

    onMounted(() => {
      init()
    })
    return {
      playlistCatlist_data,
      issclect,
      nameClick,
      cat
    }
  }
}
</script>

<style scoped lang='scss'>
.tltie_scel {
  margin-top: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  .title {
    font-size: 20px;
    color: #333;
  }
  .select {
    width: 100px;
    margin-left: 25px;
    .el-dropdown-link {
      cursor: pointer;
      background-color: #f6f6f6;
      border-radius: 5px;
      display: inline-block;
      box-shadow: 1px 2px 2px #c4c4c4;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      color: #0c73c2;
      height: 30px;
      width: 100px;
      border: 1px solid #c4c4c4;
    }
    .select_list {
      background-color: #fff;
      position: fixed;
      padding: 15px;
      border: 1px solid #c4c4c4;
      width: 800px;
      .slelct_title {
        border-bottom: 1px solid #c4c4c4;
        padding-bottom: 10px;
        span {
          font-size: 12px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          width: 100px;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
          background-color: #f6f6f6;
          padding: 5px;
          color: #333;
        }
      }
      .list {
        margin-top: 15px;
        display: flex;
        .categories {
          .categories_list {
            width: 50px;
          }
        }
        .list_name {
          font-size: 14px;
          border-right: 2px solid #c4c4c4;
          padding: 0 10px 0 10px;
          color: #333;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>