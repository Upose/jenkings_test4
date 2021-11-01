//  用户统计 echarts 对象
// let color= '#fff22';
// let color1= '#56235d';
// let color2= '#fff22';

export default {
    option1(data){
        var list = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '12%',
                right: '10%',
                bottom: '10%',
                top:'30%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2021-06-13', '2021-06-14', '2021-06-15', '2021-06-16', '2021-06-17', '2021-06-18', '2021-06-19']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return list;
    },
    option2(data){
        var list = {
            tooltip: {
                trigger: 'item',
                show:false,//鼠标移入不显示hover弹窗
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        
                        label: {
                            show: false,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        {value: 1048, name: '搜索引擎',selected:true},
                    ]
                }
            ]
        };
        return list;
    },
}


