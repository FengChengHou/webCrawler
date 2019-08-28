$(function(){
	// 根据屏幕分辨率设置页面高度
	$('.iframe-demo').height(document.body.offsetHeight);

	// 左侧导航的切换导致右边iframe的src变化
	$('.catalog-list a').on('click',function(){
		if(!$(this).parent().hasClass('parent-li')){
			var url = $(this).data('url'),
				iframeDemo = $('#iframe_main');
			iframeDemo[0].src = url;
		}
	});

	// 导航的收缩和展开
	$('li.parent-li>a').on('click',function(){
		var _this = $(this).parent();
		if( _this.hasClass('active') ){
			_this.removeClass('active').children('ul').hide();
		}else{
			_this.addClass('active').children('ul').show();
		}
	});

});