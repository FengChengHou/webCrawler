$(function(){
	
	ShowTeamMenu();
});


function ShowTeamMenu() {
	

	$.ajax({
		url : "function/userTeam",
		type : "post",
		dataType : "json",
		success : function(data) {
			var $froms = $("#queryConditions").data("flyForm"); // 表单对象			
			$froms.getControl("team").combobox({
				data : data,
				valueField : 'dm',
				textField : 'mc',
			    initValue : data[0].dm,
			});
		},
		error : function() {
			$.fly.tip({
				text : '团队加载失败',
				type : 'error'
			});
		}
	});
}