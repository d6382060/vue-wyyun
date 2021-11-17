<template>
  <div class="tab-bar-item" @click="itemClick">
    <div>
      <slot name="item-icon"></slot>
    </div>
    <div :style="active">
      <slot name="item-text"></slot>
    </div>
    <!-- <div v-else>
      <slot name="item-click"></slot>
    </div> -->
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
export default {
  name: "TabBarItem",
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
    const active = computed(() => {
      return isActive.value ? { backgroundColor: '#000000' } : {}
    })


    return {
      itemClick,
      active
    }
  }
}
</script>

<style lang='scss'>
#tab-bar {
  width: 1100px;
  margin: 0 auto;

  background-color: #242424;
  display: flex;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.2);
}
.tab-bar-item {
  flex: 1;
  color: #ffff;
  text-align: center;
  line-height: 70px;
  font-size: 14px;
  cursor: pointer;
}
.tab-bar-item:hover {
  background-color: #000;
}
</style>