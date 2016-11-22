/***
 GLobal Directives
 ***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope', '$state',
    function ($rootScope, $state) {
        return {
            link: function (scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function (event) {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
]).directive('baseStationList',function() {
    return {
        restrict: 'EA',
        controller: 'HeaderController',
        template:
        "<li ng-repeat='baseStation in allBaseStation'>"+
            "<a href='javascript:;' ng-click='changeBaseStation(baseStation)'>"+
                "<i class='icon-flag'></i> {{baseStation}} </a>"+
        "</li>"
    }
}).directive('signalTypeList',function() {
    return {
        restrict: 'EA',
        controller: 'HeaderController',
        template:
        "<li ng-repeat='signalType in allSignalType'>"+
        "<a href='javascript:;' ng-click='changeSignalType(signalType)'>"+
        "<i class='icon-flag'></i> {{signalType}} </a>"+
        "</li>"
    }
})



