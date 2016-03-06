var loadingModule = angular.module('loadingModule', []);
loadingModule.controller('formDataController', [ '$http', '$scope', '$filter', function($http, $scope, $filter) {
		var self = this;
		var batchId = 0;
		var existedProgramId = 0;
		
		$scope.success = getSessionValue("success");
		if(	$scope.success) {
			var object = JSON.parse(sessionStorage.getItem("response"));
			object.dob =  $filter('date')(object.dob, 'MM/dd/yyyy');
			batchId =  object.trainingBatchId;
			existedProgramId = object.programId;
			console.log(existedProgramId);
			object.dob  = new Date(object.dob) ;
			/*var address = (object.address).split(",");
			console.log(address);
			object.p_House_DoorNumber = address[0];
			object.p_street = address[1];
			object.p_villageName = address[2];
			object.p_mandal = address[3];
			object.p_pincode = address[4];
			object.p_district = address[5];
			object.p_state = address[6];
			
			console.log(object.p_House_DoorNumber);*/
			//alert(typeof(object.dob));
			console.log(object.dob);
			$scope.data = {object:object};
			
			console.log($scope.data);
		}else{
			
		}
		
		$scope.insertStudent = function(studentModel) {
			console.log(studentModel);
			
			studentModel.street = (studentModel.street).replace(/\s/g, '');
			studentModel.doorno = (studentModel.doorno).replace(/\s/g, '');
			studentModel.villageName = (studentModel.villageName).replace(/\s/g, '');
			studentModel.mandalName = (studentModel.mandalName).replace(/\s/g, '');
			studentModel.districtName = (studentModel.districtName).replace(/\s/g, '');
			studentModel.stateName = (studentModel.stateName).replace(/\s/g, '');
			
			console.log(studentModel.streetName);
	    	//alert("INSERT "+studentModel.registrationId);
	    	$http.post('student/insert', studentModel).then(function(response) 
			        {
						$scope.data = response.data;
						if($scope.data.successful) 
						{
								alert("Your Details inserrted successfully!!!!!");
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
			
		
		 $scope.updateStudent = function(studentModel) {
		    	console.log(studentModel);
		    	alert(studentModel.programid);
		    	studentModel.trainingBatchId = batchId;
		    	//studentModel.existedProgramId = existedProgramId;
		    	alert("UPDATE " +studentModel.existedProgramId+ "with batchId :  "+ studentModel.trainingBatchId);
		    	
		    	$http.post('student/update', studentModel).then(function(response) 
				        {
							$scope.data = response.data;
							if($scope.data.successful) 
							{
									alert("Your Details updated successfully!!!!!");
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
		
				
		