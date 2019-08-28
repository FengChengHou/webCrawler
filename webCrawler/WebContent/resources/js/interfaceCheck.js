$(function(){
	interfaceUrl();
	TeamDim();
	query() ;

	pageAllList(1,10,"");
	//pageUrlList(1,10,teamid);
	$("#interface").css("color","#03c5ff");
	$("#interface").css("border-top","1px solid #DDDDDD");
	$("#interface").css("border-left","1px solid #DDDDDD");
	$("#interface").css("border-right","1px solid #DDDDDD");
	$("#interface").css("border-bottom","hidden");
	$("#interface").click(function(){
		teamid=$("input[name='team']").val();
		
		$("#interfacepage").css("display","");
		$("#name").css("display","");
		$("#btn").css("display","");
		$("#interface").css("color","#03c5ff");
		pageAllList(1,10,teamid);
		$("#interface").css("border-top","1px solid #DDDDDD");
		$("#interface").css("border-left","1px solid #DDDDDD");
		$("#interface").css("border-right","1px solid #DDDDDD");
		$("#interface").css("border-bottom","hidden");

		$("#state").css("color","#666");

		$("#state").css("border-top","hidden");
		$("#state").css("border-left","hidden");
		$("#state").css("border-right","hidden");
		$("#state").css("border-bottom","1px solid #DDDDDD");

		$("#urlpage").css("display","none");
	});
	$("#state").click(function(){
		teamid=$("input[name='team']").val();
		$("#urlpage").css("display","");
		$("#name").css("display","none");
		$("#state").css("color","#03c5ff");
		$("#btn").css("display","none");
		$("#state").css("border-top","1px solid #DDDDDD");
		$("#state").css("border-left","1px solid #DDDDDD");
		$("#state").css("border-right","1px solid #DDDDDD");
		$("#state").css("border-bottom","hidden");
		pageUrlList(1,10,teamid);
		$("#interface").css("color","#666");

		$("#interface").css("border-top","hidden");
		$("#interface").css("border-left","hidden");
		$("#interface").css("border-right","hidden");
		$("#interface").css("border-bottom","1px solid #DDDDDD");

		$("#interfacepage").css("display","none");
	});
});

/**
 * 加载该用户的已申请的团队纬度
 */
function TeamDim(){
	$.ajax({
		url : "function/userTeam",
		type : "post",
		dataType : "json",
		success : function(data) {
			var $froms = $("#team_form").data("flyForm"); // 表单对象
			$froms.getControl("team").combobox({
				data : data,
				valueField : 'dm',
				textField : 'mc',
				initValue : data[0].dm
			});
		},
		error : function() {
			$.fly.tip({
				text : '团队列表加载失败',
				type : 'error'
			});
		}
	});
}
/**
 * 获取所有接口监测信息
 * @param pageIndex
 * @param size
 */
function pageAllList(pageIndex,size,teamid){
	interfaceName=$("input[name='interfaceName']").val();
	// 表格的加载和显示
	$('#queryGrid').grid({
		data : "url/urlList",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10,
			teamid:teamid,
			interfaceName:interfaceName
		},
		contentId : '#List',
		rowTemplateId : '#listTemplate',
		queryNow : true,// 是否立即查询，默认为true
		hasPage : true,// 是否渲染翻页控件，默认为true
		isShowCheckBox : false,// 是否显示check，默认为false
		emptyText : '',// 列表数据为空时显示的内容
		errorTip : '--'
	});
}

/**
 * 获取团队的接口状态列表分页
 * @param pageIndex
 * @param size
 * @param teamid
 */
function pageUrlList(pageIndex,size,teamid){

	// 表格的加载和显示
	$('#queryGrid11').grid({
		data : "urlStatus/listUrl",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10,
			teamid:teamid
		},
		contentId : '#List11',
		rowTemplateId : '#listTemplate11',
		queryNow : true,// 是否立即查询，默认为true
		hasPage : true,// 是否渲染翻页控件，默认为true
		isShowCheckBox : false,// 是否显示check，默认为false
		emptyText : '',// 列表数据为空时显示的内容
		errorTip : '--'
	});
}


//开启或关闭监控
function updateMultiple(flag){
	var chk_value ="";
	var ids = "";
	var s = "" ;
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
	});
	if(chk_value.length==0 )
	{
		alert('你还没有选择任何内容！'); 
		return;
	}

	if(flag == "2"){
		s = "2";
	}else{
		s = "-1";
	}
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		if(flag == "-1")
		{
			if(t[1] == "关闭"){		
				$.fly.tip({
					text:'关闭状态不可关闭!',
					type:'warning'
				});
			}else{
				ids+=t[0] + ',';
			}			
		}else{
			if(t[1]== "正常"){
				$.fly.tip({
					text:'已开启不可开启！',
					type:'warning'
				});
			}else{
				ids+=t[0] + ',';
			}	

		}
	});

	$.ajax({
		url:"url/updateAll",
		type:"post",
		dataType:"json",
		data:{
			ids:ids,
			flag:flag
		},
		success:function(data){
			if(data){
				//window.location.reload(true);
				$.fly.tip({
					text : '操作成功',
					type : 'success'
				})
				teamid=$("input[name='team']").val();
				var pageIndex = $('#queryGrid .pager-num .current').text();
				pageAllList(pageIndex,10,teamid);
				//pageUrlList(pageIndex,10,teamid);
			}
		},error:function(){
			$.fly.tip({
				text : '操作失败',
				type : 'error'
			})
		}
	});
}

//开启或关闭短信
function updateMessage(flag){
	var chk_value ="";
	var ids = "";
	var s = "" ;
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
	});
	if(chk_value.length==0 )
	{
		$.fly.tip({
			text:'你还没有选择任何内容！',
			type:'warning'
		});
		return;
	}

	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		if(flag=='0' ){
			if(t[2] == "开启" ){
				$.fly.tip({
					text:'已开启的不可开启！',
					type:'warning'
				});
			}else{
				ids+=t[0] + ',';
			}
		}
		else{
			if(t[2]== "关闭" ){
				$.fly.tip({
					text:'已关闭的不可关闭！',
					type:'warning'
				});
			}else{
				ids+=t[0] + ',';
			}
		}
	});


	$.ajax({
		url:"url/updateMessagestatus",
		type:"post",
		dataType:"json",
		data:{
			ids:ids,
			messagestatus:flag
		},
		success:function(data){
			if(data){
				//window.location.reload(true);
				$.fly.tip({
					text : '操作成功',
					type : 'success'
				})
				teamid=$("input[name='team']").val();
				var pageIndex = $('#queryGrid .pager-num .current').text();
				pageAllList(pageIndex,10,teamid);
				//pageUrlList(pageIndex,10,teamid);
			}
		},error:function(){
			$.fly.tip({
				text : '操作失败',
				type : 'error'
			})
		}
	});
}

//删除接口监测
function removeUrl(){
	var chk_value ="";
	var ids = "";
	var s = "" ;
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
	});
	if(chk_value.length==0 )
	{
		alert('你还没有选择任何内容！'); 
		return;
	}
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		ids+=t[0] + ',';
	});

	if (confirm("确认要删除？")){
		$.ajax({
			url:"url/remove",
			type:"post",
			dataType:"json",
			data:{
				ids:ids
			},
			success:function(data){
				if(data == "1"){
					$.fly.tip({
						text : '删除成功',
						type : 'success'
					})

					teamid=$("input[name='team']").val();
					var pageIndex = $('#queryGrid .pager-num .current').text();
					pageAllList(pageIndex,10,teamid);
					//pageUrlList(pageIndex,10,teamid);
				}
			}
		});
	}

}


//根据ID显示接口
function getUrl(){
	//$('#window_edit').dialog('open');

	var chk_value ="";
	var ids = "";
	var s = "" ;
	i=0;
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
		i++;
	});

	if(chk_value.length==0 )
	{
		alert('你还没有选择任何内容！'); 
		return;
	}else if(i > 1 ){
		alert("无法编辑多个！");
	}else {
		chk_value=chk_value.split(",");
		$.ajax({
			url:'url/get',
			type:"post",
			dataType:"json",
			data:{
				id:chk_value[0]
			},
			success:function(data){
				$.dialog({
					id : 'diaid',
					title : "接口：" + data.name,// 标题. 默认'消息'
					content : $('#editDialog')[0],// dialog的内容，可选DOM、String
					width : 800, // 内容宽度或者设置宽度为数字
					height : 'auto', // 内容高度或者设置高度为数字
					minWidth : 96, // 最小宽度限制
					minHeight : 32, // 最小高度限制
					padding : '20px 25px', // 内容与边界填充距离
//					button : null, // 自定义按钮
					cancel: function(){},// 取消按钮回调函数
					button:[
					        {
					        	name:'测试',
					        	callback: function () {
					        		if(JSON.stringify($("input[name='interip']").val())=='""'){
					        			alert("接口ip不能为空");	
					        			return false;
					        		}	
					        		if(JSON.stringify($("input[name='interpath']").val())=='""'){
					        			alert("接口名不能为空");
					        			return false;
					        		}
					        		if(JSON.stringify($("input[name='interport']").val())=='""'){
					        			alert("端口号不能为空");
					        			return false;
					        		}
					        		var aa=/^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
					        		var bb=/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
					        		if(!aa.test(JSON.stringify($("input[name='interip']").val()).replace( '"', '').replace( '"', ''))){
					        			alert("请输入正确的ip");
					        			return false;
					        		}
					        		if(!bb.test(JSON.stringify($("input[name='interport']").val()).replace( '"', '').replace( '"', ''))){
					        			alert("请输入正确的端口号");
					        			return false;
					        		}
					        		alert("测试可能有点长(1分钟)，请耐心等待");
					        		var data2=null;
					        		var key=$("input[name='key']");
					        		var value=$("input[name='value']");
					        		var data2={
					        				host:$("input[name='interip']").val(),
					        				path:$("input[name='interpath']").val(),
					        				port:$("input[name='interport']").val(),
					        				action:$("input[name='requestMethod']").val()
					        		};
					        		data2.paramViews=[];
					        		for(var i=0;i<key.length;i++)
					        		{
					        			data2.paramViews.push({key: key[i].value ,value: value[i].value})
					        		}
					        		$.ajax({
					        			url:'jian/zenreq',
					        			type:"post",
					        			dataType:"json",
					        			data:{
					        				url:JSON.stringify(data2)
					        			},
					        			success:function(result){
					        				var name=JSON.stringify(result)
					        				alert(name);
					        			},
					        			error:function(){
					        				alert("失败");
					        			}
					        		})
					        		return false;

					        	}

					        }
					        ],		
					        ok : function() {
					        	var data1 = data;
					        	data1.name=$("input[name='intername']").val();
					        	data1.host=$("input[name='interip']").val();
					        	data1.path=$("input[name='interpath']").val();
					        	data1.port=$("input[name='interport']").val();
					        	data1.time=$("input[name='intertime']").val();
					        	data1.requestmethod=$("input[name='requestMethod']").val();
					        	data1.checkfield=$("input[name='checkfield']").val();
					        	data1.checkcondition=$("input[name='checkcondition']").val();
					        	data1.checkvalue=$("input[name='checkvalue']").val();
					        	data1.resulttype=1;
					        	email= $("input[name='interemail']").is(':checked');
					        	if(email)
					        	{
					        		data1.emailstatus="0";
					        	}else{
					        		data1.emailstatus="1";
					        	}
					        	message= $("input[name='intermessage']").is(':checked');
					        	if(message)
					        	{
					        		data1.messagestatus="0";
					        	}else{
					        		data1.messagestatus="1";
					        	}
					        	var key=$("input[name='key']");
					        	var value=$("input[name='value']");

					        	data1.paramViews=[];
					        	for(var i=0;i<key.length;i++)
					        	{
					        		data1.paramViews.push({key: key[i].value ,value: value[i].value})
					        	}
					        	$.ajax({
					        		url:'url/editUrl',
					        		type:"post",
					        		dataType:"json",
					        		data: {
					        			url:JSON.stringify(data1)
					        		},
					        		success:function(data){
					        			if(data==1){
					        				$.fly.tip({
					        					text : '编辑成功',
					        					type : 'success'
					        				})	
					        				teamid=$("input[name='team']").val();
					        				var pageIndex = $('#queryGrid .pager-num .current').text();
					        				pageAllList(pageIndex,10,teamid);
					        			}else{
					        				$.fly.tip({
					        					text : '编辑失败',
					        					type : 'error'
					        				})	
					        			}
					        		}

					        	});

					        }, // 确定按钮回调函数

					        init : function() {
					        	$("input[name='interurl']").val("");
					        	$("#interurl").hide();
					        	$("input[name='intermessage']").attr("checked",false);
					        	$("input[name='interemail']").attr("checked",false);		
					        	$("input[name='pid']").val(data.id);
					        	$("input[name='intername']").val(data.name);
					        	$("input[name='interip']").val(data.host);
					        	$("input[name='interport']").val(data.port);
					        	$("input[name='interpath']").val(data.path);
					        	$("input[name='intertime']").val(data.time);
					        	$("input[name='checkfield']").val(data.checkfield);
					        	$("input[name='checkvalue']").val(data.checkvalue);
					        	var $from = $("#form_demo").data("flyForm");
					        	$from.getControl("requestMethod").combobox({
					        		data:[{mc: 'get', dm: 'get'},{mc: 'post', dm: 'post'}],
					        		valueField : 'dm',
					        		textField : 'mc',
					        		initValue : data.requestmethod,
					        	});
					        	$from.getControl("checkcondition").combobox({
					        		data:[{mc: '=', dm: '1'},{mc: '!=', dm: '2'}],
					        		valueField : 'dm',
					        		textField : 'mc',
					        		initValue : data.checkcondition,
					        	});

					        	if(data.emailstatus=="0"){
					        		$("input[name='interemail']").attr("checked",true);				            
					        	}
					        	if(data.messagestatus=="0"){
					        		$("input[name='intermessage']").attr("checked",true);
					        	}




					        	$.ajax({
					        		url:'url/getParams?id='+data.id,
					        		type:"post",
					        		dataType:"json",
					        		success:function(data1){
					        			var test=data1.rows.length;
					        			var html=$("#List1");
					        			html.html("");
					        			var text=""
					        				for(var i=0;i<test;i++)
					        				{
					        					text+="<tr class=\"fly-table-tr-odd\">"
					        						+"<td> <input name=\"params\" type=\"checkbox\" value=\"\" /></td>"
					        						+"<td><div class=\"text-center ell\"><input name=\"key\" type=\"text\" value="+data1.rows[i].key+" /></div></td>"
					        						+"<td><div class=\"text-center ell\"><input name=\"value\" type=\"text\" value="+data1.rows[i].value+" /></div></td>"																	
					        						+"</tr>";
					        				}

					        			html.append(text);
					        		}
					        	});
					        }// 对话框初始化后执行的函数
				});
			},
			error : function() {
				$.fly.tip({
					text : '失败',
					type : 'error'
				});
			}
		});
	}

}

//增加参数
function addParams() {
	var html=$("#List1");
	html.append("<tr class=\"fly-table-tr-odd\">"
			+"<td> <input name=\"params\" type=\"checkbox\" value=\"\" /></td>"
			+"<td><div class=\"text-center ell\"><input name=\"key\" type=\"text\"/></div></td>"
			+"<td><div class=\"text-center ell\"><input name=\"value\" type=\"text\"/></div></td>"					
			+"</tr>");

}

//删除参数
function deleteParams() {
	$('input[name="params"]:checked').each(function(){
		$(this).closest('tr').html("");
	});
}

//新增
function addUrl(){

	$.ajax({
		url:'url/get',
		type:"post",
		dataType:"json",
		data:{
			id:""
		},
		success:function(data){
			$.dialog({
				id : 'diaid',
				title : "新增接口",// 标题. 默认'消息'
				content : $('#editDialog')[0],// dialog的内容，可选DOM、String
				width : 800, // 内容宽度或者设置宽度为数字
				height : 'auto', // 内容高度或者设置高度为数字
				minWidth : 96, // 最小宽度限制
				minHeight : 32, // 最小高度限制
				padding : '20px 25px', // 内容与边界填充距离
				button : null, // 自定义按钮
				cancel: function(){}, // 取消按钮回调函数
				ok : function() {
					var data1 = data;
					data1.name=$("input[name='intername']").val();
					data1.host=$("input[name='interip']").val();
					data1.path=$("input[name='interpath']").val();
					data1.port=$("input[name='interport']").val();
					data1.time=$("input[name='intertime']").val();
					data1.teamid=$("input[name='team']").val();
					data1.requestmethod=$("input[name='requestMethod']").val();
					data1.checkfield=$("input[name='checkfield']").val();
					data1.checkcondition=$("input[name='checkcondition']").val();
					data1.checkvalue=$("input[name='checkvalue']").val();
					data1.resulttype=1;
					email= $("input[name='interemail']").is(':checked');
					var timestamp=Math.round(new Date().getTime()/1000);
					data1.updatetime=timestamp;
					data1.flag="0";
					if(email)
					{
						data1.emailstatus="0";
					}else{
						data1.emailstatus="1";
					}
					message= $("input[name='intermessage']").is(':checked');
					if(message)
					{
						data1.messagestatus="0";
					}else{
						data1.messagestatus="1";
					}
					var key=$("input[name='key']");
					var value=$("input[name='value']");
					data1.paramViews=[];
					for(var i=0;i<key.length;i++)
					{
						data1.paramViews.push({key: key[i].value ,value: value[i].value})
					}
					$.ajax({
				    	url:'url/add',
						type:"post",
						dataType:"json",
						data: {
							url:JSON.stringify(data1)
						},
						success:function(data){
							if(data==1){
								$.fly.tip({
									text : '新增成功',
									type : 'success'
								})	
								teamid=$("input[name='team']").val();
								var pageIndex = $('#queryGrid .pager-num .current').text();
								pageAllList(pageIndex,10,teamid);
							}else{
								$.fly.tip({
									text : '新增失败',
									type : 'error'
								})	
							}
						}						
				 });
					//window.location.reload(true);
					teamid=$("input[name='team']").val();
					var pageIndex = $('#queryGrid .pager-num .current').text();
					pageAllList(pageIndex,10,teamid);
					
					//pageUrlList(pageIndex,10,teamid);
				}, // 确定按钮回调函数
				init : function() {
					$("#interurl").show();//（新增）
					$("input[name='interurl']").val("");
					$("input[name='intername']").val("");
					$("input[name='interip']").val("");
					$("input[name='interport']").val("");
					$("input[name='interpath']").val("");
					$("input[name='intertime']").val("");
					$("input[name='checkfield']").val("");
					$("input[name='checkvalue']").val("");
					var $from = $("#form_demo").data("flyForm"); //表单对象
			            $from.getControl("interemail").checkbox({
			                initValue:'1'
			         });
	
			            $from.getControl("intermessage").checkbox({
			                initValue:'1'
			         });
			            $from.getControl("checkcondition").combobox({
							 data:[{mc: '=', dm: '1'},{mc: '!=', dm: '2'}],
								valueField : 'dm',
								textField : 'mc',
								initValue : '1',
				          });
			            $from.getControl("requestMethod").combobox({
							data:[{mc: 'get', dm: 'get'},{mc: 'post', dm: 'post'}],
							valueField : 'dm',
							textField : 'mc',
							initValue : 'get',
				         });
			        	var html=$("#List1");
						html.html("");
				},// 对话框初始化后执行的函数
				ok : function() {
					var data1 = data;
					data1.name=$("input[name='intername']").val();
					data1.host=$("input[name='interip']").val();
					data1.path=$("input[name='interpath']").val();
					data1.port=$("input[name='interport']").val();
					data1.time=$("input[name='intertime']").val();
					data1.teamid=$("input[name='team']").val();
					data1.requestmethod=$("input[name='requestMethod']").val();
					data1.checkfield=$("input[name='checkfield']").val();
					data1.checkcondition=$("input[name='checkcondition']").val();
					data1.checkvalue=$("input[name='checkvalue']").val();
					data1.resulttype=1;
					email= $("input[name='interemail']").is(':checked');
					var timestamp=Math.round(new Date().getTime()/1000);
					data1.updatetime=timestamp;
					data1.flag="0";
					if(email)
					{
						data1.emailstatus="0";
					}else{
						data1.emailstatus="1";
					}
					message= $("input[name='intermessage']").is(':checked');
					if(message)
					{
						data1.messagestatus="0";
					}else{
						data1.messagestatus="1";
					}
					var key=$("input[name='key']");
					var value=$("input[name='value']");
					data1.paramViews=[];
					for(var i=0;i<key.length;i++)
					{
						data1.paramViews.push({key: key[i].value ,value: value[i].value})
					}
					$.ajax({
				    	url:'url/add',
						type:"post",
						dataType:"json",
						data: {
							url:JSON.stringify(data1)
						},
						success:function(data){
							if(data==1){
								$.fly.tip({
									text : '新增成功',
									type : 'success'
								})	
								teamid=$("input[name='team']").val();
								var pageIndex = $('#queryGrid .pager-num .current').text();
								pageAllList(pageIndex,10,teamid);
							}else{
								$.fly.tip({
									text : '新增失败',
									type : 'error'
								})	
							}
						}
							
						
				 });
					
					
					//window.location.reload(true);
					teamid=$("input[name='team']").val();
					var pageIndex = $('#queryGrid .pager-num .current').text();
					pageAllList(pageIndex,10,teamid);
					
					//pageUrlList(pageIndex,10,teamid);
				}, // 确定按钮回调函数
				init : function() {
					$("#interurl").show();
					$("input[name='interurl']").val("");
					$("input[name='intername']").val("");
					$("input[name='interip']").val("");
					$("input[name='interport']").val("");
					$("input[name='interpath']").val("");
					$("input[name='intertime']").val("");
					$("input[name='checkfield']").val("");
					$("input[name='checkvalue']").val("");
					var $from = $("#form_demo").data("flyForm"); //表单对象
			            $from.getControl("interemail").checkbox({
			                initValue:'1'
			         });
	
			            $from.getControl("intermessage").checkbox({
			                initValue:'1'
			         });
			            $from.getControl("checkcondition").combobox({
							 data:[{mc: '=', dm: '1'},{mc: '!=', dm: '2'}],
								valueField : 'dm',
								textField : 'mc',
								initValue : '1',
				          });
			            $from.getControl("requestMethod").combobox({
							data:[{mc: 'get', dm: 'get'},{mc: 'post', dm: 'post'}],
							valueField : 'dm',
							textField : 'mc',
							initValue : 'get',
				         });
			        	var html=$("#List1");
						html.html("");
				},// 对话框初始化后执行的函数
				button:[
				        {
				        	name:'测试',
				        	callback: function () {
				        		if(JSON.stringify($("input[name='interip']").val())=='""'){
				        			alert("接口ip不能为空");	
				        			return false;
				        		}	
				        		if(JSON.stringify($("input[name='interpath']").val())=='""'){
				        			alert("接口名不能为空");
				        			return false;
				        		}
				        		if(JSON.stringify($("input[name='interport']").val())=='""'){
				        			alert("端口号不能为空");
				        			return false;
				        		}
				        		var aa=/^(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
				        		var bb=/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
				        		if(!aa.test(JSON.stringify($("input[name='interip']").val()).replace( '"', '').replace( '"', ''))){
				        			alert("请输入正确的ip");
				        			return false;
				        		}
				        		if(!bb.test(JSON.stringify($("input[name='interport']").val()).replace( '"', '').replace( '"', ''))){
				        			alert("请输入正确的端口号");
				        			return false;
				        		}
				        		alert("测试可能有点长(1分钟)，请耐心等待");
				        		var data2=null;
				        		var key=$("input[name='key']");
				        		var value=$("input[name='value']");
				        		var data2={
				        				host:$("input[name='interip']").val(),
				        				path:$("input[name='interpath']").val(),
				        				port:$("input[name='interport']").val(),
				        				action:$("input[name='requestMethod']").val()
				        		};
				        		data2.paramViews=[];
				        		for(var i=0;i<key.length;i++)
				        		{
				        			data2.paramViews.push({key: key[i].value ,value: value[i].value})
				        		}
				        		$.ajax({
				        			url:'jian/zenreq',
				        			type:"post",
				        			dataType:"json",
				        			data:{
				        				url:JSON.stringify(data2)
				        			},
				        			success:function(result){
				        				var name=JSON.stringify(result)
				        				alert(name);
				        			},
				        			error:function(){
				        				alert("失败");
				        			}
				        		})
				        		return false;

				        	}

				        }
				        ],		
				        ok : function() {
				        	var data1 = data;
				        	data1.name=$("input[name='intername']").val();
				        	data1.host=$("input[name='interip']").val();
				        	data1.path=$("input[name='interpath']").val();
				        	data1.port=$("input[name='interport']").val();
				        	data1.time=$("input[name='intertime']").val();
				        	data1.teamid=$("input[name='team']").val();
				        	data1.requestmethod=$("input[name='requestMethod']").val();
				        	data1.checkfield=$("input[name='checkfield']").val();
				        	data1.checkcondition=$("input[name='checkcondition']").val();
				        	data1.checkvalue=$("input[name='checkvalue']").val();
				        	data1.resulttype=1;
				        	email= $("input[name='interemail']").is(':checked');
				        	var timestamp=Math.round(new Date().getTime()/1000);
				        	data1.updatetime=timestamp;
				        	data1.flag="0";
				        	if(email)
				        	{
				        		data1.emailstatus="0";
				        	}else{
				        		data1.emailstatus="1";
				        	}
				        	message= $("input[name='intermessage']").is(':checked');
				        	if(message)
				        	{
				        		data1.messagestatus="0";
				        	}else{
				        		data1.messagestatus="1";
				        	}
				        	var key=$("input[name='key']");
				        	var value=$("input[name='value']");
				        	data1.paramViews=[];
				        	for(var i=0;i<key.length;i++)
				        	{
				        		data1.paramViews.push({key: key[i].value ,value: value[i].value})
				        	}
				        	$.ajax({
				        		url:'url/add',
				        		type:"post",
				        		dataType:"json",
				        		data: {
				        			url:JSON.stringify(data1)
				        		},
				        		success:function(data){
				        			if(data==1){
				        				$.fly.tip({
				        					text : '新增成功',
				        					type : 'success'
				        				})	
				        				teamid=$("input[name='team']").val();
				        				var pageIndex = $('#queryGrid .pager-num .current').text();
				        				pageAllList(pageIndex,10,teamid);
				        			}else{
				        				$.fly.tip({
				        					text : '新增失败',
				        					type : 'error'
				        				})	
				        			}
				        		}


				        	});


				        	//window.location.reload(true);
				        	teamid=$("input[name='team']").val();
				        	var pageIndex = $('#queryGrid .pager-num .current').text();
				        	pageAllList(pageIndex,10,teamid);

				        	//pageUrlList(pageIndex,10,teamid);
				        }, // 确定按钮回调函数
				        init : function() {
				        	$("#interurl").show();
				        	$("input[name='interurl']").val("");
				        	$("input[name='intername']").val("");
				        	$("input[name='interip']").val("");
				        	$("input[name='interport']").val("");
				        	$("input[name='interpath']").val("");
				        	$("input[name='intertime']").val("");
				        	$("input[name='checkfield']").val("");
				        	$("input[name='checkvalue']").val("");
				        	var $from = $("#form_demo").data("flyForm"); //表单对象
				        	$from.getControl("interemail").checkbox({
				        		initValue:'1'
				        	});

				        	$from.getControl("intermessage").checkbox({
				        		initValue:'1'
				        	});
				        	$from.getControl("checkcondition").combobox({
				        		data:[{mc: '=', dm: '1'},{mc: '!=', dm: '2'}],
				        		valueField : 'dm',
				        		textField : 'mc',
				        		initValue : '1',
				        	});
				        	$from.getControl("requestMethod").combobox({
				        		data:[{mc: 'get', dm: 'get'},{mc: 'post', dm: 'post'}],
				        		valueField : 'dm',
				        		textField : 'mc',
				        		initValue : 'get',
				        	});
				        	var html=$("#List1");
				        	html.html("");
				        }// 对话框初始化后执行的函数
			});
		},
		error : function() {
			$.fly.tip({
				text : '失败',
				type : 'error'
			});
		}
	});


}

//根据接口地址匹配数据
function interfaceUrl() {
	var $from = $("#form_demo").data("flyForm"); //表单对象
	$from.getControl("interurl").textbox({
		onBlur: function(val) {
			var indexh=val.indexOf("http://");
			var ip="";
			var port="";
			var path="";
			var html=$("#List1");
			html.html("");
			if(indexh>=0)
			{
				val=val.substring("http://".length,val.length);
			}
			if(val.indexOf(":")>=0&&val.indexOf("/")>=0&&val.indexOf("?")>=0)
			{
				ip=val.substring(0,val.indexOf(":"));
				port=val.substring(val.indexOf(":")+1,val.indexOf("/"));
				path=val.substring(val.indexOf("/"),val.indexOf("?"));
				val=val.substring(val.indexOf("?")+1,val.length);

				var l= val.split("&").length;
				for(var i=0;i<l;i++){
					var key=val.substring(0,val.indexOf("="));
					val=val.substring(val.indexOf("=")+1,val.length);
					var str=val.indexOf("&");
					if(i+1==l)
					{
						str=val.length
					}
					var value=val.substring(0,str);
					html.append("<tr class=\"fly-table-tr-odd\">"
							+"<td> <input name=\"params\" type=\"checkbox\" value=\"\" /></td>"
							+"<td><div class=\"text-center ell\"><input name=\"key\" type=\"text\" value='"+key+"'/></div></td>"
							+"<td><div class=\"text-center ell\"><input name=\"value\" type=\"text\"  value='"+value+"'/></div></td>"					
							+"</tr>");
					val=val.substring(val.indexOf("&")+1,val.length);
				}
				$("input[name='interip']").val(ip);
				$("input[name='interport']").val(port);
				$("input[name='interpath']").val(path);
			}


		}
	});
}



//下拉框触发查询
function query() {
	var $from = $("#team_form").data("flyForm"); //表单对象
	$from.getControl("team").combobox({
		onSelect: function(data) {
			pageAllList(1,10,data.dm);
			pageUrlList(1,10,data.dm)
		}      
	});
}

//按钮查询
function getData() {
	teamid=$("input[name='team']").val();
	
	pageAllList(1,10,teamid);
	pageUrlList(1,10,teamid);
}

//手动接口监测
function getJian(){
	var chk_value ="";
	var ids = "";
	var s = "" ;
	i=0;
	$('input[name="inter"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
		i++;
	});

	if(chk_value.length==0 )
	{
		alert('你还没有选择任何内容！'); 
		return;
	}else if(i > 1 ){
		alert("无法监测多个！");
	}else {
		chk_value=chk_value.split(",");
		$.ajax({
			url:'jian/reque',
			type:"post",
			dataType:"json",
			data:{
				id:chk_value[0]
			},
			success:function(result){
				var name=JSON.stringify(result)
				alert(name);
			},
			error:function(){
				alert("失败");
			}
		})

	}
}