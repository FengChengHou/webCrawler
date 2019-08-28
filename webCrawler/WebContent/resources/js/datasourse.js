$(function() {
	$("#add_data_sourse").click(addDataSourse);
	$("#del_data_sourse").click(delDataSourse);
	$("#edit_data_sourse").click(editDataSourse);
	$("#select_type").change(showUrl);
	$("#datas_btn1").click(judgeOp);
	$("#datas_btn2").click(clear);
});
function addDataSourse() {
	$('#dataS').dialog('open');
	document.getElementById("datasourse_id").value = "";
	document.getElementById("dbName").value = "";
	document.getElementById("url").value = "";
	document.getElementById("select_type").value = "";
	document.getElementById("userName").value = "";
	document.getElementById("password").value = "";
	showUrl();
}
function judgeOp(){
	if($("#datasourse_id").val()==""){
		submitAddDataSourse();
	}else{
		submitEditDataSourse();
	}
	
}
function delDataSourse() {
	var str = "确认删除该数据源?";

	var localObj = window.location;

	var contextPath = localObj.pathname.split("/")[1];

	var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;

	if (confirm(str)) {
		//alert($('#select_database').val());
		$.ajax( {
			url : '' + basePath + '/dataSourse/delDataSourse',
			type : "post",
			dataType : "json",
			data : {
				id : $('#select_database').val()
			},
			success : function(data) {
				if (data == "1") {
					alert("删除成功！");
					$.ajax({
						url:'' + basePath + '/dataSourse/datalist',
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
						
					
					});
				}
			}
		});
	}
}
function editDataSourse() {
	//alert($('#select_database').val());
	var localObj = window.location;

	var contextPath = localObj.pathname.split("/")[1];

	var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;
	$.ajax( {
		url : '' + basePath + '/dataSourse/getDataSourse',
		type : "post",
		dataType : "json",
		data : {
			id : $('#select_database').val()
		},
		success : function(data) {
			document.getElementById("datasourse_id").value = data.id;
			document.getElementById("dbName").value = data.dbName;
			document.getElementById("url").value = data.url;
			document.getElementById("select_type").value = data.type;
			document.getElementById("userName").value = data.userName;
			document.getElementById("password").value = data.password;
			$('#dataS').dialog('open');
		}
	});
}
function showUrl() {
	if ($("#select_type").val() == "oracle") {
		$("#url").val("jdbc:oracle:thin:@//localhost:port/dbname");
	} else if ($("#select_type").val() == "mysql") {
		$("#url")
				.val(
						"jdbc:mysql://localhost:port/dbname?useUnicode=true&characterEncoding=UTF-8");
	} else if ($("#select_type").val() == "sqlserver") {
		$("#url").val("jdbc:sqlserver://localhost:port;DatabaseName=dbname");
	}

}
function submitAddDataSourse() {
	var dbName = $('#dbName').val();
	var url = $('#url').val();
	var type = $('#select_type').val();
	var userName = $('#userName').val();
	var password = $('#password').val();

	dbName = (isStrEmpty(dbName) ? '' : dbName);
	url = (isStrEmpty(url) ? '' : url);
	type = (isStrEmpty(type) ? '' : type);
	userName = (isStrEmpty(userName) ? '' : userName);
	password = (isStrEmpty(password) ? '' : password);

	var db = {};
	db.dbName = dbName;
	db.url = url;
	db.type = type;
	db.userName = userName;
	db.password = password;
	var localObj = window.location;

	var contextPath = localObj.pathname.split("/")[1];

	var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;
	$.ajax( {
		url : '' + basePath + '/dataSourse/addDataSourse',
		type : "post",
		dataType : "json",
		data : {
			data:JSON.stringify(db)
		},
		success : function(data) {
			if (data == "1") {
				alert("添加成功！");
				$.ajax({
					url:'' + basePath + '/dataSourse/datalist',
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
					
				
				});
				
			}
		}
	});
	$('#dataS_form').form('clear');
	$('#dataS').dialog('close');
}

function submitEditDataSourse(){
	var dbName = $('#dbName').val();
	var url = $('#url').val();
	var type = $('#select_type').val();
	var userName = $('#userName').val();
	var password = $('#password').val();
	var id = $('#datasourse_id').val();

	dbName = (isStrEmpty(dbName) ? '' : dbName);
	url = (isStrEmpty(url) ? '' : url);
	type = (isStrEmpty(type) ? '' : type);
	userName = (isStrEmpty(userName) ? '' : userName);
	password = (isStrEmpty(password) ? '' : password);
	id = (isStrEmpty(id) ? '' : id);

	var db = {};
	db.dbName = dbName;
	db.url = url;
	db.type = type;
	db.userName = userName;
	db.password = password;
	db.id=id;
	//alert("-----" + db.id);
	var localObj = window.location;

	var contextPath = localObj.pathname.split("/")[1];

	var basePath = localObj.protocol + "//" + localObj.host + "/" + contextPath;
	$.ajax( {
		url : '' + basePath + '/dataSourse/ediDataSourse',
		type : "post",
		dataType : "json",
		data : {
			data:JSON.stringify(db)
		},
		success : function(data) {
			if (data == "1") {
				alert("编辑成功！");
				$.ajax({
					url:'' + basePath + '/dataSourse/datalist',
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
					
				
				});
			}
		}
	});
	$('#dataS_form').form('clear');
	$('#dataS').dialog('close');
}
function clear(){
	//$('#dataS_form').form('clear');
	//$("#dataS_form").find(":input").not(":button,:submit,:reset,:hidden").val("").removeAttr("checked").removeAttr("selected");
	document.getElementById("dbName").value = "";
	document.getElementById("url").value = "";
	document.getElementById("userName").value = "";
	document.getElementById("password").value = "";
}