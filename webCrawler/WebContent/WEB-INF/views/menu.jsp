<?xml version="1.0" encoding="UTF-8" ?>
<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:f="http://java.sun.com/jsf/core"
	xmlns:h="http://java.sun.com/jsf/html">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>menu</title>
<%@include file="base.jsp"%>
<%@include file="common.jsp"%>
<script type="text/javascript" src="resources/js/menu.js"></script>
</head>
<body>

	<div id="query">
			<!-- 查询条件 -->
			<form data-fly-form id="queryConditions" class="fix" method="post"
				action="">
				<div class="query" id="query">
<div id="team" data-fly-form-element
						data-fly-options="{name: 'team', title: '团队', width:'1/3', required: true, type: 'combobox'}">
					</div>


				</div>
			</form>
		</div>


</body>
</html>