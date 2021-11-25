<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <bread first="个人中心" second="更换头像"></bread>
      </div>
      <!-- <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div> -->
      <div>
        <!-- 图片，用来展示用户选择的头像 -->
        <!-- <img :src="imgUrl" alt="" class="preview" /> -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- 按钮区域 -->
        <div class="btn-box">
          <input
            type="file"
            ref="inputHidden"
            @change="changeImg"
            style="display: none"
          />
          <el-button @click="chooseImg" type="primary" icon="el-icon-plus"
            >选择图片</el-button
          >
          <el-button type="success" icon="el-icon-upload" disabled
            >上传头像</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: ''
    }
  },
  created () {},
  computed: {},
  methods: {
    chooseImg () {
      this.$refs.inputHidden.click()
    },
    changeImg (e) {
      // console.log(e)
      const file = e.target.files[0]
      console.log(file)
      const fr = new FileReader()
      // console.log(fr)
      fr.readAsDataURL(file)
      fr.onload = () => {
        // console.log(fr.result, 111)
        this.imageUrl = fr.result
      }
    },
    // el 上传头像的方法
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'

      const isLt2M = file.size < 99999999999888888
      console.log(file.size)
      console.log(isLt2M)
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 350px;
  height: 350px;
  line-height: 350px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 350px;
  height: 350px;
  display: block;
}
</style>
