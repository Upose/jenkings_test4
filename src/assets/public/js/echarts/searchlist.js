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
                left: '5%',
                right: '5%',
                bottom: '5%',
                top:'10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['1924', '1945', '1966', '1987', '2008']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290],
                type: 'line'
            }]
        };
        return list;
    },
}


