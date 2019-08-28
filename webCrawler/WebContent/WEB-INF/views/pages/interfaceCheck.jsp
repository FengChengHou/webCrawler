<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>接口检测</title>
<%@ include file="../common.jsp"%>
<%@ include file="../base.jsp"%>

<script type="text/javascript" src="resources/js/interfaceCheck.js"></script>
<link style="text/css" rel="stylesheet" href="resources/css/interfaceCheck.css">


</head>
<body>
	<div id="title">
		<ul>
			<li id="interface" class="menu">接口</li>
			<li id="state" class="menu">接口状态</li>
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
		<div id="name" data-fly-form-element  data-fly-options="{name: 'interfaceName', title: '接口名', width:'1/3', required: false, type: 'text'}">
        </div>
        <button id="publish" class="hidden btn btn-default"
						data-fly-button="" type="button"
						data-fly-options="{cls: 'default', disabled: false}"
						onclick="getData()">查询</button>
		
	</form>

	<div id="btn" style="margin-top: 5px;margin-bottom: 5px;">
		<ul>
			<li onclick="addUrl()">新增</li>
			<li onclick="removeUrl()">删除</li>
			<li onclick="getUrl()">编辑</li>
			<li onclick="updateMultiple(2)">开启监控</li>
			<li onclick="updateMultiple(-1)">关闭监控</li>
			<li onclick="updateMessage(0)">短信开启</lis>
			<li onclick="updateMessage(1)">短信关闭</li>
			<li onclick="getJian()">测试</li>	
		</ul>
	</div>

	<div id="interfacepage" style="margin-top: 40px;">
		<div id="queryGrid" class="fly-grid">
			<div class="fly-grid-body">
				<table class="fly-table">
					<thead class="fly-table-header">
						<tr>
							<th title="序号" width="10"></th>
							<th title="接口名称" width="80">产品名称</th>
							<th title="ip" width="40">访问权限</th>
							<th title="接口地址" width="40">接口地址</th>
							<th title="检查状态" width="20">检查状态</th>
							<th title="更新时间" width="60">更新时间</th>
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
		<script type="text/html" id="listTemplate">
<!-- eclipse下需要转移所以会需要\ -->
<tr id="${id}">
    <td title="\${id}"><div class="ell"><input name="inter" type="checkbox" value="\${id};\${flag1};\${messagestatus1}" /></div></td>
    <td title="\${name}"><div class="ell">\${name}</div></td>
    <td title="\${host}"><div class="ell">\${host}</div></td>
 	<td title="\${path}"><div class="ell">\${path}</div></td>
    <td title="\${flag1}"><div class="ell">\${flag1}</div></td>
	<td title="\${updatetime1}"><div class="ell">\${updatetime1}</div></td>
    <td title="\${error_num}"><div class="ell">\${error_num}</div></td>
    <td title="\${messagestatus1}"><div class="ell">\${messagestatus1}</div></td>
    <td title="\${emailstatus1}"><div class="ell">\${emailstatus1}</div></td>
</tr>
	</script>
	</div>


	<div id="editDialog" style="display: none;">
		<form data-fly-form id="form_demo" class="fix" method="post" action="">
			<div id="interurl" data-fly-form-element
				data-fly-options="{name: 'interurl', title: '接口地址:', width:'1',
                              type: 'text'}"></div>
			<div data-fly-form-element
				data-fly-options="{name: 'intername', title: '接口名称:', width:'1/2',
                                  type: 'text'}"></div>
			<div data-fly-form-element
				data-fly-options="{name: 'interip', title: '接口ip:', width:'1/2' ,type: 'text'}"></div>
			<div data-fly-form-element
				data-fly-options="{name: 'interport', title: '端口号:', width:'1/2',
                                   type: 'text'}"></div>
			<div data-fly-form-element
				data-fly-options="{name: 'interpath', title: '接口名:', width:'1/2',
                                  type: 'text'}"></div>
			<div data-fly-form-element
				data-fly-options="{name: 'intertime', title: '超时时间:', width:'1/2',
                                 type: 'text'}"></div>
          <div data-fly-form-element  data-fly-options="{name: 'requestMethod', title: '请求方式', width:'1/2',  type: 'combobox',
             data:[{mc: 'get', dm: 'get'},{mc: 'post', dm: 'post'}],
         valueField:'dm',textField:'mc',initValue:'get'}">
    </div>

			<div data-fly-form-element
				data-fly-options="{name: 'interemail', title: '', 
                                 width:'1/2', type: 'checkbox',data:[{mc: '邮件提醒', dm: '1'}],'textField':'mc', 'valueField':'dm'}"></div>

			<div data-fly-form-element
				data-fly-options="{name: 'intermessage', title: '', 
                                 width:'1/2', type: 'checkbox',data:[{mc: '短信提醒', dm: '1'}],'textField':'mc', 'valueField':'dm'}"></div>

			<div data-fly-form-element
				data-fly-options="{name: 'checkfield', title: '检查字段', width:'1/3',
                                  type: 'text'}"></div>
                                  
        <div data-fly-form-element  data-fly-options="{name: 'checkcondition',title: '', width:'1/3',  type: 'combobox',
             data:[{mc: '=', dm: '1'},{mc: '!=', dm: '2'}],
         valueField:'dm',textField:'mc',initValue:'1'}">
         </div>
         
         <div data-fly-form-element
				data-fly-options="{name: 'checkvalue', title: '检查值', width:'1/3',
                                  type: 'text'}">
                                  </div>
                                  <center><p>符和检查条件将告警,暂只支持json格式</p></center>
			<div id="queryGrid1" class="fly-grid">
				<div id="btn" style="margin-top: 5px;">
					<ul>
						<li onclick="addParams()">新增</li>
						<li onclick="deleteParams()">删除</li>
					</ul>
				</div>
				<div class="fly-grid-body" style="width:700px; height:140px; overflow:auto; ">
					<table class="fly-table">
						<thead class="fly-table-header">
							<tr>
								<th title=""></th>
								<th title="参数名">参数名</th>
								<th title="参数值">参数值</th>	
							</tr>
						</thead>
						<tbody class="fly-table-body" id="List1">
						</tbody>
					</table>
				</div>
			</div>
		</form>
	</div>



	<div id="urlpage" style="margin-top: 5px; display: none">
		<div id="queryGrid11" class="fly-grid">
			<div class="fly-grid-body">
				<table class="fly-table">
					<thead class="fly-table-header">
						<tr>
							<th title="接口名称" width="20">接口名称</th>
							<th title="Url" width="80">地址</th>
							<th title="Code" width="10">状态码</th>
							<th title="Status" width="10">状态</th>
							<th title="RequestTime" width="40">请求时间</th>
							<th title="TimeUse" width="10">所用用时</th>
							<th title="Result" width="20">返回值</th>						
						</tr>
					</thead>
					<tbody class="fly-table-body" id="List11"></tbody>
				</table>
			</div>
		</div>
		<script type="text/html" id="listTemplate11">
<!-- eclipse下需要转移所以会需要\ -->
<tr id="${id}">
    <td title="\${name}"><div class="ell">\${name}</div></td>
    <td title="\${url}"><div class="ell">\${url}</div></td>
 	<td title="\${code}"><div class="ell">\${code}</div></td>
    <td title="\${status}">

 				{{if status ==  "成功"}}
					<div class="ell" style="color:green">\${status}</div>			
				{{else}}
					<div class="ell"  style="color:red">\${status}</div>
				{{/if}}

	</td>
 	<td title="\${requestTime1}"><div class="ell">\${requestTime1}</div></td>
    <td title="\${timeUsed}"><div class="ell">\${timeUsed}</div></td>
    <td title="\${result}"><div class="ell">\${result}</div></td>
</tr>
	</script>
	</div>

</body>
</html>