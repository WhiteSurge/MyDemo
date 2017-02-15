mui.init();

//读取本地存储的任务数据并动态加载出来
(function showAllBill(){
	//获取当前日期
	var date = new Date();
	var year = date.getFullYear();
	var month1 = date.getMonth()+1;
	var day = date.getDate();
	month = month1>9?month1:"0"+month1;
	day = day>9?day:"0"+day;
	var today = month+"月"+day+"日"
	//顶部显示本月
	$("#bill-title-year").html(year);
	$("#bill-title-month").html(month1);
    //计算总价
    var sumIn = 0;
    var sumOut = 0;
	var bill = JSON.parse(localStorage.getItem("bill"));
	//保存每次记账日期的数组
	var dateList = [];
	
	//遍历数据
	$.each(bill, function(i){
		//进行顶部的每月总价计算
		//按月区分，与本月月份相同的进行计算
		var thisDate = $(bill).eq(i)[0].date;
		var dateArr = thisDate.split("/");
		if(dateArr[0]==year&&dateArr[1]==month1){
			if($(bill).eq(i)[0].type){
			    sumIn += Number($(bill).eq(i)[0].money); 
		    }else{
			    sumOut += Number($(bill).eq(i)[0].money);
		    }
		}
		
		//账单标题
		//设置一个参数用来判断该日期是否已经存在于数组之中
		var isNewDate = true; 
		//遍历日期数组，如果无相同内容则添加
		$.each(dateList,function(j){
			if(dateList[j]==thisDate){
				isNewDate = false;
			}
		})
		//是新日期，添加到日期数组中，
		if(isNewDate){
			dateList.push(thisDate);
			//将日期数组按照日期大小从大到小排序
			for(var x = 0; x<dateList.length-1; x++){
			    for(var y = 0; y<dateList.length-1-x; y++){
				    if(dateList[y]<dateList[y+1]){
					    var temp = dateList[y+1];
					    dateList[y+1] = dateList[y];
					    dateList[y] = temp;
					}
				}
			}
		} 
		
		var div01 = '<div class="bill-today-title"><span class="bill-today-date">'
		+$(bill).eq(i)[0].date+'</span><span class="bill-tody-money">'
		//分收入和支出两种情况
		var div02 = $(bill).eq(i)[0].type?'<span class="bill-today-in">收入：<i>'+$(bill).eq(i)[0].money
		+'</i></span></span></div>':'<span class="bill-today-out">支出：<i>'+$(bill).eq(i)[0].money
		+'</i></span></span></div>';
		
		//账单列表详情
		var div1 = '<div class="bill-card">'
		+'<i class="bill-logo '+$(bill).eq(i)[0].logo+'"></i><div class="bill-card-text">';
		//分有备注和无备注两种情况
		var div2 =$(bill).eq(i)[0].text==""?'<span class="bill-name bill-name-only">'+$(bill).eq(i)[0].name+'</span></div>'
		+'<span class="bill-money bill-money-out">'+$(bill).eq(i)[0].money+'</span></div>':'<span class="bill-name">'+$(bill).eq(i)[0].name+'</span>'
		+'<p class="bill-tip">'+$(bill).eq(i)[0].text+'</p></div>'
		+'<span class="bill-money bill-money-out">'+$(bill).eq(i)[0].money+'</span></div>';
		
		//带标题栏
		var div =div01+div02+ div1 + div2;
		//不带标题栏
		var div0 = div1 + div2;
		
		$("#bill-content").append($(div));
	});
	
	//将总价显示到页面上
	$("#moneyInSum").html(sumIn);
	$("#moneyOutSum").html(sumOut);
	
	//点击对应的卡片进入详情页面
	$.each($(".bill-card"), function(i){
		$(".bill-card")[i].addEventListener("tap",function(){
			mui.openWindow({
				url: 'detail_bill.html', 
				id:'detail_bill',
				waiting:{
					autoShow:true
				},
				extras:{
					num:i
				}
			});
		})
	});
})()

//创建新的任务
var addbill = document.getElementById("add_bill")
addbill.addEventListener("tap",function(){
	mui.openWindow({
		url: 'new_bill.html', 
		id:'new_bill',
		waiting:{
			autoShow:false
		}
	});
})	


