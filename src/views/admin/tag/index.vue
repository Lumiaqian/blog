<!-- tag标签管理 -->
<template>
 <div>
     <el-button class="addTag"
       size="mini"
       type="primary"
       @click="dialogVisible = true" >
          新增
     </el-button>
     <el-dialog title="新增标签" :visible.sync="dialogVisible" width="25%">
         <el-form :model="tag">
             <el-form-item label="标签名称" :label-width="formLabelWidth">
                 <el-input v-model="tag.tagName"></el-input>
            </el-form-item>
            <el-form-item label="保存时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="tag.saveDate"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTag">确 定</el-button>
        </div>
     </el-dialog>
     <el-table
     v-loading="loading"
     ref="multipleTable"
     :data="tags"
     tooltip-effect="dark"
     style="width: 100%"
     @selection-change="handleSelectionChange">
     <el-table-column
       type="selection"
       width="55">
     </el-table-column>
     <el-table-column
       prop="tagId"
       label="标签ID"
       width="200">
       <!-- <template slot-scope="scope">{{ scope.row.tagID }}</template> -->
     </el-table-column>
     <el-table-column
       prop="tagName"
       label="标签名称"
       width="200">
     </el-table-column>
     <el-table-column
       label="保存时间"
       width="155">
       <template slot-scope="tag">
         <span v-if="tag.row.saveDate === null">
           无
         </span>
         <span v-else>
         {{tag.row.saveDate | formatDate}}
         </span>
       </template>
     </el-table-column>
     <el-table-column
       label="编辑时间"
       width="155">
       <template slot-scope="tag">
         <span v-if="tag.row.editDate === null">
           无
         </span>
         <span v-else>
         {{tag.row.editDate | formatDate}}
         </span>
       </template>
     </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="tag">
        <el-button
          size="mini"
          type="primary"
          @click="edit(tag.row,tag.$index)"
          >编辑</el-button>
         <el-button v-if="tag.row.status != 0"
          size="mini"
          type="success"
          @click="rev(tag.row)"
          >恢复</el-button>
          <el-button v-if="tag.row.status != 1 "
          size="mini"
          type="danger"
          @click="discard(tag.row)"
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
  <el-dialog title="编辑标签" :visible.sync="editDialogVisible" width="25%">
         <el-form :model="tag">
             <el-form-item label="标签名称" :label-width="formLabelWidth">
                 <el-input v-model="tag.tagName"></el-input>
            </el-form-item>
            <el-form-item label="保存时间" :label-width="formLabelWidth">
                <el-date-picker
                v-model="tag.saveDate"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editTag">确 定</el-button>
        </div>
     </el-dialog>
 </div>
</template>

<script>
import {getTagList, addTag, updateTag, discardTag, recoveryTag} from '@/api/admin/tags'
import {formatDate} from '@/utils/date.js'
export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageTotal: 20,
      tags: [],
      loading: true,
      dialogVisible: false,
      editDialogVisible: false,
      selectIndex: 0,
      tag: {
        tagId: null,
        tagName: '',
        saveDate: null,
        editDate: null,
        status: 0
      },
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
    this.getTags()
  },

  mounted () {},

  methods: {
    getTags () {
      this.loading = true
      getTagList(this.pageNo, this.pageSize).then(res => {
        let tags = res.data.data.list
        this.tags = tags
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    handleSelectionChange () {

    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.loading = true
      getTagList(val, this.pageSize).then(res => {
        let tags = res.data.data.list
        this.tags = tags
        this.pageNo = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.pageTotal = res.data.data.total
        this.loading = false
      })
    },
    edit (row, index) {
      this.tag = row
      console.log(index)
      this.selectIndex = index
      this.editDialogVisible = true
    },
    editTag () {
      updateTag(this.tag).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.editDialogVisible = false
          this.getTags()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    rev (row) {
      this.$confirm('确认恢复名称为：' + row.tagName + '的标签？')
        .then(_ => {
          recoveryTag(row.tagId).then(res => {
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
      this.$confirm('确认删除名称为：' + row.tagName + '的标签？')
        .then(_ => {
          discardTag(row.tagId).then(res => {
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
    addTag () {
      console.log(this.tag.saveDate + this.tag.tagName)
      addTag(this.tag).then(res => {
        if (res.data.code === '200') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.dialogVisible = false
          this.getTags()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}

</script>
<style scoped rel="stylesheet/scss" lang="scss">
.el-pagination {
  margin: 1%;
}
.addTag {
    margin: 1%;
}
</style>
