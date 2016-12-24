$(document).ready(function(){
	//自定义的搜索框提示
	$("#search").focus(function(){
		if($(this).val()=="搜索你感兴趣的品牌"){
			$(this).val("") ;
			$(this).removeClass("search_blur");
		}
	});
	$("#search").blur(function(){
		if($(this).val() == ""){
			$(this).addClass("search_blur");
			$(this).val("搜索你感兴趣的品牌") ;
		}
	});
	
	
	//导航栏的鼠标划入划出事件
	$("#nav ul li").each(function(){
		$(this).mouseenter(function(){
			$(this).children().css("border-bottom","3px solid black");
		});
		$(this).mouseleave(function(){
			$(this).children().css("border-bottom","");
		});
	});
	
	userExist();
	//获取浏览器的cookie值得到用户名并显示在top栏上方
	function userExist(){
		if(getCookie("username")==""){
			console.log("未登录状态-01");
		} else {
			var userName = getCookie("username");
			$("#login").parent().removeClass("active").addClass("dispear");
			$("#shopcar").parent().removeClass("dispear").addClass("active");
			$("#username").parent().removeClass("dispear").addClass("active");
			$("#username").html("用户 "+userName);
		}
	}
	//cookie获取函数
	function getCookie(key){
		var str = document.cookie;
		var list = str.split("; ");
		for(var i in list){
			var k = list[i].split("=")[0];
			if(k==key){
				return list[i].split("=")[1];
			}
		}
		return "";
	}
	
	//回到顶部
	$(window).scroll(function(){
		if($(window).scrollTop()>=100){
			$("#goTop").css("display","block");
		}else{
			$("#goTop").css("display","none");
		}
	})
	$("#goTop").click(function(){
		$("body").animate({"scrollTop":"0"},500);
	})
	
	//cookie获取函数
	function getCookie(key){
		var str = document.cookie;
		var list = str.split("; ");
		for(var i in list){
			var k = list[i].split("=")[0];
			if(k==key){
				return list[i].split("=")[1];
			}
		}
		return "";
	}
})
