<template>
  <div>
    <el-card>
      <!-- 面包屑开始 -->
      <div slot="header" class="clearfix">
        <bread first="文章管理" second="文章分类"></bread>
      </div>
      <!-- 筛选 -->
      <div class="choose">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          ref="from1"
        >
          <el-form-item label="文章分类">
            <el-select v-model="formInline.cate_id" placeholder="请选择分类">
              <el-option
                v-for="item in cateLis"
                :key="item.id"
                :label="item.cate_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select v-model="formInline.state" placeholder="请选择状态">
              <el-option value="草稿"></el-option>
              <el-option value="已发布"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="reSubmit">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button style="height: 38px" type="primary" @click="addArt"
          >发布文章</el-button
        >
      </div>
      <!-- 筛选 -->

      <!-- 表格 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="文章标题" width="180" prop="title">
        </el-table-column>
        <el-table-column label="分类" width="180" prop="cate_name">
        </el-table-column>
        <el-table-column label="发表时间" width="180">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{
              forMateTime(scope.row.pub_date)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 -->

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pagenum"
        :page-sizes="[1, 2, 3, 5, 10]"
        :page-size="formInline.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页 -->
      <!-- 面包屑结束 -->
    </el-card>
    <!-- 添加文章对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="dialogFormVisible"
      fullscreen
      :before-close="handleClose"
    >
      <pubArt :cateLis="cateLis" @success="success" ref="pubArt"></pubArt>
    </el-dialog>
    <!-- 添加文章对话框 -->
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getArtListApi, getCateInfoApi, delArticleApi } from '../../api/art.js'
export default {
  name: 'artlist',
  data () {
    return {
      formInline: {
        state: '',
        cate_id: '',
        pagenum: 1,
        pagesize: 2
      },
      tableData: [],
      cateLis: [],
      total: 0,
      dialogFormVisible: false
    }
  },
  created () {
    this.getArt() // 获取筛选下拉框中的数据
    this.getArticle() // 获取表格中的数据
  },
  computed: {},

  methods: {
    handleClose () {
      this.$confirm('次操作将导致文章信息丢失,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          console.log(this.$refs.pubArt)
          this.$refs.pubArt.initForm()
          this.dialogFormVisible = false
        })
        .catch((_) => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 格式化时间
    forMateTime (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取列表数据
    async getArt () {
      const res = await getArtListApi()
      this.cateLis = res.data.data
    },
    // 获取表格初始数据
    async getArticle () {
      const res = await getCateInfoApi(this.formInline)
      this.tableData = res.data.data
      this.total = res.data.total
    },
    // 筛选数据按钮
    onSubmit () {
      this.formInline.pagenum = 1
      this.getArticle()
    },
    // 重置数据按钮
    reSubmit () {
      this.formInline = {
        state: '',
        cate_id: '',
        pagenum: 1,
        pagesize: 2
      }
      this.getArticle()
    },
    handleEdit (index, row) {
      // console.log(index, row)
    },
    // 删除按钮
    async handleDelete (index, row) {
      // console.log(index, row)
      const res = await delArticleApi({ id: row.id })
      if (res.data.code === 0) {
        this.$message({
          type: 'success',
          message: res.data.message
        })
        this.reSubmit()
      }
    },
    /* 触发分页事件 */
    handleSizeChange (val) {
      this.formInline.pagesize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      this.formInline.pagenum = val
      this.getArticle()
    },
    success () {
      this.dialogFormVisible = false
      this.getArticle()
    },
    // 发布文章
    addArt () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
.choose {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin: 0px 13px 0 0;
  }
}
</style>
