<template>
  <div v-if="theLogin" class="login">
    <div class="title">
      <div>登录</div>
      <span @click="shutdown" class="gb" title="关闭">×</span>
    </div>
    <!-- 二维码登录页面 -->
    <div v-if="isLogin == 0" class="bd">
      <div class="cnt">
        <div class="main">
          <div class="f-cb">
            <div class="phone"></div>
            <div class="right">
              <div class="d-title">扫码登录</div>
              <div class="ewm">s</div>
              <p class="text">
                使用&nbsp;<a href="/download">网易云音乐APP</a>&nbsp;扫码登录
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a @click="switchLogin" href="javascript:;" class="buttom"
          >选择其他登录模式</a
        >
      </div>
    </div>
    <!-- 其他登录页面 -->
    <div class="login-2" v-else-if="isLogin == 1">
      <div class="phone-login">
        <div class="bc"></div>
        <div class="btn-log">
          <el-button
            @click="toLogin"
            style="width: 225px"
            size="mini"
            type="primary"
            >手机登录</el-button
          >
        </div>
        <div class="btn-reg">
          <el-button style="width: 225px; margin: 15px 0 25px 0" size="mini">
            注册</el-button
          >
        </div>
        <div class="terms">
          <label for="yes">
            <input @click="isSelected()" id="yes" type="checkbox" />
            <span>同意</span>
          </label>
          <a
            style="color: #507daf"
            href="http://st.music.163.com/official-terms/service"
            >《服务条款》</a
          >
          <a
            style="color: #507daf"
            href="http://st.music.163.com/official-terms/privacy"
            >《隐私政策》</a
          >
          <a
            style="color: #507daf"
            href="https://st.music.163.com/official-terms/children"
            >《儿童隐私政策》</a
          >
        </div>
      </div>
      <div class="other-login">
        <ul>
          <li>
            <a href="javascript:;">
              <i class="wx"></i>
              微信登录
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="QQ"></i>
              QQ登录
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="wb"></i>
              微博登录
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <i class="wy"></i>
              网易邮箱账号登录
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机登录页面 -->
    <div v-else-if="isLogin == 2" class="pohne-login">
      <div class="pohne-bd">
        <div class="phone-input">
          <!-- 手机号 -->
          <div class="phonewrap">
            <a @click="showCodeList" class="code" href="javascript:;">
              <span>{{ saveCode }}</span>
              <i class="iconfont icon-xiala"></i>
            </a>
            <div class="textpwss">
              <input
                v-model="userphone"
                placeholder="请输入手机号"
                type="text"
                @blur="isTip"
              />
            </div>
          </div>
          <!-- 验证码登录 -->
          <div class="input-pwss">
            <div v-if="!ispwssor" class="dis">
              <!-- 验证码登录 -->
              <input v-model="captcha" placeholder="请输入验证码" type="text" />
              <a href="javascript:;">
                <el-button size="mini" @click="getCaptchaClick">
                  获取验证码</el-button
                >
              </a>
            </div>
            <div style="height: 30px" v-else class="dis">
              <!-- m密码登录 -->
              <input
                v-model="phonepwss"
                style="border-right: none; width: 149px; margin-right: 0px"
                placeholder="请输入密码"
                type="text"
              />
              <a
                style="
                  border: 1px solid #cdcdcd;
                  border-left: none;
                  line-height: 30px;
                  font-size: 14px;
                "
                href="javascript:;"
              >
                忘记密码？
              </a>
            </div>
            <div @click="ispwssor = !ispwssor" class="pwssLogin">
              <a href="javascript:;">{{
                !ispwssor ? "密码登录" : "验证码登录"
              }}</a>
            </div>
          </div>

          <!-- 密码登录 -->

          <div
            v-show="isShowTip"
            style="margin-top: 10px; font-size: 12px; color: red"
            class="tip"
          >
            <i
              style="color: red; margin-right: 5px"
              class="iconfont icon-warming"
            ></i>
            <span>请输入手机号</span>
          </div>
          <div class="phone-botton">
            <el-button
              @click="loginClick"
              type="primary"
              class="log"
              size="mini"
            >
              登录</el-button
            >
          </div>
        </div>
      </div>
      <div class="log-bott">
        <div style="margin-left: 10px" @click="isLogin = 1">
          <i style="color: #0c72c3" class="iconfont icon-fanhuijiantou"></i
          ><a style="color: #0c72c3" href="javascript:;">其他方式登录</a>
        </div>
        <div style="margin-right: 10px">
          <a style="color: #999" href="javascript:;">没有账号？免费注册</a
          ><i style="color: #999" class="iconfont icon-xiangyoujiantou"></i>
        </div>
      </div>
    </div>

    <!--第二个页面右下角 返回二维码 登录 -->
    <div v-if="isLogin == 1" class="scan" @click="isLogin = false"></div>
    <!-- 地区选择 -->
    <div v-if="isCode" class="codesle">
      <ul>
        <li @click="getCode()">
          <span ref="codeRef">+96</span>
          <span>中国</span>
        </li>
        <li>
          <span>86</span>
          <span>中国</span>
        </li>
        <li>
          <span>86</span>
          <span>中国</span>
        </li>
        <li>
          <span>86</span>
          <span>中国</span>
        </li>
        <li>
          <span>86</span>
          <span>中国</span>
        </li>
      </ul>
    </div>
  </div>
  <!-- 遮罩层 -->
  <div v-if="theLogin" class="mask"></div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { phoneLogin, getCaptcha, validationCaptcha, captchaLogin } from '../../../network/home'
export default {
  emits: {
    shutdown: null,
    loginClick: null
  },
  name: 'HomeLogin',
  props: {
    theLogin: {
      type: Boolean
    }
  },
  setup (props, { emit }) {
    let isLogin = ref(0)
    // 点击切换登录模式
    const switchLogin = () => {
      isLogin.value = 1
    }


    // 判断是否选中的条件
    let isCheckbox = ref(false)
    // 是否选中
    const isSelected = () => {
      isCheckbox.value = event.target.checked
      console.log(isCheckbox.value);
    }

    // ref
    const codeRef = ref(null)
    // 保存选中code的变量
    let saveCode = ref('+86')
    // 点击区号绑定
    const getCode = () => {
      saveCode.value = codeRef.value.innerText
      console.log(codeRef.value.innerText);
    }

    // 点击手机登录 
    const toLogin = () => {
      if (isCheckbox.value) {
        isLogin.value = 2
        console.log(555)
      } else {
        ElMessage({
          message: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》',
          offset: 200
        })
      }

    }
    // 显示条件
    let isCode = ref(false)
    // 点击显示地区选择
    const showCodeList = () => {
      isCode.value = !isCode.value
    }
    let isShowTip = ref(false)
    const isTip = () => {
      if (userphone.value == '') {
        isShowTip.value = true
      } else {
        isShowTip.value = false
      }
    }
    // 点击关闭
    const shutdown = () => {
      emit('shutdown')
    }
    // 用户数据
    const userInfo = ref()
    // 是否登录成功
    let isLoginsuccess = ref(false)
    // cookie的值
    const cookies = ref([])
    // 保存cookie
    function saveCookie (isLoginsuccess, cookie) {
      if (isLoginsuccess && cookie) {
        cookies.value = cookie.split(';;')
        console.log(cookies.value);
        for (let i = 0; i < cookies.value.length; i++) {
          //console.log(props.profile.cookie.split(';;')[i].indexOf('MUSIC_U'));
          if (cookies.value[i].indexOf('MUSIC_U') == 0) {
            document.cookie = cookies.value[i];
            console.log(document.cookie);
            break;
          }
        }
      }
    }
    // 验证码登录函数
    const captchaLogin = () => {
      validationCaptcha(userphone.value, captcha.value).then(res => {
        if (res.code && res.data) {
          captchaLogin(userphone.value, captcha.value).then(res => {
            if (res == 200) {
              userInfo.value = res
              isLoginsuccess.value = true
              if (isLoginsuccess.value) {
                saveCookie(isLoginsuccess.value, res.cookie)
                console.log(isLoginsuccess.value);
                emit('loginClick', isLoginsuccess.value, userInfo.value)
              }
              return ElMessage({
                type: 'success',
                message: '登录成功',
                offset: 200
              })
            }
            return ElMessage({
              type: 'error',
              message: res.msg || '登录失败',
              offset: 200
            })
          })
        }
      })
    }
    // 密码登录函数'
    const pawssLogin = () => {
      phoneLogin(userphone.value, phonepwss.value).then(res => {
        console.log(res);
        if (res.code == 200) {
          userInfo.value = res;
          isLoginsuccess.value = true
          if (isLoginsuccess.value) {
            saveCookie(isLoginsuccess.value, res.cookie)
            console.log(isLoginsuccess.value);
            emit('loginClick', isLoginsuccess.value, userInfo.value)
          }
          return ElMessage({
            type: 'success',
            message: '登录成功',
            offset: 200
          })
        }
        return ElMessage({
          type: 'error',
          message: res.msg || '登录失败',
          offset: 200
        })

      })
    }
    // 切换登录方式
    let ispwssor = ref(false)
    // 手机号数据
    let userphone = ref('')
    // 密码数据
    const phonepwss = ref('')
    // 验证码数据
    const captcha = ref('')

    // 点击登录
    const loginClick = () => {


      if (!ispwssor.value) {
        captchaLogin()
      } else {
        pawssLogin()
      }
    }
    // 点击获取验证码
    const getCaptchaClick = () => {
      getCaptcha(userphone.value).then(res => {
        if (res.code !== 200) {
          return ElMessage({
            type: 'success',
            message: '获取验证码成功',
            offset: 200
          })
        }
        return ElMessage({
          type: 'error',
          message: res.message,
          offset: 200
        })

      })
    }

    return {
      isShowTip,
      getCaptchaClick,
      isLoginsuccess,
      captcha,
      phonepwss,
      loginClick,
      saveCode,
      codeRef,
      getCode,
      shutdown,
      ispwssor,
      isLogin,
      isTip,
      userphone,
      showCodeList,
      isCode,
      toLogin,
      isSelected,
      switchLogin
    }
  }
}
</script>

<style scoped lang='scss'>
.login {
  z-index: 1003;
  .log-bott {
    border-top: 1px solid #c6c6c6;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    line-height: 50px;
    background-color: #f7f7f7;
    position: relative;
    bottom: 0;
    border-radius: 0 0 4px 4px;
    top: 20px;
    height: 50px;
  }
  .codesle {
    li {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      color: #333;
    }
    li:hover {
      background-color: #eaeaea;
    }
    li span:nth-child(1) {
      margin-left: 10px;
    }
    li span:nth-child(2) {
      margin-right: 10px;
    }
    overflow: auto;
    border-left: 1px solid #cdcdcd;
    border-right: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    // border: 1px solid #cdcdcd;
    width: 220px;
    height: 130px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
  }
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
  position: absolute;
  border-radius: 4px;
  left: 50%;
  top: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
  height: 370px;
  width: 530px;
  .title {
    cursor: move;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    background-color: #2d2d2d;
    height: 40px;
    line-height: 40px;
    div {
      padding-left: 18px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    span {
      cursor: pointer;
      padding-right: 20px;
      color: #fff;
    }
  }
  .login-2 {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 40px 0 39px;
    .phone-login {
      margin: 0 35px 0 50px;
      width: 224px;
      .bc {
        height: 120px;
        background: url(https://s2.music.126.net/style/web2/img/platform.png?5831c2b5d1126ed4cd3bea360f2169f9)
          no-repeat 13px 0;
        margin-bottom: 10px;
      }
    }
    .other-login {
      flex: 1;
      i {
        display: inline-block;
        vertical-align: middle;
        width: 38px;
        height: 38px;
      }
      li {
        margin-top: 15px;
        font-size: 14px;
      }
      li:hover {
        text-decoration: underline;
      }
      .wx {
        background: url("../../../assets/img/logo.png") no-repeat 0 9999px;
        background-position: -150px -670px;
      }
      .QQ {
        background: url("../../../assets/img/logo.png") no-repeat 0 9999px;
        background-position: -190px -670px;
      }
      .wb {
        background: url("../../../assets/img/logo.png") no-repeat 0 9999px;
        background-position: -231px -670px;
      }
      .wy {
        background: url("../../../assets/img/logo.png") no-repeat 0 9999px;
        background-position: -271px -670px;
      }
    }
  }
}
.bd {
  .cnt {
    padding: 38px 0 20px;
    text-align: center;
    margin: 0 auto;
    .main {
      .f-cb {
        display: flex;
        justify-content: space-between;
        .phone {
          height: 220px;
          margin-left: 101px;
          width: 125px;
          background: url(https://s2.music.126.net/style/web2/img/qr_guide.png?f57871ef9b9bf3ed4755624785983e7d);
          background-size: contain;
        }
      }
    }
  }
}
.right {
  flex: 0.7;
  .d-title {
    position: relative;
    right: 35px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 500;
  }
  .ewm {
    width: 138px;
    height: 138px;
    background-color: red;
  }
  .text {
    position: relative;
    right: 35px;
    font-size: 12px;
    margin-top: 15px;
    a {
      color: #0c73c2;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
.btn {
  a {
    display: block;
    width: 150px;
    height: 100%;
    font-size: 14px;
    border: 1px solid #979797;
    border-radius: 15px;
    line-height: 28px;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    padding: 0 10px 0 10px;
    margin: 10px auto 0;
  }
}
.terms {
  margin-top: 15px;
  font-size: 14px;
  width: 150%;
}
.scan {
  width: 52px;
  position: absolute;
  right: 0;
  bottom: -6px;
  height: 52px;
  background-image: url(https://s2.music.126.net/style/web2/img/qr_login_icon.png?6a070785bcb933082ea41707da378880);
  background-size: contain;
  cursor: pointer;
}
.pohne-bd {
  .phone-input {
    padding: 30px 0 43px;
    width: 220px;
    height: 260px;
    margin: 0 auto;
    .phonewrap {
      display: flex;
      .code {
        height: 30px;
        width: 50px;
        line-height: 30px;
        border: 1px solid #cdcdcd;
        border-right: none;
        font-size: 12px;
        span {
          margin-left: 5px;
        }
      }
      .textpwss {
        input {
          height: 30px;
          width: 170px;
          outline: none;
          border: none;
          border: 1px solid #cdcdcd;
        }
      }
    }
    .input-pwss {
      margin-top: 20px;
      // flex-flow: wrap;
      .dis {
        display: flex;
      }
      input {
        margin-right: 10px;
        width: 120px;
        outline: none;
        border: none;
        border: 1px solid #cdcdcd;
      }
    }
  }
  .phone-botton {
    margin-top: 20px;
    text-align: center;
    .log {
      width: 200px;
      height: 30px;
    }
  }
}
.pwssLogin {
  margin-top: 15px;
  font-size: 12px;
}
.pwssLogin:hover {
  text-decoration: underline;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
</style>