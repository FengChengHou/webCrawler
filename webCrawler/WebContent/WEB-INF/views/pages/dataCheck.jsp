<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据监测</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>
<script type="text/javascript" src="resources/js/dataCheck.js"></script>

<link style="text/css" rel="stylesheet"
	href="resources/css/dataCheck.css">
</head>
<body>
	<div id="title">
		<ul>
			<li id="dataCheck" class="menu">数据</li>
			<li id="state" class="menu">数据状态</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>

	<form data-fly-form id="team_form" class="fix" method="post" action="">
		<div data-fly-form-element
			data-fly-options="{name: 'team', title: '团队', width:'1/3', required: true, type: 'combobox'}">
		</div>
		
		<div id="dataName">
		<div data-fly-form-element
			data-fly-options="{name: 'dataName', title: '数据信息', width:'1/3',disabled:true, type: 'text'}">
		</div>
		</div>
		
		<button id="publish" class="hidden btn btn-default" data-fly-button=""
			type="button" data-fly-options="{cls: 'default', disabled: false}">查询</button>
	</form>

	<div id="btn" style="margin-top: 5px;">
		<ul>
			<li onclick="addDataCheck()">新增</li>
			<li onclick="deleteDataCheck()">删除</li>
			<li onclick="editDataCheck()">编辑</li>
			<li onclick="updateMultiple(1)">开启监控</li>
			<li onclick="updateMultiple(0)">关闭监控</li>
			<li onclick="updateMessage(0)">短信开启</li>
			<li onclick="updateMessage(1)">短信关闭</li>
		</ul>
	</div>

	<div style="margin-top:40px;" id="queryGrid" class="fly-grid">
		<div class="fly-grid-body">
			<table class="fly-table">
				<thead class="fly-table-header">
					<tr>
						<th title="序号" width="10"></th>
						<th title="数据信息" width="40">数据信息</th>
						<th title="数据库" width="20">数据库</th>
						<th title="检查语句" width="60">检查语句</th>
						<th title="更新时间" width="60">更新时间</th>
						<th title="是否检查" width="20">是否检查</th>
						<th title="错误次数" width="20">错误次数</th>
						<th title="是否发送短信" width="20">是否<br>发送短信
						</th>
						<th title="是否发送邮件" width="20">是否<br>发送邮件
						</th>
					</tr>
				</thead>
				<tbody class="fly-table-body" id="List"></tbody>
			</table>
		</div>
	</div>


	<div id="status_queryGrid" class="fly-grid" style="display: none">
		<div class="fly-grid-body">
			<table class="fly-table">
				<thead class="fly-table-header">
					<tr>
						<th title="序号" width="10">序号</th>
						<th title="数据信息" width="60">数据信息</th>
						<th title="数据库" width="30">数据库</th>
						<th title="数据状态" width="30">数据状态</th>
						<th title="最大时间" width="60">最大时间</th>
						<th title="检查时间" width="60">检查时间</th>
					</tr>
				</thead>
				<tbody class="fly-table-body" id="status_List"></tbody>
			</table>
		</div>
	</div>


	<div id="addDialog" style="display: none">
		<form data-fly-form id="addForm" class="fix" method="post" action="">
			<div data-fly-form-element
				data-fly-options="{name: 'checkName', title: '数据库检查名', width:'1/3',disabled:true, required: true, type: 'text'}">
			</div>

			<div data-fly-form-element
				data-fly-options="{name: 'dataBase', title: '数据库', width:'1/3', required: true, type: 'combobox'}">
			</div>

			<div id="dataBaseBtn" style="margin-top: 6px;">
				<ul>
					<li onclick="addDataBase()">新增</li>
					<li onclick="deleteDataBase()">删除</li>
					<li onclick="editDataBase()">编辑</li>
				</ul>
			</div>

			<div data-fly-form-element
				data-fly-options="{name: 'emailstatus', title: '', 
                                 width:'1/2', type: 'checkbox',data:[{mc: '邮件告警', dm: 'email'}],textField:'mc', valueField:'dm'}">
			</div>

			<div data-fly-form-element
				data-fly-options="{name: 'messagestatus', title: '', 
                                 width:'1/2', type: 'checkbox',data:[{mc: '短信告警', dm: 'message'}],textField:'mc', valueField:'dm'}">
			</div>


			<div data-fly-form-element
				data-fly-options="{name: 'sql', title: '检查语句', width:'1/2', required: true, type: 'textarea'}">
			</div>

			<div data-fly-form-element
				data-fly-options="{name: 'content', title: '告警内容', width:'1/2', required: true, type: 'textarea'}">
			</div>

			<div data-fly-form-element
				data-fly-options="{name: 'addTeam', title: '所属产品或部门', width:'1/3', required: true, type: 'combobox'}">
			</div>

		</form>

	</div>

	<div id="dataBaseDialog" style="display: none">

		<div data-fly-form-element
			data-fly-options="{name: 'dbtype', title: '数据库类型', width:'1/2', required: true, type: 'combobox',
				data:[{mc: 'mysql', dm: 'mysql'},{mc: 'oracle', dm: 'oracle'},{mc: 'sqlserver', dm: 'sqlserver'}],
				 valueField:'dm',textField:'mc',initValue:'mysql'}">
		</div>

		<div data-fly-form-element
			data-fly-options="{name: 'dbname', title: '数据库名称', width:'1/2',disabled:true, required: true, type: 'text'}">
		</div>

		<div data-fly-form-element
			data-fly-options="{name: 'url', title: '数据库Url', width:'1/2',value:'jdbc:oracle:thin:@//localhost:port/dbname', required: true, type: 'textarea'}">
		</div>

		<div data-fly-form-element
			data-fly-options="{name: 'username', title: '数据库用户名', width:'1/2',disabled:true, required: true, type: 'text'}">
		</div>

		<div data-fly-form-element
			data-fly-options="{name: 'password', title: '数据库密码', width:'1/2',disabled:true, required: true, type: 'text'}">
		</div>

		<!-- 存储teamid -->
		<input id="teamid" type="hidden" value="" />
	</div>



	<script type="text/html" id="listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr id="${id}">
    <td title="\${id}"><div class="ell"><input name="dataCheck" type="checkbox" value="\${id};\${status};\${messagestatus}" /></div></td>
    <td title="\${check_name}"><div class="ell">\${check_name}</div></td>
    <td title="\${dbName}"><div class="ell">\${dbName}</div></td>
 	<td title="\${sql}"><div class="ell">\${sql}</div></td>
	<td title="\${updateTime}"><div class="ell">\${updateTime}</div></td>

    <td title="\${status}"><div class="ell">\${status}</div></td>
	<td title="\${error_num}"><div class="ell">\${error_num}</div></td>
    
    <td title="\${messagestatus}"><div class="ell">\${messagestatus}</div></td>
    <td title="\${emailstatus}"><div class="ell">\${emailstatus}</div></td>
</tr>
	</script>

	<script type="text/html" id=status_listTemplate>
<!-- eclipse下需要转移所以会需要\ -->
<tr>
    <td title="\${id}"><div class="ell">\${id}</div></td>
    <td title="\${check_name}"><div class="ell">\${check_name}</div></td>
    <td title="\${dbName}"><div class="ell">\${dbName}</div></td>
	 <td title="\${status}"><div class="ell">\${status}</div></td>
     <td title="\${maxTime}"><div class="ell">\${maxTime}</div></td>
     <td title="\${checkTime}"><div class="ell">\${checkTime}</div></td>


</tr>
	</script>



</body>
</html>