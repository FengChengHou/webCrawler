<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>讯飞联创接口数据监测平台</title> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="resources/common-js/jquery/jquery-1.11.1.min.js"></script>
<link href="<%=request.getContextPath()%>/resources/css/logon.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(function(){
	$(".button_blue").click(checkLogin);
});

function checkLogin() {
	var username = $('#username').val();
	var password = $('#password').val();
	var result;
	if (username == null || username == "") {
		alert("用户名为空，无法登录");
		return false;
	} else if (password == null || password == "") {
		alert("密码为空，无法登录");
		return false;
	} else {
		$.ajax({
			url:"<%=request.getContextPath()%>/checklogin",
			type:"post",
			dataType:"json",
			data:{
				username:username,
				password:password
			},
			success:function(data) {
				if (data == "1") {
					window.location.href="<%=request.getContextPath()%>/home";
				} else if (data == "0") {
					alert("用户名和密码不能为空！");
				} else if (data == "2") {
					alert("用户名密码不匹配！！");
				} else {
					alert("未知错误！");
				}
			},
			error:function() {
			}
		});
	}
}
</script>
</head>
<body class="loginbg">
<h1>讯飞联创接口数据监测平台</h1>

<div class="login" style="margin-top:50px;">   
    <div class="header">登录入口</div>      
    <div class="web_qr_login" id="web_qr_login" style="display: block; height: 235px;">    
        <!--登录-->
        <div class="web_login" id="web_login">     
            <div class="login-box">
				<div class="login_form">
	                <div class="uinArea">
		                <label class="input-tips" for="u">帐号：</label>
		                <div class="inputOuter"><input type="text" class="inputstyle" id="username"/></div>
	                </div>
	                <div class="pwdArea">
	                	<label class="input-tips">密码：</label> 
	                    <div class="inputOuter">
	                    <input type="password" class="inputstyle" id="password"/></div>
	                </div>
	                <div style="padding-left:50px;margin-top:20px;"><input type="button" value="登 录" style="width:150px;" class="button_blue"/></div>
	            </div>
            </div>          
        </div>
  </div>
</div>
<div class="jianyi">*推荐使用ie8或以上版本ie浏览器或Chrome内核浏览器访问本页面</div>
</body>
</html>