<template>
  <div class="desc">
    <h2>
      <i>&nbsp;</i>
      {{ desc_data.singer_name }}简介
    </h2>
    <p>{{ desc_data.briefDesc }}</p>
    <div v-for="(item, index) in desc_data.introduction">
      <h2>{{ item.ti }}</h2>
      <p>{{ item.txt }}</p>
    </div>
  </div>
</template>

<script>
import { getSingedesc, artistDetail } from '../../../network/artist'
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'ArtistDesc',
  setup (props) {
    const route = useRoute()
    // 数据
    let desc_data = reactive({
      singer_name: '',
      briefDesc: "",
      introduction: []
    })
    // 请求
    const getDesc = async () => {
      let { data } = await artistDetail(route.query.id)
      let res = await getSingedesc(route.query.id);
      desc_data.singer_name = data.artist.name
      desc_data.briefDesc = res.briefDesc
      desc_data.introduction = res.introduction
    }
    onMounted(() => {
      getDesc()
    })


    return {
      desc_data
    }
  }
}
</script>

<style scoped lang='scss'>
.desc {
  h2 {
    margin: 28px 0 8px 0;
    color: #333;
    font-size: 14px;
    i {
      height: 14px;
      width: 3px;
      margin-right: 7px;
      background: #c10d0c;
    }
  }
  p {
    line-height: 35px;
    color: #666;
    text-indent: 2em;
    font-size: 12px;
  }
}
</style>