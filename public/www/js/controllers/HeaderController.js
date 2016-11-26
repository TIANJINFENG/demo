MetronicApp.controller('HeaderController', ['$scope', '$http', function ($scope, $http) {
    var serveIp =  'http://192.168.1.30:3000';
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader();
    });

    $scope.allBaseStation = ['北京','上海'];
    $scope.allSignalType = ['BDS','GPS','GLS'];


    if (localStorage.getItem('baseStation') && localStorage.getItem('signalType')) {
        $scope.base_station = localStorage.getItem('baseStation');
        $scope.signal_type = localStorage.getItem('signalType');
    }
    $scope.changeBaseStation = function (name) {
        localStorage.setItem('baseStation', name)
        $scope.base_station = name;
        $scope.$emit('to-parent', name);
    }

    $scope.changeSignalType = function (name) {
        localStorage.setItem('signalType', name)
        $scope.signal_type = name;
        $scope.$emit('to-parent', name);
    }

    $scope.logoutGnss = function () {
        $http.get("http://192.168.1.30:3000/logout", {withCredentials: true}).success(function (req) {
            $scope.$emit('logout-to-parent', 'data');
        }).error(function (req) {
            isShowLogin(true, false)
        })

    }
}]);
