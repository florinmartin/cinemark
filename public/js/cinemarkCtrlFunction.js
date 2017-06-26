//var cinemarkCtrl = angular.module("cinemark");

// Controllers
cinemark.controller('discoverCtrlFunctions', ['$scope', '$http', '$routeParams', '$location', '$anchorScroll', '$q', '$rootScope', '$sce', function ($scope, $http, $routeParams, $location, $anchorScroll, $q, $rootScope, $sce) {

    $scope.initSessionTMDB = function () {
        console.log("Start TheMovieDb session");
        initTheMovieDbSession();
    };
    function initTheMovieDbSession() {
        theMovieDb.authentication.generateToken(function (datafortoken) {
            $scope.theMovieDb.token = JSON.parse(datafortoken).request_token;
            theMovieDb.authentication.validateUser({
                "request_token": $scope.theMovieDb.token,
                "username": "******",
                "password": "******"
            }, function (dataforvalidation) {
                theMovieDb.authentication.generateSession({"request_token": $scope.theMovieDb.token}, function (dataforsession) {
                    $scope.theMovieDb.sessionId = JSON.parse(dataforsession).session_id;
                    $rootScope.$broadcast('sessionInitialized');
                }, function (error) {
                    alert(JSON.parse(error).status_message);
                });
            }, function (error) {
                alert(JSON.parse(error).status_message);
            });
        }, function (error) {
            alert(JSON.parse(error).status_message);
        });
    }

    $scope.initList = function () {
        console.log("Start lists initialization");
        initTheMovieDbLists();
    };
    function initTheMovieDbLists() {
        // Get "Vreau sa vad" list
        theMovieDb.lists.getById({"id": "11570"}, function (data1) {
            $scope.lists.devazut = JSON.parse(data1);
            $scope.lists.devazut.movieIds = [];
            angular.forEach($scope.lists.devazut.items, function (value1) {
                $scope.lists.devazut.movieIds.push(value1.id);
            });
            // Get "Vazute" list
            theMovieDb.lists.getById({"id": "11586"}, function (data2) {
                $scope.lists.vazute = JSON.parse(data2);
                $scope.lists.vazute.movieIds = [];
                angular.forEach($scope.lists.vazute.items, function (value2) {
                    $scope.lists.vazute.movieIds.push(value2.id);
                });
                // Get "De colectie" list
                theMovieDb.lists.getById({"id": "11589"}, function (data3) {
                    $scope.lists.decolectie = JSON.parse(data3);
                    $scope.lists.decolectie.movieIds = [];
                    angular.forEach($scope.lists.decolectie.items, function (value3) {
                        $scope.lists.decolectie.movieIds.push(value3.id);
                    });
                    // Get "Groaznice" list
                    theMovieDb.lists.getById({"id": "11588"}, function (data4) {
                        $scope.lists.groaznice = JSON.parse(data4);
                        $scope.lists.groaznice.movieIds = [];
                        angular.forEach($scope.lists.groaznice.items, function (value4) {
                            $scope.lists.groaznice.movieIds.push(value4.id);
                        });
                        // Get "Nu vreau sa vad" list
                        theMovieDb.lists.getById({"id": "11587"}, function (data5) {
                            $scope.lists.nuvreausavad = JSON.parse(data5);
                            $scope.lists.nuvreausavad.movieIds = [];
                            angular.forEach($scope.lists.nuvreausavad.items, function (value5) {
                                $scope.lists.nuvreausavad.movieIds.push(value5.id);
                            });
                            // Apply all
                            $scope.$apply();
                            $rootScope.$broadcast('addMovieListIcon');
                            console.log("Lists initialized");

                        }, function (error) {
                            console.log("Error callback: " + error);
                        });
                    }, function (error) {
                        console.log("Error callback: " + error);
                    });
                }, function (error) {
                    console.log("Error callback: " + error);
                });
            }, function (error) {
                console.log("Error callback: " + error);
            });
        }, function (error) {
            console.log("Error callback: " + error);
        });
    }

    $scope.initMovieDiscover = function (page, genre, year, no_genre) {
        console.log("Start movies discover");
        discoverTMDB(page, genre, year, no_genre);
    };
    function discoverTMDB(page, with_genres, year, without_genres) {
        $scope.topbarMoreActions = 'discover';

        var filter = [];
        filter.discoverRequest = {};
        filter.discoverRequest.language = "en-US";
        filter.discoverRequest.sort_by = "popularity.desc";
        filter.discoverRequest.include_adult = false;
        filter.discoverRequest.include_video = true;
        filter.discoverRequest.page = page || '';
        filter.discoverRequest.with_genres = with_genres || '';
        filter.discoverRequest.without_genres = without_genres || '';
        filter.discoverRequest.year = year || '';
        filter.discoverRequest.primary_release_year = year || '';

        // Connect to theMovieDB and get data
        theMovieDb.discover.getMovies(filter.discoverRequest, function (discover) {
            // create movies list
            var moviesDiscover = JSON.parse(discover);
            $scope.movies.discoverpage = moviesDiscover.page;
            $scope.movies.discoverpages = moviesDiscover.total_pages;
            $scope.movies.dicoverentries = moviesDiscover.total_results;
            $scope.movies.discover = moviesDiscover.results;
            // apply all
            $scope.$apply();
            $rootScope.$broadcast('discoverTMDB');
        }, function (error) {
            console.log("Error callback: " + error);
        });
    }

    $scope.initMovieDetails = function (searchData) {
        console.log("Start movie details initialization");
        movieDetailsTMDB(searchData);
    };
    function movieDetailsTMDB(searchData) {

        $scope.movie = [];
        $scope.movie.mark = [];
        $scope.topbarMoreActions = 'details';

        theMovieDb.movies.getById({"id": searchData}, function (movdata) {
            theMovieDb.movies.getImages({"id": searchData}, function (movimg) {
                theMovieDb.movies.getTrailers({"id": searchData}, function (movtrail) {
                    theMovieDb.movies.getSimilarMovies({"id": searchData}, function (movsimi) {

                        initTheMovieDbSession();
                        $scope.movie.details = JSON.parse(movdata);
                        $scope.movie.images = JSON.parse(movimg).backdrops;
                        $scope.movie.trailers = JSON.parse(movtrail).youtube;
                        $scope.movie.similarmovies = JSON.parse(movsimi).results;
                        $scope.carouselIndexImage = 0;
                        $scope.carouselIndexTrailer = 0;
                        $scope.$apply();
                        // just to scroll top
                        $('html, body').animate({scrollTop: '0px'}, 10);
                        $rootScope.$broadcast('movieDetailsInitialized');
                        console.log("Movies details initialized");

                    }, function (error) {
                        console.log("Error callback: " + error);
                    });
                }, function (error) {
                    console.log("Error callback: " + error);
                });
            }, function (error) {
                console.log("Error callback: " + error);
            });
        }, function (error) {
            console.log("Error callback: " + error);
        });
    }

}]);