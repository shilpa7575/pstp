function showPage(path, targetDiv) {
	var jqxhr = jQuery.post(path, function(data) {
		jQuery("#" + targetDiv).html(data);
	}).done(function() {
		// alert("second success");
	}).fail(function() {
		// alert("error");
	}).always(function() {
		// alert("finished");
	});
}

function showLoginPage() {
	var path = "html/general/loginForm.html";
	showPage(path, "containerDiv");
}

function showHomePage() {
	var path = "html/general/studentRegistration.html";
	showPage(path, "containerDiv");
}

function showSearchPage() {
	var path = "html/general/search.html";
	showPage(path, "containerDiv");
}

function setSessionValue(key, value) {
	sessionStorage.setItem(key, value);
}

function getSessionValue(key) {
	return sessionStorage.getItem(key);
}

function removeSessionValue(key) {
	sessionStorage.removeItem(key);
}

function showError(errorMessage) {
	jQuery("#errorDiv").html(errorMessage);
}

function logout() {
	var userName = getSessionValue("userName") || "";
	
	setSessionValue("userName", null);
	setSessionValue("context", null);
	var data = {
		userName : userName
	};

	post('auth/logout', data);
	showLoginPage();
}

function post(url, data) {
	var responseData = null;

	jQuery.ajax({
		url : url,
		type : 'post',
		data : JSON.stringify(data), // Stringified Json Object
		dataType : 'json',
		async : false, // Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
		cache : false, // This will force requested pages not to be cached by the browser
		processData : false, // To avoid making query String instead of JSON
		contentType : "application/json; charset=utf-8",
		success : function(data) {
			responseData = data;
		}
	});

	return responseData;
}

function isUserLoggedIn() {
	var userName = getSessionValue("userName") || "";
	var context = getSessionValue("context") || "";
	var data = {
		userName : userName,
		context : context
	};

	return post('auth/loggedin', data) || false;
}
