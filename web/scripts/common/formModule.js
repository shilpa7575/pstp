var formModule = angular.module('formModule', [])
.controller('FormController', [ '$http', '$scope', function($http, $scope) 
{
	//var self = this;

	$scope.login = function(user) 
	{
		alert(user.username);
        $http.post('auth/login', user).then(function(response) 
        {
			$scope.data = response.data;
			if($scope.data.successful) 
			{
				setSessionValue("username", $scope.data.responseObject.userName);
				setSessionValue("context", $scope.data.responseObject.context);
				showHomePage();	

			} 
			else 
			{
				showError($scope.data.errorMessage);
			}
		}, 
		function(errResponse) 
		{
			console.error('Error while fetching notes');
		});
    };
}]);
