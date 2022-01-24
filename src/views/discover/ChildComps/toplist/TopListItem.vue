<template>
  <div class="main_box">
    <div class="title">{{ title }}</div>
    <div
      @click="reTopList(item.id, item.updateFrequency)"
      v-for="(item, index) in list"
      :key="item.id"
      :class="{ active_color: item.id === currID }"
      class="item"
    >
      <div class="img">
        <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
      </div>
      <div class="fz">
        <div class="item_name">{{ item.name }}</div>
        <div class="update_time">{{ item.updateFrequency }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "TopListItem",
  props: {
    title: String,
    list: {
      type: Array,
      default () {
        return ['nonono']
      }
    }
  },
  setup (props, { emit }) {
    let currID = ref(19723756)
    const reTopList = (id,) => {
      currID.value = id
      emit('reTopList', id)

    }
    return {
      currID,
      reTopList
    }
  }
}
</script>

<style scoped lang='scss'>
.main_box {
  .title {
    padding: 15px 0 5px 20px;
    color: #000;
  }
  .item {
    display: flex;
    gap: 10px;
    padding: 10px 0 10px 20px;
    &:hover {
      cursor: pointer;
      background-color: #f4f2f2;
    }
    .img {
      img {
        width: 40px;
        height: 40px;
      }
    }
    .fz {
      flex: 1;
      font-size: 14px;
      .item_name {
        color: #000;
        height: 25px;
      }
      .update_time {
        color: #999;
      }
    }
  }
}
.active_color {
  background-color: #e6e6e6;
}
</style>