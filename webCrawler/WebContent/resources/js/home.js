

function checkname(obj) {
	$(".level-2 a").css("background", "#fff");
	$(".level-2 a").css("color", "#797979");
	obj.css("background", "#78CAFA");
	obj.css("color", "#fff");
	String.prototype.trim = function() 
    { 
      return this.replace(/(^\s*)|(\s*$)/g, ""); 
    } 
	var mentext = $(".firstmenutext").text();
	$(".breadcrumb").html(
			"<li><i class=\"icon-home home-icon\"></i> <span>" + mentext
					+ "</span></li>");
	var menu2 = obj.closest('.level-2');
	var menu1 = menu2.closest('.level-1');
	var text2 = menu2.text().trim().substring(2, menu2.text().trim().length);
	var i = menu1.find('.menu-text').html().indexOf("<");
	var text1 = menu1.find('.menu-text').html().substring(0, i);
	var str = "<li class='active'>" + text1 + "</li><li class='active'>"
			+ text2 + "</li>"
	$(".breadcrumb").append(str);
}






