$(function() {
	loadFunctionGrid(1);
});

// 加在表格
function loadFunctionGrid(pageIndex) {

	// 表格的加载和显示
	$('#sp_queryGrid').grid({
		data : "user/getUsers",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10
		},
		contentId : '#sp_List',
		rowTemplateId : '#sp_listTemplate',
		queryNow : true,// 是否立即查询，默认为true
		hasPage : true,// 是否渲染翻页控件，默认为true
		isShowCheckBox : false,// 是否显示check，默认为false
		emptyText : '',// 列表数据为空时显示的内容
		errorTip : '--'
	});

}

// 点击查看编辑
function openEDialog(userid) {

	$.ajax({
		url : "user/getUserById",
		data : {
			userid : userid
		},
		type : "post",
		dataType : "json",
		success : function(data) {
			var $from = $("#form_demo").data("flyForm"); // 表单对象
			if (data != null && data != "") {

				$("input[name='userid']").attr("value", data.userid);
				$("input[name='username']").attr("value", data.username);
				$("input[name='name']").attr("value", data.name);
				$("input[name='telephone']").attr("value", data.telephone);

				$("textarea[name='remarks']").val(data.remarks);
				$("textarea[name='team']").val(data.teamname);

				$from.getControl("status").radio({
					initValue : data.status
				});
			}

		},
		error : function() {
			$.fly.tip({
				text : '加载用户信息失败',
				type : 'error'
			});
		}
	});

	$.ajax({
		url : "user/teamAndFunction",
		data : {
			userid : userid
		},
		type : "post",
		dataType : "json",
		success : function(data) {
			var $from = $("#form_demo").data("flyForm"); // 表单对象
			if (data != null && data.length > 0) {

				for (var i = 0; i < data.length; i++) {
					$from.getControl("permissions").checkbox({
						initValue : data[i].functionid
					});
				}

			}
			
			$("#userid").val(userid);

			$.dialog({
				id : 'uedia',
				title : "权限配置",// 标题. 默认'消息'
				content : $('#ueditDialog')[0],// dialog的内容，可选DOM、String
				width : 800, // 内容宽度或者设置宽度为数字
				height : 'auto', // 内容高度或者设置高度为数字
				minWidth : 96, // 最小宽度限制
				minHeight : 32, // 最小高度限制
				padding : '20px 25px', // 内容与边界填充距离
				button : null, // 自定义按钮
				ok : function() {
					var pageIndex = $('#sp_queryGrid .pager-num .current')
							.text();
					var f = updateUser(pageIndex);

					if (f == 0) {
						return false;
					} else {
						return true;
					}

				}
			});

		},
		error : function() {
			$.fly.tip({
				text : '加载用户菜单权限失败',
				type : 'error'
			});
		}
	});

}

function updateUser(pageIndex) {

	var userid = $("#userid").val();
	var remarks = $("textarea[name='remarks']").val();
	var arr = $("input[name='permissions']:checked");
	var status = $("input[name='status']:checked").val();

	var fids = "";
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].checked) {
			fids = fids+arr[i].value+",";
		}
	}

	$.ajax({
		url : "user/updateUser",
		type : "post",
		dataType : "json",
		data : {
			userid : userid,
			remarks : remarks,
			fids : fids,
			status : status
		},
		success : function(data) {
			$.fly.tip({
				text : '修改成功',
				type : 'success'
			});
			loadFunctionGrid(pageIndex);
			return 1;
		},
		error : function() {
			$.fly.tip({
				text : '修改失败',
				type : 'error'
			});
			return 0;
		}
	});

}
