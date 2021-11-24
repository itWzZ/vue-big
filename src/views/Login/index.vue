<template>
  <div class="reg-container">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="" />
    </div>
    <div class="form-container">
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form :model="LoginForm" :rules="regRules" ref="regRef" status-icon>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="LoginForm.username"
            placeholder="请输入用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="btn-reg"
            style="width: 100%"
            @click="onSubmit"
            >登录</el-button
          >
          <el-link type="info" @click="goToReg">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '../../api'
export default {
  name: 'index',
  data () {
    return {
      LoginForm: {
        username: 'wz123',
        password: '123123'
      },
      // 注册表单的验证规则对象
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {},
  computed: {},
  methods: {
    onSubmit () {
      this.$refs.regRef.validate(async (valid) => {
        if (valid) {
          const res = await loginApi(this.LoginForm)
          // console.log(res.data)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '恭喜你,' + res.data.message
            })
            this.$store.commit('updateToken', res.data.token)
            this.$router.push('/')
            return
          }
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        } else {
          this.$message({
            message: '您输入的不正确!',
            type: 'error'
          })
        }
      })
    },
    goToReg () {
      this.$router.push('/reg')
    }
  }
}
</script>

<style lang='less' scoped>
.reg-container {
  height: 100vh;
  background: url('../../assets/images/login_bg.jpg') no-repeat center / cover;
  position: relative;
  .logo {
    width: 1200px;
    margin: 0 auto;
  }
}
.form-container {
  width: 400px;
  height: 335px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.title-box {
  height: 60px;
  background: url('../../assets/images/login_title.png') no-repeat center;
}
.el-form {
  padding: 30px 30px;
}
</style>
