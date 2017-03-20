app.controller("homeCtrl", ['$scope', 'homeService', function($scope, homeService){

	$scope.prizes = {
		movie_tickets: 10,
		mobile_phones: 3,
		bike: 1
	};

	// service to get data
	homeService.getData().then(function(response){
		$scope.cards = response;
	});

	$scope.isFlipped = {};

	var movies = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight Rises', 'The Way Back', 'The Revenant'];

	function getRandomMovie(){
		return movies[Math.floor(Math.random() * movies.length)]
	}

	var rem_movie, old_id;

	$scope.showCard = function(id){
		$scope.isFlipped[id] = $scope.isFlipped[id] == 'flipped' ? '' : 'flipped';

		var index, m;

		if(old_id == id){ // case if same tile is clicked again
			delete $scope.cards[id]['movieName'];
			old_id = (function () { return; })(); // set old_id to undefined
			movies = movies.concat(rem_movie); // add spliced movie back to array
		}
		else if(old_id == undefined){ // case if first tile is flipped
			m = getRandomMovie();
			$scope.cards[id]['movieName'] = m;
			index = movies.indexOf(m);
			rem_movie = movies.splice(index, 1); // remove selected movie
			old_id = id;
		}
		else{ // case if second tile is flipped
			var probVal = Math.random();
			if(probVal <= 0.33){ // same movie shown with a probability of 33%
				$scope.cards[id]['movieName'] = $scope.cards[old_id]['movieName'];
				$(".overlay.win").fadeIn().css("display", "flex");
				$scope.prizeWon = allotPrize();
			}
			else{ // different movie shown with a probability of 67%
				$scope.cards[id]['movieName'] = getRandomMovie();
				$(".overlay.loss").fadeIn().css("display", "flex");
			}
			movies = movies.concat(rem_movie);
			old_id = id;
		}

	}

	$scope.playAgain = function(){
		$scope.isFlipped = {};
		homeService.getData().then(function(response){
			$scope.cards = response;
		});
		$(".overlay").fadeOut();
		old_id = (function () { return; })(); // set old_id to undefine
	}

	function allotPrize(){
		if($scope.prizes['movie_tickets'] > 0){
			$scope.prizes['movie_tickets']--;
			return {flag: 1, message: 'You\'ve won a movie ticket!'};
		}
		else{
			if($scope.prizes['mobile_phones'] > 0){
				$scope.prizes['mobile_phones']--;
				return {flag: 1, message: 'You\'ve won a mobile phone!'};
			}
			else{
				if($scope.prizes['bike'] > 0){
					$scope.prizes['bike']--;
					return {flag: 1, message: 'You\'ve won the bumper prize. A Bike!'};
				}
				else{
					return {flag: 0, message: 'The competition has finished. There are no more prizes to be given.'};
				}
			}
		}
	}
}]);
