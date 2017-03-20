var app = angular.module("wedMeGoodApp", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state("home", {
		url: "/home",
		controller: 'homeCtrl',
		templateUrl: "templates/home.html"
	});
	$urlRouterProvider.otherwise("home");
}]);
