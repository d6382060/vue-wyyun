<template>
  <div>
    <ul class="list">
      <li
        @click="getDjId(item.id, index)"
        :key="item.id"
        v-for="(item, index) in categroyList"
        class="item"
      >
        <a :class="{ activebg: item.id == currentId }" href="javascript:;">
          <div
            :class="{ active: item.id == currentId }"
            :style="{ 'background-image': `url('${item.picWebUrl}')` }"
            class="icon"
          ></div>
          <em :class="{ active: item.id == currentId }">{{ item.name }}</em>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { djCatelist } from '@/network/dj'
import { onMounted, ref } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
export default {
  name: 'DjradioCategory',
  setup (props) {
    let route = useRoute()
    let router = useRouter()
    // 高亮图标
    let currentId = ref(route.query.id || -1);
    console.log(currentId.value);
    // 分类列表数据
    let categroyList = ref([])
    // 分类列表
    const getCategroy = async () => {
      let res = await djCatelist();
      if (res.code == 200) {
        categroyList.value = res.categories
      }
    }

    const getDjId = (id, index) => {
      currentId.value = id
      router.push({ path: '/discover/djradio/category', query: { id } })

    }
    onMounted(() => {
      getCategroy()
    })
    return {
      categroyList,
      getDjId,
      currentId
    }
  }

}
</script>

<style scoped lang='scss'>
.list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .item {
    width: 70px;
    height: 70px;
    margin: 0 0 25px 33px;
    .activebg {
      background-image: url("../../../../assets/img/categoryicon/radio_bg.png");
      background-position: -70px 0;
    }
    a {
      &:hover {
        background-image: url("../../../../assets/img/categoryicon/radio_bg.png");
      }
      display: block;
      text-align: center;
      color: #888;
      width: 70px;
      height: 70px;
      .active {
        color: #db5e5e !important;
        background-position: -48px 0 !important;
      }

      .icon {
        background-image: url("../../../../assets/img/categoryicon/dianying.jpg");
        background-position: 0 0;
        width: 48px;
        height: 48px;
        margin: 2px auto 0;
      }
      em {
        display: block;
        font-size: 12px !important;
        color: #888;
        font-style: normal;
        text-align: left;
        font-size: inherit;
        margin-top: -6px;
        text-align: center;
      }
    }
  }
}
</style>