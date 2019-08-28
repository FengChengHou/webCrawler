$(function() {
	TeamDim();
	pageAllList("", 1, 10);
	
	$("#dataCheck").css("color","#03c5ff");
	$("#dataCheck").css("border-top","1px solid #DDDDDD");
	$("#dataCheck").css("border-left","1px solid #DDDDDD");
	$("#dataCheck").css("border-right","1px solid #DDDDDD");
	$("#dataCheck").css("border-bottom","hidden");
	
	$("#status_queryGrid").css("display","none");
	$("#queryGrid").css("display","");
	$("#dataName").css("display","");
	
	$("#dataCheck").click(function(){
		var teamid=$("input[name='team']").val();
		$("#queryGrid").css("display","");
		$("#btn").css("display","");
		$("#dataName").css("display","");
		
		$("#status_queryGrid").css("display","none");
		
		$("#dataCheck").css("color","#03c5ff");
		pageAllList(teamid,1,10);
		$("#dataCheck").css("border-top","1px solid #DDDDDD");
		$("#dataCheck").css("border-left","1px solid #DDDDDD");
		$("#dataCheck").css("border-right","1px solid #DDDDDD");
		$("#dataCheck").css("border-bottom","hidden");
		
		$("#state").css("color","#666");
		
		$("#state").css("border-top","hidden");
		$("#state").css("border-left","hidden");
		$("#state").css("border-right","hidden");
		$("#state").css("border-bottom","1px solid #DDDDDD");
		
	});
	$("#state").click(function(){
		var teamid=$("input[name='team']").val();
		$("#queryGrid").css("display","none");
		$("#btn").css("display","none");
		$("#dataName").css("display","none");
		$("#status_queryGrid").css("display","");
		
		$("#state").css("border-top","1px solid #DDDDDD");
		$("#state").css("border-left","1px solid #DDDDDD");
		$("#state").css("border-right","1px solid #DDDDDD");
		$("#state").css("border-bottom","hidden");
		
		dataStatusList(teamid,1,10);
		$("#dataCheck").css("color","#666");
		$("#dataCheck").css("border-top","hidden");
		$("#dataCheck").css("border-left","hidden");
		$("#dataCheck").css("border-right","hidden");
		$("#dataCheck").css("border-bottom","1px solid #DDDDDD");
		
	});
	
	$("#publish").click(function(){
		var teamid=$("input[name='team']").val();
		pageAllList(teamid,1,10);
	});
});

/**
 * 数据监测状态列表
 * @param teamid
 * @param pageIndex
 * @param size
 */
function dataStatusList(teamid, pageIndex, size) {

	// 表格的加载和显示
	$('#status_queryGrid').grid({
		data : "dataStatus/list",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10,
			teamid : teamid,
		},
		contentId : '#status_List',
		rowTemplateId : '#status_listTemplate',
		queryNow : true,// 是否立即查询，默认为true
		hasPage : true,// 是否渲染翻页控件，默认为true
		isShowCheckBox : false,// 是否显示check，默认为false
		emptyText : '',// 列表数据为空时显示的内容
		errorTip : '--'
	});
}

/**
 * 获取所有数据监测信息
 * 
 * @param pageIndex
 * @param size
 */
function pageAllList(teamid, pageIndex, size) {
	
	var dataName = $("input[name='dataName']").val();

	// 表格的加载和显示
	$('#queryGrid').grid({
		data : "dataMonitor/list",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10,
			teamid : teamid,
			dataName : dataName
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
 * 加载该用户的已申请的团队纬度
 */
function TeamDim() {
	$.ajax({
		url : "function/userTeam",
		type : "post",
		dataType : "json",
		success : function(data) {
			$("input[name='defaultTeamid']").val(data[0].dm);
			var $froms = $("#team_form").data("flyForm"); // 表单对象
			$froms.getControl("team").combobox({
				data : data,
				valueField : 'dm',
				textField : 'mc',
				initValue : data[0].dm,
				onSelect : function(data) {
					pageAllList(data.dm, 1, 10);
					dataStatusList(data.dm, 1, 10);
				}
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
 * 加载新增功能的团队纬度
 */
function addTeamDim(teamid) {
	$.ajax({
		url : "function/userTeam",
		type : "post",
		dataType : "json",
		success : function(data) {
			var $froms = $("#addForm").data("flyForm"); // 表单对象
			$froms.getControl("addTeam").combobox({
				data : data,
				valueField : 'dm',
				textField : 'mc',
				initValue : teamid
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
 * 加载数据库
 */
function dataBase(teamid) {
	$.ajax({
		url : "function/getDataBase",
		type : "post",
		dataType : "json",
		data : {
			teamid : teamid
		},
		success : function(data) {
			var $froms = $("#addForm").data("flyForm"); // 表单对象
			$froms.getControl("dataBase").combobox({
				data : data,
				valueField : 'dm',
				textField : 'mc',
			// initValue : data[0].dm
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
 * 新增数据监测
 */
function addDataCheck() {
	var teamid = $("input[name='team']").val();
	addTeamDim(teamid);
	dataBase(teamid);
	$.dialog({
		title : '新增数据监测',// 标题. 默认'消息'
		content : $('#addDialog')[0],// dialog的内容，可选DOM、String
		okVal : '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
		cancelVal : '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
		width : 900, // 内容宽度或者设置宽度为数字
		height : 'auto', // 内容高度或者设置高度为数字
		minWidth : 96, // 最小宽度限制
		minHeight : 32, // 最小高度限制
		padding : '20px 25px', // 内容与边界填充距离
		button : null, // 自定义按钮
		ok : function() {
			saveDataCheck();
		}, // 确定按钮回调函数
		cancel : function() {
		}, // 取消按钮回调函数
		init : function() {
			emptyDataCheck();
		}, // 对话框初始化后执行的函数
		close : function() {
		}, // 对话框关闭前执行的函数
		icon : null, // 消息图标名称
	});

}

/**
 * 新增数据监测置空表单
 */
function emptyDataCheck(){
	$("input[name='checkName']").val("");
	$("textarea[name='sql']").val("");
	$("textarea[name='content']").val("");
	$("input[name='emailstatus']").attr("checked",false);
	$("input[name='messagestatus']").val("checked",false);
}


/**
 * 保存新增数据检测
 */
function saveDataCheck() {
	var check_name = $("input[name='checkName']").val();
	var sid = $("input[name='dataBase']").val();
	if(sid==null || sid==""){
		alert("没有选择数据库");
		return false;
	}
	
	var sql = $("textarea[name='sql']").val();
	var text = $("textarea[name='content']").val();
	var emailstatus = $("input[name='emailstatus']:checked").val() == undefined ? '1'
			: '0';
	var messagestatus = $("input[name='messagestatus']:checked").val() == undefined ? '1'
			: '0';
	var teamid = $("input[name='addTeam']").val();

	var DataMonitorView = {};

	DataMonitorView.check_name = check_name;
	DataMonitorView.sid = sid;
	DataMonitorView.sql = sql;
	DataMonitorView.text = text;
	DataMonitorView.emailstatus = emailstatus;
	DataMonitorView.messagestatus = messagestatus;
	DataMonitorView.teamid = teamid;

	$.ajax({
		url : "function/saveDataCheck",
		type : "post",
		dataType : "json",
		data : {
			dataMonitorView : JSON.stringify(DataMonitorView)
		},
		success : function(data) {
			$.fly.tip({
				text : data.message,
				type : 'success'
			});
			var pageIndex = $('#queryGrid .pager-num .current').text();
			var teamid = $("input[name='team']").val();
			pageAllList(teamid, pageIndex, 10);
		},
		error : function() {
			$.fly.tip({
				text : '新增数据库失败',
				type : 'error'
			});
		}
	});

}

/**
 * 删除数据检测
 */
function deleteDataCheck() {
	var ids = "";
	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		ids += t[0] + ',';
	});
	if (ids.length == 0) {
		alert('你还没有选择任何内容！');
		return false;
	}

	if (confirm("确认要删除？")) {
		$.ajax({
			url : "dataMonitor/remove",
			type : "post",
			dataType : "json",
			data : {
				ids : ids
			},
			success : function(data) {
				if (data == "1") {
					$.fly.tip({
						text : '删除成功',
						type : 'success'
					});
				}
				var pageIndex = $('#queryGrid .pager-num .current').text();
				var teamid = $("input[name='team']").val();
				pageAllList(teamid, pageIndex, 10);
			}
		});
	}
}

/**
 * 编辑数据监测
 */
function editDataCheck() {
	var chk_value = "";
	var ids = "";
	i = 0;
	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		chk_value = chk_value + t[0] + ",";
		i++;
	});

	if (chk_value.length == 0) {
		alert('你还没有选择任何内容！');
		return;
	} else if (i > 1) {
		alert("无法编辑多个！");
	} else {
		chk_value = chk_value.split(",");
		$
				.ajax({
					url : 'function/getDataMonitor',
					type : "post",
					dataType : "json",
					data : {
						id : chk_value[0]
					},
					success : function(data) {
						$
								.dialog({
									id : 'diaid',
									title : "编辑数据监测",// 标题. 默认'消息'
									content : $('#addDialog')[0],// dialog的内容，可选DOM、String
									width : 900, // 内容宽度或者设置宽度为数字
									height : 'auto', // 内容高度或者设置高度为数字
									minWidth : 96, // 最小宽度限制
									minHeight : 32, // 最小高度限制
									padding : '20px 25px', // 内容与边界填充距离
									button : null, // 自定义按钮
									cancel : function() {
									}, // 取消按钮回调函数
									ok : function() {
										var DataMonitorView = {};
										DataMonitorView.id = chk_value[0];
										DataMonitorView.check_name = $("input[name='checkName']").val();
										DataMonitorView.sid = $("input[name='dataBase']").val();
										DataMonitorView.sql = $("textarea[name='sql']").val();
										
										var emailstatus = $("input[name='emailstatus']:checked").val() == undefined ? '1'
												: '0';
										var messagestatus = $("input[name='messagestatus']:checked").val() == undefined ? '1'
												: '0';
										DataMonitorView.emailstatus = emailstatus;
										DataMonitorView.messagestatus = messagestatus;
										DataMonitorView.text = $("textarea[name='content']").val();
										DataMonitorView.teamid = $("input[name='addTeam']").val();
										
										$.ajax({
											url : "dataMonitor/editData",
											type : "post",
											dataType : "json",
											data : {
												data : JSON.stringify(DataMonitorView)
											},
											success : function(data) {
												if(data==1){
													$.fly.tip({
														text : '更新数据监测成功',
														type : 'success'
													});
												}else{
													$.fly.tip({
														text : '更新数据监测失败',
														type : 'error'
													});
												}
												
												var pageIndex = $('#queryGrid .pager-num .current').text();
												var teamid = $("input[name='team']").val();
												pageAllList(teamid, pageIndex, 10);
											},
											error : function() {
												$.fly.tip({
													text : '更新数据监测失败',
													type : 'error'
												});
											}
										});
										
									}, // 确定按钮回调函数
									init : function() {
										$("input[name='checkName']").val(data.check_name);
										$("input[name='dataBase']").val(data.sid);
										$("textarea[name='sql']").val(data.sql);
										if(data.emailstatus=='开启'){
											$("input[name='emailstatus']").attr("checked",true);
										}else{
											$("input[name='emailstatus']").attr("checked",false);
										}
										if(data.messagestatus=='开启'){
											$("input[name='messagestatus']").attr("checked",true);
										}else{
											$("input[name='messagestatus']").attr("checked",false);
										}
										
										$("textarea[name='content']").val(data.text);
										addTeamDim(data.teamid);
										dataBase(data.teamid);
										
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

// 开启或关闭监控
function updateMultiple(flag) {
	var chk_value = "";
	var ids = "";
	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		chk_value = chk_value + t[0] + ",";
	});
	if (chk_value.length == 0) {
		alert('你还没有选择任何内容！');
		return;
	}
	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		if (flag == '0') {
			if (t[1] == "超时" || t[1] == "关闭") {
				alert("超时,关闭状态不可关闭！");
			} else {
				ids += t[0] + ',';
			}
		} else {
			if (t[1] == "开启") {
				alert("开启状态不可开启！");
			} else {
				ids += t[0] + ',';
			}
		}

	});
	
	var successText = "";
	var errorText = "";
	if(flag=='1'){
		successText = "开启监控成功";
		errorText = "开启监控失败";
	}else{
		successText = "关闭监控成功";
		errorText = "关闭监控失败";
	}
	$.ajax({
		url : "dataMonitor/updateAll",
		type : "post",
		dataType : "json",
		data : {
			ids : ids,
			flag : flag
		},
		success : function(data) {
			if (data) {
				$.fly.tip({
					text : successText,
					type : 'success'
				});
			}else{
				$.fly.tip({
					text : errorText,
					type : 'error'
				});
			}
			
			var pageIndex = $('#queryGrid .pager-num .current').text();
			var teamid = $("input[name='team']").val();
			pageAllList(teamid, pageIndex, 10);
		},
		error : function() {
			$.fly.tip({
				text : errorText,
				type : 'error'
			});
		}
	});
}

/**
 * 开启短信/关闭短信
 * 
 * @param flag
 */
function updateMessage(flag) {
	var chk_value = "";
	var ids = "";
	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		chk_value = chk_value + t[0] + ",";
	});
	if (chk_value.length == 0) {
		alert('你还没有选择任何内容！');
		return;
	}

	$('input[name="dataCheck"]:checked').each(function() {
		var t = $(this).val().split(";");
		if (flag == '0') {
			if (t[2] == "开启") {
				alert("已开启的不可开启！");
			} else {
				ids += t[0] + ',';
			}
		} else {
			if (t[2] == "关闭") {
				alert("已关闭的不可关闭！");
			} else {
				ids += t[0] + ',';
			}
		}
	});
	
	var successText = "";
	var errorText = "";
	if(flag=='0'){
		successText = "开启短信成功";
		errorText = "开启短信失败";
	}else{
		successText = "关闭短信成功";
		errorText = "关闭短信失败";
	}
	$.ajax({
		url : "function/updateMessagestatus",
		type : "post",
		dataType : "json",
		data : {
			ids : ids,
			messagestatus : flag
		},
		success : function(data) {
			if (data) {
				$.fly.tip({
					text : successText,
					type : 'success'
				});
			}else{
				$.fly.tip({
					text : errorText,
					type : 'error'
				});
			}
			var pageIndex = $('#queryGrid .pager-num .current').text();
			var teamid = $("input[name='team']").val();
			pageAllList(teamid, pageIndex, 10);
		},
		error : function() {
			$.fly.tip({
				text : errorText,
				type : 'error'
			});
		}
	});
}

/**
 * 新增数据库
 */
function addDataBase() {
	$.dialog({
		title : '新增数据库',// 标题. 默认'消息'
		content : $('#dataBaseDialog')[0],// dialog的内容，可选DOM、String
		okVal : '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
		cancelVal : '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
		width : 800, // 内容宽度或者设置宽度为数字
		height : 'auto', // 内容高度或者设置高度为数字
		minWidth : 96, // 最小宽度限制
		minHeight : 32, // 最小高度限制
		padding : '20px 25px', // 内容与边界填充距离
		button : null, // 自定义按钮
		ok : function() {
			saveDataBase();
		}, // 确定按钮回调函数
		cancel : function() {
		}, // 取消按钮回调函数
		init : function() {
		}, // 对话框初始化后执行的函数
		close : function() {
		}, // 对话框关闭前执行的函数
		icon : null, // 消息图标名称
	});
}

/**
 * 保存新增数据库
 */
function saveDataBase() {
	var dbName = $("input[name='dbname']").val();
	var url = $("textarea[name='url']").val();
	var type = $("input[name='dbtype']").val();
	var userName = $("input[name='username']").val();
	var password = $("input[name='password']").val();
	var teamid = $("input[name='addTeam']").val();

	var DataSourseView = {};

	DataSourseView.dbName = dbName;
	DataSourseView.url = url;
	DataSourseView.type = type;
	DataSourseView.userName = userName;
	DataSourseView.password = password;
	DataSourseView.teamid = teamid;

	$.ajax({
		url : "function/saveDataBase",
		type : "post",
		dataType : "json",
		data : {
			DataSourseView : JSON.stringify(DataSourseView)
		},
		success : function(data) {
			$.fly.tip({
				text : data.message,
				type : 'success'
			});
			dataBase(teamid);
		},
		error : function() {
			$.fly.tip({
				text : '新增数据库失败',
				type : 'error'
			});
		}
	});

}

/**
 * 编辑更新数据库
 */
function updateDataBase() {
	var id = $("input[name='dataBase']").val();
	var dbName = $("input[name='dbname']").val();
	var url = $("textarea[name='url']").val();
	var type = $("input[name='dbtype']").val();
	var userName = $("input[name='username']").val();
	var password = $("input[name='password']").val();
	var teamid = $("#teamid").val();

	var DataSourseView = {};
	DataSourseView.id = id;
	DataSourseView.dbName = dbName;
	DataSourseView.url = url;
	DataSourseView.type = type;
	DataSourseView.userName = userName;
	DataSourseView.password = password;
	DataSourseView.teamid = teamid;

	$.ajax({
		url : "function/updateDataBase",
		type : "post",
		dataType : "json",
		data : {
			DataSourseView : JSON.stringify(DataSourseView)
		},
		success : function(data) {
			$.fly.tip({
				text : data.message,
				type : 'success'
			});
			dataBase(teamid);
		},
		error : function() {
			$.fly.tip({
				text : '更新数据库失败',
				type : 'error'
			});
		}
	});
}

/**
 * 编辑数据库
 */
function editDataBase() {
	var dataBaseId = $("input[name='dataBase']").val();
	if (dataBaseId == null || dataBaseId == "") {
		alert("当前没有选择数据库");
		return false;
	}
	$.dialog({
		title : '编辑数据库',// 标题. 默认'消息'
		content : $('#dataBaseDialog')[0],// dialog的内容，可选DOM、String
		okVal : '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
		cancelVal : '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
		width : 800, // 内容宽度或者设置宽度为数字
		height : 'auto', // 内容高度或者设置高度为数字
		minWidth : 96, // 最小宽度限制
		minHeight : 32, // 最小高度限制
		padding : '20px 25px', // 内容与边界填充距离
		button : null, // 自定义按钮
		ok : function() {
			updateDataBase();
		}, // 确定按钮回调函数
		cancel : function() {
		}, // 取消按钮回调函数
		init : function() {
			$.ajax({
				url : "function/editDataBase",
				type : "post",
				dataType : "json",
				data : {
					dataBaseId : dataBaseId
				},
				success : function(data) {
					$("input[name='dbtype']").val(data.type);
					$("input[name='dbname']").val(data.dbName);
					$("textarea[name='url']").val(data.url);
					$("input[name='username']").val(data.userName);
					$("input[name='password']").val(data.password);
					$("#teamid").val(data.teamid);
				},
				error : function() {
					$.fly.tip({
						text : '编辑数据库失败',
						type : 'error'
					});
				}
			});

		}, // 对话框初始化后执行的函数
		close : function() {
		}, // 对话框关闭前执行的函数
		icon : null, // 消息图标名称
	});

}

/**
 * 删除数据库
 */
function deleteDataBase() {
	var dataBaseId = $("input[name='dataBase']").val();
	var teamid = $("input[name='addTeam']").val();
	if (dataBaseId == null || dataBaseId == "") {
		alert("当前没有选择数据库");
		return false;
	}
	$.ajax({
		url : "function/deleteDataBase",
		type : "post",
		dataType : "json",
		data : {
			dataBaseId : dataBaseId
		},
		success : function(data) {
			dataBase(teamid);
			$.fly.tip({
				text : data.message,
				type : 'success'
			});

		},
		error : function() {
			$.fly.tip({
				text : '删除数据库失败',
				type : 'error'
			});
		}
	});

}
