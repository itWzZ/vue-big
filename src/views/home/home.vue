<template>
  <div>
    <div class="container-fluid">
      <el-row class="spannel_list" :gutter="10">
        <el-col :sm="6" :xs="12">
          <div class="spannel">
            <em>10015</em><span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor01">
            <em>123</em><span>篇</span>
            <b>日新增文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor02">
            <em>35</em><span>条</span>
            <b>评论总数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="spannel scolor03">
            <em>123</em><span>条</span>
            <b>日新增评论数</b>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <el-row class="curve-pie" :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="gragh_pannel" id="curve_show"></div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="gragh_pannel" id="pie_show"></div>
        </el-col>
      </el-row>
    </div>

    <div class="container-fluid">
      <div class="column_pannel" id="column_show"></div>
    </div>
    <div class="container-fluid">
      <div class="column_pannel" id="stacked_show"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: '',
  data () {
    return {}
  },
  created () {},
  computed: {},
  methods: {},
  mounted () {
    //  这里是第一个图
    var oChart = echarts.init(document.getElementById('curve_show'))
    var aListAll = [
      { count: 36, date: '2019-04-13' },
      { count: 52, date: '2019-04-14' },
      { count: 78, date: '2019-04-15' },
      { count: 85, date: '2019-04-16' },
      { count: 65, date: '2019-04-17' },
      { count: 72, date: '2019-04-18' },
      { count: 88, date: '2019-04-19' },
      { count: 64, date: '2019-04-20' },
      { count: 72, date: '2019-04-21' },
      { count: 90, date: '2019-04-22' },
      { count: 96, date: '2019-04-23' },
      { count: 100, date: '2019-04-24' },
      { count: 102, date: '2019-04-25' },
      { count: 110, date: '2019-04-26' },
      { count: 123, date: '2019-04-27' },
      { count: 100, date: '2019-04-28' },
      { count: 132, date: '2019-04-29' },
      { count: 146, date: '2019-04-30' },
      { count: 200, date: '2019-05-01' },
      { count: 180, date: '2019-05-02' },
      { count: 163, date: '2019-05-03' },
      { count: 110, date: '2019-05-04' },
      { count: 80, date: '2019-05-05' },
      { count: 82, date: '2019-05-06' },
      { count: 70, date: '2019-05-07' },
      { count: 65, date: '2019-05-08' },
      { count: 54, date: '2019-05-09' },
      { count: 40, date: '2019-05-10' },
      { count: 45, date: '2019-05-11' },
      { count: 38, date: '2019-05-12' }
    ]

    const aCount = []
    const aDate = []

    for (var i = 0; i < aListAll.length; i++) {
      aCount.push(aListAll[i].count)
      aDate.push(aListAll[i].date)
    }
    var chartopt = {
      title: {
        text: '月新增文章数',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['新增文章'],
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          name: '日',
          type: 'category',
          boundaryGap: false,
          data: aDate
        }
      ],
      yAxis: [
        {
          name: '月新增文章数',
          type: 'value'
        }
      ],
      series: [
        {
          name: '新增文章',
          type: 'line',
          smooth: true,
          areaStyle: { type: 'default' },
          itemStyle: { color: '#f80', lineStyle: { color: '#f80' } },
          data: aCount
        }
      ],
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,136,0,0.39)'
            },
            {
              offset: 0.34,
              color: 'rgba(255,180,0,0.25)'
            },
            {
              offset: 1,
              color: 'rgba(255,222,0,0.00)'
            }
          ])
        }
      },
      grid: {
        show: true,
        x: 50,
        x2: 50,
        y: 80,
        height: 220
      }
    }
    oChart.setOption(chartopt)

    // 第二个图

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pie_show'))
    // 绘制图表
    // var chartDom = document.getElementById('main')
    // var myChart = echarts.init(chartDom)
    var option

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }

    option && myChart.setOption(option)

    /* 第三个图 */

    var oColumn = echarts.init(document.getElementById('column_show'))
    var oColumnopt = {
      title: {
        text: '文章访问量',
        left: 'center',
        top: '10'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['奇趣事', '会生活', '爱旅行', '趣美味'],
        top: '40'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: false }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月']
        }
      ],
      yAxis: [
        {
          name: '访问量',
          type: 'value'
        }
      ],
      series: [
        {
          name: '奇趣事',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#fd956a'
          },
          data: [800, 708, 920, 1090, 1200]
        },
        {
          name: '会生活',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#2bb6db'
          },
          data: [400, 468, 520, 690, 800]
        },
        {
          name: '爱旅行',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#13cfd5'
          },
          data: [500, 668, 520, 790, 900]
        },
        {
          name: '趣美味',
          type: 'bar',
          barWidth: 20,
          areaStyle: { type: 'default' },
          itemStyle: {
            color: '#00ce68'
          },
          data: [600, 508, 720, 890, 1000]
        }
      ],
      grid: {
        show: true,
        x: 50,
        x2: 30,
        y: 80,
        height: 260
      },
      dataZoom: [
        // 给x轴设置滚动条
        {
          start: 0, // 默认为0
          end: 100 - 1000 / 31, // 默认为100
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0, // 滑动条的 左右2个滑动条的大小
          height: 8, // 组件高度
          left: 45, // 左边的距离
          right: 50, // 右边的距离
          bottom: 26, // 右边的距离
          handleColor: '#ddd', // h滑动图标的颜色
          handleStyle: {
            borderColor: '#cacaca',
            borderWidth: '1',
            shadowBlur: 2,
            background: '#ddd',
            shadowColor: '#ddd'
          }
        }
      ]
    }
    oColumn.setOption(oColumnopt)

    // 第四个图
    var chartDom1 = document.getElementById('stacked_show')
    var myChart1 = echarts.init(chartDom1)
    var option1

    option1 = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '文章阅读量'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgba(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgba(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgba(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgba(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgba(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    }

    option1 && myChart1.setOption(option1)
  }
}
</script>

<style lang='less' scoped >
.spannel_list {
  margin-top: 20px;
}

.spannel {
  height: 100px;
  overflow: hidden;
  text-align: center;
  position: relative;
  background-color: #fff;
  border: 1px solid #e7e7e9;
  margin-bottom: 20px;
}

.spannel em {
  font-style: normal;
  font-size: 50px;
  line-height: 50px;
  display: inline-block;
  margin: 10px 0 0 20px;
  font-family: 'Arial';
  color: #83a2ed;
}

.spannel span {
  font-size: 14px;
  display: inline-block;
  color: #83a2ed;
  margin-left: 10px;
}

.spannel b {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 24px;
  background: #e5e5e5;
  color: #333;
  font-size: 14px;
  font-weight: normal;
}

.scolor01 em,
.scolor01 span {
  color: #6ac6e2;
}

.scolor02 em,
.scolor02 span {
  color: #5fd9de;
}

.scolor03 em,
.scolor03 span {
  color: #58d88e;
}

.gragh_pannel {
  height: 350px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
  margin-bottom: 20px;
}

.column_pannel {
  margin-bottom: 20px;
  height: 400px;
  border: 1px solid #e7e7e9;
  background-color: #fff !important;
}
</style>
