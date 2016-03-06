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
	var path = "html/login/loginForm.html";
	showPage(path, "containerDiv");
}

function showHomePage() {
	var path = "html/general/home.html";
	showPage(path, "containerDiv");
}

function setSessionValue(key, value) {
	sessionStorage.setItem(key, value);
}

function getSessionValue(key) {
	return sessionStorage.getItem(key);
}
