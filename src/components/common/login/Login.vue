<template>
  <div class="login">
    <el-popover v-if="isLofins" placement="bottom" :width="400" trigger="hover">
      <template #reference>
        <div class="user-img">
          <img :src="avatr || getuserInfos.avatarUrl" alt="" />
        </div>
      </template>
      <login-my-info-list />
    </el-popover>
    <el-button v-else type="text" @click="loginto">登录</el-button>

    <el-dialog v-model="store.state.centerDialogVisible" width="30%" center>
      <div class="login">
        <div class="title">
          <div>登录</div>
        </div>
        <div class="bd">
          <el-form
            ref="ruleForm"
            :model="loginData"
            status-icon
            :rules="loginFormRules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input
                placeholder="请输入网易云帐号登录"
                v-model="loginData.phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input
                placeholder="请输入密码"
                v-model="loginData.pwd"
                type="password"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { phoneLogin, userDateil } from '../../../network/home'
import { ref, reactive } from "vue";
import { useStore } from 'vuex'
import LoginMyInfoList from './LoginMyInfoList.vue';
export default {
  components: { LoginMyInfoList },
  name: "Login",
  setup (props) {

    // vuex
    const store = useStore();
    // 数据
    const loginData = reactive({
      phone: '', // 手机号；
      pwd: '' //密码

    })

    let centerDialogVisible = ref(store.state.centerDialogVisible)
    const loginto = () => {
      store.commit("islogDialog");
    }
    // 验证规则
    const loginFormRules = reactive({
      phone: [{ required: true, message: '请输入网易帐号', trigger: 'blur' }],
      pwd: [{ required: true, message: '请输入网易密码', trigger: 'blur' }]
    })

    // 拿到ref实例
    const ruleForm = ref(null)
    // 是否登录
    let isLofins = ref(window.sessionStorage.getItem('isLogin'));
    // 头像
    let avatr = ref()
    // 点击登录
    const submitForm = () => {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          const res = await phoneLogin(loginData.phone, loginData.pwd);
          console.log(res);
          if (res.code !== 200) {
            ElMessage.error('账号输入错误')

          } else {
            getuserInfo(res.profile.userId)
            window.sessionStorage.setItem('token', res.token)
            window.sessionStorage.setItem('cookie', res.cookie)
            window.sessionStorage.setItem('isLogin', true)
            centerDialogVisible.value = false;
            // 头像
            avatr.value = res.profile.avatarUrl
            console.log(avatr.value);
            getuserInfos.value = JSON.parse(window.sessionStorage.getItem('userInfo'));
            isLofins.value = window.sessionStorage.getItem('isLogin')
            store.commit("islogDialog");
            // setTimeout(() => {
            //   location.reload();
            // }, 1000);

          }
        }
      })

    }
    //传入ID获取用户信息
    const getuserInfo = async (uid) => {
      const res = await userDateil(uid);
      if (res.code !== 200) {
        ElMessage.error(res.msg)
      } else {
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.profile))
      }
    }

    // 获取用信息
    const getuserInfos = ref(JSON.parse(window.sessionStorage.getItem('userInfo')));


    return {
      centerDialogVisible,
      ruleForm,
      loginto,
      getuserInfos,
      loginFormRules,
      loginData,
      submitForm,
      isLofins,
      store,
      avatr



    }
  }

}
</script>

<style scoped lang="scss">
.title {
  height: 38px;
  background-color: #3333;
  div {
    line-height: 38px;
    margin-left: 15px;
  }
}
.bd {
  margin-top: 25px;
  padding-bottom: 35px;
}
:deep(.el-dialog__body) {
  padding: 0;
}
:deep(.el-dialog__header) {
  padding: 0;
}

:deep(.el-input) {
  width: 60%;
}

:deep(.el-dialog) {
  width: 25% !important;
}
.user-img {
  border-radius: 50%;
  img {
    position: relative;
    top: 10px;
    left: 0;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}
</style>
