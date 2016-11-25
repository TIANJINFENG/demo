angular.module('MetronicApp').controller('dashboardController', function ($interval, $rootScope, $scope) {

    var timeArray = []   //时间
    var data_array = {
        "BDS": [],
        "GLS": [],
        "GPS": [],
        "hor": [],
        "ver": [],
        "hacc": [],
        "vacc": [],
        "hdop": [],
        "vdop": [],
        "pdop": [],
        "hpl": [],
        "vpl": [],
        "alt": [],
        "lat": [],
        "lon": [],
        "rura": [],
        "type": [],
        "udre": [],
        "utc": [],
    }

    function gTestData() {
        return {
            "abserror": {  //绝对误差
                "hor": Math.floor(Math.random() * 40),  //水平
                "ver": Math.floor(Math.random() * 40)   //垂直
            },
            "accinfo": {   //定位精度
                "hacc": Math.floor(Math.random() * 40),  //水平
                "vacc": Math.floor(Math.random() * 40)   //垂直
            },
            "alarmthreshold": {   //告警阈值-------修改过  //todo begain 添加数组
                "horacc": 10,   //水平定位精度
                "hpl": 8,      //水平误差告警门限
                "ion": 10,      //电离层发散异常
                "pdop": 10,     //PDOP阈值
                "pr": 10,       //伪距残差异常
                "veracc": 9,   //垂直定位精度
                "vpl": 7       //垂直误差告警门限    //todo end 添加数组
            },
            "dopinfo": {    //DOP值--------修改过
                "hdop": Math.floor(Math.random() * 40),   //hdop
                "vdop": Math.floor(Math.random() * 40),   //vdop
                "pdop": Math.floor(Math.random() * 40)    //pdop
            },
            "obsinfo": [
                {    //观测量数据，每次数量可能不同------修改过
                    "cn": [45.6, 41.2],                //载噪比array
                    "d": [240.96, 390.21],               //多普勒array
                    "l": [1978631.96498428, 1978631.96498428],   //载波相位array
                    "p": [3799755.3108061, 3799755.3108061],    //伪距array
                    "prn": 1,                  //卫星号
                    "residual": [0.1, 0.1],           //伪距残差array
                    "sys": 2,           //信号分量array  L G B
                    "svh": 0,                  //健康信息
                    "tow": 319582,             //周内秒
                    "week": 539,               //周计数
                    "ion": 10,                 //电离层发散
                    "Azi": 146,                //方位角
                    "Ele": 36                  //俯仰角
                },
                {
                    "cn": [39.5, 40.1],
                    "d": [212.2, 234.2],
                    "l": [2002171.33071472, 2002171.33071472],
                    "p": [3844959.5724251, 3844959.5724251],
                    "prn": 2,
                    "residual": [0.1, 0.1],
                    "sys": 2,
                    "svh": 0,
                    "tow": 319582,
                    "week": 539,
                    "ion": 10,
                    "Azi": 227,
                    "Ele": 29
                },
                {
                    "cn": [42.2, 40.8],
                    "d": [2456.69, 2345.67],
                    "l": [1293340.05842545, 1293340.05842545],
                    "p": [2461144.2301191, 2461144.2301191],
                    "prn": 13,
                    "residual": [0.1, 0.1],
                    "sys": 0,
                    "svh": 0,
                    "tow": 319582,
                    "week": 539,
                    "ion": 10,
                    "Azi": 179,
                    "Ele": 18
                },
                {
                    "cn": [47.7, 47.2],
                    "d": [1227.37, 1234.56],
                    "l": [1179919.40285889, 1179919.40285889],
                    "p": [2245311.7145721, 2245311.7145721],
                    "prn": 9,
                    "residual": [0.1, 0.1],
                    "sys": 0,
                    "svh": 0,
                    "tow": 319582,
                    "week": 539,
                    "ion": 10,
                    "Azi": 42,
                    "Ele": 35
                },
                {
                    "cn": [45.7, 45.8],
                    "d": [-1590.4, -1510.5],
                    "l": [1254898.57329086, 1254898.57329086],
                    "p": [2387992.0884496, 2387992.0884496],
                    "prn": 22,
                    "residual": [0.1, 0.1],
                    "sys": 1,
                    "svh": 0,
                    "tow": 319582,
                    "week": 539,
                    "ion": 10,
                    "Azi": 278,
                    "Ele": 72
                },
                {
                    "cn": [37.5, 38.3],
                    "d": [2674.92, 2345.67],
                    "l": [1431952.97916794, 1431952.97916794],
                    "p": [2724915.5881787, 2724915.5881787],
                    "prn": 15,
                    "residual": [0.1, 0.1],
                    "sys": 1,
                    "svh": 0,
                    "tow": 319582,
                    "week": 539,
                    "ion": 10,
                    "Azi": 91,
                    "Ele": 9
                }],
            "plinfo": {  //保护水平
                "hpl": Math.floor(Math.random() * 40),  //水平
                "vpl": Math.floor(Math.random() * 40)   //垂直
            },
            "posinfo": {   //定位信息
                "alt": 143.123,                  //高程
                "lat": 40.12345678,              //纬度
                "lon": 116.12345678,             //经度
                "rura": 1.57,                    //北斗区域用户距离精度
                "type": 0,                       //解算类型，2-北斗 0-GPS 1-GLONASS 3-兼容
                "udre": 2.62,                    //用户差分距离精度
                "utc": "2016-10-10 08:12:34"     //UTC时间
            },
            "satnum": {  //卫星数
                "BDS": Math.floor(Math.random() * 40),  //北斗
                "GLS": Math.floor(Math.random() * 40),  //GPS
                "GPS": Math.floor(Math.random() * 40)//GLONASS
            },
            "satpos": {  //卫星位置，三个系统，数量可能各有不同
                "bdsatpos": [  //北斗
                    {
                        "az": 146,  //方位角
                        "el": 36,   //俯仰角
                        "prn": 1    //卫星号
                    },
                    {
                        "az": 227,
                        "el": 29,
                        "prn": 2
                    },
                    {
                        "az": 190,
                        "el": 77,
                        "prn": 11
                    },
                    {
                        "az": 299,
                        "el": 77,
                        "prn": 6
                    },
                    {
                        "az": 188,
                        "el": 42,
                        "prn": 3
                    },
                    {
                        "az": 124,
                        "el": 25,
                        "prn": 4
                    },
                    {
                        "az": 246,
                        "el": 15,
                        "prn": 5
                    },
                    {
                        "az": 233,
                        "el": 51,
                        "prn": 14
                    },
                    {
                        "az": 254,
                        "el": 53,
                        "prn": 9
                    },
                    {
                        "az": 146,
                        "el": 26,
                        "prn": 12
                    },
                    {
                        "az": 173,
                        "el": 43,
                        "prn": 8
                    },
                    {
                        "az": 248,
                        "el": 23,
                        "prn": 13
                    }],
                "gpsatpos": [  //GPS
                    {
                        "az": 91,
                        "el": 9,
                        "prn": 15
                    },
                    {
                        "az": 48,
                        "el": 36,
                        "prn": 24
                    },
                    {
                        "az": 162,
                        "el": 63,
                        "prn": 18
                    },
                    {
                        "az": 193,
                        "el": 7,
                        "prn": 21
                    },
                    {
                        "az": 278,
                        "el": 72,
                        "prn": 22
                    },
                    {
                        "az": 102,
                        "el": 41,
                        "prn": 12
                    },
                    {
                        "az": 33,
                        "el": 25,
                        "prn": 6
                    },
                    {
                        "az": 302,
                        "el": 51,
                        "prn": 14
                    }
                ],
                "glsatpos": [  //GLONASS
                    {
                        "az": 179,
                        "el": 18,
                        "prn": 13
                    },
                    {
                        "az": 129,
                        "el": 58,
                        "prn": 4
                    },
                    {
                        "az": 308,
                        "el": 24,
                        "prn": 5
                    },
                    {
                        "az": 243,
                        "el": 15,
                        "prn": 8
                    },
                    {
                        "az": 42,
                        "el": 35,
                        "prn": 9
                    },
                    {
                        "az": 86,
                        "el": 33,
                        "prn": 10
                    },
                    {
                        "az": 51,
                        "el": 60,
                        "prn": 12
                    }]
            },
            "station": "0"  //监控站索引0-n
        }
    };


    $scope.$on('to-child', function (event, type) {

    });
    var socket = io.connect('http://192.168.1.30:3000');
    socket.on('new', function (data) {
       console.log(data)
    });

    function showTime() {
        var date = new Date();
        var now = "";
        if (date.getHours() < 10) now = "0"
        now = now + date.getHours() + ":";
        if (date.getMinutes() < 10) now = now + "0"
        return now + date.getMinutes();
    }

    function showSatelliteNum(data) {
        $scope.satelliteData = {
            "compassSatellite": data.satpos.bdsatpos.length,
            "gpsSatellite": data.satpos.gpsatpos.length,
            "glsSatellite": data.satpos.glsatpos.length
        }
    }

    function starMapData() {
        var arr =[]
        var data = gTestData();
        showSatelliteNum(data);
        for(var i = 0;;i++) {
            var  arr2 = []
            if(data.satpos.bdsatpos[i]){
                arr2[0]=(data.satpos.bdsatpos[i].az)
                arr2[1]=(data.satpos.bdsatpos[i].el)
            }
            if(data.satpos.gpsatpos[i]){
                arr2[2]=(data.satpos.gpsatpos[i].az)
                arr2[3]=(data.satpos.gpsatpos[i].el)
            }
            if(data.satpos.glsatpos[i]){
                arr2[4]=(data.satpos.glsatpos[i].az)
                arr2[5]=(data.satpos.glsatpos[i].el)
            }
            arr.push(arr2);
            if(!data.satpos.bdsatpos[i] && !data.satpos.gpsatpos[i] && !data.satpos.glsatpos[i]) {
                break;
            }
        }
        return arr;

    }

    function starMap(data) {
        anychart.onDocumentReady(function () {
            var dataSet = anychart.data.set(data);
            var bdsStarData = dataSet.mapAs({x: [0], value: [1]});
            var gpsStarData = dataSet.mapAs({x: [2], value: [3]});
            var glsStarData = dataSet.mapAs({x: [4], value: [5]});
            chart = anychart.polar();
            chart.container('starMap');
            chart.yScale().minimum(0).maximum(90);
            chart.yScale().ticks().interval(10);
            chart.xScale().maximum(360);
            chart.xScale().ticks().interval(30);
            chart.xAxis().labels().textFormatter(function() {
                return this['value'] + '°'
            });
            chart.title(false);
            chart.legend()
                .align('center')
                .enabled(true);
            var series1 = chart.marker(bdsStarData);
            series1.name('北斗');
            var series2 = chart.marker(gpsStarData);
            series2.name('GPS');
            var series3 = chart.marker(glsStarData);
            series3.name('GLS');
            chart.draw();
        });
    }

    function getDataArray(array, newData) {
        if (array.length > 5) {
            array.shift();
            array.push(newData);
        } else {
            array.push(newData);
        }
        return array
    }

    function getSatelliteNumber(timeArray,data,key,dataArray) {
        return getChartData(timeArray, type_line(data,key,dataArray));
    }


    function type_line(data,key,dataArray) {
        var satDataArray = [];
        var lineName = []
        var chartValue = {}
        for (var i in data[key] ) {
            satDataArray.push(getChartSeries(i, 'line', getDataArray(dataArray[i], data[key][i])));
            lineName.push(i);
        }
        chartValue.satDataArray = satDataArray;
        chartValue.lineName = lineName;
        return chartValue;
    }

    function getChartSeries(name, type, array) {
        return {
            name: name,
            type: type,
            data: array
        }
    }


    function getChartData(xAxis, yAxis) {
        return {
            legendData:yAxis.lineName,
            xAxis: [{
                name: '时间',
                boundaryGap: true,
                data: xAxis
            }],
            series: yAxis.satDataArray
        }
    }

    chartData2 = {
        xAxis: [{
            name: "时间",
            data: ['11:00', '12:00']
        }],
        series: [
            {
                name: 'BDS',
                type: 'line',
                data: [3, 12]
            }, {
                name: 'GPS',
                type: 'line',
                data: [2, 22]
            }, {
                name: 'GLONASS',
                type: 'line',
                data: [2, 23]
            }]
    }


    function showChart() {
        timeArray = getDataArray(timeArray, showTime())
        lineChart(getSatelliteNumber(timeArray,gTestData(),'satnum',data_array), 'satelliteNumber', '颗')
        lineChart(getSatelliteNumber(timeArray,gTestData(),'dopinfo',data_array), 'DopValue', 'DOP值')
        lineChart(getSatelliteNumber(timeArray,gTestData(),'abserror',data_array), 'absoluteError', '值')
        lineChart(getSatelliteNumber(timeArray,gTestData(),'accinfo',data_array), 'chartPositionPrecision', '值')
        lineChart(getSatelliteNumber(timeArray,gTestData(),'plinfo',data_array), 'protectionLevel', '值')
    }

    function init() {
        showChart();
        starMap(starMapData());
        $scope.nowTime = showTime()
        $interval(showChart, 5000)
        $interval(showTime, 1000)
    }
    init();

    function lineChart(chartData, chartId, yName) {
        $('#' + chartId + '_loading').hide();
        $('#' + chartId + '_content').show();
        require.config({
            paths: {
                echarts: 'assets/global/plugins/echarts/'
            }
        });
        require(['echarts', 'echarts/chart/bar', 'echarts/chart/line'], function (ec) {
                var myChart = ec.init(document.getElementById(chartId));
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    legend: {
                        data: chartData.legendData
                    },
                    xAxis: chartData.xAxis,
                    yAxis: [{
                        type: 'value',
                        scale: true,
                        name: yName
                    }],
                    series: chartData.series
                });
            }
        );
    }

});


