// Japan Travel Guide - Charts
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var warmGold = style.getPropertyValue('--warm-gold').trim();
  var softGreen = style.getPropertyValue('--soft-green').trim();
  var skyBlue = style.getPropertyValue('--sky-blue').trim();

  // ── Chart: Budget Pie ──
  var budgetChart = echarts.init(document.getElementById('chart-budget'), null, { renderer: 'svg' });
  budgetChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return '<strong>' + p.name + '</strong><br/>¥' + p.value.toLocaleString() + ' (' + p.percent + '%)';
      }
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      top: 'center',
      textStyle: { color: ink, fontSize: 12 },
      itemGap: 12
    },
    series: [{
      name: '预算构成',
      type: 'pie',
      radius: ['38%', '68%'],
      center: ['33%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 3
      },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11,
        color: ink
      },
      labelLine: {
        lineStyle: { color: rule }
      },
      emphasis: {
        label: { fontSize: 13, fontWeight: 'bold' },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' }
      },
      data: [
        { value: 5000, name: '往返机票', itemStyle: { color: '#E8836A' } },
        { value: 8400, name: '住宿', itemStyle: { color: accent } },
        { value: 1320, name: '门票景点', itemStyle: { color: warmGold } },
        { value: 3500, name: '城际交通', itemStyle: { color: skyBlue } },
        { value: 2250, name: '市内交通/近郊', itemStyle: { color: softGreen } },
        { value: 8800, name: '餐饮美食', itemStyle: { color: accent2 } },
        { value: 3000, name: '购物杂费', itemStyle: { color: muted } }
      ]
    }]
  });

  // ── Chart: Daily Spending Bar ──
  var dailyChart = echarts.init(document.getElementById('chart-daily'), null, { renderer: 'svg' });
  var days = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7', 'Day8', 'Day9', 'Day10', 'Day11'];
  // Estimated daily spending (2 people, in CNY): flights + accommodation + tickets + transport + food
  var flights = [2500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2500];
  var accommodation = [550, 550, 550, 650, 650, 2800, 675, 675, 675, 675, 0];
  var tickets = [0, 850, 0, 40, 100, 80, 0, 0, 40, 0, 0];
  var transport = [100, 80, 80, 210, 80, 180, 1200, 550, 350, 120, 200];
  var food = [600, 800, 700, 800, 700, 0, 800, 700, 800, 900, 400];

  dailyChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var total = 0;
        var html = '<strong>' + params[0].axisValue + '</strong>';
        params.forEach(function(p) {
          if (p.value > 0) {
            total += p.value;
            html += '<br/>' + p.marker + ' ' + p.seriesName + ': ¥' + p.value.toLocaleString();
          }
        });
        html += '<br/><strong>合计: ¥' + total.toLocaleString() + '</strong>';
        return html;
      }
    },
    legend: {
      data: ['机票', '住宿', '门票', '交通', '餐饮'],
      bottom: 0,
      textStyle: { color: ink, fontSize: 12 },
      itemGap: 16
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '14%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: days,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '元 (CNY)',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11, formatter: '¥{value}' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '机票',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        itemStyle: { color: '#E8836A', borderRadius: [0, 0, 0, 0] },
        data: flights
      },
      {
        name: '住宿',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: accent },
        data: accommodation
      },
      {
        name: '门票',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: warmGold },
        data: tickets
      },
      {
        name: '交通',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: skyBlue },
        data: transport
      },
      {
        name: '餐饮',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: softGreen, borderRadius: [4, 4, 0, 0] },
        data: food
      }
    ]
  });

  // Resize
  window.addEventListener('resize', function() {
    budgetChart.resize();
    dailyChart.resize();
  });
})();
