angular.module('MetronicApp').controller('dashboardController', function ($interval, $rootScope, $scope) {

    var data = {
        "北京": {
            'GPS': [24, 23, 43, 23, 23, 23, 23, 23, 64, 57, 23, 23],
            'BDS': [29, 23, 63, 23, 23, 63, 23, 23, 64, 57, 43, 23],
            'GLO': [24, 23, 43, 23, 23, 23, 53, 23, 64, 57, 23, 23]
        },
        "上海": {
            'GPS': [24, 23, 43, 23, 23, 43, 43, 23, 64, 57, 23, 23],
            'BDS': [24, 23, 43, 23, 23, 53, 23, 23, 64, 57, 23, 23],
            'GLO': [24, 23, 43, 33, 23, 23, 23, 23, 64, 57, 23, 33]
        }
    };

    var timeArray = []   //时间
    var bdsatnumArray = []   //北斗
    var gpsatnumArray = []   //GPS
    var glsatnumArray = []   //GLONASS

    function gTestData() {
        return {
            "abserror": {  //绝对误差
                "hor": "4.8",  //水平
                "ver": "5.5"   //垂直
            },
            "accinfo": {   //定位精度
                "hacc": 1.04,  //水平
                "vacc": 1.29   //垂直
            },
            "alarmthreshold": {   //告警阈值-------修改过
                "horacc": 10,   //水平定位精度
                "hpl": 8,      //水平误差告警门限
                "ion": 10,      //电离层发散异常
                "pdop": 10,     //PDOP阈值
                "pr": 10,       //伪距残差异常
                "veracc": 9,   //垂直定位精度
                "vpl": 7       //垂直误差告警门限
            },
            "dopinfo": {    //DOP值--------修改过
                "hdop": 1.04,   //hdop
                "vdop": 1.29,   //vdop
                "pdop": 2.12    //pdop
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
                "hpl": "0.5",  //水平
                "vpl": "0.6"   //垂直
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
                "bdsatnum": Math.floor(Math.random() * 40),  //北斗
                "glsatnum": Math.floor(Math.random() * 40),  //GPS
                "gpsatnum": Math.floor(Math.random() * 40)//GLONASS
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
        //update_chart_data();
    });
    var socket = io.connect('http://192.168.1.30:3000');
    socket.on('new', function (data) {
       // DopChart.initCharts(data);
        //console.log(data)
    });

    function update_chart_data() {
        if (localStorage.getItem('base_station') && localStorage.getItem('signal_type')) {
            var bs = localStorage.getItem('base_station');
            var st = localStorage.getItem('signal_type');
            if (bs != '基站' && st != '信号类型') {
                DopChart.initCharts(data[bs][st]);
            }
        }
    }

    function showTime() {
        var date = new Date();
        var now = "";
        if (date.getHours() < 10) now = "0"
        now = now + date.getHours() + ":";
        if (date.getMinutes() < 10) now = now + "0"
        return now + date.getMinutes();
    }

    $scope.nowTime = showTime()

    function showChartTooltip(x, y, xValue, yValue) {
        $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
            position: 'absolute',
            display: 'none',
            top: y - 40,
            left: x - 40,
            border: '0px solid #ccc',
            padding: '2px 6px',
            'background-color': '#fff'
        }).appendTo("body").fadeIn(200);
    }

    function starMap(data) {
        anychart.onDocumentReady(function () {
            var dataSet = anychart.data.set(data);
            var seriesData = dataSet.mapAs({x: [0], value: [1]});
            var chart = anychart.polar();
            chart.container('starMap');
            chart.yScale().minimum(0).maximum(16);
            chart.xScale().minimum(0).maximum(360);
            chart.xScale().ticks().interval(60);
            chart.xAxis().labels().textFormatter(function () {
                return this['value'] + '°'
            });
            chart.marker(seriesData);
            chart.draw();
        });
    }

    // 11-9 ---------------update lineChart------------

    function lineChart(chartId, data, color) {
        if (!jQuery.plot) return;
        if ($('#' + chartId).size() != 0) {
            var previousPoint2 = null;
            $('#' + chartId + '_loading').hide();
            $('#' + chartId + '_content').show();
            $.plot($("#" + chartId),
                [{
                    data: data,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: [color]
                }, {
                    data: data,
                    points: {
                        show: true,
                        radius: 4,
                        fillColor: color,
                        lineWidth: 2
                    },
                    color: color,
                    shadowSize: 1
                }, {
                    data: data,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: color,
                    shadowSize: 0
                }],

                {

                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: "categories",
                        min: 0,
                        font: {
                            lineHeight: 18,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

            appendChart(chartId)
        }
    }


    function appendChart(chartId) {

        $("#" + chartId).bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
            if (item) {
                if (previousPoint2 != item.dataIndex) {
                    previousPoint2 = item.dataIndex;
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
                }
            }
        });
        $('#' + chartId).bind("mouseleave", function () {
            $("#tooltip").remove();
        });
    }

    var DopChart = function () {
        return {
            initCharts: function (Data) {
                $scope.satelliteData = {
                    compassSatellite: 29,
                    gpsSatellite: 23,
                    glsSatellite: 12
                };
                var visitors = [
                    ['02/2013', Data[0]],
                    ['03/2013', Data[9]],
                    ['04/2013', Data[6]],
                    ['05/2013', Data[5]],
                    ['06/2013', Data[4]],
                    ['07/2013', Data[3]],
                    ['08/2013', Data[2]],
                    ['09/2013', Data[7]],
                    ['10/2013', Data[1]]
                ];
                lineChart("site_activities", visitors, "#9ACAE6");
                lineChart("site_statistics", visitors, "#d85d84");
                lineChart("chartPositionPrecision", visitors, "#f4ee42");
                lineChart("absoluteError", visitors, "#68f442");
                lineChart("protectionLevel", visitors, "#68f442");
                lineChart("utcContinuity", visitors, "#8342f4");
                lineChart("chartPositionPrecision", visitors, "#f44292");

            }
        };

    }();

    //update_chart_data();


    function reverseString(str) {
        return str.split("").reverse().join("");
    }


    var startData = [
        [180, 6],
        [195, 3],
        [210, 6],
        [225, 6],
        [240, 6],
        [255, 5],
        [270, 4],
        [285, 10],
        [300, 4],
        [315, 8]
    ];


    function getDataArray(array, newData) {
        if (array.length > 5) {
            array.shift();
            array.push(newData);
        } else {
            array.push(newData);
        }
        return array
    }

    function getSatelliteNumber(data) {
        var satnumSeries = []
        console.log(data.satnum[1])
        timeArray = getDataArray(timeArray, showTime())
        satnumSeries.push(getChartSeries('BDS', 'line', getDataArray(bdsatnumArray, data.satnum.bdsatnum)))
        satnumSeries.push(getChartSeries('GPS', 'line', getDataArray(gpsatnumArray, data.satnum.gpsatnum)))
        satnumSeries.push(getChartSeries('GLONASS', 'line', getDataArray(glsatnumArray, data.satnum.glsatnum)))
        return getChartData(timeArray, satnumSeries)
    }

    function getChartSeries(name, type, array) {
        return {
            name: name,
            type: type,
            data: array
        }
    }


    function getChartData(xAxis, yAxis, yName) {
        return {
            xAxis: [{
                name: '时间',
                boundaryGap: true,
                data: xAxis
            }],
            series: yAxis
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
        lineChart(getSatelliteNumber(gTestData()), 'satelliteNumber', '颗')
    }

    lineChart(getSatelliteNumber(gTestData()), 'satelliteNumber', '颗')

    $interval(showChart, 5000)

    $interval(showTime, 1000)


    function lineChart(chartData, chartID, yName) {
        require.config({
            paths: {
                echarts: 'assets/global/plugins/echarts/'
            }
        });
        require(['echarts', 'echarts/chart/bar', 'echarts/chart/line'], function (ec) {
                var myChart = ec.init(document.getElementById(chartID));
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
                        data: ['BDS', 'GPS', 'GLONASS']
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


