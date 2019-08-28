<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>告警通知设置</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>
<script type="text/javascript" src="resources/js/warningNotice.js"></script>
</head>
<body>

	<div id="queryGrid" class="fly-grid">
		<div class="fly-grid-body">
			<table class="fly-table">
				<thead class="fly-table-header">
					<tr>
						<th title="序号" width="10">序号</th>
						<th title="产品名称" width="80">团队名称</th>
						<th title="访问权限" width="40">监测接口条数</th>
						<th title="时间" width="40">监测数据条数</th>
						<th title="操作" width="40">通知对象设置</th>
					</tr>
				</thead>
				<tbody class="fly-table-body" id="List"></tbody>
			</table>
		</div>
	</div>

	<div id="addDialog" style="display: none">
		<form data-fly-form id="team_form" class="fix" method="post" action="">
			<div data-fly-form-element
				data-fly-options="{name: 'team', title: '团队', width:'1/2', required: true, type: 'combobox'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'messageTo', title: '短信通知对象', width:'2/3', type: 'textarea'}">
			</div>
			<div data-fly-form-element
				data-fly-options="{name: 'emailTo', title: '邮件通知对象', width:'2/3', type: 'textarea'}">
			</div>
		</form>

	</div>

	<script type="text/html" id="listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr>
    <td title="\${id}"><div class="ell">\${id}</div></td>
    <td title="\${teamName}"><div class="ell">\${teamName}</div></td>
    <td title="\${tnum}"><div class="ell">\${tnum}</div></td>
	<td title="\${dnum}"><div class="ell">\${dnum}</div></td>
    <td>
        <a onclick="editWarningNotice('\${teamid}');" data-id="\${id}" title="查看/修改" style="cursor: pointer;" class="handle-btn edit">修改</a>
    </td>
</tr>
</script>


</body>
</html>