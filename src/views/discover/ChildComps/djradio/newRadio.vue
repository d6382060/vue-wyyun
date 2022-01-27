<template>
  <div class="new_radio">
    <div class="title">
      <h3>
        <span href="javascript:;">优秀新电台</span>
      </h3>
    </div>
    <ul class="list">
      <li v-for="(item, index) in djRadios" :key="item.id" class="item">
        <a class="img" href="javascript:;">
          <img :src="item.intervenePicUrl + '?param=200y200'" alt="" />
        </a>
        <h3 class="dj_name">
          <a href="javascript:;">{{ item.name }}</a>
        </h3>
        <p class="des">{{ item.rcmdtext }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'newRadio',
  props: {
    djRadios: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.new_radio {
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
    }
  }
  .list {
    margin-top: 20px;
    display: flex;
    .item {
      width: 20%;
      height: 230px;
      .img {
        img {
          width: 150px;
          height: 150px;
        }
      }
      .dj_name {
        margin: 5px 0 6px;
        line-height: 16px;
        font-size: 14px;
        font-weight: normal;
        width: 150px;
        a {
          color: #000;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      p {
        width: 150px;
        line-height: 18px;
        color: #999;
        font-size: 13px;
        &:hover {
          cursor: text;
        }
      }
    }
  }
}
</style>