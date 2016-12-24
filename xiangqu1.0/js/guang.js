$(document).ready(function(){
	var picToNum = 14;
	var picOkNum = 0;
	//获取瀑布流的json数据
	$.ajax({
		type:"get",
		url:"json/guang.json",
		success:function(data){
			$.each(data, function(i) {
				//动态创建标签
				var newDiv = "<div class='fall-item'><div class='fall-img'>" +
					"<a><img src="+data[i].src+"/></a></div><div class='fall-txt'><p></p><div>" +
					"<span>"+data[i].price+"</span><i></i><em>"+data[i].like+"</em></div>" +
					"<dl><dt>"+data[i].name+"</dt><dd>"+data[i].type1+"</dd>" +
					"<dd style='margin-left: 20px'>"+data[i].type2+"</dd></dl></div></div>"
				//console.log(i);
				$("#fallwater-content").append(newDiv);
				$("#fallwater-content .fall-img").eq(i).find("img").css("height",this.height);

				//当循环到下标为14时停止当前循环，即只加载15张图片
				if(i>=picToNum){
					return false;
				}
			});
			//在ajax获取所有数据成功之后进行瀑布流布局
			waterfall();
			
		}
	});
	
	//在鼠标向下滚动的时候，当滚动到底部时进行加载
	window.onscroll = function(){
		if(scrollside()){
		//满足滚动条件后进行数据修改
		if(picToNum >= 35){
			picToNum = 35;
		} else {
			picOkNum = picToNum;
			picToNum += 5;
		}
		console.log("正在加载图片,上次加载到："+picOkNum+"，本次要加载到："+picToNum);
			$.ajax({
				type:"get",
				url:"json/guang.json",
				success:function(data){
					$(data).each(function(i) {
						if(i>picOkNum){
							//动态创建标签
							var newDiv = "<div class='fall-item'><div class='fall-img'><a><img/></a></div><div class='fall-txt'><p></p><div><span></span><i></i><em></em></div><dl><dt></dt><dd></dd><dd style='margin-left: 20px'></dd></dl></div></div>"
							//console.log(i);
							$("#fallwater-content").append(newDiv);
							$("#fallwater-content .fall-img").eq(i).find("img").attr("src",this.src).css("width","290px");
							$("#fallwater-content .fall-img").eq(i).find("img").css("height",this.height);
							$("#fallwater-content .fall-txt").eq(i).find("span").html(this.price);
							$("#fallwater-content .fall-txt").eq(i).find("em").html(this.like);
							$("#fallwater-content .fall-txt").eq(i).find("dt").html(this.name);
							$("#fallwater-content .fall-txt").eq(i).find("dd").eq(0).html(this.type1);
							$("#fallwater-content .fall-txt").eq(i).find("dd").eq(1).html(this.type2);
							//当循环到下标为14时停止当前循环，即只加载15张图片
							if(i>=picToNum){
								return false;
							}
						}
					});
					//在ajax获取所有数据成功之后进行瀑布流布局
					waterfall();
				}
			});
		}
		//判断界面是否滚到底部
		function scrollside(){
			var box = $("#fallwater-content").children(".fall-item");
			//找到最后一张图片的底部位置（内容高度）：
			var lastHeight = box.last().get(0).offsetTop+Math.floor(box.last().height());
			//浏览器页面的可见高度
			var documentHeight = $(window).height();
			//滚动条滚动的距离（滚动高度）：
			var scrollHeight = $(document).scrollTop();
			//console.log(documentHeight+scrollHeight)
			//console.log("底部的边界："+lastHeight);
			return (lastHeight<documentHeight+scrollHeight)?true:false;
		}
	}
	
	/*
	 * 		瀑布流出现的问题：ajax动态加载图片后再调用瀑布流函数，会由于ajax已经将图片加载完成了导致瀑布流函数无效的现象，
	 * 而将瀑布流函数写在ajax内部时则由于img还没有动态加载完成，导致获取到的元素高度不准确的现象，这也导致无法成功显示
	 * 瀑布流效果。
	 * 		暂时的解决思路：1.在ajax加载的过程中直接进行瀑布流排列，而不是先进行布局再写瀑布流。。目前没有什么思路
	 * 2.取消采用ajax动态生成图片的方式，采用在HTML文件中直接写入的方式，之后再调用瀑布流函数进行布局。
	 * 		终极解决方案：在json文件中写上图片的高度属性，即可得到正确的高度
	 */
	
	//流式布局主函数;
	function waterfall (imgH) {
	    //获取所有瀑布元素集合的数组;
	    var $boxs=$("#fallwater-content").children(".fall-item");
	    //设置一个数组用来存储每一列的总高度
	    var hArr=[];
	    //获取每一列的宽度（固定值）;
	    //outerWidth()获取包含padding和border在内的宽度，true包括margin在内的宽度;
	    var w=$boxs.eq(0).outerWidth(true);
	    //$boxs.eq(0).width()  只能获取给元素定义的宽度;
	    //获取列数（这里可以设置固定值，或随着网页宽度变化而变化的可变值）;
	    //Math.floor($(window).width()/w);
	    var cols=3;
	    //遍历每一个瀑布元素;
	    //找到之前所有元素的最低点,然后将本元素位置放到最低点的下面;
	    $.each($boxs,function(index){
	        //定义每一个瀑布元素的高度
	        var h=$boxs.eq(index).outerHeight(true);
	        //console.log("每一个瀑布元素的高度："+h);  //这里出现了问题
	        //设置每个瀑布元素的位置
	        if(index<cols){
		        //设置每一列的高度,存入hArr中
		        hArr[index]=h;
		        //console.log("高度数组："+hArr);
		        //设置第一行元素的位置
		        $boxs.eq(index).css({"position":"absolute","top":0,"left":index*w+"px"});
	        } else{
	        	//console.log("打印每一列高度的数组："+hArr);
	        	//获取数组hArr中的最小值
		        var minH = hArr[0];
		        for(var i in hArr){
		        	minH = minH<hArr[i]?minH:hArr[i];
		        }
		        //console.log("最小高度为："+minH);
	            //得到最小高度对应的下标值 :$.inArray()方法得出元素(minH)在数组(hArr)中的index值;
	            var minIndex = $.inArray(minH,hArr);
		        $boxs.eq(index).css({"position":"absolute","top":minH,"left":minIndex*w+"px"});
		        //修改数组hArr对应的值
		        hArr[minIndex] = hArr[minIndex]+$boxs.eq(index).outerHeight(true);
	        }
	    });
	};
	
})