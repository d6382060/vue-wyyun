<template>
  <div class="dj_list">
    <div class="title">
      <h3>
        <a href="javascript:;">{{ title }}</a>
      </h3>
      <div @click="sortClick" class="btn">
        <a
          class="more1"
          :href="'#/discover/djradio/category?id=' + djRadios[0]?.categoryId"
        >
          <slot name="more1"></slot>
        </a>
        <a
          :class="{ active: index == 1 }"
          data-id="1"
          class="more2"
          href="javascript:;"
        >
          <slot name="sortu"></slot>
        </a>
        <a
          :class="{ active: index == 2 }"
          data-id="2"
          class="more2"
          href="javascript:;"
        >
          <slot name="sortd"></slot>
        </a>
      </div>
    </div>
    <ul class="list">
      <li v-for="(item, index) in djRadios" :key="item.id" class="item">
        <a class="img" href="javascript:;">
          <img :src="item.intervenePicUrl + '?param=200y200'" alt="" />
        </a>
        <div class="cnt">
          <h3>
            <a href="javascript:;">{{ item.name }}</a>
          </h3>
          <p class="des">{{ item.rcmdtext }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  name: 'djList',
  props: {
    title: String,
    djRadios: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    let index = ref(1)
    const router = useRouter()
    const sortClick = (e) => {
      let eid = e.target.dataset.id
      index.value = eid
      if (eid == 1) {
        console.log('1');
      }
    }
    return {
      sortClick,
      index
    }
  }
}
</script>

<style scoped lang='scss'>
.dj_list {
  margin-top: 30px;
  .title {
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 2px solid #c20c0c;
    h3 {
      font-size: 24px;
      font-weight: normal;
      a {
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .btn {
      .more1 {
        font-size: 13px;
        &:hover {
          text-decoration: underline;
        }
      }
      .more2 {
        margin-left: 10px;
        font-size: 13px;
        &:hover {
          text-decoration: underline;
        }
      }
      .pdbr {
        padding-right: 5px;
        border-right: 1px solid #999;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      height: 160px;
      width: 50%;
      border-bottom: 1px solid #e7e7e7;
      padding: 20px 0;
      .img {
        img {
          width: 120px;
          height: 120px;
        }
      }
      .cnt {
        margin-left: 20px;
        h3 {
          margin: 16px 0 20px;
          font-size: 18px;
          a {
            color: #000;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .des {
          font-size: 14px;
          color: #999;
          margin-bottom: 6px;
          line-height: 20px;
          &:hover {
            cursor: text;
          }
        }
      }
    }
  }
}
.active {
  color: #c20c0c;
}
</style>