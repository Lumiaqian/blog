<template>
  <div class="data-tabs">
    <el-row :span="24">
      <el-col :span="span" v-for="(item,index) in data" :key="index">
        <div class="item" :style="{background:item.color}">
          <div class="item-header">
            <p>{{item.title}}</p>
            <span>{{item.subtitle}}</span>
          </div>
          <div class="item-body">
            <count-to class="card-panel-num" :startVal="0" :endVal="item.count"></count-to>
          </div>
          <div class="item-footer">
            <span>{{item.allcount}}</span>
            <p>{{item.text}}</p>
          </div>
          <p class="item-tip">{{item.key}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  name: 'nx-data-tabs',
  data () {
    return {
      span: this.option.span || 6,
      data: this.option.data || []
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/data-tabs.scss";
.card-panel-num {
    font-size: 30px;
}
</style>
