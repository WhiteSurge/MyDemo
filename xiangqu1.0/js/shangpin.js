$(document).ready(function(){
	//商品喜欢按钮的点击事件
	var liked = false;
	$("#shop-content-like i").click(function(){
		if(liked){
			$("#shop-content-like i").removeClass("shop-likechange");
			liked = false;
			$("#shop-content-like span").html(Number($("#shop-content-like span").html())-1);
		} else {
			$("#shop-content-like i").addClass("shop-likechange");
			liked = true;
			$("#shop-content-like span").html(Number($("#shop-content-like span").html())+1)
		}
	})
	//商品颜色种类按钮的点击事件
	var colorType = "";
	$.each($("#btn_ul li"), function(i) {
		$("#btn_ul li").eq(i).click(function(){
			$("#btn_ul li").eq(i).siblings().removeClass("btnChoose");
			$("#btn_ul li").eq(i).addClass("btnChoose");
			colorType = $("#btn_ul li").eq(i).html();
		})
	});
	//商品数量文本框
	$("#num-btn input").val(1);
	$("#num-btn input").blur(function(){
		if(parseInt($("#num-btn input").val())==NaN || $("#num-btn input").val() == "NaN"){
			$("#num-btn input").val(1);
		} else if($("#num-btn input").val()<=0) {
			$("#num-btn input").val(1);
		} else {
			$("#num-btn input").val(parseInt($("#num-btn input").val()));
		}

	})
	//商品数量按钮的点击事件
	$.each($("#num-btn button"), function(i) {
		$("#num-btn button").eq(i).click(function(){
			if(i==0){
				if($("#num-btn input").val()>1){
					$("#num-btn input").val(Number($("#num-btn input").val())-1);
				} else {
					$("#num-btn input").val(1);
				}
			} else {
				$("#num-btn input").val(Number($("#num-btn input").val())+1);
			}
		})
	});
	//加入购物车按钮点击事件
	$("#btn2").click(function(){
		if(colorType==""){
			$("#wrong").css("display","block");
			setTimeout(function(){
				$("#wrong").css("display","none");
			},2000)
		} else {
			$("#success").css("display","block");
			setTimeout(function(){
				$("#success").css("display","none");
			},2000);

			comMessageCookie();
		}
	})
	
	//商品信息上传
	function comMessageCookie(){
		var comDesigner =$("#shop-title-right h2").html();
		var commodityNum = $("#num-btn input").val();
		var commodityName = $("#shop-content-right h2").html();
		var imgsrc = $("#shop-content-left img").attr("src");
		var commodityPrice = $("#shop-content-right h1 span").html();
		//将商品信息拼接车成字符串存储起来
		var comMessage = "{'comName':'"+commodityName+"','colorType':'"+colorType+"','comNum':'"+commodityNum+"','imgsrc':'"+imgsrc+"','comPrice':'"+commodityPrice+"','comDesigner':'"+comDesigner+"'}";
		//如果是第一次存入则直接存入cookie
		if(getCookie("comMessage")==""){
			setCookie("comMessage",comMessage);
		} else {  //如果不是第一次存入，要先将之前的cookie取出后进行拼接再存入，避免覆盖
			console.log("不是第一次存入，先取出原有cookie");
			var newMessage = eval("("+comMessage+")");//当前要添加的商品信息，转换成json对象
			var isNewOne = true;//定义新变量判断是否为新的内容
			//如果cookie中只含有一个商品信息，则直接取出该信息，之后进行添加信息是否为新的判断
			if(getCookie("comMessage").indexOf("&&")==-1){
				console.log("cookie中只含有一个商品信息");
				var oldMessage = eval("("+getCookie("comMessage")+")");
				console.log(oldMessage);
				//当商品名称和商品颜色类别都相同时判定为相同商品，isNewOne = false
				if(oldMessage.comName == newMessage.comName && oldMessage.colorType == newMessage.colorType){
					console.log("商品已存在，修改商品数量")
					//isNewOne = false;
					//并将原商品信息中的数量进行修改
					oldMessage.comNum =String(Number(newMessage.comNum) +  Number(oldMessage.comNum));
					//将修改后的商品信息添加到cookie中
					oldMessage = JSON.stringify(oldMessage);
					setCookie("comMessage",oldMessage);
				}
				//不是相同的商品，则添加一件新商品
				else{
					console.log("商品不存在，添加新商品信息");
					comMessage = getCookie("comMessage")+"&&"+comMessage;
					setCookie("comMessage",comMessage);
				}
			}
			//cookie中的商品数量大于1时，先将取出的cookie进行分割，变成数组后遍历，找到是否有与添加商品一样的商品信息
			else {
				console.log(getCookie("comMessage"));
				var oldMessage2 = getCookie("comMessage").split("&&");
				console.log(oldMessage2);
				$.each(oldMessage2, function(i) {
					var thisList = oldMessage2[i];
					var _this = eval("("+thisList+")");
					console.log("多个商品，进行遍历：")
					//有相同信息，判断为旧信息，修改原值中的数量信息
					if(_this.comName == newMessage.comName && _this.colorType == newMessage.colorType){
						console.log("有相同信息，修改数量")
						isNewOne = false;
						_this.comNum = String(Number(_this.comNum)+Number(newMessage.comNum));
						//修改之后再将其保存在数组中
						oldMessage2[i] =JSON.stringify(_this);
						console.log("原数组修改了吗？"+oldMessage2);
					}
				});
				if(isNewOne){
					console.log("多个商品，添加新商品")
					comMessage = getCookie("comMessage")+"&&"+comMessage;
					setCookie("comMessage",comMessage);
				}else{
					console.log("多个商品，修改商品数量")
					oldMessage2 = oldMessage2.join("&&");
					console.log(oldMessage2)
					setCookie("comMessage",oldMessage2);
				}
			}

		}
	}
	
	//商品详情和评论按钮的点击事件
	$.each($("#xiangqing-title span"), function(i) {
		$("#xiangqing-title span").eq(i).click(function(){
			if(i==0){
				$("#xiangqing-title i").css("left","25px");
				$("#more").css("display","block");
				$("#talk").css("display","none");
			} else {
				$("#xiangqing-title i").css("left","135px");
				$("#more").css("display","none");
				$("#talk").css("display","block");
			}
		})
	});
	
	//获取商品详情信息
	$.ajax({
		type:"get",
		url:"json/shangpin.json",
		success:function(data){
			$.each(data,function(i){
				var otxt = data[0].txt;
				$("#more").append("<h3></h3>").html(otxt);
				$.each(data[0].imgsrc, function(j) {
					var oimg = "<img src='"+this.src+"'/>";
					$("#more").append(oimg);
				});
			})
		}
	})
	
	//评论
	$("#talk textarea").focus(function(){
		$("#talk textarea").val("");
	})
	$("#talk-btn").click(function(){
		var talkText = $("#talk textarea").val();
		var userName = getCookie("username");
		var newLi = "<li class='talk-li'><img src='img/touxiang.jpg'/><div><span>"+userName+"</span><p>"+talkText+"</p></div></li>";
		$("#talk-txt").prepend(newLi);
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
	//cookie添加函数
	function setCookie(key,value,days,path){
		var now = new Date();
		now.setDate( now.getDate()+days );
		document.cookie = key+"="+value+";expires="+now+";path="+(path||"");
	}
	
})