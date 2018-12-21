<!-- 搜索界面 -->
<template>
  <div class="search">
    <div>
        <el-autocomplete
          class="inline-input"
          v-model="keyword"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
        <el-button type="success" icon="el-icon-search" circle></el-button>
    </div>
    <img src="http://pj9aecdab.bkt.clouddn.com/血小板施工.jpg" class="img">
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    querySearch () {

    },
    handleSelect (item) {

    }
  }
}

</script>
<style lang='scss' scoped>
.search{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.img{
    height: 200px;
    margin: 3%;
}
</style>
