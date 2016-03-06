var employeeModule = angular.module('employeeModule', []);
employeeModule.controller('FormController', [ '$http', '$scope', function($http, $scope) {
	
    $scope.employee = [];
    var id = 1;
    /*$scope.districts = ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bettaiah(Paschim Champaran)","Bhojpur","Buxar","Darbhanga","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Monghyr","Mothihari(Purba Champaran)","Muzaffarpur","Nalanda","Nawada","Patna","Purnea","Rohtas","Saharsa","Samastipur","Saran","Shiekhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali"];*/
    $scope.zones = [
                    
       {
    	name:'Zone1',
    	reportingManager:'Rohith Kumar',
    	districts: ['Arwal','Aurangabad','Bhojpur','Buxar','Jehanabad','Kaimur','Nalanda','Nawada','Patna','Rohtas']
       },
       
       {
    	name:'Zone2',
    	reportingManager:'Shahnawaz Ashrafi',
    	districts:['Bettaiah(Paschim Champaran)','Gopalganj','Mothihari(Purba Champaran)','Muzaffarpur','Saran','Sitamarhi','Siwan','Sheohar','Vaishali']
       },
       {
    	name:'Zone3',
    	reportingManager:'Jyoti Kumar',
    	districts:['Araria','Darbhanga','Katihar','Kishanganj','Madhepura','Madhubani','Purnea','Saharsa','Samastipur','Supaul']
       },
       {
    	name:'Zone4',
    	reportingManager:'Shankar',
    	districts:['a','b'] 
       }
    ];
    
    $scope.getReportingManagers = function(zone) {
    	$scope.reportingManager = zone.reportingManager;
    	zone.reportingManager = $scope.reportingManager ;
    	//alert($scope.reportingManager);
    	
    };
    
    $scope.newDesignation = [{"organisationName":null, "orgLocation":null, "previousDesignation":null, "joiningDate":null, "releavedDate":null,"experience":null}];
   	$scope.data ={};
   
   	var employeeRegistration = {};
   	var profilePicName=poi_doc=poa_doc=certificate_doc=joiningReport_doc=null;
	var range = 50;
	var currentYear = new Date().getFullYear();
	var testYears = [];
	for(var i=0;i<range;i++) {
		testYears.push(currentYear-i);
	}
    $scope.expRange = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
    };
    
	$scope.addDesignationTemplate = function() {
		
        $scope.newDesignation.push({"organisationName":null, "orgLocation":null, "previousDesignation":null, "joiningDate":null, "releavedDate":null,"experience":null});
        
	};

	$scope.removeDesignation = function(designation) {
		
		 var index = $scope.newDesignation.indexOf(designation);
		  $scope.newDesignation.splice(index, 1);  
		  if($scope.newDesignation.length == 0) {
			  $scope.newDesignation.push({"organisationName":null, "orgLocation":null, "previousDesignation":null, "joiningDate":null, "releavedDate":null,"experience":null});
			  
		  }
	};
	
	$scope.years = testYears;
    $scope.newCourses = [{"degreeName":null,"board":null,"yop":null,"percentage":null,"certificates":null,"submitted":null}];
    
    
    $scope.addQualificationTemplate = function() {

        $scope.newCourses.push({"degreeName":null, "board":null, "yop":null, "percentage":null, "certificates":null, "submitted":null});
        
	};
	
	
	$scope.removeQualificationTemplate = function(newCourse) {
		var index = $scope.newCourses.indexOf(newCourse);
		$scope.newCourses.splice(index, 1);
		
	};
	 
$scope.educationDetails = function(qualificationObject) {
	qualificationObject.employeeId = getSessionValue("employeeId");
		alert(qualificationObject);
		console.log(qualificationObject);
		alert($scope.newCourses.length);
		var qualifications = [];
		for(var i=0;i<$scope.newCourses.length;i++) {
			var qualification = {};
			    qualification.employeeId = qualificationObject.employeeId;
				qualification.board = qualificationObject.board[i];
				qualification.percentage = qualificationObject.percentage[i];
				qualification.year = qualificationObject.year[i];
				qualification.qualification = qualificationObject.qualification[i];
				qualification.original = qualificationObject.originals[i];
				qualifications.push(qualification);
				
		};
		console.log(qualifications);
		employeeRegistration.qualifications = qualifications;
		 $http.post('employee/qualifications', employeeRegistration).then(function(response) {
				$scope.data = response.data;
				if($scope.data.successful) {
					alert("success");
				} else {
					showError($scope.data.errorMessage);
					var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
					jQuery("#errorDiv").html(message);
					
				}
			}, function(errResponse) {
				console.error('Error while fetching notes');
			});
	};
	
	$scope.personalInfo = function(personalInfo) {
		if(personalInfo.employee_name!=null && personalInfo.lastName!=null){
			personalInfo.employee_name = personalInfo.employee_name+personalInfo.lastName;
			personalInfo.poi_doc = filename;
			//alert(personalInfo.poi_doc);
			 $http.post('employee/personal', personalInfo).then(function(response) {
					$scope.personalData = response.data;
					if($scope.personalData.successful) {
						alert("success");
						setSessionValue("employeeId",$scope.personalData.responseObject.employeeId);
						alert($scope.personalData.responseObject.employeeId);
					} else {
						showError($scope.personalData.errorMessage);
						var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
						jQuery("#errorDiv").html(message);
						
					}
				}, function(errResponse) {
					console.error('Error while fetching notes');
				});
		}else{
			alert("please enter full details");
		}
	};
	
	$scope.employment = function(designationObject) {
		console.log(designationObject);
		designationObject.employeeId = getSessionValue("employeeId");
		var designations = [];
		for(var i=0;i<$scope.newDesignation.length;i++) {
			var designation = {};
			designation.employeeId = designationObject.employeeId;
			designation.organisationName = designationObject.organisationName[i];
			designation.orgLocation = designationObject.orgLocation[i];
			designation.previousDesignation = designationObject.previousDesignation[i];
			designation.joiningDate = designationObject.joiningDate[i];
			designation.releavedDate = designationObject.releavedDate[i];
			designation.experience = designationObject.experience[i];
			designations.push(designation);
				
		};
		console.log(designations);
		employeeRegistration.designations = designations;
		 $http.post('employee/designations', employeeRegistration).then(function(response) {
				$scope.data = response.data;
				if($scope.data.successful) {
					alert("success");
				} else {
					showError($scope.data.errorMessage);
					var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
					jQuery("#errorDiv").html(message);
					
				}
			}, function(errResponse) {
				console.error('Error while fetching notes');
			});
	};
	
	$scope.postingDetails= function(postingDetails) {
		//console.log(postingDetails);
		postingDetails.employeeId = getSessionValue("employeeId");
		postingDetails.joiningReport_doc = fileName;
		if(postingDetails.postingLevel!="State") {
			postingDetails.zone = postingDetails.zone.name;
			if(postingDetails.postingLevel!="Zone") {
				postingDetails.reportingManager = $scope.reportingManager;
			}
		}
		
		//console.log(postingDetails);
		$http.post('employee/postingDetails', postingDetails).then(function(response) {
			$scope.data = response.data;
			if($scope.data.successful) {
				alert("success");
			} else {
				showError($scope.data.errorMessage);
				var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
				jQuery("#errorDiv").html(message);
				
			}
		}, function(errResponse) {
			console.error('Error while fetching notes');
		});
		
	};
	
	
	$scope.communication = function(employeeRegistration) {
		console.log(employeeRegistration);
		employeeRegistration.employeeId = getSessionValue("employeeId");
		employeeRegistration.poa_doc = filename;
		$http.post('employee/communication', employeeRegistration).then(function(response) {
				$scope.data = response.data;
				if($scope.data.successful) {
					alert("success");
				} else {
					showError($scope.data.errorMessage);
					var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
					jQuery("#errorDiv").html(message);
					
				}
			}, function(errResponse) {
				console.error('Error while fetching notes');
			});
		};
	
	$scope.bankdetails = function(employeeRegistration) {
		employeeRegistration.employeeId = getSessionValue("employeeId");
		 $http.post('employee/bank', employeeRegistration).then(function(response) {
				$scope.data = response.data;
				if($scope.data.successful) {
					alert("success");
				} else {
					showError($scope.data.errorMessage);
					var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
					jQuery("#errorDiv").html(message);
					
				}
			}, function(errResponse) {
				console.error('Error while fetching notes');
			});		
	};
	
	$scope.saveReferenceDetails = function(employeeRegistration) {
		employeeRegistration.employeeId = getSessionValue("employeeId");
		$http.post('employee/reference', employeeRegistration).then(function(response) {
			$scope.data = response.data;
			if($scope.data.successful){
				alert("Your data Has Been Saved Successfully!!!");
			} else {
				showError($scope.data.errorMessage);
				var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
				jQuery("#errorDiv").html(message);
			}
		}, function(errResponse) {
			console.error('Error while fetching notes');
		});
		
		
	};
	
	$scope.uploadCertificate = function(el1) {
		var id = angular.element(el1).scope().$index;
		 alert(id);
		  console.log(el1.files);
		  var fileName = el1.files[0].name;
		  alert(fileName);
		 // var name = "poi";
				var base64,binaryString;
				var fileReader;
			        fileReader = new FileReader();
			        fileReader.onload = function(e) {
			        	binaryString =  e.target.result;
			        	base64 = btoa(binaryString);
			        	var fileName = document.getElementById(id).files[0].name;
			        	var str = base64.toString();
			        	var fileModel = {
			        		fileName : fileName,
			        		base64String : str
			        	};
			        	console.log(fileModel);
						$http.post('file/upload',fileModel).then(function(response) {
							$scope.data2 = response.data;
							if($scope.data2.successful){
								alert("Uploaded");
							}
							else {
								alert("File upload failed....please try again!!!!");
							}
						}, function(errResponse) {
							console.error('Error while fetching notes');
						});
			        };       
			        fileReader.readAsBinaryString( el1.files[0]);
			     
		 
		 		
	};
	
	
	$scope.upload = function(el1, id) {
		//var id = angular.element(el1).scope().$index;
		//var employee_id = getSessionValue("employeeId");
		 alert(id);
		  console.log(el1.files);
		var fileName = el1.files[0].name;
		  
		  alert(fileName);
		 // var name = "poi";
				var base64,binaryString;
				var fileReader;
			        fileReader = new FileReader();
			        fileReader.onload = function(e) {
			        	
			        	binaryString =  e.target.result;
			        	base64 = btoa(binaryString);
			        	var fileName = document.getElementById(id).files[0].name;
			        	var str = base64.toString();
			        	var fileModel = {
			        		fileName : fileName,
			        		base64String : str
			        	};
			        	console.log(fileModel);
						$http.post('file/upload',fileModel).then(function(response) {
							$scope.data1 = response.data;
							if($scope.data1.successful){
								alert("Uploaded");
								
							}
							else {
								alert("File upload failed....please try again!!!!");
							}
						}, function(errResponse) {
							console.error('Error while fetching notes');
						});
			        };       
			        fileReader.readAsBinaryString( el1.files[0]);
			     
		 
		 		
	};
	
}]);

/*
 * USE CUSTOM DIRECTIVE LIKE BELOW FOR YOUR INPUT TYPE FILE......it would be better
 * employeeModule.directive('fileInput', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                alert(files[0].name);
                console.log(files[0].name);
                console.log(files[0].size);
            });
        }
    };
}]);*/



