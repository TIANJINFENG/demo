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

   


    $scope.$on('to-child', function (event, type) {

    });
    var socket = io.connect('http://192.168.1.30:3000');
    socket.on('new', function (data) {
        showChart(data);
    })
    socket.on('starmap', function (data) {
            starMap(starMapData(data))
        })


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

    function starMapData(data) {
        var arr =[]
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


    function showChart(data) {
        timeArray = getDataArray(timeArray, showTime())
        lineChart(getSatelliteNumber(timeArray,data,'satnum',data_array), 'satelliteNumber', '颗')
        lineChart(getSatelliteNumber(timeArray,data,'dopinfo',data_array), 'DopValue', 'DOP值')
        lineChart(getSatelliteNumber(timeArray,data,'abserror',data_array), 'absoluteError', '值')
        lineChart(getSatelliteNumber(timeArray,data,'accinfo',data_array), 'chartPositionPrecision', '值')
        lineChart(getSatelliteNumber(timeArray,data,'plinfo',data_array), 'protectionLevel', '值')
    }

    function init() {
        $scope.nowTime = showTime()
        $interval(showTime, 1000)
    }
    init()

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


