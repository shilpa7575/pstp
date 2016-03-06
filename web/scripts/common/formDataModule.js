var formDataModule = angular.module('formDataModule',[]);

formDataModule.controller('formDataController',['$rootScope','$scope','$http', function($rootScope,$scope,$http) {
	$scope.retrievedData = '';
	$scope.status = false;
	
	$scope.getStudentDetails = function(studentObject) {
		alert(studentObject.registrationId);
		var registrationId = studentObject.registrationId;
		$http.post('student/getStudentDetails', registrationId).then(function(response) 
		        {
			$scope.data = response.data;
			console.log($scope.data);
					if($scope.data.successful) 
					{
						if($scope.data.responseObject!=null) { 
							$scope.status = false;
							sessionStorage.setItem('response', JSON.stringify($scope.data.responseObject));
							setSessionValue("success", $scope.data.successful);
							showHomePage();	
						}else 
						{
							sessionStorage.clear();
							$scope.status = true;
							alert("Sorry!!!Student with "+registrationId+ "not existed");
							
						}

					} 
					
				}, 
				function(errResponse) 
				{
					console.error('Error while fetching notes');
				});

    };  
    
   
    
}]);






