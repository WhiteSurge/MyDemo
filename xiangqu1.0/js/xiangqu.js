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

	//轮播图
	//定义初值
	var index =0;//图片的下标
	var imgs = $("#pics li");
	var len = $("#pics li").length;
	var wid = $("#pics li").eq(0).width();
	var timer;
	var gun = true;
	//鼠标划入图片时显示左右按钮
	$("#big_jpg").mouseenter(function(){
		//console.log("鼠标划入");
		gun = false;
		autoPlay();
		$("#pre_btn").animate({opacity:1},100);
		$("#next_btn").animate({opacity:1},100);
	})
	//鼠标划出图片时隐藏左右按钮
	$("#big_jpg").mouseleave(function(){
		//console.log("鼠标划出");
		gun = true;
		autoPlay();
		$("#pre_btn").animate({opacity:0},100);
		$("#next_btn").animate({opacity:0},100);
	})
	//图片轮播
	autoPlay();
	function autoPlay(){
		clearInterval(timer);
		//console.log("定时器判断结果："+gun);
		if(gun) {
			timer = setInterval(function(){
				index++;
				nextPic();
			},2000);
		}else{
			clearInterval(timer);
		}
	}
	function nextPic(){
		//用来控制下方滚动条滚到最右边时的情况
		if(index>len-2){
			$("#pic-bottom-btn").animate({left:0},0);
		}
		//当轮播图滚到最后一张的时候
		if(index>len-1){
			$("#pics").animate({left:0},0,function(){
				index=1;
				$("#pics").animate({left:-index * wid},300);
				$("#pic-bottom-btn").animate({left:index*154},300);
			});
		}
		//其他正常情况
		else{
			$("#pics").animate({left:-index * wid},300);
			//调节下方滚动条
			if(index<=len-2){
				$("#pic-bottom-btn").animate({left:index*154},300);
			}
		}
	}
	function prePic(){
		if(index < 0){
			$("#pic-bottom-btn").animate({left:4*154},300);
			$("#pics").animate({left:-(len-1) * wid},0,function(){
				index = len -2;
				$("#pics").animate({left:-index*wid},300);
				$("#pic-bottom-btn").animate({left:index*154},300);
			})
		}else{
			$("#pics").animate({left:-index*wid},300);
			$("#pic-bottom-btn").animate({left:index*154},300);
		}
	}
	//左右按钮点击事件
	$("#next_btn").click(function(){
		index++;
		nextPic();
		autoPlay();
	});
	$("#pre_btn").click(function(){
		index--;
		prePic();
		autoPlay();
	});

	//gotopeoplelike按钮
	//鼠标滑入滑出事件
	$("#goToPeopleLike").mouseenter(function(){
		$("#goToPeopleLike ins").animate({"margin-left":70},300)
	})
	$("#goToPeopleLike").mouseleave(function(){
		$("#goToPeopleLike ins").animate({"margin-left":41},300)
	})

	//喜欢栏点击滚动
	var timer2;
	var likeList = $(".peopleLikeItem");
	$("#likes_cont_top_right").click(function(){
		console.log("点击了右侧按钮");
		var nowLeft = $("#peopleLikeList").offset().left;
		if(nowLeft > -1200){
			console.log("向右移动");
			if(nowLeft-940<-1612 ){
				$("#peopleLikeList").animate({"left":-1612+"px"},800);
			} else {
				$("#peopleLikeList").animate({"left":nowLeft-940+"px"},500);
			}
		}
		autoLikePlay();
	});
	$("#likes_cont_top_left").click(function(){
		console.log("点击了左侧按钮");
		var nowLeft = $("#peopleLikeList").offset().left;
		if(nowLeft < 0){
			console.log("向左移动");
			if(nowLeft+940>0){
				$("#peopleLikeList").animate({"left":0+"px"},800);
			} else {
				$("#peopleLikeList").animate({"left":nowLeft+940+"px"},500);
			}
		}
		autoLikePlay();
	});
	//喜欢栏自动滚动
	autoLikePlay();
	function autoLikePlay(){
		clearInterval(timer2);
		timer2 = setInterval(function(){
			var oldLeft = $("#peopleLikeList").offset().left;
			if(oldLeft > -1400){
				//console.log(oldLeft);
				$("#peopleLikeList").animate({"left":oldLeft-410+"px"},1000);
			} 
		},4000)
	}
	//喜欢栏数据获取及动态创建
	$.ajax({
		type:"get",
		url:"json/like.json",
		success:function(data){
			$.each(data,function(i){
				var newLi = '<li class="peopleLikeItem"> <a class="peopleImg">'
					+'<img src='+data[i].user+'/>'
					+'</a> <dl>'
					+'<dt><span>'+data[i].name+'</span></dt>'
					+'<dd><span>'+data[i].time+'</span><i></i>喜欢了一个商品</dd> </dl>'
					+'<div class="itemImg"><img src='+data[i].item+'/></div> </li>';
				$("#peopleLikeList").append(newLi);

			})
		}
	})
	//设计师栏数据获取及动态创建
	$.ajax({
		type:"get",
		url:"json/designer.json",
		success:function(data){
			$.each(data,function(i){
				var newLi = '<li class="des_content"> <a class="des_show">'
					+'<img src ='+data[i].src+' /> </a> <p class="des_show_name">'
					+'<a>'+data[i].name+'</a> </p> </li>';
				$("#designer-right ul").append(newLi);
				var lastLi = '<li class="other"><a class="more"><span>更多<br/>设计师品牌</span></a></li>';
				if(i==data.length-1){
					$("#designer-right ul").append(lastLi);
				}
			})
		}
	});
	//设计师左部鼠标事件

	//手工栏数据获取及动态创建
	$.ajax({
		type:"get",
		url:"json/hand.json",
		success:function(data){
			$.each(data, function(i) {
				var newLi = '<li class="handmaker_item"><a class="hand-img" href="shangpin.html">'
					+'<img src='+data[i].img+'/></a> <p class="hand-txt">'
					+'<a>'+data[i].name+'</a>'
					+'<span><i>'+data[i].peo+'</i>人关注</span> </p>'
					+'<div class="hand-icon"><img src = '+data[i].logo+'/></div></li>';
				$("#handmaker_content ul").append(newLi);
				var lastLi = '<li class="hand-other"><a class="more"><span>更多<br/>手工艺人</span></a></li>';
				if(i==data.length-1){
					$("#handmaker_content ul").append(lastLi);
				}
			});
			hand_mouse();
		}
	});
	//手工栏鼠标滑入滑出事件
	function hand_mouse(){
		$.each($(".handmaker_item"), function(i) {
			$(".handmaker_item").eq(i).mouseenter(function(){
				$(this).find("img").css("opacity","0.85");
				$(".hand-icon").eq(i).css("display","block");
			});
		});
		$.each($(".handmaker_item"), function(i) {
			$(".handmaker_item").eq(i).mouseleave(function(){
				$(this).find("img").css("opacity","1");
				$(".hand-icon").eq(i).css("display","none");
			});
		})
	}


	//share分类栏
	$("#share-total").mouseenter(function(){
		console.log("鼠标进入监控区域");
		$("#share-total i").animate({"color":"#62BBC4"},500)
		//$("#share-total i").css("color","#62BBC4");
	})
	$("#share-total").mouseleave(function(){
		console.log("鼠标离开监控区域");
		$("#share-total i").animate({"color":"black"},500)
		//$("#share-total i").css("color","black");
	})
	//鼠标滑入选中分类栏
	$.each($(".share-btn"),function(i){
		//将选中的按钮修改样式
		$(".share-btn").eq(i).mouseenter(function(){
			//console.log("选中了按钮"+i)
			$(this).addClass("checkin");
			$(".point").eq(i).addClass("pointchange");
			$(".page").eq(i).removeClass("dispear");
			//将其他按钮变回未选中的样式
			$(this).parent().siblings().children().removeClass("checkin")
			$(".point").eq(i).siblings().removeClass("pointchange");
			$(".page").eq(i).siblings().addClass("dispear");
		})
	})
	//设置当前日期
	var nowdate = new Date();
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth()+1;
	var day = nowdate.getDate();
	$("#date span").html(year+" /"+month+" /"+day)

	
	//推荐商品数据获取
	$.ajax({
		type:"get",
		url:"json/recommend.json",
		success:function(data){
			var newLi = "<li><a><img/><h3></h3></a></li>";
			$.each(data,function(i){
				//console.log(i);
				$("#recommend-ul").append(newLi).addClass("recommend-item");
				$("#recommend-ul li").eq(i).find("img").attr("src",this.src);
				$("#recommend-ul li").eq(i).find("h3").html(this.title);
			})
			//推荐商品的鼠标滑入滑出事件
			$.each($("#recommend-ul li"),function(i){
				$("#recommend-ul li").eq(i).mouseenter(function(){
					$(this).find("h3").css({"background":"black","color":"white"});
					$(this).find("img").css({"opacity":"0.85"});
				})
				$("#recommend-ul li").eq(i).mouseleave(function(){
					$(this).find("h3").css({"background":"white","color":"#676767"});
					$(this).find("img").css({"opacity":"1"});
				})
			})
		}
	});
	//推荐商品的左右按钮
	$("#left-btn").click(function(){
		var ulLeft=$("#recommend-ul").offset().left;
		if(ulLeft<0){
		console.log("向左");
			$("#recommend-ul").animate({"left":$("#recommend-ul").offset().left+842+"px"},800);
		}
	})
	$("#right-btn").click(function(){
		var ulLeft=$("#recommend-ul").offset().left;
		if(ulLeft>-1100){
		console.log("向右");
			$("#recommend-ul").animate({"left":$("#recommend-ul").offset().left-1125+"px"},800);
		}
	})
	
	//猜你喜欢动态创建
	$.ajax({
		type:"get",
		url:"json/randomItem.json",
		success:function(data){
			$.each(data, function(i) {
				var newli = "<li><a><img/></a></li>";
				$("#yourlike").append(newli).addClass("random-item");
				$("#yourlike li").eq(i).find("img").attr("src",this.src);
				
			});
		}
	});
	
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
});