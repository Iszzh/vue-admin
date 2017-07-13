<template>
  <div class="charts">
    <el-button type='info' @click="changeType">切换图表类型</el-button>
    <ve-chart :data="chartData" :settings="chartSettings" tooltip-visible legend-visible></ve-chart>
  </div>
</template>

<script>
export default {
  data(){
    return{
      chartSettings:{}
    }
  },
  methods: {
    changeType: function () {
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    }
  },
  created: function () {
    this.chartData = {
      columns: ['日期', '销售额-1季度'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523 },
        { '日期': '1月2日', '销售额-1季度': 1223 },
        { '日期': '1月3日', '销售额-1季度': 2123 },
        { '日期': '1月4日', '销售额-1季度': 4123 },
        { '日期': '1月5日', '销售额-1季度': 3123 },
        { '日期': '1月6日', '销售额-1季度': 7123 }
      ]
    }
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0
    this.chartSettings = { type: this.typeArr[this.index] }
  }
}
</script>

<style>
@media screen and (min-width:1400px){
  .charts{
    width: 1400px;
  }
}
@media screen and (min-width:1200px) and (max-width:1400px){
  .charts{
    width: 1000px;
  }
}
@media screen and (min-width:960px) and (max-width:1200px){
  .charts{
    width: 900px;
  }
}
@media screen and (min-width:560px) and (max-width:960px){
  .charts{
    width: 500px;
  }
}

</style>
