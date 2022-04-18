<template>
  <rditop :programs="programsData" />
  <dj-list :djRadios="djRadios.one" title="音乐推荐·电台">
    <template v-slot:more1> 更多 </template>
  </dj-list>
  <dj-list :djRadios="djRadios.two" title="生活·电台">
    <template v-slot:more1> 更多 </template>
  </dj-list>
  <dj-list :djRadios="djRadios.three" title="情感·电台">
    <template v-slot:more1> 更多 </template>
  </dj-list>
  <dj-list :djRadios="djRadios.four" title="创作翻唱·电台">
    <template v-slot:more1> 更多 </template>
  </dj-list>
</template>

<script>
import { recommendProgram, programTopList, djRecommendType } from "@/network/dj";
import rditop from '../ChildComps/djradio/rditop.vue'
import { onMounted, reactive, ref } from '@vue/runtime-core';
import DjList from '../ChildComps/djradio/djList.vue';
export default {
  components: { rditop, DjList },
  name: 'Djradio',
  setup (props) {

    // 获取 推荐节目
    let programsData = reactive({
      programs: [], // "精彩节目推荐"
      toplist: [] // 节目排行榜
    })
    const getRecommendProgram = async () => {
      let res = await recommendProgram()
      if (res.code == 200) {
        programsData.programs = res.programs
      }
      let data = await programTopList()
      if (data?.code == 200) {
        programsData.toplist = data.toplist
      }
    }
    // 电台 - 分类推荐
    // 数据
    let djRadios = reactive({
      one: [],
      two: [],
      three: [],
      four: [],
    })
    const initDjRecommend = async (type) => {
      let res = await djRecommendType(type);

      switch (type) {
        case 2:
          djRadios.one = res.djRadios.slice(0, 4)
          break;
        case 6:
          djRadios.two = res.djRadios.slice(0, 4)
          break;
        case 3:
          djRadios.three = res.djRadios.slice(0, 4)
          break;
        case 2001:
          djRadios.four = res.djRadios.slice(0, 4)
          break;

        default:
          break;
      }



    }
    onMounted(() => {
      getRecommendProgram()
      initDjRecommend(2)
      initDjRecommend(6)
      initDjRecommend(3)
      initDjRecommend(2001)
      console.log(djRadios);

    });
    return {
      programsData,
      djRadios
    }
  }
}
</script>

<style>
</style>