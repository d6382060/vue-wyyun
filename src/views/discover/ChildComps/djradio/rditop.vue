<template>
  <div class="rditop">
    <div class="L">
      <div class="title">
        <h3>
          <a href="javascript:;">推荐节目</a>
        </h3>
        <span>
          <a href="javascript:;">更多</a>
        </span>
      </div>
      <ul class="list">
        <li
          v-for="(item, index) in programs.programs"
          :key="item.id"
          class="item itm"

        >
          <a class="img" href="javascript:;">
            <a class="msk" href="javascript:;">
              <span class="sj"></span>
            </a>
            <img :src="item.coverUrl + '?param=40x40'" alt="" />
          </a>
          <div class="desc">
            <h3 class="ovf"  @click="goTo(item.id)">
              <a href="javascript:;">
                {{ item.name }}
              </a>
            </h3>
            <p>
              <a href="javascript:;">{{ item.dj.brand }}</a>
            </p>
          </div>
          <a class="tag" href="javasctipt:;">{{ item.radio.category }}</a>
        </li>
      </ul>
    </div>
    <div class="R">
      <div class="title">
        <h3>
          <a href="javascript:;">节目排行榜</a>
        </h3>
        <span>
          <a href="javascript:;">更多</a>
        </span>
      </div>
      <ul class="r_list list">
        <li
          v-for="(item, index) in programs.toplist"
          :key="item.id"
          class="itm"
        >
          <div class="ranking">
            <em
              :class="{
                topred: item.rank == 1 || item.rank == 2 || item.rank == 3,
              }"
              >{{ item.rank >= 10 ? item.rank : "0" + item.rank }}</em
            >
            <span>
              <!-- 排名上升 -->
              <i
                style="color: #ba2226"
                v-if="item.lastRank - item.rank > 0"
                class="iconfont icon-dkw_tisheng"
              ></i>
              <!-- 新的 -->
              <i
                style="color: #268330"
                v-else-if="item.lastRank < 0"
                class="iconfont icon-new"
              ></i>
              <!-- 排名不变 -->
              <i
                style="color: #268330"
                v-else-if="item.lastRank - item.rank == 0"
                class="iconfont icon-hr"
              ></i>
              <span
                :class="{ topred: item.lastRank - item.rank > 0 }"
                v-show="item.lastRank > 0"
              >
                {{ item.lastRank - item.rank }}</span
              >
            </span>
          </div>
          <a class="img" href="javascript:;">
            <a class="msk" href="javascript:;">
              <span class="sj"></span>
            </a>
            <img :src="item.program.coverUrl + '?param=40x40'" alt="" />
          </a>
          <div class="desc">
            <h3 class="ovf"  @click="goTo(item.program.id)">
              <a href="javascript:;">
                {{ item.program.name }}
              </a>
            </h3>
            <p class="ovf">
              <a href="javascript:;">{{ item.program.radio.name }}</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: 'rditop',
  props: {
    programs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup(delta){
const router = useRouter()
    const goTo = (id)=>{
      router.push({ path: "/program", query: { id } } )
      console.log('点击',router)
    }
    return {
      goTo
    }
  }
}
</script>

<style scoped lang='scss'>
.rditop {
  margin: 0 0 0 33px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .L {
    width: 450px;
    .list {
      .item {
        align-items: center;
        display: flex;
        gap: 10px;
        flex: 1;
        height: 75px;
        padding: 10px 0;
        line-height: 40px;
      }
    }
  }
  .R {
    width: 450px;
    .r_list {
      .itm {
        .ranking {
          width: 50px;
          display: flex;
          flex-direction: column;
          em {
            font-size: 16px;
            text-align: center;
          }
          span {
            text-align: center;
            font-size: 13px;
          }
        }
        .img {
          .msk {
            top: 37%;
            .sj {
              top: 1px;
            }
          }
        }
        .desc {
          width: 210px;
          p {
            width: 200px;
          }
        }
      }
    }
  }
}
a:hover {
  text-decoration: underline;
}
.tag {
  display: inline-block;
  position: relative;
  top: -1px;
  height: 16px;
  overflow: hidden;
  padding: 0 6px;
  border: 1px solid #999;
  line-height: 16px;
  color: #999;
  vertical-align: middle;
  font-size: 13px;
}
.title {
  display: flex;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  h3 {
    font-size: 24px;
    font-weight: normal;
    a {
      line-height: 35px;
      color: #333;
    }
  }
  span {
    text-align: right;
    flex: 1;
    line-height: 15px;
    a {
      font-size: 13px;
      line-height: 40px;
    }
  }
}
.itm {
  width: 100%;
  height: 75px;
  padding: 10px 0;
  display: flex;
  // line-height: 40px;
  &:nth-child(2n) {
    background-color: #f7f7f7;
  }
  &:hover {
    background-color: #eeeeee;
  }
  &:hover .img .msk {
    display: block;
  }
}
.img {
  position: relative;
  display: flex;
  margin-left: 20px;
  .msk {
    display: none;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    height: 20px;
    width: 20px;
    border: 2px solid #e2e2e2;
    .sj {
      // transform: rotate(40deg);
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-left: 6px solid #e2e2e2;
      border-bottom: 6px solid transparent;
      // background-color: #d9dcdd;
      color: #e2e2e2;
      position: absolute;
      top: 2px;
      left: 6px;
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
}
.desc {
  width: 254px;
  margin: 1px 0 0 10px;
  line-height: 20px;
  h3 {
    height: 25px;
    a {
      color: #000;
      font-weight: normal;
      font-size: 14px;
    }
  }
  p {
    height: 20px;
    font-size: 13px;
    a {
      color: #999;
    }
  }
}

.list {
  border-right: 1px solid #e2e2e2;
  border-left: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}

.topred {
  color: #da4545;
}
</style>