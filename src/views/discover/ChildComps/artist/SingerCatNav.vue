<template>
  <h2 class="tit">推荐</h2>
  <ul class="nav">
    <li
      @click="catnavClick('推荐歌手', -1, -1)"
      :class="{ active: activetype == '推荐歌手' }"
    >
      <a href="javascript:;">推荐歌手</a>
    </li>
    <li
      @click="catnavClick('入驻歌手', -1, -1)"
      :class="{ active: activetype == '入驻歌手' }"
    >
      <a href="javascript:;">入驻歌手</a>
    </li>
  </ul>
  <div :key="index" v-for="(item, index) in listdata" class="blk">
    <h2 class="tit">{{ item.tit }}</h2>
    <ul class="nav">
      <li
        :key="index"
        @click="catnavClick(v.t, v.type, item.area)"
        v-for="(v, index) in item.list"
        :class="{ active: activetype == v.t }"
      >
        <a data-type="71" href="javascript:;">{{ v.t }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import listdata from '@/utils/directive'
import { ref } from '@vue/reactivity';
export default {
  name: 'SingerCatNav',
  emits: ['catnavClick'],
  setup (props, { emit }) {
    let activetype = ref('推荐歌手')
    const catnavClick = (v, type, area) => {
      activetype.value = v
      emit('catnavClick', type, area, v)
    }


    return {
      catnavClick,
      activetype,
      listdata
    }
  }
}
</script>

<style scoped lang='scss'>
.active {
  border: 1px solid #d4d4d4;
  background-color: #fafafa;

  a {
    color: #c20c0c;
  }
}
.tit {
  color: #333;
  height: 25px;
  padding-left: 14px;
  font-size: 16px;
  font-family: "Microsoft Yahei";
}
.nav {
  li {
    margin-bottom: 2px;
    width: 160px;
    height: 29px;
    line-height: 29px;
  }
}
.blk {
  margin: 5px 0 0;
  padding-top: 16px;
  border-top: 1px solid #d3d3d3;
}

a {
  font-size: 12px;
  width: 133px;
  padding-left: 14px;
  &:hover {
    text-decoration: underline;
  }
}
</style>