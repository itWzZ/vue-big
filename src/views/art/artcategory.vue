<template>
  <div>
    <el-card>
      <!-- 面包屑开始 -->
      <div slot="header" class="clearfix">
        <bread first="文章管理" second="文章分类"></bread>
      </div>
      <!-- 面包屑结束 -->

      <!-- 添加按钮开始 -->
      <div style="text-align: right">
        <el-button type="primary" @click="addCate">添加分类</el-button>
      </div>
      <!-- 添加按钮结束 -->
      <!-- 表格开始 -->
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column label="序号" width="100" prop="id"> </el-table-column>
        <el-table-column label="分类名称" prop="cate_name"> </el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格结束 -->
    </el-card>
    <!-- 添加分类开始 -->
    <el-dialog
      width="30%"
      :title="(isEdit ? '编辑' : '添加') + '文章分类'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="cate_name"
        >
          <el-input
            v-model="form.cate_name"
            autocomplete="off"
            @keyup.enter.native="isEdit ? doEdit() : doAdd()"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分类别名"
          :label-width="formLabelWidth"
          prop="cate_alias"
        >
          <el-input
            v-model="form.cate_alias"
            autocomplete="off"
            @keyup.enter.native="isEdit ? doEdit() : doAdd()"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="flag">{{
          isEdit ? '确 定' : '添 加'
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类结束 -->
  </div>
</template>

<script>
import {
  getArtListApi,
  addArtListApi,
  delArtListApi,
  upDateArtListApi
} from '../../api/art.js'
export default {
  name: 'artcategory',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        cate_name: '',
        cate_alias: ''
      },
      formLabelWidth: '80px',
      rules: {
        cate_name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'submit'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'submit'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'submit' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'submit'
          }
        ]
      },
      isEdit: false
    }
  },
  created () {
    this.getArt()
  },
  computed: {},
  methods: {
    addCate () {
      this.form = {
        cate_name: '',
        cate_alias: ''
      }
      this.dialogFormVisible = true
      this.isEdit = false
    },
    doAdd () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await addArtListApi(this.form)
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getArt()
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }
      })
    },
    doEdit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await upDateArtListApi(this.form)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getArt()
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }
      })
    },
    flag () {
      this.isEdit ? this.doEdit() : this.doAdd()
    },
    async getArt () {
      const res = await getArtListApi()
      this.tableData = res.data.data
    },
    handleEdit (index, row) {
      this.form = {
        cate_name: '',
        cate_alias: ''
      }
      if (row.id === 1 || row.id === 2) {
        this.$message({
          type: 'error',
          message: ' 管理员不允许删除这个分类'
        })
        return false
      }
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
      this.isEdit = true
    },

    handleDelete (row) {
      if (row.id === 1 || row.id === 2) {
        this.$message({
          type: 'error',
          message: ' 管理员不允许删除这个分类'
        })
        return false
      }
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const res = await delArtListApi(row.id)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getArt()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang='less' scoped>
// .el-card__body {
//   padding: 10px;
// }
.el-table {
  border: 1px solid #ebeef5;
  margin-top: 10px;
}
</style>
