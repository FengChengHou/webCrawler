<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:f="http://java.sun.com/jsf/core"
	xmlns:h="http://java.sun.com/jsf/html">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>head</title>
<style type="text/css">
.mainhead {
	height: 50px;
}
.logo {
	width: 350px;
	height: 10px;
	padding-left: 80px;
}

h2 {
	margin: auto;
	text-align: center;
	color: #fff;
	font-size: 30px;
	font-weight: bold;
	text-shadow: 0px 1px 1px #555;
}

.exit {
	float: right;
	width: 250px;
	height: 50px;
	text-align: center;
	padding-top: 20px;
	padding-right: 20px;
}

#exitbtn {
	margin-left: 20px;
}
#exitbtn{
	color: #fff;
	font-size: 18px;
	cursor: pointer;
}
</style>
</head>
<body>

	<!-- <div class="mainhead">
		<div class="logo">
			<h2>用户行为统计分析系统</h2>
		</div>
		
	</div> -->
	<div data-options="region:'north',split:true" style="height: 110px;">
<div class="container"
	style="height:100px;background:url(<%=request.getContextPath()%>/resources/pictures/top_bg.png) repeat-x scroll left top rgba(0, 0, 0, 0)">
<img title="interfaceView" style="margin-top: 20px; margin-left: 15px;"
	src="<%=request.getContextPath()%>/resources/pictures/logo_xfjiekou.png">
</img></div>
</div>

</body>
</html>