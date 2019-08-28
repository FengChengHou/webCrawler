function checkLogin() {
	var username = $('#username').val();
	var password = $('#password').val();

	if (username == null || username == "") {
		alter("请输入密码");
	} else {
		alter("ok");
	}

}