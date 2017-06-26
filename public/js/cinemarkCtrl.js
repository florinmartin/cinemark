//var cinemarkCtrl = angular.module("cinemark");

// Controllers
cinemark.controller('discoverCtrl', ['$scope', '$http', '$routeParams', '$location', '$anchorScroll', '$q', '$rootScope', function ($scope, $http, $routeParams, $location, $anchorScroll, $q, $rootScope) {

    $scope.init = function () {
        $rootScope.$broadcast('init');
    };
    $scope.$on('init', function (event, args) {
        console.log("Welcome to Cinemark");
        $scope.initList();
    });
    $scope.$on('initMoviesDiscover', function (event, page, genre, year, no_genre) {
        $scope.initMovieDiscover(page, genre, year, no_genre);
    });
    $scope.$on('initMovieDetails', function (event, arg) {
        $scope.initMovieDetails(arg);
    });
    $scope.$on('initListPage', function (event, arg) {
        $scope.initList();
    });

}]);