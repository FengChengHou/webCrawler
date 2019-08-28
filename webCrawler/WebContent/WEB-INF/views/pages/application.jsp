<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>申请审核</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>
<link style="text/css" rel="stylesheet" href="resources/css/application.css">
<script type="text/javascript" src="resources/js/application.js"></script>
</head>
<body>
<form data-fly-form id="team_form" class="fix" method="post" action="">
	<div data-fly-form-element  data-fly-options="{name: 'status', title: '状态', width:'1/3', required: true, type: 'combobox',
    data:[{mc: '全部', dm: '-1'},{mc: '待审核', dm: '0'},{mc: '通过', dm: '1'},{mc: '拒绝', dm: '2'}],
    valueField:'dm',textField:'mc',initValue:'-1'}">
    </div>
    
    <div id="button">
    <button id="publish" class="hidden btn btn-default"
						data-fly-button="" type="button"
						data-fly-options="{cls: 'default', disabled: false}"
						onclick="update(1)">通过</button>
						
	<button id="cancel" class="hidden btn btn-warning" data-fly-button="" type="button" data-fly-options="{cls: 'warning', disabled: false}" onclick="update(2)">拒绝</button>
	
    </div>
</form>

	<div id="UserTeampage" style="margin-top: 5px;">
		<div id="queryGrid" class="fly-grid">
			<div class="fly-grid-body">
				<table class="fly-table">
					<thead class="fly-table-header">
						<tr>
						    <th title="" width="10"></th>
							<th title="序号" width="10">序号</th>
							<th title="用户名" width="50">用户名</th>
							<th title="姓名" width="20">姓名</th>
							<th title="手机号码" width="40">手机号码</th>
							<th title="申请团队" width="20">申请团队</th>
							<th title="状态" width="10">状态</th>
							<th title="时间" width="40">时间</th>
						</tr>
					</thead>
					<tbody class="fly-table-body" id="List"></tbody>
				</table>
			</div>
		</div>
		<script type="text/html" id="listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr id="${id}">
    <td title=""><div class="ell"><input name="userTeam" type="checkbox" value="\${uuid};\${permissions}" /></div></td>
    <td title="\${id}"><div class="ell">\${id}</div></td>
    <td title="\${username}"><div class="ell">\${username}</div></td>
    <td title="\${name}"><div class="ell">\${name}</div></td>
    <td title="\${phone}"><div class="ell">\${phone}</div></td>
 	<td title="\${productname}"><div class="ell">\${productname}</div></td>
    <td title="\${permissions}"><div class="ell">\${permissions}</div></td>
	<td title="\${time}"><div class="ell">\${time}</div></td>
</tr>
	</script>
	</div>

</body>
</html>