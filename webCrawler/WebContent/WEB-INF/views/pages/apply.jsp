<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>团队申请加入</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>
<script type="text/javascript" src="resources/js/apply.js"></script>
</head>
<body>


	<div id="queryGrid" class="fly-grid">
		<div class="fly-grid-body">
			<table class="fly-table">
				<thead class="fly-table-header">
					<tr>
						<th title="序号" width="10">序号</th>
						<th title="产品名称" width="80">团队名称</th>
						<th title="访问权限" width="40">访问权限</th>
						<th title="时间" width="40">时间</th>
						<th title="操作" width="40">操作</th>
					</tr>
				</thead>
				<tbody class="fly-table-body" id="List"></tbody>
			</table>
		</div>
	</div>

	<script type="text/html" id="listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr>
    <td title="\${id}"><div class="ell">\${id}</div></td>
    <td title="\${productname}"><div class="ell">\${productname}</div></td>
    <td title="\${permissions}"><div class="ell">\${permissions}</div></td>
 <td title="\${time}"><div class="ell">\${time}</div></td>
  
    <td>
        <a onclick="applyTeam('\${teamid}','\${permissions}');" data-id="\${id}" title="申请" class="handle-btn edit">申请</a>
    </td>
</tr>
</script>

</body>
</html>