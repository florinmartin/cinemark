//var cinemarkCtrl = angular.module("cinemark");

// Controllers
cinemark.controller('discoverCtrlScope', ['$scope', '$http', '$routeParams', '$location', '$anchorScroll', '$q', '$rootScope', function ($scope, $http, $routeParams, $location, $anchorScroll, $q, $rootScope) {

    $scope.params = $routeParams;
    $scope.genres = {
        12: "Aventuri",
        14: "Fantasy",
        16: "Animaţie",
        18: "Dramă",
        27: "Horror",
        28: "Acțiune",
        35: "Comedie",
        36: "Istoric",
        37: "Western",
        53: "Thriller",
        80: "Crimă",
        99: "Documentar",
        878: "SF",
        9648: "Mister",
        10402: "Muzică",
        10749: "Romantic",
        10751: "Familie",
        10752: "Război",
        10770: "Film TV"
    };
    $scope.topbarMoreActions = '';
    $scope.movies = [];
    $scope.movies.discover = [];
    $scope.theMovieDb = [];
    $scope.lists = [];

    $scope.initDiscover = function (page, genre, year, nogenre) {
        $scope.movies.discover = [];
        $scope.filterReveal = false;
        var pageNo = $scope.params.pageNo || 1;
        $rootScope.$broadcast('initMoviesDiscover', pageNo, $scope.genre_ids, $scope.release_date, '');
    };
    $scope.initDiscoverFiltered = function (page, genre, year, nogenre) {
        $scope.movies = [];
        $scope.movies.discover = [];
        $scope.genre_ids = [];
        $scope.no_genre_ids = [];
        $scope.release_date = $('#release_date')[0].value;
        var filtergenrelink = $('.genre_ids.active span');
        for (var s = 0; s < filtergenrelink.length; s++) {
            $scope.genre_ids.push(filtergenrelink[s].innerText)
        }
        var filternogenrelink = $('.no_genre_ids.active span');
        for (var d = 0; d < filternogenrelink.length; d++) {
            $scope.no_genre_ids.push(filternogenrelink[d].innerText)
        }
        $rootScope.$broadcast('initMoviesDiscover', 1, $scope.genre_ids, $scope.release_date, $scope.no_genre_ids);
        $scope.movieDetailsReveal = false;
        $scope.filterReveal = false;
        $('#movie_details').removeClass('movieDetailsReveal');

    };
    $scope.initGenres = function () {
        $scope.genres_filter = [];
        theMovieDb.genres.getList({"language": "ro-RO"}, function (data) {
            $scope.genres_filter = JSON.parse(data).genres;
            $scope.$apply();
        }, function (error) {
            console.log("Error callback: " + error);
        });
    };
    $scope.discoverLoadPrev = function () {
        var tmp_cmpage = $scope.movies.discoverpage - 1;
        if (tmp_cmpage < $scope.movies.discoverpages) {
            $rootScope.$broadcast('initMoviesDiscover', tmp_cmpage, $scope.genre_ids, $scope.release_date, $scope.no_genre_ids);
        }
    };
    $scope.discoverLoadNext = function () {
        var tmp_cmpage = $scope.movies.discoverpage + 1;
        if (tmp_cmpage < $scope.movies.discoverpages) {
            $rootScope.$broadcast('initMoviesDiscover', tmp_cmpage, $scope.genre_ids, $scope.release_date, $scope.no_genre_ids);
        }
    };
    $scope.viewMoviesDetails = function (searchData) {
        var elementid = '#' + searchData.id;
        $scope.currentscrollposition = $(elementid).offset().top - 250 + 'px';
        $scope.movieDetailsReveal = true;
        $rootScope.$broadcast('initMovieDetails', searchData);
    };
    $scope.initMoviesDetails = function () {
        $rootScope.$broadcast('initMovieDetails', $scope.params.filmId);
    };
    //$scope.toggleActive = function () {
    //    alert("dasds");
    //    return $(this).toggleClass('active');
    //};
    $scope.toggleValue = function (val) {
        $scope[val] = !$scope[val];
        console.log($scope[val]);
    };
    $scope.removeFromList = function (id_movie) {
        $scope.settolist = false;

        if (has($scope.lists.devazut.movieIds, id_movie)) {
            $scope.movie.mark.listId = 11570;
            if ($scope.lists.devazut.movieIds.indexOf(id_movie) > -1) {
                $scope.lists.devazut.movieIds.splice($scope.lists.devazut.movieIds.indexOf(id_movie), 1);
            }
        } else if (has($scope.lists.vazute.movieIds, id_movie)) {
            $scope.movie.mark.listId = 11586;
            if ($scope.lists.vazute.movieIds.indexOf(id_movie) > -1) {
                $scope.lists.vazute.movieIds.splice($scope.lists.vazute.movieIds.indexOf(id_movie), 1);
            }
        } else if (has($scope.lists.decolectie.movieIds, id_movie)) {
            $scope.movie.mark.listId = 11589;
            if ($scope.lists.decolectie.movieIds.indexOf(id_movie) > -1) {
                $scope.lists.decolectie.movieIds.splice($scope.lists.decolectie.movieIds.indexOf(id_movie), 1);
            }
        } else if (has($scope.lists.groaznice.movieIds, id_movie)) {
            $scope.movie.mark.listId = 11588;
            if ($scope.lists.groaznice.movieIds.indexOf(id_movie) > -1) {
                $scope.lists.groaznice.movieIds.splice($scope.lists.groaznice.movieIds.indexOf(id_movie), 1);
            }
        } else if (has($scope.lists.nuvreausavad.movieIds, id_movie)) {
            $scope.movie.mark.listId = 11587;
            if ($scope.lists.nuvreausavad.movieIds.indexOf(id_movie) > -1) {
                $scope.lists.nuvreausavad.movieIds.splice($scope.lists.nuvreausavad.movieIds.indexOf(id_movie), 1);
            }
        } else {
            $scope.movie.mark.listId = 0;
        }

        theMovieDb.lists.removeItem({
            "session_id": $scope.theMovieDb.sessionId,
            "id": $scope.movie.mark.listId,
            "media_id": id_movie
        }, function (data) {
            //console.log(data);
        }, function (error) {
            console.log("Error callback: " + error);
        });
    };
    $scope.addToList = function (id_list, id_movie) {
        $scope.settolist = false;
        $scope.movie.mark.listId = id_list;
        if (_.indexOf($scope.lists.devazut.movieIds, id_movie) < 0 &&
            _.indexOf($scope.lists.vazute.movieIds, id_movie) < 0 &&
            _.indexOf($scope.lists.decolectie.movieIds, id_movie) < 0 &&
            _.indexOf($scope.lists.groaznice.movieIds, id_movie) < 0 &&
            _.indexOf($scope.lists.nuvreausavad.movieIds, id_movie) < 0) {

            if (id_list == 11570) {
                $scope.lists.devazut.movieIds.push(id_movie);
            } else if (id_list == 11586) {
                $scope.lists.vazute.movieIds.push(id_movie);
            } else if (id_list == 11589) {
                $scope.lists.decolectie.movieIds.push(id_movie);
            } else if (id_list == 11588) {
                $scope.lists.groaznice.movieIds.push(id_movie);
            } else if (id_list == 11587) {
                $scope.lists.nuvreausavad.movieIds.push(id_movie);
            }

            theMovieDb.lists.addItem({
                "session_id": $scope.theMovieDb.sessionId,
                "id": id_list,
                "media_id": id_movie
            }, function (data) {
                //console.log(data);
            }, function (error) {
                console.log("Error callback: " + error);
            });
        } else {
            console.log("Trebuie sters inatai");
        }
    };
    $scope.movieListClass = function (movieId) {
        if (typeof $scope.lists.devazut === "undefined") {
            return "hide"
        } else {
            if (has($scope.lists.devazut.movieIds, movieId)) {
                return "fa-slideshare"
            } else if (has($scope.lists.vazute.movieIds, movieId)) {
                return "fa-check-square-o"
            } else if (has($scope.lists.decolectie.movieIds, movieId)) {
                return "fa-stack-overflow"
            } else if (has($scope.lists.groaznice.movieIds, movieId)) {
                return "fa-bitbucket"
            } else if (has($scope.lists.nuvreausavad.movieIds, movieId)) {
                return "fa-low-vision"
            } else {
                return "hide"
            }
        }
    };

    $scope.initListPage = function (listId) {
        $scope.movies.sorted = [];
        $scope.topbarMoreActions = '';
        $rootScope.$broadcast('initListPage');
    };
}]);