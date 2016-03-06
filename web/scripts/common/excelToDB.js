var excelToDB = angular.module('excelToDB',[]);

excelToDB.controller('excelToDBController',['$scope','$http','fileUpload', function($scope,$http,fileUpload) {
	alert("dsafsdafsdaf");
	$scope.uploadStudentExcel = function() {
		alert("dsafsdafsdaf");
		var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };       
	
}]);

excelToDB.directive('fileModel', ['$parse', function ($parse) {
	alert("directive");
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                	alert(element[0].files[0].name);
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
excelToDB.service('fileUpload', ['$http', function ($http) {
	
    this.uploadFileToUrl = function(file, uploadUrl){
    	alert("service");
        var fd = new FormData();
        fd.append('file', file);
        $http.post('file/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        	alert("success");
        })
        .error(function(){
        	alert("error");
        });
    };
}]);
