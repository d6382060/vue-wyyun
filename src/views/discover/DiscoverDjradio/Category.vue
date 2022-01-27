<template>
  <div class="Category">
    <new-radio :djRadios="djRadios" />
    <dj-list :djRadios="hotDjData" title="电台排行榜">
      <template v-slot:sortd> 最热电台 </template>
    </dj-list>
    <el-pagination
      background
      :pager-count="11"
      @click="Page"
      :page-size="15"
      layout="prev, pager, next"
      :total="total"
      v-model:currentPage="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { djRecommendType, hotDjRadio } from '@/network/dj'
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import newRadio from '../ChildComps/djradio/newRadio.vue'
import djList from '../ChildComps/djradio/djList.vue'

export default {
  components: { newRadio, djList },
  name: "Category",
  setup (props) {
    const route = useRoute()
    // 获取 电台ID
    let djid = ref(route.query.id)
    watch(route, (o, n) => {
      djid.value = n.query.id
      hotDjParams.cateId = n.query.id
      getNewDj()
      getHotDj()
    })
    // 获取优秀新电台数据
    let djRadios = ref([])
    const getNewDj = async () => {
      let res = await djRecommendType(djid.value);
      if (res.code == 200) {
        djRadios.value = res.djRadios.slice(0, 5)
      }
    }
    // 电台 - 类别热门电台 参数
    let hotDjParams = reactive({
      limit: 30,
      offset: 0,
      cateId: djid.value
    })
    let total = ref(0)
    let hotDjData = ref([])
    // 发送请求
    let getHotDj = async () => {
      let res = await hotDjRadio(hotDjParams);
      if (res.code == 200) {
        hotDjData.value = res.djRadios
        total.value = res.count
      }
    }

    // 当前页码
    let currentPage = ref(1)
    // 切换页码
    const Page = () => {
      hotDjParams.offset = (currentPage.value - 1) * 30
      getHotDj()
    }

    onMounted(() => {
      getNewDj()
      getHotDj()
    })
    return {
      djid,
      total,
      djRadios,
      hotDjData,
      Page,
      currentPage
    }
  }
}
</script>

<style scoped lang='scss'>
.el-pagination {
  text-align: center;
}
</style> 