<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<%@include file="../base.jsp"%>
<title>接口数据监测平台</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- basic styles -->
<link href="resources/assets/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="resources/assets/css/font-awesome.min.css" />
<!--[if IE 7]>
		  <link rel="stylesheet" href="resources/assets/css/font-awesome-ie7.min.css" />
<![endif]-->

<!-- page specific plugin styles -->

<!-- fonts -->

<!-- <link rel="stylesheet"
	href="http://fonts.useso.com/css?family=Open+Sans:400,300" /> -->

<!-- ace styles -->

<link rel="stylesheet" href="resources/assets/css/ace.min.css" />
<link rel="stylesheet" href="resources/assets/css/ace-rtl.min.css" />
<link rel="stylesheet" href="resources/assets/css/ace-skins.min.css" />

<!-- 菜单栏样式  -->
<link rel="stylesheet" href="resources/css/MenuStyle.css" />
<link rel="stylesheet" href="resources/assets/css/ace-ie.min.css" />
<!-- inline styles related to this page -->

<!-- ace settings handler -->

<script src="resources/assets/js/ace-extra.min.js"></script>


<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

<!--[if lt IE 9]>
		<script src="resources/assets/js/html5shiv.js"></script>
		<script src="resources/assets/js/respond.min.js"></script>
<![endif]-->


<!-- basic scripts -->

<script src="resources/flyui/plugins/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="resources/js/home.js"></script>

<!--[if !IE]> -->

<script type="text/javascript">
	window.jQuery
			|| document
					.write("<script src='resources/assets/js/jquery-2.0.3.min.js'>"
							+ "<"+"script>");
</script>

<!-- <![endif]-->


<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='resources/assets/js/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->

<script type="text/javascript">
	if ("ontouchend" in document)
		document
				.write("<script src='resources/assets/js/jquery.mobile.custom.min.js'>"
						+ "<"+"script>");
</script>
<script src="resources/assets/js/bootstrap.min.js"></script>
<script src="resources/assets/js/typeahead-bs2.min.js"></script>

<!-- page specific plugin scripts -->


<script src="resources/assets/js/excanvas.min.js"></script>

<script src="resources/assets/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="resources/assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="resources/assets/js/jquery.slimscroll.min.js"></script>
<script src="resources/assets/js/jquery.easy-pie-chart.min.js"></script>
<script src="resources/assets/js/jquery.sparkline.min.js"></script>


<!-- ace scripts -->

<script src="resources/assets/js/ace-elements.min.js"></script>
<!-- <script src="resources/assets/js/ace.min.js"></script> -->

<!-- inline scripts related to this page -->

<script type="text/javascript">
	jQuery(function($) {
		$('.easy-pie-chart.percentage')
				.each(
						function() {
							var $box = $(this).closest('.infobox');
							var barColor = $(this).data('color')
									|| (!$box.hasClass('infobox-dark') ? $box
											.css('color')
											: 'rgba(255,255,255,0.95)');
							var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)'
									: '#E2E2E2';
							var size = parseInt($(this).data('size')) || 50;
							$(this).easyPieChart(
									{
										barColor : barColor,
										trackColor : trackColor,
										scaleColor : false,
										lineCap : 'butt',
										lineWidth : parseInt(size / 10),
										animate : /msie\s*(8|7|6)/
												.test(navigator.userAgent
														.toLowerCase()) ? false
												: 1000,
										size : size
									});
						})

		$('.sparkline').each(
				function() {
					var $box = $(this).closest('.infobox');
					var barColor = !$box.hasClass('infobox-dark') ? $box
							.css('color') : '#FFF';
					$(this).sparkline('html', {
						tagValuesAttribute : 'data-values',
						type : 'bar',
						barColor : barColor,
						chartRangeMin : $(this).data('min') || 0
					});
				});

		var placeholder = $('#piechart-placeholder').css({
			'width' : '90%',
			'min-height' : '150px'
		});
		var data = [ {
			label : "social networks",
			data : 38.7,
			color : "#68BC31"
		}, {
			label : "search engines",
			data : 24.5,
			color : "#2091CF"
		}, {
			label : "ad campaigns",
			data : 8.2,
			color : "#AF4E96"
		}, {
			label : "direct traffic",
			data : 18.6,
			color : "#DA5430"
		}, {
			label : "other",
			data : 10,
			color : "#FEE074"
		} ]

		/**
		we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
		so that's not needed actually.
		 */
		placeholder.data('chart', data);

		var $tooltip = $(
				"<div class='tooltip top in'><div class='tooltip-inner'></div></div>")
				.hide().appendTo('body');
		var previousPoint = null;

		placeholder.on('plothover', function(event, pos, item) {
			if (item) {
				if (previousPoint != item.seriesIndex) {
					previousPoint = item.seriesIndex;
					var tip = item.series['label'] + " : "
							+ item.series['percent'] + '%';
					$tooltip.show().children(0).text(tip);
				}
				$tooltip.css({
					top : pos.pageY + 10,
					left : pos.pageX + 10
				});
			} else {
				$tooltip.hide();
				previousPoint = null;
			}

		});

		var d1 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.5) {
			d1.push([ i, Math.sin(i) ]);
		}

		var d2 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.5) {
			d2.push([ i, Math.cos(i) ]);
		}

		var d3 = [];
		for (var i = 0; i < Math.PI * 2; i += 0.2) {
			d3.push([ i, Math.tan(i) ]);
		}

		var sales_charts = $('#sales-charts').css({
			'width' : '100%',
			'height' : '220px'
		});

		$('#recent-box [data-rel="tooltip"]').tooltip({
			placement : tooltip_placement
		});
		function tooltip_placement(context, source) {
			var $source = $(source);
			var $parent = $source.closest('.tab-content')
			var off1 = $parent.offset();
			var w1 = $parent.width();

			var off2 = $source.offset();
			var w2 = $source.width();

			if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2))
				return 'right';
			return 'left';
		}

		$('.dialogs,.comments').slimScroll({
			height : '300px'
		});

		//Android's default browser somehow is confused when tapping on label which will lead to dragging the task
		//so disable dragging when clicking on label
		var agent = navigator.userAgent.toLowerCase();
		if ("ontouchstart" in document && /applewebkit/.test(agent)
				&& /android/.test(agent))
			$('#tasks').on('touchstart', function(e) {
				var li = $(e.target).closest('#tasks li');
				if (li.length == 0)
					return;
				var label = li.find('label.inline').get(0);
				if (label == e.target || $.contains(label, e.target))
					e.stopImmediatePropagation();
			});

		$('#tasks').sortable({
			opacity : 0.8,
			revert : true,
			forceHelperSize : true,
			placeholder : 'draggable-placeholder',
			forcePlaceholderSize : true,
			tolerance : 'pointer',
			stop : function(event, ui) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
				$(ui.item).css('z-index', 'auto');
			}
		});
		$('#tasks').disableSelection();
		$('#tasks input:checkbox').removeAttr('checked').on('click',
				function() {
					if (this.checked)
						$(this).closest('li').addClass('selected');
					else
						$(this).closest('li').removeClass('selected');
				});

	})
</script>
</head>
<body>
	<div class="navbar navbar-default" id="navbar"
		style="height:100px;background:url(<%=request.getContextPath()%>/resources/pictures/top_bg.png) repeat-x scroll left top rgba(0, 0, 0, 0)">


		<img title="interfaceView"
			style="margin-top: 20px; margin-left: 15px;"
			src="<%=request.getContextPath()%>/resources/pictures/logo_xfjiekou.png">
		</img>
		
		
		<div style="background: url(resources/pictures/exist.png); background-size: 23px 23px; background-repeat: no-repeat; float: right; margin-top: 60px;margin-right: 50px;">
					<a style="margin-left: 22px; color: white;" 
						href="exist" id="exit">&nbsp;&nbsp;退出</a>
		</div>
		<div style=" float: right; margin-top: 60px;margin-right: 50px;">
					<i style="margin-left: 22px; color: white;" >${sessionScope.user.username}</i>
		</div>

	</div>

	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try {
				ace.settings.check('main-container', 'fixed')
			} catch (e) {
			}
		</script>


		<div class="main-container-inner">
			<!-- 	<a class="menu-toggler" id="menu-toggler" href="#"> <span
				class="menu-text"></span>
			</a> -->

			<div class="sidebar" id="sidebar">
				<script type="text/javascript">
					try {
						ace.settings.check('sidebar', 'fixed')
					} catch (e) {
					}
				</script>

				<div class="sidebar-shortcuts" id="sidebar-shortcuts">

					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<span class="btn btn-success"></span> <span class="btn btn-info"></span>

						<span class="btn btn-warning"></span> <span class="btn btn-danger"></span>
					</div>
				</div>
				<!-- -------------------菜单--------------------------- -->
				<div id="shsj" display="none" style="width: 250px;">
					<ul class="nav nav-list">
						<li class="active"><a
							style="background:  5% 50%; background-size: 24px 24px; background-repeat: no-repeat;">
								<!-- <i class="icon-dashboard"></i> --> <span class="firstmenutext"
								style="margin-left: 30px;">菜单 </span>
						</a></li>
					</ul>

					<!-- 导航开始 -->
					<div id="wrapper-250" style="width: 250px;">
						<ul class="accordion">
						<c:forEach var="menu" items="${functionList}">
						<c:if test="${menu == '接口监测'}">					
							<li id="one" class="files level-1"><a  class="menu-text" >接口监测<span>1</span></a>
								<ul class="sub-menu">
									<li class="level-2"><a style="background: #78CAFA; color: #fff" href="function/interfaceCheck"
										onclick="checkname($(this))" target="iframepage"><em>01</em>接口监测</a></li>
								</ul>
							</li>
						</c:if>
						<c:if test="${menu == '数据监测'}">
							<li id="two" class="mail  level-1"><a class="menu-text" >数据监测<span>1</span></a>
							<ul class="sub-menu">
									<li class="level-2"><a href="function/dataCheck"
										onclick="checkname($(this))" target="iframepage"><em>01</em>数据监测</a></li>
								</ul>
							</li>
						</c:if>
						<c:if test="${menu == '团队申请加入'}">
							<li id="three" class="cloud level-1">
							 <a class="menu-text" >团队申请加入<span>1</span></a>
							<ul class="sub-menu">
									<li class="level-2"><a href="function/apply"
										onclick="checkname($(this))" target="iframepage"><em>01</em>团队申请加入</a></li>
								</ul>
							</li>
						</c:if>
						<c:if test="${menu == '告警通知设置'}">
							<li id="four" class="matters level-1"><a class="menu-text" >告警通知设置<span>1</span></a>
							<ul class="sub-menu">
									<li class="level-2"><a href="function/warningNotice"
										onclick="checkname($(this))" target="iframepage"><em>01</em>告警通知设置</a></li>
								</ul>
							</li>
						</c:if>
						<c:if test="${menu == '用户管理'}">
							<li id="five" class="sign level-1"><a class="menu-text">用户管理<span>2</span></a>
								<ul class="sub-menu">
									<li class="level-2"><a href="function/application"
										onclick="checkname($(this))" target="iframepage"><em>01</em>申请审核</a></li>
									<li class="level-2"><a href="user/userManager"
										onclick="checkname($(this))" target="iframepage"><em>02</em>权限配置</a></li>
								</ul>
							</li>
						</c:if>
						
							
							
							
							
                         </c:forEach>
						</ul>
					</div>
				</div>
				<!-- <script type="text/javascript"
					src="resources/js/jquery.min.js"></script> -->
				<script type="text/javascript">
					$(document).ready(function() {
								// Store variables
								var accordion_head = $('.accordion > li > a'), accordion_body = $('.accordion li > .sub-menu');
								// Open the first tab on load
								accordion_head.first().addClass('active').next().slideDown('normal');
								// Click function
								accordion_head.on('click',function(event) {
								// Disable header links
								event.preventDefault();
								// Show and hide the tabs on click
								if ($(this).attr('class') != 'active') {
									accordion_body.slideUp('normal');
									$(this).next().stop(true,true).slideToggle('normal');
									accordion_head.removeClass('active');
									$(this).addClass('active');
								}
							});
					});
				</script>
				<!-- 导航结束 -->
			</div>

			<div class="main-content">
				<div class="breadcrumbs" id="breadcrumbs">
					<div class="breadcrumb1">
						<script type="text/javascript">
							try {
								ace.settings.check('breadcrumbs', 'fixed')
							} catch (e) {
							}
						</script>

						<ul class="breadcrumb">
							<li><i class="icon-home home-icon"></i> <span>菜单</span></li>

							<li class='active'>接口监测</li>
							<li class='active'>接口监测</li>

						</ul>
						<!-- .breadcrumb -->
					</div>
				</div>

				<div class="page-content">

					<!-- <iframe id="iframepage" onLoad="iFrameHeight()"
						src="employment/employment?params=totalretired"
						allowtransparency="true"
						style="width: 100%; height: 100%; border: 0px;" scrolling="no"></iframe> -->
					<iframe src="function/interfaceCheck" id="iframepage"
						name="iframepage" frameBorder=0 width="100%" height="620px;" scrolling="no"
						></iframe>
				
				</div>
				<!-- /.page-content -->
			</div>
		</div>
		<!-- /.main-container-inner -->
	</div>
	<!-- /.main-container -->

</body>
</html>