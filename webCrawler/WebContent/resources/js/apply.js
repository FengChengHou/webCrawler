$(function(){
	
	pageAllList(1,10);
});

function pageAllList(pageIndex,size){

	// 表格的加载和显示
	$('#queryGrid').grid({
		data : "function/userTeamList",
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
 * 用户申请加入团队
 * @param teamid
 * @param permissions
 * @returns {Boolean}
 */
function applyTeam(teamid,permissions){
	if(permissions=="审核通过" || permissions=="待审核"){
		return false;
	}else{
		$.ajax({
			url : "function/applyTeam",
			type : "post",
			dataType : "json",
			data : {
				teamid : teamid
			},
			success : function(data) {
				if (data.status == 1) {
					$.fly.tip({
						text : data.message,
						type : 'success'
					});
					 var pageIndex = $('#queryGrid .pager-num .current').text();
					 pageAllList(pageIndex,10);
					
				}else{
					$.fly.tip({
						text : data.message,
						type : 'error'
					});
				}
			},
			error : function() {
				$.fly.tip({
	                text:'系统异常',
	                type:'error'
	            });

			}
		});
	}
}