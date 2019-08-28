<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户管理</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>
<script type="text/javascript" src="resources/js/userManager.js"></script>
<link style="text/css" rel="stylesheet"
	href="resources/css/userManager.css">
</head>
<body>

	<div id="sp_queryGrid" class="fly-grid">
		<div class="fly-grid-body">
			<table class="fly-table">
				<thead class="fly-table-header">
					<tr>
						<th title="序号" width="30">序号</th>
						<th width="100" title="用户名">用户名</th>
						<th title="姓名" width="100">姓名</th>
						<th width="100" title="手机号码">手机号码</th>
						<th width="200" title="参与团队">参与团队</th>
						<th width="50" title="有效状态">有效状态</th>
						<th width="100" title="操作">操作</th>
					</tr>
				</thead>
				<tbody class="fly-table-body" id="sp_List">
				</tbody>
			</table>
		</div>
	</div>
	<script type="text/html" id="sp_listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr>
    <td title="\${i}"><span><div class="ell">\${i}</div></span></td>
	 <td title="\${username}"><div class="ell">\${username}</div></td>
    <td title="\${name}"><div class="ell">\${name}</div></td>
    <td title="\${telephone}"><div class="ell">\${telephone}</div></td>
    <td title="\${teamname}"><div class="ell">\${teamname}</div></td>  
	<td title="\${status}"><div class="ell" id="wllj">\${status}</div></td>
    <td>
	<a href="javascript:openEDialog('\${id}')" class="handle-btn edit" title="编辑">编辑</a></td>  
</tr>
</script>

	<div id=ueditDialog>

		<form data-fly-form id="form_demo" class="fix" method="post" action="">
			<input type="hidden" id="userid" name="userid" value="">
			<div data-fly-form-element
				data-fly-options="{name: 'username', title: '用户名：',readonly:'true', width:'1/2',value:'', required: true, type: 'text'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'name', title: '姓名：',readonly:'true', width:'1/2', value:'',required: true, type: 'text'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'telephone', title: '手机号码：', readonly:'true',width:'1/2',value:'',required: true, type: 'text'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'remarks',id:'remarks', title: '备注：', width:'1/2',value:'', required: true, type: 'textarea'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'permissions', title: '菜单权限：', 
                                 width:'1',required: true, type: 'checkbox',data:[{mc: '接口监测', dm: '1d0a349e-d9db-11e5-88d6-005056be0afb'},{mc: '数据监测', dm: '2e14e6d0-d9db-11e5-88d6-005056be0afb'},{mc: '团队申请加入', dm: 'a68c045c-d9dd-11e5-88d6-005056be0afb'},{mc: '告警通知设置', dm: 'dd482b18-d9ee-11e5-88d6-005056be0afb'},{mc: '用户管理', dm: '18b9b900-d9ef-11e5-88d6-005056be0afb'}],'textField':'mc', 'valueField':'dm'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'team', readonly:'true',title: '参加团队：',value:'' , width:'1', required: true, type: 'textarea'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'status', title: '是否有效：', 
                                 width:'1',required: true, type: 'radio',data:[{mc: '是', dm: '1'},{mc: '否', dm: '0'}],'textField':'mc', 'valueField':'dm'}">
			</div>

		</form>
	</div>
</body>
</html>