$(document).ready(function(){
	//商品数量按钮的点击事件
	function numBtn(){
		var list = $(".td4");
		$.each(list, function(i) {
			var thisInput = list.eq(i).find("input");
			thisInput.blur(function(){
				if(!/^\d$/.test(list.eq(i).find("input").val())){
					list.eq(i).find("input").val(1);
				}
			})
			list.eq(i).find(".sub").click(function(){
				if(list.eq(i).find("input").val()>1){
					list.eq(i).find("input").val(Number(list.eq(i).find("input").val())-1);
				} else {
					list.eq(i).find("input").val(1);
				}
				shoppingNum();
				shoppingPrice();
				//修改cookie中的商品数量
				var cookie = getCookie("comMessage");
				var cookieList = cookie.split("&&");
				$.each(cookieList,function(j){
					if(i==j){
						var thisCookie = eval("("+cookieList[j]+")");
						thisCookie.comNum = list.eq(i).find("input").val();
						var thiscookie = JSON.stringify(thisCookie);
						cookieList.splice(j,1,thiscookie);
						console.log("cookie"+cookieList);
						if(cookieList.length>1){
							cookie = cookieList.join("&&");
							setCookie("comMessage",cookie);
						} else if(cookieList.length == 1){
							cookie = String(cookieList);
							setCookie("comMessage",cookie);
						} else {
							setCookie("comMessage","");
						}
					}
				})
			});

			list.eq(i).find(".add").click(function(){
				list.eq(i).find("input").val(Number(list.eq(i).find("input").val())+1);
				shoppingNum();
				shoppingPrice();
				//修改cookie中的商品数量
				var cookie = getCookie("comMessage");
				var cookieList = cookie.split("&&");
				$.each(cookieList,function(j){
					if(i==j){
						var thisCookie = eval("("+cookieList[j]+")");
						thisCookie.comNum = list.eq(i).find("input").val();
						var thiscookie = JSON.stringify(thisCookie);
						cookieList.splice(j,1,thiscookie);
						console.log("cookie"+cookieList);
						if(cookieList.length>1){
							cookie = cookieList.join("&&");
							setCookie("comMessage",cookie);
						} else if(cookieList.length == 1){
							cookie = String(cookieList);
							setCookie("comMessage",cookie);
						} else {
							setCookie("comMessage","");
						}
					}
				})
			})
		});
	}



	
	//单件商品删除按钮点击事件
	function singleDel(){
		$.each($(".td6"), function(j){
			$(".td6").eq(j).click(function(){
				var res = confirm("你确定要删除该商品吗?");
				if(res){
					var thisParent = $(this).parents("ul");//在删除该元素之前要先用一个变量把其父元素保存起来，否则删除后再调用将无法找到。
					$(this).parents("li").remove();
					//清除cookie
					var cookie = getCookie("comMessage");
					var cookieList = cookie.split("&&");
					$.each(cookieList,function(i){
						if(i==j){
							cookieList.splice(i,1);
							if(cookieList.length>1){
								cookie = cookieList.join("&&");
								setCookie("comMessage",cookie);
							} else if(cookieList.length == 1){
								cookie = String(cookieList);
								setCookie("comMessage",cookie);
							} else {
								setCookie("comMessage","");
							}
						}
					})

					//list.eq(j).remove();//删除某一项商品的同时，将商品数量按钮的事件用到的数组对应的那一项也删除，避免出现删除某一项后修改其他商品数量出现bug
					//如果一个店主的所有商品都删掉了则清空这个店家
					if(thisParent.find("li").length == 1){
						thisParent.remove();
					}
					//如果所有商品都清空了则清除所有元素，并显示购物车为空
					if($(".choose-bottom").length == 0){
						$("#choose-title").remove();
						$("#footer").remove();
						$("#footer-btn").remove();
						$("#empty").css("display","block")
					} else {
						$("#empty").css("display","none");
					}
					shoppingNum();
					shoppingPrice();
				}
			})
		});
	}


	//底部删除
	function footDel(){
		$("#foot-del").click(function(){
			var hasChoose = 0;
			$.each($(".singlechoose"), function(i) {
				if($(this).attr("choose") == "true"){
					hasChoose++;
				}
			});
			if(hasChoose==0){
				alert("请选择商品！");
			} else {
				var res = confirm("你确定要删除选中的商品吗?");
				if(res){
					$.each($(".singlechoose"), function(j) {
						var thisLi = $(this).parents("li");
						var thisUl = $(this).parents("ul");
						if($(this).attr("choose") == "true"){
							thisLi.remove();

							//清除cookie
							var cookie = getCookie("comMessage");
							var cookieList = cookie.split("&&");
							$.each(cookieList,function(i){
								if(i==j){
									cookieList.splice(i,1);
									if(cookieList.length>1){
										cookie = cookieList.join("&&");
										setCookie("comMessage",cookie);
									} else if(cookieList.length == 1){
										cookie = String(cookieList);
										setCookie("comMessage",cookie);
									} else {
										setCookie("comMessage","");
									}
								}
							})

							//如果一个店主的所有商品都删掉了则清空这个店家
							if(thisUl.find("li").length == 1){
								thisUl.remove();
							}
							//如果所有商品都清空了则清除所有元素，并显示购物车为空
							if($(".choose-bottom").length == 0){
								$("#choose-title").remove();
								$("#footer").remove();
								$("#footer-btn").remove();
								$("#empty").css("display","block")
							} else {
								$("#empty").css("display","none");
							}
							shoppingNum();
							shoppingPrice();
						}
					});
				}
			}
		})
	}

	
	/*
	 * 注意：要找准作用域，某个事件的发生是基于那个事件之下的要找准确，否则很难写出正确的结果。
	 * 比如这里的点击某单选按钮取消了一个选中按钮，全选按钮这时应该为取消状态，而这个事件应该加在普通按钮的点击事件中，而不是
	 * 全选按钮的点击事件中。
	 * 
	 * 另：灵活使用面向对象思想编程，思路清晰，更简单
	 */
	
	//单选按钮
	function singleBtn(){
		$.each($(".choose-i"), function(i) {
			$(".choose-i").eq(i).click(function(){
				//点击时判断，如果选中则取消，否则选中；令选中属性choose的值随选中状态变化
				if($(this).attr("choose")=="true"){
					$(this).removeClass("choose-i2");
					$(this).attr("choose","false");
					//console.log("取消");

				} else {
					$(this).addClass("choose-i2");
					$(this).attr("choose","true");
					//console.log("选中");
				}

				//部分选中按钮的状态修改
				$.each($(".partchoose"),function(){
					//在part按钮选中的情况下，如果其作用范围内的单选按钮有一取消，该part按钮也取消
					var partChoose = $(this).parents("ul").find(".singlechoose");
					var _this = $(this);
					var partNum = 0;//part按钮作用范围内选中状态的按钮数量
					if($(this).attr("choose")=="true"){
						$.each(partChoose,function(){
							if($(this).attr("choose")=="false"){
								_this.attr("choose","false");
								_this.removeClass("choose-i2");
							}
						})
					}
					else {
						$.each(partChoose,function(){
							if($(this).attr("choose")=="true"){
								partNum++;
							}
						});
						if(partNum == partChoose.length){
							_this.attr("choose","true");
							_this.addClass("choose-i2");
						}
					}
				})

				//判断此时是否是全选状态
				var allNum = 0;
				$.each($(".singlechoose"), function() {
					if($(this).attr("choose") == "true"){
						allNum++;
					}
				});
				if(allNum == $(".singlechoose").length){
					allchoose = true;
				} else {
					allchoose = false;
				}

				//根据是否是全选状态进行全选按钮的调整
				if(!allchoose){
					$.each($(".allchoose"), function(i) {
						$(this).attr("choose","false");
						$(this).removeClass("choose-i2");
					});
				} else {
					$.each($(".allchoose"), function(i) {
						$(this).attr("choose","true");
						$(this).addClass("choose-i2");
					});
				}

				shoppingNum();
				shoppingPrice();
			});
		});
	}

	//全选按钮   
	var allchoose = false;//定义变量allchoose来控制多选
	//点击全选按钮时进行判断
	function allBtn(){
		$.each($(".allchoose"), function(i) {
			$(".allchoose").eq(i).click(function(){
				//点击时判断，全局范围内存在未选中的，则全部选中，否则全部取消
				var allNum = 0;
				var _this = $(this);
				$.each($(".singlechoose"), function() {
					if($(this).attr("choose")=="true"){
						allNum ++;
					}
				});
				//已经全部选中了：全部取消
				if(allNum == $(".singlechoose").length){
					$.each($(".choose-i"), function() {
						$(this).removeClass("choose-i2");
						$(this).attr("choose","false");
					});
					allchoose = false;
				}
				//存在未选中的：全部选中
				else {
					$.each($(".choose-i"), function() {
						$(this).addClass("choose-i2");
						$(this).attr("choose","true");
					});
					allchoose = true;
				}

				shoppingNum();
				shoppingPrice();
			});
		});
	}

		
	//部分选中按钮点击事件
	function partBtn(){
		$.each($(".partchoose"),function(i){
			$(".partchoose").eq(i).click(function(){
				//找到部分选中按钮的作用范围
				var _this=$(this);
				var partChoose = $(this).parents("ul").find(".singlechoose");
				//点击时判断，作用范围内存在未选中的，则全部选中，否则全部取消
				var partNum = 0;//part按钮作用范围内选中状态的按钮数量
				var partBtn = 0;//part按钮选中状态的数量，用于判断是否改变全选按钮的状态
				$.each(partChoose, function() {
					if($(this).attr("choose")=="true"){
						partNum ++;
					}
				});
				//全部选中了：全部取消
				if(partNum == partChoose.length){
					_this.removeClass("choose-i2");
					_this.attr("choose","false");
					$.each(partChoose, function() {
						$(this).removeClass("choose-i2");
						$(this).attr("choose","false");
					});

					//全选如果存在也取消
					allchoose = false
				}
				//存在未选中的：全部选中
				else {
					_this.addClass("choose-i2");
					_this.attr("choose","true");
					$.each(partChoose, function() {
						$(this).addClass("choose-i2");
						$(this).attr("choose","true");
					});
				}

				//点击判断，如果所有的part按钮都被选中时，全选开启，否则全选关闭
				$.each($(".partchoose"), function() {
					if($(this).attr("choose")=="true"){
						partBtn ++;
					}
				});
				//全选开启：
				if(partBtn == $(".partchoose").length){
					allchoose = true;
				} else {
					allchoose = false;
				}
				//根据是否是全选状态进行全选按钮的调整
				if(!allchoose){
					$.each($(".allchoose"), function(i) {
						$(this).attr("choose","false");
						$(this).removeClass("choose-i2");
					});
				} else {
					$.each($(".allchoose"), function(i) {
						$(this).attr("choose","true");
						$(this).addClass("choose-i2");
					});
				}

				shoppingNum();
				shoppingPrice();
			});
		});
	}

	

	
	//统计商品数量
	function shoppingNum(){
		var shopNum = 0;
		$.each($(".singlechoose"), function(i) {
			var thisNum = $(this).parents("li").find(".td4 input").val();
			console.log(thisNum);
			if($(this).attr("choose") == "true"){
				shopNum += Number(thisNum);
			}
		});
		$("#foot-choosed em").html(shopNum);
	}
	
	//统计商品总价
	function shoppingPrice(){
		var allPrice = 0;
		$.each($(".singlechoose"), function(i) {
			var thisPrice = $(this).parents("li").find(".td5").html();
			var thisNum = $(this).parents("li").find(".td4 input").val();
			if($(this).attr("choose") == "true"){
				var thisAllPrice = Number(thisPrice)*Number(thisNum);
				allPrice += thisAllPrice;		
			}
		});
		$("#foot-count span em").html(allPrice+".00");
	}

	/*
	下面开始调用json数据动态生成标签
	由于没有远程服务器进行数据传递，采用cookie本地存储数据充当，进行数据的调用
	*/

	//先读取cookie值
	var message = getCookie("comMessage");
	if(message == ""){
		$("#empty").css("display","block");
	}
	//如果cookie值不为空执行下方代码
	else{
		$("#empty").css("display","none");


		//先将cookie分割成数组，遍历cookie数据，将数据读取出来并动态添加到页面上
		var messageList = message.split("&&");
		//用来存储分享栏，有几个就创建几个分享栏
		//var designerList = new Array();

		$.each(messageList,function(i){
			var oMessage = eval("("+messageList[i]+")");
			//var comDesigner = oMessage.comDesigner;
			//designerList.push(comDesigner);
			var imgsrc = oMessage.imgsrc;
			var comName = oMessage.comName;
			var comNum = oMessage.comNum;
			var comPrice = oMessage.comPrice;
			var colorType = oMessage.colorType;

			//var tableCenter = '<ul class="table-center">'
			//	+'<li class="choose-top">'
			//	+'<i class="choose-i partchoose" choose="false"></i>'
			//	+'<span class="chooseTitle-span">分享人:'+comDesigner+'</span>'
			//	+'</li>'
			//	+'</ul>';

			var chooseBottom = '<li class="choose-bottom">'
				+'<table> <tr> <td class="td0"> <i class="choose-i  singlechoose" choose="false"></i> </td> <td class="td1">'
				+'<a href="shangpin.html">'
				+'<img src="'+imgsrc+'"/>'
				+'</a> </td> <td class="td2">'
				+'<a href="shangpin.html">'+comName+'</a>'
				+'</td> <td class="td3"> <p class="font-light fz14" >颜色分类:'+colorType+'</p>'
				+'</td> <td class="td4"> <div class="numEditor"> <button class="sub">-</button> '
				+'<input type="text" value="'+comNum+'"/>'
				+'<button class="add">+</button>'
				+'</div> </td> <td class="td5" >'+comPrice+'</td>'
				+'<td class="td6 del"><a>删除</a></td> </tr> </table> </li>';

			var chooseTitle = '<ul id="choose-title" class="clearfix">'
				+'<li>'
				+'<i class="choose-i allchoose" choose="false"></i>'
				+'<span class="chooseTitle-span">全选</span>'
				+'</li>'
				+'<li id="comMessage">商品信息</li>'
				+'<li id="comNumber">数量</li>'
				+'<li id="comPrice">金额（元）</li>'
				+'<li id="comOperation">操作</li>'
				+'</ul>';

			var footer = '<div id="footer" class="clearfix"> <i class="choose-i allchoose" choose="false"></i> <span id="foot-allchoose">全选</span> <span id="foot-del" class="del"><a>删除</a></span>'
				+'<span id="foot-choosed">已选商品<em>0</em>件</span> <span id="foot-count">合计（不计含运费）： <span>￥<em>0.00</em></span> </span> </div>';

			var footerBtn = '<div id="footer-btn"> <div id="checkout-btn">购物车结算</div> </div>';

			if(i==0){
				//添加首部标签
				$("#box").append(chooseTitle);
			}

			$("#box").append(chooseBottom)

			if(i==messageList.length-1){
				$("#box").append(footer);
				$("#box").append(footerBtn);
				numBtn();
				singleBtn();
				partBtn();
				allBtn();
				singleDel();
				footDel();
			}
		});


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
	//cookie添加函数
	function setCookie(key,value,days,path){
		var now = new Date();
		now.setDate( now.getDate()+days );
		document.cookie = key+"="+value+";expires="+now+";path="+(path||"");
	}

})
