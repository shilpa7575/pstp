var selectModule = angular.module('selectModule', [])
.controller('FormController', [ '$http', '$scope', function($http, $scope) {
		var self = this;
		$scope.retrieve = function(profile) {
	        $http.post('students/select', profile).then(function(response) {
				$scope.data = response.data;
				alert($scope.data.successful);
				if($scope.data.successful){
					var inter = $scope.data.responseObject.interdiplomapercentage;
					var ssc = $scope.data.responseObject.sscpercentage;
					var htno = $scope.data.responseObject.graduationhtno;
					var centers=[
					         	{name:htno,data:[inter,ssc]},
					            ];
					console.table($scope.data.responseObject);
					//var s = JSON.stringify($scope.data.responseObject);
						$('#contentDiv').highcharts({
				        chart: {
				            type: 'bar'
				        },
				        title: {
				            text: 'Student Info'
				        },
				        xAxis: {
				            categories: ['diploma','ssc']
				        },
				        yAxis: {
				            title: {
				                text: 'District wise No of centers'
				            }
				        },
				        series: centers
					});
				
					/*var email= $scope.data.responseObject.email;
					var phno = $scope.data.responseObject.phno;
					var aadharno = $scope.data.responseObject.aadharno;
					var gender = $scope.data.responseObject.gender;
					var dob = $scope.data.responseObject.dob;
			     	//var elem = document.getElementById('mail');
					//elem.value=email;
					//showDetailsPage();
					var mes="<html><button class='btn btn-lg btn-primary btn-block' onclick='showUpdatePage()'>Update</button><table class='table table-bordered'><tr><th>EMail</th> <td> <input type='text' readonly>"+email+"</td></tr> <tr class='info'> <th>Mobile No</th><td>"+phno+"</td></tr><tr class='info'> <th>Aadhar No</th><td>"+aadharno+"</td></tr><tr class='info'> <th>Gender</th><td>"+gender+"</td></tr><tr class='info'> <th>Date Of Birth</th><td>"+dob+"</td></tr></table></html>";
	                jQuery("#contentDiv").html(mes);*/
				}
				else {
					showError($scope.data.errorMessage);
					var message = "<div class=\"alert alert-danger\"><strong>Error: </strong>"+ $scope.data.errorMessage + "</div>";
					jQuery("#errorDiv").html(message);
				}
			}, function(errResponse) {
				console.error('Error while fetching notes');
			});
	    };
} ]);
		
				
		