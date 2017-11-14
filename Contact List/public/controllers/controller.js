var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	var refresh = function(){
		$http.get('/contactlist').then(function(response){
			$scope.contactList = response.data;
		});
	};
	refresh();
	$scope.AddContact = function(){
		$http.post('/contactlist', $scope.contact).then(function(response){
			console.log(response);
		});
		refresh();
	};
	$scope.removeContact = function(id){
		$http.delete('/contactlist/' + id).then(function(response){
			console.log("Deleted");
			refresh();
		});
	};
	$scope.editContact = function(id){
		$http.get('/contactlist/' + id).then(function(response){
			$scope.contact = response.data;
		});
	};
	$scope.updateContact = function(){
		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).then(function(response){
			refresh();
			$scope.contact = null;
		});
	};
	$scope.deselect = function(){
		$scope.contact = null;
	};
}]);
