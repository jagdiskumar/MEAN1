
(function(angular) {
var cApp= angular.module('cApp',['ngRoute']);


cApp.controller('UserController',['$scope','$http', function($scope,$http){
	//console.log('Hello User Controller');
  $http.get('/contactlist').success(function(response){
  	console.log('data coming from controller');
  	$scope.userlist =response;
  });

}]);


cApp.controller('UController',['$scope','$http', function($scope,$http){
	//console.log('Hello User Controller');
  $http.get('/Ulist').success(function(response){
  	console.log('data coming from ucontroller');
  	$scope.ulist =response;
  	$scope.user="";
  });


  $scope.addUser =function(){
   console.log($scope.user);
    $http.post('/Ulist',$scope.user).success(function(response)
    	{
    		console.log(response);
    	});
  }

  $scope.removeUser=function(id)
  {
    console.log('remove id :'+id);
    $http.delete('/Ulist/'+id).success(function(response){console.log(response);});
  }
  $scope.editUser = function(id)
  {
   console.log('edit id : '+id);
   $http.get('/Ulist/'+id).success(function(response){
    $scope.user=response;
   });
  }

  $scope.updateUser = function(){
    console.log($scope.user);
     $http.put('/Ulist',$scope.user).success(function(response){
      console.log(response);
     })
  }

}]);



})(window.angular);


