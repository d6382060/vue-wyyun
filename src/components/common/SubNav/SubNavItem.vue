<template>
  <div class="sub-nav-item">
    <span @click="itemClick" :class="{ active: actives }">
      <slot name="item-text"> </slot
    ></span>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubNavItem',
  props: {
    path: String,
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    // 导航栏点击跳转
    const itemClick = () => {
      if (route.path == props.path) {
        console.log(props.path);
      } else {
        router.replace(props.path)
      }
    }

    // 计算属性 当前页面时对应item 高亮
    const isActive = computed(() => {
      return route.path.indexOf(props.path) != -1
    })

    // 在当前页面给对应item 添加属性
    const actives = computed(() => {
      return isActive.value ? true : false
    })


    return {
      itemClick,
      actives
    }
  }
}
</script>

<style scoped lang='scss'>
.active {
  cursor: pointer;
  display: inline-block;
  height: 20px;
  padding: 0 13px;
  margin: 7px 17px 0;
  line-height: 21px;
  border-radius: 20px;
  font-size: 14px;
  background-color: #9b0909;
}
span {
  cursor: pointer;
  display: inline-block;
  height: 20px;
  padding: 0 13px;
  margin: 7px 17px 0;
  line-height: 21px;
  border-radius: 20px;
  font-size: 14px;
}
span:hover {
  background-color: #9b0909;
}
</style>