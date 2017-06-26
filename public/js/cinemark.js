'use strict';
var cinemark = angular.module("cinemark", ['ngRoute', 'angular-carousel', 'ngResource', 'ngSanitize']);
cinemark.controller('moviesCtrl', ['$scope', '$controller', function ($scope, $controller) {
        console.log("CINEMARK");
        angular.extend(this,
            $controller('discoverCtrl', {$scope: $scope}),
            $controller('discoverCtrlScope', {$scope: $scope}),
            $controller('discoverCtrlFunctions', {$scope: $scope}));
    }])

    // Filters
    .filter('statusFilter', function () {
        return function (input, stat) {
            var out = [];
            angular.forEach(input, function (data) {
                if (data.status[stat] > 0) {
                    out.push(data);
                }
            });
            return out
        }
    })
    .filter("trust", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }])

    // Directives
    .directive('topNavigation', function () {
        return {
            restrict: 'E',
            templateUrl: 'html/top-navigation.html'
        };
    })
    .directive('mainContainer', function () {
        return {
            restrict: 'E',
            template: '<div ng-view></div>'
        };
    })
    .directive('toggleClass', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    element.toggleClass(attrs.toggleClass);
                });
            }
        };
    })

    // Configurations
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'html/login.html'
            })
            .when("/devazut", {
                templateUrl: "html/view-devazut.html"
            })
            .when("/vazute", {
                templateUrl: "html/view-vazute.html"
            })
            .when("/decolectie", {
                templateUrl: "html/view-decolectie.html"
            })
            .when("/groaznice", {
                templateUrl: "html/view-groaznice.html"
            })
            .when("/nuvreausavad", {
                templateUrl: "html/view-nuvreausavad.html"
            })
            .when("/film/:filmId", {
                templateUrl: "html/detalii-film.html",
            })
            .when("/descopera", {
                templateUrl: "html/view-home.html"
            })
            .when("/descopera/:pageNo", {
                templateUrl: "html/view-home.html"
            })
            .otherwise({
                templateUrl: "login.html"
            });
    });