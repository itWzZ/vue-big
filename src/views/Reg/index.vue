<template>
  <div class="reg-container">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="" />
    </div>
    <div class="form-container">
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regRules" ref="regRef" status-icon>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="regForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="regForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="regForm.repassword"
            type="password"
            placeholder="请再次确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="btn-reg"
            style="width: 100%"
            @click="onSubmit"
            >注册</el-button
          >
          <el-link type="info" @click="goToLogin">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { regApi } from '../../api'
export default {
  name: 'index',
  data () {
    const samePwd = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        // 如果验证失败，则调用 回调函数时，指定一个 Error 对象。
        callback(new Error('两次输入的密码不一致!'))
      } else {
        // 如果验证成功，则直接调用 callback 回调函数即可。
        callback()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
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
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
  created () {},
  computed: {},
  methods: {
    onSubmit () {
      this.$refs.regRef.validate(async (valid) => {
        console.log(valid, 123)
        if (valid) {
          const res = await regApi(this.regForm)
          if (res.data.code === 0) {
            this.$message({
              message: '恭喜你，注册成功!',
              type: 'success'
            })
            this.$router.push('/login')
            return
          }
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        } else {
          this.$message({
            showClose: true,
            message: '您输入的不正确!',
            type: 'error'
          })
          return false
        }
      })
    },
    goToLogin () {
      this.$router.push('/login')
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
  padding: 0 30px;
}
</style>
