<!-- 分类管理页面 -->
<template>
 <div>
     <el-button class="addCate"
       size="mini"
       type="primary"
       @click="dialogVisible = true" >
          新增
     </el-button>
     <el-dialog title="新增分类" :visible.sync="dialogVisible" width="25%">
         <el-form :model="cate">
             <el-form-item label="分类名称" :label-width="formLabelWidth">
                 <el-input v-model="cate.cateName"></el-input>
            </el-form-item>
            <el-form-item label="父分类" :label-width="formLabelWidth">
                <el-select v-model="cate.fatherId" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in fatherCates"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保存时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="cate.saveDate"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </div>
     </el-dialog>
    <el-table
    class="table"
     v-loading="loading"
     ref="multipleTable"
     :data="cates"
     tooltip-effect="dark"
     style="width: 90%"
     :row-class-name="tableRowClassName"
     @selection-change="handleSelectionChange"
     >
     <el-table-column
       type="selection"
       width="55">
     </el-table-column>
     <el-table-column
       prop="cateId"
       label="分类ID"
       width="200">
       <!-- <template slot-scope="scope">{{ scope.row.cateID }}</template> -->
     </el-table-column>
     <el-table-column
       prop="cateName"
       label="分类名称"
       width="200">
     </el-table-column>
     <el-table-column
       label="创建时间"
       width="155">
       <template slot-scope="cate">
         <span v-if="cate.row.saveDate === null">
           无
         </span>
         <span v-else>
         {{cate.row.saveDate | formatDate}}
         </span>
       </template>
      </el-table-column>
      <el-table-column
       label="更新时间"
       width="155">
       <template slot-scope="cate">
         <span v-if="cate.row.editDate === null">
           无
         </span>
         <span v-else>
         {{cate.row.editDate | formatDate}}
         </span>
       </template>
      </el-table-column>
      <el-table-column
       prop="count"
       label="该分类下的文章数量"
       width="200">
     </el-table-column>
      <el-table-column label="操作">
       <template slot-scope="cate">
        <el-button
          size="mini"
          type="primary"
          @click="edit(cate.row,cate.$index)"
          >编辑</el-button>
         <el-button v-if="cate.row.status != 0"
          size="mini"
          type="success"
          @click="rev(cate.row)"
          >恢复</el-button>
          <el-button v-if="cate.row.status != 1 "
          size="mini"
          type="danger"
          @click="discard(cate.row)"
          >删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    @current-change="handleCurrentChange"
    layout="total, prev, pager, next"
    :page-size=pageSize
    :total=pageTotal>
    </el-pagination>
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="25%">
         <el-form :model="cate">
             <el-form-item label="分类名称" :label-width="formLabelWidth">
                 <el-input v-model="cate.cateName"></el-input>
            </el-form-item>
            <el-form-item label="父分类" :label-width="formLabelWidth">
                <el-select v-model="cate.fatherId" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in fatherCates"
                    :key="item.categoryId"
                    :label="item.categoryName"
                    :value="item.categoryId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="保存时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="cate.saveDate"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCate">确 定</el-button>
        </div>
     </el-dialog>
 </div>
</template>

<script>
import {getCates, getFatherCates, saveCate, updateCate, discardCate, recoveryCate} from '@/api/admin/categories'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageTotal: 20,
      cates: [],
      fatherCates: [],
      loading: true,
      dialogVisible: false,
      editDialogVisible: false,
      cate: {
        cateId: null,
        cateName: '',
        fatherId: -1,
        saveDate: null,
        editDate: null,
        status: 0
      },
      status: 0,
      formLabelWidth: '100px',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {},

  computed: {},

  created () {
    this.getCates()
    this.getFatherCates()
  },

  mounted () {},

  methods: {
    getCates () {
      this.loading = true
      getCates(this.pageNo, this.pageSize).then(res => {
        let cates = res.data.data.list
        this.cates = cates
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    getFatherCates () {
      getFatherCates().then(res => {
        this.fatherCates = res.data.data
      })
    },
    tableRowClassName ({row}) {
      if (row.fatherId === '-1') {
        return 'success-row'
      } else {
        // console.log(row.fatherId)
        return 'warning-row'
      }
    },
    handleSelectionChange () {

    },
    edit (row, index) {
      this.cate = row
      this.editDialogVisible = true
      console.log(JSON.stringify(this.cate))
    },
    editCate () {
      updateCate(this.cate).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.getCates()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
        this.editDialogVisible = false
      })
    },
    rev (row) {
      this.$confirm('确认恢复名称为：' + row.cateName + '的分类？')
        .then(_ => {
          recoveryCate(row.cateId).then(res => {
            if (res.data.code === '200') {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              row.status = 0
              row.editDate = new Date().getTime()
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        })
        .catch(_ => {})
    },
    discard (row) {
      this.$confirm('确认删除名称为：' + row.cateName + '的分类？')
        .then(_ => {
          discardCate(row.cateId).then(res => {
            if (res.data.code === '200') {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              row.status = 1
              row.editDate = new Date().getTime()
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        })
        .catch(_ => {})
    },
    handleCurrentChange (val) {

    },
    addCate () {
      saveCate(this.cate).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.getCates()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
        this.dialogVisible = false
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.el-pagination {
  margin: 1%;
  margin-left: 3%
}
.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }
.addCate{
    margin: 1%;
    margin-left: 3%
}
.table{
  margin-left: 3%;
}
</style>
