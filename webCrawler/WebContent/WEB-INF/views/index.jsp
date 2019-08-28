<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/frame/easyui/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/frame/easyui/themes/icon.css">
<style>
.delimit_horver {
	margin-bottom: 10px;
}

.delimit_horver_2 {
	margin-bottom: 20px;
}
</style>
<script
	src="<%=request.getContextPath()%>/resources/common-js/jquery/jquery-1.7.2.min.js"
	charset="UTF-8" type="text/javascript"></script>
<script
	src="<%=request.getContextPath()%>/resources/frame/easyui/jquery.easyui.min.js"
	charset="UTF-8" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/resources/js/datasourse.js"
	charset="UTF-8" type="text/javascript"></script>
<script>
	
	function showTab(title){
		$('#tabs').tabs('select',title);
	}
	
	function update(id,flag){
		
		//alert(id+"--"+flag);
		
		$.ajax({
			url:"<%=request.getContextPath()%>/url/update",
			type:"post",
			dataType:"json",
			data:{
				id:id,
				flag:flag
			},
			success:function(data){
				if(data){
					window.location.reload(true);
				}
			},error:function(){
				alert("操作失败！");
			}
		});
	}
	//5w
	function updateMultiple(flag){
		var rows = $('#dg').datagrid('getSelections');
		var ids = '';
		var i;
		var s = "" ;
		if(rows == ""){
	           alert("当前没有选中项！");
	           return;
	    }
		if(flag == "2"){
			s = "2";
		}else{
			s = "-1";
		}
		for(i=0;i<rows.length;i++){
			if(rows[i].flag != s){
				if(rows[i].flag == "0" && flag == "-1"){
					alert("超时不可关闭！");
				}else{
			      	ids+=rows[i].id + ',';
				}
			}
			
		}
		$.ajax({
			url:"<%=request.getContextPath()%>/url/updateAll",
			type:"post",
			dataType:"json",
			data:{
				ids:ids,
				flag:flag
			},
			success:function(data){
				if(data){
					window.location.reload(true);
				}
			},error:function(){
				alert("操作失败！");
			}
		});
		//alert(ids);
	}
	
	//短信开启或关闭
	function updateMail(flag){
		var rows = $('#dg').datagrid('getSelections');
		var ids = '';
		var i;
		if(rows == ""){
	           alert("当前没有选中项！");
	           return;
	    }
		for(i=0;i<rows.length;i++){
			if(flag=='0' ){
				if(rows[i].messagestatus == "0" ){
					alert("已开启的不可开启！");
				}else{
			      	ids+=rows[i].id + ',';
				}
			}
			else{
				if(rows[i].messagestatus == "1" ){
					alert("已关闭的不可关闭！");
				}else{
			      	ids+=rows[i].id + ',';
				}
			}
			
		}
		$.ajax({
			url:"<%=request.getContextPath()%>/url/updateMessagestatus",
			type:"post",
			dataType:"json",
			data:{
				ids:ids,
				messagestatus:flag
			},
			success:function(data){
				if(data){
					window.location.reload(true);
				}
			},error:function(){
				alert("操作失败！");
			}
		});
		//alert(ids);
	}
	function updateData(flag){
		var rows = $('#data').datagrid('getSelections');
		var ids = '';
		var i;
		var s = "";
		if(rows == ""){
	           alert("当前没有选中项！");
	           return;
	    }
		if(flag == "1"){
			s = "1";
		}else{
			s = "0";
		}
		for(i=0;i<rows.length;i++){
			if(rows[i].flag != s){
				if(rows[i].flag == "0" && rows[i].flag == "2"){
					alert("不能关闭！");
				}else{
			      	ids+=rows[i].id + ',';
				}
			}
			
		}
		$.ajax({
			url:"<%=request.getContextPath()%>/dataMonitor/updateAll",
			type:"post",
			dataType:"json",
			data:{
				ids:ids,
				flag:flag
			},
			success:function(data){
				if(data){
					window.location.reload(true);
				}
			},error:function(){
				alert("操作失败！");
			}
		});
		//alert(ids);
	}
	
	//add  a  interface or website  homepage
	function  addUrl(url){
		var result;
		$.ajax({
			url:"<%=request.getContextPath()%>/url/add",
			type:"post",
			dataType:"json",
			data:{
				url:JSON.stringify(url)
			},
			success:function(data){
				if(data){
					result = data;
				}
				//window.location.reload(true);
			}
			
		});
		
		return result;
	}
	
	//根据ID编辑URL
	function getUrl(){
		//$('#window_edit').dialog('open');
		var rows = $('#dg').datagrid('getSelections');
		
		if(rows.length < 1){
	           alert("至少选择一个！");
	           return;
		}else if(rows.length > 1){
			alert("无法编辑多个！");
		}
		
		else{
			  $.ajax({
			    	url:'<%=request.getContextPath()%>/url/get',
					type:"post",
					dataType:"json",
					data:{
						id:rows[0].id
					},
					success:function(data){
						 	$('#window').dialog('open');
						 	$('#params_url').css("display","none");
						 	$('#labelUrl').css("display","none");
						 	document.getElementById("params_id").value = data.id;
						     document.getElementById("params_name").value = data.name;
						     document.getElementById("params_host").value = data.host;
						     document.getElementById("params_port").value = data.port;
						     document.getElementById("params_path").value = data.path;
						     document.getElementById("params_time").value = data.time;
						     document.getElementById("params_flag").value = data.flag;
						     document.getElementById("params_errorNum").value = data.error_num;
						     document.getElementById("params_errorNum").value = data.department;
						    
						     
							$('#params').datagrid({
								url:'<%=request.getContextPath()%>/url/getParams?id='+data.id,
								rownumbers:true,
								onDblClickCell:function(rowIndex,field,value){
							 		 $('#params').datagrid('beginEdit',rowIndex);
							 	},
								singleSelect:true,
								frozenColumns:[[
								                {field:'ck',checkbox:true}
											]],
								columns:[[	
									    	{field:'key',title:'Key',width:100,
												editor:{
													type:'text'
												}	
									    	},
									    	{field:'value',title:'Value',width:150,
									    		editor:{
													type:'text'
												}
									    	},
									    	{field:'operation',title:'Operation',width:100}
									    ]],
								toolbar:[{
										iconCls: 'icon-add',
										handler: function(){
											var lastIndex;
											$('#params').datagrid('unselectAll');
											$('#params').datagrid('endEdit', lastIndex);
											$('#params').datagrid('appendRow',{
												key:'',
												value:'',
												order:lastIndex
											});
											lastIndex = $('#params').datagrid('getRows').length-1;
											$('#params').datagrid('selectRow', lastIndex);
											$('#params').datagrid('beginEdit', lastIndex);
											
											$('#params').datagrid('unselectAll');
										}
									},{
										iconCls:'icon-cut',
										handler:function(){
											deteleParam();
										}
								
									},{
										iconCls:'icon-save',
										handler:function(){
											$('#params').datagrid('acceptChanges');
										}
									}]
							});
						
					}
				}); 
			 
		}
  		
	}
	
	function removeUrl(){
		var rows = $('#dg').datagrid('getSelections');
		var ids = '';
		var i;
		if(rows == ""){
	          alert("当前没有选中项！");
	          return;
	    }
		for(i=0;i<rows.length;i++){
			
			ids+=rows[i].id + ',';
			
		}
		
			   if (confirm("确认要删除？")){
		$.ajax({
			url:"<%=request.getContextPath()%>/url/remove",
			type:"post",
			dataType:"json",
			data:{
				ids:ids
			},
			success:function(data){
				if(data == "1"){
					alert("删除成功！");
					window.location.reload(true);
				}
			}
		});
			   }
	
	}
	
	function deteleParam(){
		$.messager.confirm('确认','是否真的删除?',function(r){
			   if (r){
			   var selects = $('#params').datagrid('getSelections');
			   for (var i=0;i<selects.length;i++){
					  var index = $('#params').datagrid('getRowIndex', selects[i]);
					  $('#params').datagrid('deleteRow', index);
					  DeleteSubmit(selects[i]);
			   	}
			  }
			});
	}
	
	//新增dataMontitor
	function  addDataMonitor(dataMonitor){
		var result;
		$.ajax({
			url:"<%=request.getContextPath()%>/dataMonitor/add",
			type:"post",
			dataType:"json",
			data:{
				dataMonitor:JSON.stringify(dataMonitor)
			},
			success:function(data){
				if(data){
					result = data;
				}
				 window.location.reload(true);
			}
			
		});
		return result;
	}
	//编辑显示
	function getData(){
		var rows = $('#data').datagrid('getSelections');
		$("#select_database").empty();
		if(rows.length < 1){
	           alert("至少选择一个！");
	           return;
		}else if(rows.length > 1){
			alert("无法编辑多个！");
		}
		
		else{
			  $.ajax({
			    	url:'<%=request.getContextPath()%>/dataMonitor/get',
					type:"post",
					dataType:"json",
					data:{
						id:rows[0].id
					},
					success:function(data){
						 	$('#data_window').dialog('open');
						 	 document.getElementById("data_id").value = data.id;
						     document.getElementById("check_name").value = data.check_name;
						     document.getElementById("sql").value = data.sql;
						     document.getElementById("text").value = data.text;
						     document.getElementById("status").value = data.status;
						     document.getElementById("error_num").value = data.error_num;
						     $("#select_database").append("<option id="+data.sid+" value="+data.sid+">"+data.dbName+"</option>")
						     $.ajax({
					            url:'<%=request.getContextPath()%>/dataSourse/datalist',
					            type:"post",
					            dataType:"json",
					            data:{
						        data:JSON.stringify(data)
					                 },
								  success:function(da){
									 var str ="";
									 for(var j = 0, l = da.length; j < l; j++){
										 if(da[j].id!=data.sid){
									      str = "<option id="+da[j].id+" value="+da[j].id+">"+da[j].dbName+"</option>" +str;//改成下拉框
										 }
									 }
									 $("#select_database").append(str);
					}
					
				
				})
						     
					}
				});
		}
  		
	}
	
	function removeDataMonitor(){
		var rows = $('#data').datagrid('getSelections');
		var ids = '';
		var i;
		if(rows == ""){
	          alert("当前没有选中项！");
	          return;
	    }
		for(i=0;i<rows.length;i++){
			
			ids+=rows[i].id + ',';
			
		}
		if (confirm("确认要删除？")){
		$.ajax({
			url:"<%=request.getContextPath()%>/dataMonitor/remove",
			type:"post",
			dataType:"json",
			data:{
				ids:ids
			},
			success:function(data){
				if(data == "1"){
					alert("删除成功！");
					window.location.reload(true);
				}
			}
		});
		}
	}
	
	function listParams(row){
		$('#dgParams').datagrid({
			rownumbers:true,
			title:row.name + "参数列表",
			columns:[[	
				    	{field:'key',title:'Key',width:100,
							editor:{
								type:'text'
							}	
				    	},
				    	{field:'value',title:'Value',width:150,
				    		editor:{
								type:'text'
							}
				    	},
				    	{field:'operation',title:'Operation',width:100}
				    ]]
		});
		
		if(row.paramViews){
			$('#dgParams').datagrid(
				'loadData',row.paramViews
			);			
		}else{
			$('#dgParams').datagrid('clear');
		}
	}
	
	function editParams(){
		var row = {};
		row.name='';
		row.paramViews=[];
		
		$('#dgParams').datagrid({
			rownumbers:true,
			title:row.name + "参数列表",
			columns:[[	
				    	{field:'key',title:'Key',width:100,
							editor:{
								type:'text'
							}	
				    	},
				    	{field:'value',title:'Value',width:150,
				    		editor:{
								type:'text'
							}
				    	},
				    	{field:'operation',title:'Operation',width:100}
				    ]]
		});
		
		$('#dgParams').datagrid('appendRow',{
			key:'',
			value:''
		});
		$('#dgParams').datagrid('beginEdit',0);
		
	}
	function isStrEmpty(str){
		if(str ===undefined || str ==null ||str.trim()==''){
			return true;
		}else{
			return false;
		}
	}
	
	/*@Function define a object has propeties:key,value. 
	 *@Author dimboy
	 *@Date 2014-07-17
	 */
	function param(key,value){
		this.key = key;
		this.value = value;
	}

	/*@Function define a object:init a array [param],from request url query string. 
	 *@Author dimboy
	 *@Date 2014-07-17
	 */
	function  paramPairs(str){
		
		if (isStrEmpty(str)){
			return null;
		}
		
		var pairs = str.split('&');
		for(i=0;i<pairs.length;i++){
			var index = pairs[i].indexOf('=') ;
			  
			var key =  pairs[i].substr(0,index);
			  
			index++;
			
			var value = pairs[i].substr(index);
			  
			this[i] =   new param(key,value);	  
		}

		this.length = pairs.length;
	}
	
	
	/*@Function check params input form.  
	 *@Author dimboy
	 *@Date 2014-07-15
	 */
	 function checkParams(){
		$('#params_url').change(function(){
			var params_url = $('#params_url').val();
			var url = captureUrl(params_url);
			
			$('#params_host').val(url.host);
			$('#params_port').val(url.port);
			$('#params_path').val(url.path);
			
			alert(url.paramViews +';');
			//+ new paramPairs(url.paramViews)[0].key
			//$('#params').datagrid('loadData',new paramPairs(url.paramViews));
			
		});
		
		$('#params_host').change(function(){ 
			caculateUrl();
		});
		
		$('#params_port').change(function(){ 
			caculateUrl();
		});
		
		$('#params_path').change(function(){ 
			caculateUrl();
		});		
	}
	
	function caculateUrl(){
		var host = $('#params_host').val();
		var port = $('#params_port').val();
		var path = $('#params_path').val();
		
		port = (isStrEmpty(port)?'': port);
		path = (isStrEmpty(path)?'': path);
		port = (port.indexOf(':') ==0 || port=='' ?port:':' + port);
		path = (path.indexOf('/') ==0 || path=='' ?path:'/' + path);
		//var params =$('#params_params').val();
		
		var rows = $('#params').datagrid('getRows');
		var url_params = '';
		for(i=0;i<rows.length;i++){
			
			if(i == 0 ){
				url_params += "?" + rows[i].key + "=" + rows[i].value;
			}else{
				url_params += "&" + rows[i].key + "=" + rows[i].value;
			}
		}
		
		$('#params_url').val(host+port+path+url_params);
	}
	
	function captureUrl(url){
		var url = url.trim().replace('http://','');
		var pattern=/^([0-9a-zA-Z_.]*)(:[0-9]{3,5})?([^?]*)?(\?.*)?$/;

		var result = url.match(pattern);
		
		var  urlObj = {};
		var host = isStrEmpty(result[1])?'':result[1].trim();
		var port = isStrEmpty(result[2])?'8080':result[2].trim().replace(':','');
		var path = isStrEmpty(result[3])?'':result[3].trim();
		var params = isStrEmpty(result[4])?'':result[4].trim().replace('?','');
		
		urlObj.host = host;
		urlObj.port = port;
		urlObj.path = path;
		urlObj.params = params;
		return urlObj;
	}
	
	
	function submitUrlAdd(){
		caculateUrl();
		
		var name=  $('#params_name').val();
		var host = $('#params_host').val();
		var port = $('#params_port').val();
		var path = $('#params_path').val();
		var time = $('#params_time').val();
		var flag = $('#params_flag').val();
		var department = $('#department').val();
		
		
		name = (isStrEmpty(name)?'': name);
		port = (isStrEmpty(port)?'': port);
		path = (isStrEmpty(path)?'': path);
		port = (port.indexOf(':') ==0 || port=='' ?(port == ''?'8080':port):'' + port);
		path = (path.indexOf('/') ==0 || path=='' ?path:'/' + path);
		time = (time == 0 || time == null ? 0 : time);
		flag = (isStrEmpty(flag)?'': flag);
		//var params =$('#params_params').val();
		
		var rows = $('#params').datagrid('getRows');
		var url_params = '';
		for(i=0;i<rows.length;i++){
			
			if(i == 0 ){
				url_params += "?" + rows[i].key + "=" + rows[i].value;
			}else{
				url_params += "&" + rows[i].key + "=" + rows[i].value;
			}
		}
		
		var url= { };
		url.name = name;
		url.host = host;
		url.port = port;
		url.path  = path;
		url.time = time;
		url.flag = flag;
		url.department = department;
		url.paramViews = $('#params').datagrid('getRows');
		
		if(addUrl(url)){
			alert(true);
		};
		
		$('#form').form('clear');
		$('#window').dialog('close');
		
	}
	
	function submitUrlEdit(){
		var name=  $('#params_name').val();
		var host = $('#params_host').val();
		var port = $('#params_port').val();
		var path = $('#params_path').val();
		var time = $('#params_time').val();
		var id = $('#params_id').val();
		var flag = $('#params_flag').val();
		var error_num = $('#params_errorNum').val();
		var department = $('#department').val();
		
		name = (isStrEmpty(name)?'': name);
		host = (isStrEmpty(host)?'': host);
		port = (isStrEmpty(port)?'': port);
		path = (isStrEmpty(path)?'': path);
		time = (time == 0 || time == null ? 0 : time);
		id = (isStrEmpty(id)?'': id);
		flag = (isStrEmpty(flag)?'': flag);
		error_num = (isStrEmpty(error_num)?'': error_num);
		
		var url= { };
		url.id = id;
		url.name = name;
		url.host = host;
		url.port = port;
		url.path  = path;
		url.time = time;
		url.flag = flag;
		url.error_num = error_num;
		url.department = department;
		url.paramViews = $('#params').datagrid('getRows');
		
		$.ajax({
			url:'<%=request.getContextPath()%>/url/editUrl',
			type:"post",
			dataType:"json",
			data:{
				url:JSON.stringify(url)
			},
			success:function(data){
				$('#window').dialog('close');
				window.location.reload(true);
			}
			
		});
	}

	function submitUrl(){
		if($("#params_id").val()==null || $("#params_id").val()==""){
			submitUrlAdd();
		}
		else if($("#params_id").val()!=null){
			submitUrlEdit(); 
		}
	}
	
	//提交新增验证数据信息
	function submitDataAdd(){
		
		var check_name =  $('#check_name').val();
		var database = $('#select_database').val();
		var sql = $('#sql').val();
		var text = $('#text').val();
		var status = $('#status').val();

		check_name = (isStrEmpty(check_name)?'': check_name);
		database = (isStrEmpty(database)?'': database);
		sql = (isStrEmpty(sql)?'': sql);
		text = (isStrEmpty(text)?'':text);
		status = (isStrEmpty(status)?'':status);
		
		var data= { };
		data.check_name = check_name;
		data.sid = database;
		data.sql = sql;
		data.text = text;
		data.status = status;
		
		if(addDataMonitor(data)){
			alert("添加成功");
		}
		$('#data_form').form('clear');
		$('#data_window').dialog('close');
	}

	//data edit
	function submitDataEdit() {
		var check_name = $('#check_name').val();
		var database = $('#select_database').val();
		var sql = $('#sql').val();
		var text = $('#text').val();
		var id = $('#data_id').val();
		var status = $('#status').val();
		var error_num = $('#error_num').val();
		
		check_name = (isStrEmpty(check_name)?'': check_name);
		database = (isStrEmpty(database)?'': database);
		sql = (isStrEmpty(sql)?'': sql);
		text = (isStrEmpty(text)?'': text);
		id = (isStrEmpty(id)?'': id);
		status = (isStrEmpty(status)?'': status);
		error_num = (isStrEmpty(error_num)?'': error_num);
		
		var data= { };
		data.id = id;
		data.check_name = check_name;
		data.sid = database;
		data.sql = sql;
		data.text  = text;
		data.status = status;
		data.error_num = error_num;
		
		$.ajax({
			url:'<%=request.getContextPath()%>/dataMonitor/editData',
			type:"post",
			dataType:"json",
			data:{
				data:JSON.stringify(data)
			},
			success:function(data){
				$('#data_window').dialog('close');
				window.location.reload(true);
			}
			
		});
	} 
	
	function submitData(){
		if($("#data_id").val()==null || $("#data_id").val()==""){
			submitDataAdd();
		}
		else if($("#data_id").val()!=null){
			submitDataEdit();
		}
	}

	
	function data_Monitor(){

		$('#data').datagrid({
		    url:'<%=request.getContextPath()%>/dataMonitor/list',
		    rownumbers:true,
		    pagination:true,
		    pageList:[10,15,20,25,30],
		    frozenColumns:[[
			                {field:'ck',checkbox:true}
						]],
		    columns:[[
				{field:'id',title:'Id',hidden:true},
		   		{field:'check_name',title:'Check_Name',width:160,
					formatter:function(value){
						return (value?value:'');
					}
		   		},
		    	{field:'dbName',title:'Database',width:100
					
		   		},
		    	{field:'sql',title:'SQL',width:500,
		    		formatter:function(value){
						return (value<=0?'':value);
					}
		    	},
		    	{field:'status',title:'Status',width:90,
		    		 formatter:function(value,row,index){
		    			if(value=='0'){
		    				 return '<p style="color:blue;">关闭</p>';
		    			}else if(value=='1'){
		    				 return '<p style="color:green;">开启</p>';
		    			}else 
			    			  if(value=='2'&& row.error_num == '3'){
		    				    return '<p style="color:red;">更新超时</p>';
			    			}else if(value=='2'&& row.error_num != '3'){
			    				return '<p style="color:orange;">更新超时</p>';	
			    			}
		    	}
		    	},
		    	{field:'updatetime',title:'UpdateTime',width:140,formatter:function(value,row,index){
					if ("" == value || null == value) {
						return "--";
					}
					var date = new Date(value);
					var year = date.getFullYear().toString();
					var month = (date.getMonth() + 1);
					var day = date.getDate().toString();
					var hour = date.getHours().toString();
					var minutes = date.getMinutes().toString();
					var seconds = date.getSeconds().toString();
					if (month < 10) {
						month = "0" + month;
					}
					if (day < 10) {
						day = "0" + day;
					}
					if (hour < 10) {
						hour = "0" + hour;
					}
					if (minutes < 10) {
						minutes = "0" + minutes;
					}
					if (seconds < 10) {
						seconds = "0" + seconds;
					}
					return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
							+ seconds;
		    	}
		   		},
		    	{field:'error_num',title:'ErrorNum',width:80,
			    	
		   		}
		    ]],
		    toolbar:[{
				iconCls: 'icon-add',
				handler: function(){
				$.ajax({
					url:'<%=request.getContextPath()%>/dataSourse/datalist',
					type:"post",
					dataType:"json",
					data:{
						data:JSON.stringify(data)
					},
					success:function(data){
						 $("#select_database").empty();
						 var str ="";
						 for(var j = 0, l = data.length; j < l; j++){
						 str = "<option id="+data[j].id+" value="+data[j].id+">"+data[j].dbName+"</option>" +str;//改成下拉框
						 }
						 $("#select_database").append(str);
					}
					
				
				})
					$('#data_window').dialog('open');
					document.getElementById("data_id").value = "";
				     document.getElementById("check_name").value = "";
				     document.getElementById("sql").value = "";
				     document.getElementById("text").value = "";
				     document.getElementById("status").value = "1";
					/* var lastIndex;
					$('#dg').datagrid('unselectAll');
					$('#dg').datagrid('endEdit', lastIndex);
					$('#dg').datagrid('appendRow',{
						name:'',
						host:'',
						port:'',
						path:'',
						operation:''
					});
					lastIndex = $('#dg').datagrid('getRows').length-1;
					$('#dg').datagrid('selectRow', lastIndex);
					$('#dg').datagrid('beginEdit', lastIndex);
					
					$('#dg').datagrid('unselectAll');
					
					
					editParams(); */
					//addUrl();
				}
			},{
				iconCls: 'icon-cut',
				handler: function(){
					removeDataMonitor();
				}
			},{
				iconCls:'icon-edit',
				handler:function(){
					getData();
					$('#data').datagrid('acceptChanges');
				}
			},{
				iconCls:'icon-undo',
				handler:function(){
					$('#data').datagrid('rejectChanges');
				}
			},{
				iconCls: 'icon-start',
				handler: function(){updateData("1");}
			},{
				iconCls: 'icon-close',
				handler: function(){updateData("0");}
			}

			]/* ,
			onClickRow:function(rowIndex,rowData){
				listParams(rowData);				
			} */
		});
		
		/* @Function : allow urls to be edited
		 * @Author : dimboy
		 * @Date : 2014-07-15
		*/
		
		$('#data_Status').datagrid({
			url:'<%=request.getContextPath()%>/dataStatus/list',
			rownumbers:true,
			pagination:true,
		    pageList:[10,15,20,25,30],
			columns:[[
					{field:'check_name',title:'Check_name',width:270,},
					{field:'dbName',title:'Database',width:135,},
					{field:'code',title:'Code',width:150,},
					{field:'max_time',title:'Max_time',width:185,formatter:function(value,row,index){
						if ("" == value || null == value) {
							return "--";
						}
						var date = new Date(value);
						var year = date.getFullYear().toString();
						var month = (date.getMonth() + 1);
						var day = date.getDate().toString();
						var hour = date.getHours().toString();
						var minutes = date.getMinutes().toString();
						var seconds = date.getSeconds().toString();
						if (month < 10) {
							month = "0" + month;
						}
						if (day < 10) {
							day = "0" + day;
						}
						if (hour < 10) {
							hour = "0" + hour;
						}
						if (minutes < 10) {
							minutes = "0" + minutes;
						}
						if (seconds < 10) {
							seconds = "0" + seconds;
						}
						return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
								+ seconds;}},
				  {field:'status',title:'Status',width:150,formatter: function(value,row,index){
									if (value=="正常"){
										return "<p style='background:green;color:white'>"+row.status+"</p>";
									}else{
										return "<p style='background:red;color:white'>"+row.status+"</p>";
									} 
								}},
					{field:'check_time',title:'Check_time',width:200,formatter:function(value,row,index){
									if ("" == value || null == value) {
										return "--";
									}
									var date = new Date(value);
									var year = date.getFullYear().toString();
									var month = (date.getMonth() + 1);
									var day = date.getDate().toString();
									var hour = date.getHours().toString();
									var minutes = date.getMinutes().toString();
									var seconds = date.getSeconds().toString();
									if (month < 10) {
										month = "0" + month;
									}
									if (day < 10) {
										day = "0" + day;
									}
									if (hour < 10) {
										hour = "0" + hour;
									}
									if (minutes < 10) {
										minutes = "0" + minutes;
									}
									if (seconds < 10) {
										seconds = "0" + seconds;
									}
									return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
											+ seconds;
								}}
				]]
		
	});
	}
	//functions call  on  document loaded
	
	function getView(type){
		/* 数据组接口 */
		if(type==0){
			$("#interface").css("display","");
			$("#interface_status").css("display","");
			$("#datamonter").css("display","none");
			$("#datamonter_status").css("display","none");
			var adom = $(".tabs").children(":first")
			var bdom = adom.next();
			var cdom = $(".tabs").children(":last");
			var ddom = cdom.prev();
			adom.css("display","");
			bdom.css("display","");
			cdom.css("display","none");
			ddom.css("display","none");
			document.getElementById("department").value = "0";
			getDepartmentUrl("<%=request.getContextPath()%>/url/list?dept=0");
			getDepartmentUrlstatus("<%=request.getContextPath()%>/urlStatus/list?dept=0");
			
			$('#dg').datagrid('getPager').pagination({           
	            beforePageText: '第',
	            afterPageText: '页    共 {pages} 页',           
	            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
	        });
			
			$('#dg_urlStatus').datagrid('getPager').pagination({           
	            beforePageText: '第',
	            afterPageText: '页    共 {pages} 页',           
	            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
	        });
		}
		/* 移动端接口 */
		if(type==1){
			$("#interface").css("display","");
			$("#interface_status").css("display","");
			$("#datamonter").css("display","none");
			$("#datamonter_status").css("display","none");
			var adom = $(".tabs").children(":first")
			var bdom = adom.next();
			var cdom = $(".tabs").children(":last");
			var ddom = cdom.prev();
			adom.css("display","");
			bdom.css("display","");
			cdom.css("display","none");
			ddom.css("display","none");
			document.getElementById("department").value = "1";
			getDepartmentUrl("<%=request.getContextPath()%>/url/list?dept=1");
			getDepartmentUrlstatus("<%=request.getContextPath()%>/urlStatus/list?dept=1");
			
			$('#dg').datagrid('getPager').pagination({           
	            beforePageText: '第',
	            afterPageText: '页    共 {pages} 页',           
	            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
	        });
			
			$('#dg_urlStatus').datagrid('getPager').pagination({           
	            beforePageText: '第',
	            afterPageText: '页    共 {pages} 页',           
	            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
	        });
		}
		/* 数据组数据监测 */
		if(type==2){
			$("#interface").css("display","none");
			$("#interface_status").css("display","none");
			$("#datamonter").css("display","");
			$("#datamonter_status").css("display","");
			var adom = $(".tabs").children(":first")
			var bdom = adom.next();
			var cdom = $(".tabs").children(":last");
			var ddom = cdom.prev();
			adom.css("display","none");
			bdom.css("display","none");
			cdom.css("display","");
			ddom.css("display","");
			/* ddom.addClass("tabs-selected"); */
			
		}
		
	}
	function getDepartmentUrl(uu){
		$('#dg').datagrid({
			<%-- url:"<%=request.getContextPath()%>/url/list", --%>
			url:uu,
		    rownumbers:true,
		    pagination:true,
			pageList:[10,15,20,25,30],
		    frozenColumns:[[
			                {field:'ck',checkbox:true}
						]],
		    columns:[[
				{field:'id',title:'Id',hidden:true},
		   		{field:'name',title:'Name',width:250,
					formatter:function(value){
						return (value?value:'');
					}
		   		},
		    	{field:'host',title:'Host',width:110,
					
		   		},
		    	{field:'port',title:'Port',width:75,
		    		formatter:function(value){
						return (value<=0?'':value);
					}
		    	},
		    	{field:'path',title:'Path',width:220,
					
		    	},
		    	{field:'flag',title:'Flag',width:130,
		    		 formatter:function(value,row,index){
		    			if(value=='-2'){
		    				 return '<p style="color:red;">未知错误</p>';
		    			}else if(value=='0'){
		    				return '<p style="color:orange;">请求超时/服务器拒绝</p>';
		    			}else if(value=='1'){
		    				return '<p style="color:red;">临时响应</p>';
		    			}else if(value=='2'&& row.error_num==0){
		    				return '<p style="color:green;">定时检查开启</p>';
		    			}else if(value=='2'&& row.error_num>0){
		    				return '<p style="color:orange;">定时检查开启</p>';
		    			}else if(value=='3'){
		    				return '<p style="color:red;">重定向</p>';
		    			}else if(value=='4'){
		    				return '<p style="color:red;">请求错误</p>';
		    			}else if(value=='5'){
		    				return '<p style="color:red;">服务器错误</p>';
		    			}else{
		    				return '<p style="color:blue;">定时检查关闭</p>';
		    			}
		    		} 	
		    	},
		    	{field:'updatetime',title:'UpdateTime',width:150,
		    		formatter:function(value,row,index){
						if ("" == value || null == value) {
							return "--";
						}
						var date = new Date(value);
						var year = date.getFullYear().toString();
						var month = (date.getMonth() + 1);
						var day = date.getDate().toString();
						var hour = date.getHours().toString();
						var minutes = date.getMinutes().toString();
						var seconds = date.getSeconds().toString();
						if (month < 10) {
							month = "0" + month;
						}
						if (day < 10) {
							day = "0" + day;
						}
						if (hour < 10) {
							hour = "0" + hour;
						}
						if (minutes < 10) {
							minutes = "0" + minutes;
						}
						if (seconds < 10) {
							seconds = "0" + seconds;
						}
						return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
								+ seconds;
		    	}},
		    	{field:'error_num',title:'ErrorNum',width:60,
					
		    	},
		    	{field:'messagestatus',title:'Messagestatus',width:100,
		    		 formatter:function(value,row,index){
		    			if(value=='0'&&row.error_num<3){
		    				 return '<p style="color:green;">已开启</p>';
		    			}else{
		    				return '<p  style="color:red;">已关闭</p>';
		    			}
		    		} 	
		    	}
		    ]],
		    toolbar:[{
		    	text :'新增',
				iconCls: 'icon-add',
				handler: function(){
					$('#window').dialog('open');
					$('#params_url').css("display","");
				 	$('#labelUrl').css("display","");
				 	document.getElementById("params_id").value = "";
				     document.getElementById("params_name").value = "";
				     document.getElementById("params_host").value = "";
				     document.getElementById("params_port").value = "";
				     document.getElementById("params_path").value = "";
				     document.getElementById("params_time").value = "";
				     document.getElementById("params_flag").value = "2";
				    
				}
			},{
				text:'删除',
				iconCls: 'icon-cut',
				handler: function(){
					removeUrl();
				}
			},{
				text:'编辑',
				iconCls:'icon-edit',
				handler:function(){
					getUrl();
					$('#dg').datagrid('acceptChanges');
				}
			},{
				text:'撤销',
				iconCls:'icon-undo',
				handler:function(){
					$('#dg').datagrid('rejectChanges');
				}
			},{
				text:'开启监控',
				iconCls: 'icon-start',
				handler: function(){updateMultiple("2");}
			},{
				text:'关闭监控',
				iconCls: 'icon-close',
				handler: function(){updateMultiple("-1");}
			},
			{
				text:'短信开启',
				iconCls: 'icon-mail-open',
				handler: function(){updateMail("0");}
			},
			{
				text:'短信关闭',
				iconCls: 'icon-mail',
				handler: function(){updateMail("1");}
			},
			]
		});
		
		/* @Function : allow urls to be edited
		 * @Author : dimboy
		 * @Date : 2014-07-15
		 */
			
		$('#dg').datagrid({
			onDblClickCell:function(rowIndex,field,value){
				index = rowIndex;
				var rows = $('#dg').datagrid('getRows');
				var row = rows[rowIndex];
				
				if(field == 'paramViews'){
					listParams(row);
				}else if(field == 'operation'){
					var rows = $('#dg').datagrid('getRows');
					
					var host = rows[rowIndex].host + "";
					var port = rows[rowIndex].port + "";
					var path = rows[rowIndex].path + "";
					
					port = (isStrEmpty(port)?'': port);
					path = (isStrEmpty(path)?'': path);
					port = (port.indexOf(':') ==0 || port=='' ?port:':' + port);
					path = (path.indexOf('/') ==0 || path=='' ?path:'/' + path);
					//var params =$('#params_params').val();
					
					var paramRows = rows[rowIndex].paramViews;
					var url_params = '';
					for(i=0;i<paramRows.length;i++){
						
						if(i == 0 ){
							url_params += "?" + paramRows[i].key + "=" + paramRows[i].value;
						}else{
							url_params += "&" + paramRows[i].key + "=" + paramRows[i].value;
						}
					}
					
					var urlStr = host+port+path+url_params;
					
						$.ajax({
							url:"<%=request.getContextPath()%>/url/request",
							type:"post",
							dataType:"json",
							data:{
								urlStr:urlStr
							},
							success:function(data){
								alert(data);
							}
							
						});
					
				}else{
					$('#dg').datagrid('beginEdit',rowIndex);
				}
			}
		}); 
		
		$('#params').datagrid({
			rownumbers:true,
			frozenColumns:[[
			                {field:'ck',checkbox:true}
						]],
			columns:[[	
				    	{field:'key',title:'Key',width:100,
							editor:{
								type:'text'
							}	
				    	},
				    	{field:'value',title:'Value',width:150,
				    		editor:{
								type:'text'
							}
				    	},
				    	{field:'operation',title:'Operation',width:100}
				    ]],
			toolbar:[{
					
					iconCls: 'icon-add',
					handler: function(){
						var lastIndex;
						$('#params').datagrid('unselectAll');
						$('#params').datagrid('endEdit', lastIndex);
						$('#params').datagrid('appendRow',{
							key:'',
							value:'',
							order:lastIndex
						});
						lastIndex = $('#params').datagrid('getRows').length-1;
						$('#params').datagrid('selectRow', lastIndex);
						$('#params').datagrid('beginEdit', lastIndex);
						
						$('#params').datagrid('unselectAll');
					}
				},{
					
					iconCls: 'icon-cut',
					handler: function(){
						deteleParam();
					}
				},{
					iconCls:'icon-save',
					handler:function(){
						$('#params').datagrid('acceptChanges');
						caculateUrl();
					}
				}]
		});
		
	}
	
	function getDepartmentUrlstatus(status_url){
		$('#dg_urlStatus').datagrid({
			url:status_url,
			rownumbers:true,
			pagination:true,
			pageList:[10,15,20,25,30],
			columns:[[
					{field:'name',title:'Name',width:200,},
					{field:'url',title:'Url',width:250,},
					{field:'code',title:'Code',width:50,},
					{field:'status',title:'Status',width:100,formatter: function(value,row,index){
						if (row.code.substring(0, 1) == '2'){
							return "<p style='background:green;color:white'>"+row.status+"</p>";
						}else{
							return "<p style='background:red;color:white'>"+row.status+"</p>";
						} 
					}},
					{field:'requestTime',title:'RequestTime',width:140,formatter:function(value,row,index){
						if ("" == value || null == value) {
							return "--";
						}
						var date = new Date(value);
						var year = date.getFullYear().toString();
						var month = (date.getMonth() + 1);
						var day = date.getDate().toString();
						var hour = date.getHours().toString();
						var minutes = date.getMinutes().toString();
						var seconds = date.getSeconds().toString();
						if (month < 10) {
							month = "0" + month;
						}
						if (day < 10) {
							day = "0" + day;
						}
						if (hour < 10) {
							hour = "0" + hour;
						}
						if (minutes < 10) {
							minutes = "0" + minutes;
						}
						if (seconds < 10) {
							seconds = "0" + seconds;
						}
						return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":"
								+ seconds;
					}},
					{field:'timeUsed',title:'TimeUsed',width:60,},
					{field:'result',title:'Result',width:300,}
				]]
		})
	}
	
	function getpage(){
		$('#dg').datagrid('getPager').pagination({           
            beforePageText: '第',
            afterPageText: '页    共 {pages} 页',           
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
        });
		
		$('#dg_urlStatus').datagrid('getPager').pagination({           
            beforePageText: '第',
            afterPageText: '页    共 {pages} 页',           
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
        });
		
		$('#data').datagrid('getPager').pagination({           
            beforePageText: '第',
            afterPageText: '页    共 {pages} 页',           
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
        });
		
		$('#data_Status').datagrid('getPager').pagination({           
            beforePageText: '第',
            afterPageText: '页    共 {pages} 页',           
            displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'                
        });
	}
	
	$(function(){
		//init  menus
		checkParams();
		//url列表显示
		getDepartmentUrl("<%=request.getContextPath()%>/url/list?dept=0");
		
		//接口状态显示列表
		getDepartmentUrlstatus("<%=request.getContextPath()%>/urlStatus/list?dept=0");
		
		//数据监测显示列表
		data_Monitor();
		//分页中文显示
		getpage();
		
	});
	
	</script>

<div id="layout" class="easyui-layout"
	style="width: 100%; height: 100%;"><!-- north  part -->
<div data-options="region:'north',split:true" style="height: 110px;">
<div class="container"
	style="height:100px;background:url(<%=request.getContextPath()%>/resources/pictures/top_bg.png) repeat-x scroll left top rgba(0, 0, 0, 0)">
<img title="interfaceView" style="margin-top: 20px; margin-left: 15px;"
	src="<%=request.getContextPath()%>/resources/pictures/logo_xfjiekou.png">
</img></div>
</div>

<!-- south  part -->
<div
	data-options="region:'south',title:'net check application	@copyright  ',split:true"
	style="height: 0px;"></div>

<!-- west part --> <!-- <div data-options="region:'east',title:'Menu',split:true" style="width:100px;"> 
	    
	    </div>-->
<div data-options="region:'west',title:'菜单',split:true"
	style="width: 200px;">

<ul id="tt" class="easyui-tree" style="margin-left: 10px;">
	<li iconCls="icon-ok"><span>菜单</span>
	
<ul id="interface" class="easyui-tree">
    <li>
		<span>接口监测</span>
		<ul>
			<li id="dataDepartment_interface">
				<a href="javascript:getView(0)">数据组</a>
			</li>
			<li id="mobileDepartment_interface">
				<a href="javascript:getView(1)">移动组</a>
			</li>
		</ul>
	</li>
</ul>
<ul id="data" class="easyui-tree">
    <li>
		<span>数据监测</span>
		<ul>
			<li id="dataDepartment_datamonitoring">
				<a href="javascript:getView(2)">数据组</a>
			</li>
		</ul>
	</li>
</ul>

	</li>
</ul>

</div>
<!-- center part -->
<div data-options="region:'center'"
	style="padding: 5px; background: #eee;">
<div id="tabs" class="easyui-tabs" style="width: 1160px; height: 600px;">
	<div id="interface" title="接口" style="width: 1160px; height: 620px;">
		<table id="dg">
		</table>
	<div style="margin-top: 20px;">
	<table id="dgParams">
	</table>
	</div>
</div>

<div id="interface_status" title="接口状态" style="width: 1160px; height: 600px;">
<table id="dg_urlStatus">

</table>
</div>

<div id="datamonter" title="数据" style="width: 1160px; height: 400px;">
<table id="data">

</table>

<div style="margin-top: 20px;">
<table id="dataParams">

</table>
</div>
</div>

<div id="datamonter_status" title="数据状态" style="width: 1160px; height: 380px;">
<table id="data_Status">

</table>
</div>
<!--  net homepage or interfaces datagrid --></div>
</div>

</div>

<div id="window" title="add a url" class="easyui-dialog"
	style="width: 600px; height: 450px; background: #fafafa; padding: 15px 30px 15px 30px;"
	closed="true" buttons="#dlg-buttons" modal="true">
<form id="form">

<div class="delimit_horver"><input type="hidden" value=""
	id="params_id" name="params_id" /> <input type="hidden" value=""
	id="params_flag" name="params_flag" /> <input type="hidden" value=""
	id="params_errorNum" name="params_errorNum" /></div>
<div class="delimit_horver"><label for="name" id="labelUrl">Url:</label>
<input style="margin-left: 50px; width: 350px;"
	class="easyui-validatebox" type="text" name="url"
	data-options="required:true" id="params_url"> </input></div>

<div class="delimit_horver"><label width="150px" for="name">Name:</label>
<input style="margin-left: 50px; width: 150px;"
	class="easyui-validatebox" type="text" name="name"
	data-options="required:true" id="params_name"></input></div>

<div class="delimit_horver"><label width="150px" for="host">Host:</label>
<input style="margin-left: 50px;" class="easyui-validatebox" type="text"
	name="host" data-options="validType:'text'" id="params_host"> </input>
</div>

<div class="delimit_horver"><label width="150px" for="port">Port:</label>
<input style="margin-left: 50px; width: 150px;"
	class="easyui-validatebox" type="text" name="port" id="params_port">
</input></div class="delimit_horver">

<div class="delimit_horver"><label width="150px" for="message">Path:</label>
<input style="margin-left: 50px; width: 150px;" name="path"
	style="height:60px;" id="params_path"> </input></div>

<div class="delimit_horver"><label width="150px" for="message">TimeOut:</label>
<input style="margin-left: 50px; width: 150px;" name="params_time"
	style="height:60px;" id="params_time" value="30000"> </input></div>

<div class="delimit_horver"><label width="150px" for="message">Request
Params:</label></div>

<div class="delimit_horver_2">
<div id="params"></div>
</div>

<!-- 记录部门编号 -->
<input type="hidden" id="department" value="0" />
<a id="btn1" href="javascript:submitUrl();" class="easyui-linkbutton"
	style="margin-right: 20px;" data-options="iconCls:'icon-ok'">ok</a> <a
	id="btn2" href="#" class="easyui-linkbutton"
	data-options="iconCls:'icon-cancel'">clear</a></form>
</div>


<!-- dataMontior增加编辑 -->
<div id="data_window" title="data" class="easyui-dialog"
	style="width: 600px; height: 450px; background: #fafafa; padding: 15px 30px 15px 30px;"
	closed="true" buttons="#dlg-buttons" modal="true">
<form id="data_form">

<div><input type="hidden" value="" id="data_id" name="data_id" />
<input type="hidden" value="" id="status" name="status" /> <input
	type="hidden" value="" id="error_num" name="error_num" /></div>
<div class="delimit_horver"><label for="check_name">check_name:</label>
<input style="margin-left: 48px; width: 350px;"
	class="easyui-validatebox" type="text" name="check_name"
	data-options="required:true" id="check_name"> </input></div>

<div class="delimit_horver"><label for="database">database</label>
<select id="select_database"
	style="margin-left: 65px; width: 250px; height: 22px;"
	class="easyui-validatebox" name="select_database">
</select> <a id="add_data_sourse" group="" class="l-btn l-btn-plain"
	href="javascript:void(0)"><span class="l-btn-left"><span
	class="l-btn-text"><span class="l-btn-empty icon-add">&nbsp;</span></span></span></a>
<a id="del_data_sourse" group="" class="l-btn l-btn-plain"
	href="javascript:void(0)"><span class="l-btn-left"><span
	class="l-btn-text"><span class="l-btn-empty icon-cut">&nbsp;</span></span></span></a>
<a id="edit_data_sourse" group="" class="l-btn l-btn-plain"
	href="javascript:void(0)"><span class="l-btn-left"><span
	class="l-btn-text"><span class="l-btn-empty icon-edit">&nbsp;</span></span></span></a></div>

<div class="delimit_horver"><label for="sql">sql:</label> <textarea
	style="margin-left: 90px; width: 350px;" class="easyui-validatebox"
	name="sql" data-options="validType:'text'" id="sql" cols="200" rows="6">
</textarea></div>
<div class="delimit_horver"><label for="text">text:</label> <input
	style="margin-left: 82px; width: 350px;" class="easyui-validatebox"
	type="text" name="text" data-options="validType:'text'" id="text">
</input></div>


<div class="delimit_horver_2">
<div id="d_params"></div>
</div>

<a id="d_btn1" href="javascript:submitData();" class="easyui-linkbutton"
	style="margin-right: 20px;" data-options="iconCls:'icon-ok'">ok</a> <a
	id="d_btn2" href="#" class="easyui-linkbutton"
	data-options="iconCls:'icon-cancel'">clear</a></form>
</div>

<!-- datasourse编辑与增加 -->
<form id="dataS_form">
<div class="easyui-dialog"
	style="width: 600px; height: 450px; background: #fafafa; padding: 15px 30px 15px 30px;"
	closed="true" buttons="#dlg-buttons" modal="true" id="dataS">
	<div><input type="hidden" value="" id="datasourse_id"
	name="datasourse_id" /></div>
<div class="delimit_horver"><label for="userName">type:</label>
<select id="select_type"
	style="margin-left: 72px; width: 350px; height: 22px;"
	class="easyui-validatebox" name="select_database">
	<option id="oracle" value="oracle">oracle</option>
	<option id="mysql" value="mysql">mysql</option>
	<option id="sqlserver" value="sqlserver">sqlserver</option>
</select></div>
<div class="delimit_horver"><label for="check_name">dbName:</label>
<input style="margin-left: 60px; width: 350px;"
	class="easyui-validatebox" type="text" name="dbName"
	data-options="required:true" id="dbName"> </input></div>

<div class="delimit_horver"><label for="url">u rl:</label> <textarea
	style="margin-left: 77px; width: 350px;" class="easyui-validatebox"
	type="text" name="url" data-options="required:true" id="url" cols="200" rows="6"> </textarea>
</div>

<div class="delimit_horver"><label for="userName">userName:</label>
<input style="margin-left: 48px; width: 350px;"
	class="easyui-validatebox" type="text" name="userName"
	data-options="required:true" id="userName"> </input></div>
<div class="delimit_horver"><label for="password">password:</label>
<input style="margin-left: 48px; width: 350px;"
	class="easyui-validatebox" type="text" name="password"
	data-options="required:true" id="password"> </input></div>
	
<a id="datas_btn1" href="javascript:submitDataSourse();" class="easyui-linkbutton"
	style="margin-right: 120px;" data-options="iconCls:'icon-ok'">ok</a> <a
	id="datas_btn2" href="#" class="easyui-linkbutton"
	data-options="iconCls:'icon-cancel'">clear</a>
</div>
</form>
</html>




