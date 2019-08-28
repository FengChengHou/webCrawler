$(function(){
	query();
	var status=$("input[name='status']").val();
	pageUserTeamList(1,10,status);
	
});


/**
 * 获取所有用户申请数据
 * @param pageIndex
 * @param size
 */
function pageUserTeamList(pageIndex,size,status){	
	// 表格的加载和显示
	$('#queryGrid').grid({
		data : "function/userTeamListByID",
		params : {
			currentPageNo : pageIndex,
			pageSize : 10,
			status:status,
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

//下拉框触发查询
function query() {
    var $from = $("#team_form").data("flyForm"); //表单对象
	$from.getControl("status").combobox({
    onSelect: function(data) {
    	pageUserTeamList(1,10,data.dm);
    }      
	});
}

//通过或拒绝
function update(flag){
	var chk_value ="";
	var ids = "";
	$('input[name="userTeam"]:checked').each(function(){
		var t=$(this).val().split(";");
		chk_value=chk_value+t[0]+",";
	});
	if(chk_value.length==0 )
	{
		alert('你还没有选择任何内容！'); 
		return;
	}
	
	
	$('input[name="userTeam"]:checked').each(function(){
		var t=$(this).val().split(";");
		if(t[1]== "通过" || t[1]== "拒绝"){
			alert("已处理不可操作");
		}
		else{
	      	ids+=t[0] + ',';
		}
	});
	
	$.ajax({
		url:"function/updateStatus",
		type:"post",
		dataType:"json",
		data:{
			ids:ids,
			status:flag
		},
		success:function(data){
			if(data){
				$.fly.tip({
					text : '操作成功',
					type : 'success'
				})
				var status=$("input[name='status']").val();
				var pageIndex = $('#queryGrid .pager-num .current').text();
				pageUserTeamList(pageIndex,10,status);
				
				//pageAllList(pageIndex,10,teamid);
				}
		},error:function(){
			$.fly.tip({
				text : '操作失败',
				type : 'error'
			})
		}
	});
}


