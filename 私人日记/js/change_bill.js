mui.init({
	swipeBack:true, //启用右滑关闭功能
});

//显示当前日期
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
(function showAllBill(){
	//获取当前日期
	var today = year+"/"+month+"/"+day
	$("#bill_date").val(today)
})()

var bill = JSON.parse(localStorage.getItem("bill"));
var thisNum = "";
//将内容加载显示出来
mui.plusReady(function() {  
    var self = plus.webview.currentWebview();  
	thisNum = self.num;
	//修改选中的logo
	$("#bill_type").children().remove();
	var i = "<i class='"+bill[thisNum].logo+" bill_logo'></i>";
	var span = "<span class='bill_text'>"+bill[thisNum].name+"</span>"
	$("#bill_type").append(i);
	$("#bill_type").append(span);
	//修改金额
	$("#bill_money").val(bill[thisNum].money);
	//修改日期
	$("#bill_date").val(bill[thisNum].date);
	//修改备注
	$("#beizhu").val(bill[thisNum].text)
});  	

var old_back = mui.back;
(function(mui) {
	//重写返回键
	mui.back = function(){
		var btn = ["确定","取消"];
  		mui.confirm('账单没有保存，确认返回？','放弃保存？',btn,function(e){
    		if(e.index==0){
    			//执行mui封装好的窗口关闭逻辑；
    			old_back();
   	 		}
  		});
	}
})(mui);

var btnIn = document.getElementById("btnbillin");
var btnOut = document.getElementById("btnbillout");
//设置一个变量用来存储支出还是收入
var moneyIn = false;
//点击收入按钮
btnIn.addEventListener("tap",function(){
	moneyIn = true;
	$("#btnbillout").removeClass("btn_choose");
	$("#btnbillin").addClass("btn_choose");
	$("#bill_out_icons").addClass("disappear");
	$("#bill_in_icons").removeClass("disappear");
	//修改选中的logo
	$("#bill_type").children().remove();
	var i = "<i class='iconfont icon-wodegongzi bill_logo'></i>";
	var span = "<span class='bill_text'>工资</span>"
	$("#bill_type").append(i);
	$("#bill_type").append(span)
})
//点击支出按钮
btnOut.addEventListener("tap",function(){
	moneyIn = false;
	$("#btnbillin").removeClass("btn_choose");
	$("#btnbillout").addClass("btn_choose");
	$("#bill_in_icons").addClass("disappear");
	$("#bill_out_icons").removeClass("disappear");
	//修改选中的logo
	$("#bill_type").children().remove();
	var i = "<i class='iconfont icon-daocha bill_logo'></i>";
	var span = "<span class='bill_text'>用餐</span>"
	$("#bill_type").append(i);
	$("#bill_type").append(span)
})

//点击图标获取内容
var outIcons = document.getElementById("bill_out_icons");
outIcons.addEventListener("tap",function(e){
	var logo = e.target;
	var newclass = $(logo).attr("class");
	var newtext = $(logo).text();
	$("#bill_type").children().remove();
	var i = "<i class='"+newclass+" bill_logo'></i>";
	var span = "<span class='bill_text'>"+newtext+"</span>"
	$("#bill_type").append(i);
	$("#bill_type").append(span)
})
var inIcons = document.getElementById("bill_in_icons");
inIcons.addEventListener("tap",function(e){
	var logo = e.target;
	var newclass = $(logo).attr("class");
	var newtext = $(logo).text();
	$("#bill_type").children().remove();
	var i = "<i class='"+newclass+" bill_logo'></i>";
	var span = "<span class='bill_text'>"+newtext+"</span>"
	$("#bill_type").append(i);
	$("#bill_type").append(span)
})

//设置日期
$('.date').datepicker({
    'format': 'yyyy/m/d',
    'autoclose': true
});

//点击ok保存
var btnOk = document.getElementById("create_bill");
btnOk.addEventListener("tap",function(){
	var moneyTypeLogo = $("#bill_type").find("i").attr("class");
	var moneyTypeName = $("#bill_type").find("span").text();
	var moneyNum = $("#bill_money").val();
	var moneyDate = $("#bill_date").val();
	var beizhu = $("#beizhu").val();
	var hour = date.getHours();
	var min = date.getMinutes();
	hour=hour>9?hour:"0"+hour;
	min=min>9?min:"0"+min;
	var today = year+"年"+month+"月"+day+"日"
	var time = today+" "+hour+":"+min;
	if(moneyNum==""){
		mui.toast('请输入正确金额',{ duration:'long', type:'div' });
	} else{
		var theBill = {
			type:moneyIn,
			logo:moneyTypeLogo,
			name:moneyTypeName,
			money:moneyNum,
			date:moneyDate,
			time:time,
			text:beizhu
		}
		console.log(theBill);
		
		//将原数组的当前想进行修改
		bill.splice(thisNum,1,theBill);
		console.log(bill);
		localStorage.setItem("bill",JSON.stringify(bill));
		//跳转到账单页
		mui.toast('记账成功',{ duration:'long', type:'div' });
		old_back();
		//返回主页后重新加载页面
		var wobj1 = plus.webview.getWebviewById("detail_bill");
		wobj1.reload(true);
		var wobj = plus.webview.getWebviewById("bill.html");
		wobj.reload(true);
	}
	
})