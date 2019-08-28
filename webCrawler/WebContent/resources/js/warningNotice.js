$(function() {
	pageAllList(1, 10);
	$("textarea[name='messageTo']").click(function() {
		var v = $("textarea[name='messageTo']").val();
		if(v=='多个联系人以英文,隔开'){
			$("textarea[name='messageTo']").val("");
			$("textarea[name='messageTo']").css("color","#000000");
		}
	});
	
	$("textarea[name='messageTo']").blur(function() {
		var v = $("textarea[name='messageTo']").val();
		if(v=='' || v==null){
			$("textarea[name='messageTo']").val("多个联系人以英文,隔开");
			$("textarea[name='messageTo']").css("color","#AAAAAA");
		}
	});

	$("textarea[name='emailTo']").click(function() {
		var v = $("textarea[name='emailTo']").val();
		if(v=='多个联系人以英文,隔开'){
			$("textarea[name='emailTo']").val("");
			$("textarea[name='emailTo']").css("color","#000000");
		}
	});
	
	$("textarea[name='emailTo']").blur(function() {
		var v = $("textarea[name='emailTo']").val();
		if(v=='' || v==null){
			$("textarea[name='emailTo']").val("多个联系人以英文,隔开");
			$("textarea[name='emailTo']").css("color","#AAAAAA");
		}
	});

});

function pageAllList(pageIndex, size) {

	// 表格的加载和显示
	$('#queryGrid').grid({
		data : "function/warningNoticeList",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10
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
 * 初始化数据，团队纬度，短信邮件通知对象
 */
function initData(teamid) {
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
				initValue : teamid,
				onSelect : function(data) {
					initMessage(data.dm);
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
	initMessage(teamid);
}

/**
 * 根据团队code加载短信通知对象
 */
function initMessage(code) {
	$
			.ajax({
				url : "function/noticeObject",
				type : "post",
				dataType : "json",
				data : {
					code : code
				},
				success : function(data) {
					var $froms = $("#team_form").data("flyForm"); // 表单对象
					
					if(data.mc=='' || data.mc==null){
						$("textarea[name='messageTo']").val('多个联系人以英文,隔开');
						$("textarea[name='messageTo']").css("color","#AAAAAA");
						
						$("textarea[name='emailTo']").val('多个联系人以英文,隔开');
						$("textarea[name='emailTo']").css("color","#AAAAAA");
						
					}else{
						$("textarea[name='messageTo']").val(data.mc);
						$("textarea[name='messageTo']").css("color","#000000");
						
						$("textarea[name='emailTo']").val(data.dm);
						$("textarea[name='emailTo']").css("color","#000000");
					}
					
//					$("textarea[name='messageTo']").val(
//							data.mc == null || data.mc == '' ? '多个联系人以英文,隔开'
//									: data.mc);
//					$("textarea[name='messageTo']").css("color","#AAAAAA");
//					
//					$("textarea[name='emailTo']").val(
//							data.dm == null || data.dm == '' ? '多个联系人以英文,隔开'
//									: data.dm);
//					$("textarea[name='emailTo']").css("color","#AAAAAA");
				},
				error : function() {
					$.fly.tip({
						text : '短信或邮件通知对象加载失败',
						type : 'error'
					});
				}
			});
}

/**
 * 保存修改的短息邮件通知对象
 */
function saveMessage(teamid) {
	var messageTo = $("textarea[name='messageTo']").val();
	var emailTo = $("textarea[name='emailTo']").val();
	$.ajax({
		url : "function/saveMessage",
		type : "post",
		dataType : "json",
		data : {
			teamid : teamid,
			messageTo : messageTo,
			emailTo : emailTo
		},
		success : function(data) {
			$.fly.tip({
				text : data.message,
				type : 'success'
			});
		},
		error : function() {
			$.fly.tip({
				text : '短信或邮件通知对象修改失败',
				type : 'error'
			});
		}
	});
}

/**
 * 告警通知设置邮件，短信发送对象
 * 
 * @param teamid
 */
function editWarningNotice(teamid) {
	$.dialog({
		title : '告警通知设置',// 标题. 默认'消息'
		content : addDialog,// dialog的内容，可选DOM、String
		okVal : '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
		cancelVal : '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
		width : 550, // 内容宽度或者设置宽度为数字
		height : 'auto', // 内容高度或者设置高度为数字
		minWidth : 96, // 最小宽度限制
		minHeight : 32, // 最小高度限制
		padding : '20px 25px', // 内容与边界填充距离
		button : null, // 自定义按钮
		ok : function() {
			saveMessage(teamid);
		}, // 确定按钮回调函数
		cancel : function() {
		}, // 取消按钮回调函数
		init : function() {
			initData(teamid);
		}, // 对话框初始化后执行的函数
		close : function() {
		}, // 对话框关闭前执行的函数
		icon : null, // 消息图标名称
		time : null, // 自动关闭时间,单位为秒
		esc : true, // 是否支持Esc键关闭
		focus : true, // 是否支持对话框按钮自动聚焦
		show : true, // 初始化后是否显示对话框
		follow : null, // 跟随某元素(即让对话框在元素附近弹出)
		path : null, // artDialog路径
		lock : true, // 是否锁屏
		background : '#000', // 遮罩颜色
		opacity : .5, // 遮罩透明度
		duration : 300, // 遮罩透明度渐变动画速度
		fixed : false, // 是否静止定位
		left : '50%', // X轴坐标
		top : '38.2%', // Y轴坐标
		zIndex : 1997, // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
		resize : true, // 是否允许用户调节尺寸
		drag : true, // 是否允许用户拖动位置
		showBtn : true
	// 是否显示按钮
	});
}
