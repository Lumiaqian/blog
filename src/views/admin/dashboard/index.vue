<!-- 管理页面 -->
<template>
 <div>
   <data-tab :option="option"></data-tab>
   <div class="main">
     <div class="log">
       <h4 class="log-title">系统日志</h4>
       <el-timeline>
         <el-timeline-item :timestamp="log.createdDate | formatDateLog" placement="top" v-for="log in logs" :key="log.logId" color='#18cea4'>
          <el-card>
            <h4>{{log.operation}}</h4>
            <p>用户{{log.userId}}于{{log.createdDate | formatDate}}在IP为：{{log.ip}}的电脑上进行“{{log.operation}}”的操作</p>
          </el-card>
         </el-timeline-item>
      </el-timeline>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :page-size=pageSize
          :total=pageTotal
          v-show="logs.length!==0">
          </el-pagination>
     </div>
     <div class="chart">
       <div class="device">
         <h4 class="title">访客设备统计</h4>
         <ve-pie :data="deviceData" :settings="deviceChartSettings"></ve-pie>
       </div>
       <div class="city" >
         <h4 class="title">访客地理位置统计</h4>
         <ve-ring :data="cityData" :settings="cityChartSettings"></ve-ring>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import DataTab from '@/components/DataTab'
import { mapGetters } from 'vuex'
import {formatDate} from '@/utils/date.js'
import {getLogs} from '@/api/admin/log'
import {getDeviceCount} from '@/api/admin/count'
export default {
  data () {
    this.cityChartSettings = {
      roseType: 'radius',
      radius: [10, 100],
      offsetY: 200,
      limitShowNum: 5
      // dimension: '城市',
      // metrics: '访客'
    }
    this.deviceChartSettings = {
        level: [
          ['iOS', 'Android'],
          ['Windows 7', 'Windows 10', 'Mac OS X', 'Linux']
        ]
        // dimension: '设备',
        // metrics: '访客'
    }
    return {
      option: {
        span: 6,
        data: [
          {
            title: '文章统计',
            subtitle: '实时',
            count: this.postCount,
            allcount: this.postAllCount,
            text: '当前文章总记录数',
            color: 'rgb(117, 56, 199)',
            key: '章'
          },
          {
            title: '分类统计',
            subtitle: '实时',
            count: this.cateCount,
            // allcount: 10222,
            text: '当前分类总记录数',
            color: 'rgb(49, 180, 141)',
            key: '类'
          },
          {
            title: '标签统计',
            subtitle: '实时',
            count: this.tagCount,
            // allcount: 10222,
            text: '当前标签总记录数',
            color: 'rgb(56, 161, 242)',
            key: '签'
          },
          {
            title: '评论统计',
            subtitle: '实时',
            count: 908,
            // allcount: 10222,
            text: '评论次数',
            color: 'rgb(59, 103, 164)',
            key: '评'
          }
        ]
      },
      logs: [
      ],
      pageNum: 1,
      pageSize: 5,
      pageTotal: 20,
      deviceData: {
          columns: ['os', 'num'],
          rows: [
            { '设备': 'Windows 7', '访客': 1393 },
            { '设备': 'Windows 10', '访客': 3530 },
            { '设备': 'Mac OS', '访客': 2923 },
            { '设备': 'iOS', '访客': 1723 },
            { '设备': 'Android', '访客': 3792 },
            { '设备': 'Linux', '访客': 4593 }
          ]
      },
      cityData: {
          columns: ['city', 'num'],
          rows: [
            { '城市': '广州', '访客': 1393 },
            { '城市': '南昌', '访客': 3530 },
            { '城市': '北京', '访客': 2923 },
            { '城市': '上海', '访客': 1723 },
            { '城市': '深圳', '访客': 3792 },
            { '城市': '杭州', '访客': 4593 }
          ]
      }
    }
  },

  components: {
    DataTab
  },
  filters: {
    formatDateLog (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    ...mapGetters([
      'postCount',
      'tagCount',
      'cateCount',
      'postAllCount',
      'commentCount'
    ])
  },

  created () {
    this.getCount()
    this.getLogs(this.pageNum)
    this.getDeviceCount()
  },

  mounted () {},

  methods: {
    getCount () {
      this.$store.dispatch('setCount').then(() => {
        this.option.data[0].count = this.postCount
        this.option.data[0].allcount = this.postAllCount
        this.option.data[1].count = this.cateCount
        this.option.data[2].count = this.tagCount
        this.option.data[3].count = this.commentCount
      })
    },
    getLogs (pageNum) {
      return new Promise((reslove,reject) => {
        getLogs(pageNum,this.pageSize).then(res => {
          this.logs = res.data.data.list
          this.pageTotal = res.data.data.total
        }).catch(err => {
          this.$message.error("系统日志获取失败！")
          reject(err)
        })
      })
    },
    handleCurrentChange (val) {
      this.getLogs(val)
    },
    getDeviceCount () {
      return new Promise((resolve,reject) => {
        getDeviceCount().then(res => {
          // console.log("deviceCount: {}",res.data.data)
          this.deviceData.rows = res.data.data.os
          this.cityData.rows = res.data.data.city
          // console.log("os: {}",JSON.stringify(this.deviceData.rows))
          // console.log("city: {}",JSON.stringify(this.cityData.rows))
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.main{
  display: flex;
  flex-direction: row;
  margin: 2%;
}
.log{
  width: 40%;
}
.log-title{
  margin: 1%;
}
.chart{
  width: 50%;
  margin-top: 1%;
  margin-left: 5%;
}
// .device,.city{
//   display: flex;
// }
</style>
