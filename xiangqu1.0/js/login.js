$(document).ready(function(){
	$("#log").click(function(){
		var phoneNum = $("#phonenum input").val();
		var passWord = $("#password input").val();
		if(!/^1(3|4|5|7|8)\d{9}$/.test(phoneNum)){
			console.log("手机号错误");
			$("#warning").html("请输入正确的手机号！")
		}
		else if(!/^[\w\$\%\!\@\#\^\&\*\(\)\-\+\=\?\,\.\<\>\/\|\{\}\[\]]{6,20}$/.test(passWord)){
			console.log("密码错误");
			$("#warning").html("请输入正确的密码！")
		}
		else {
			$("#warning").html("")
			console.log("手机号和密码格式正确");
			userRepeat(phoneNum,passWord);
		}
	})
	//手机号是否被注册判断函数
	var userlist = new Array();//用来存本地的数组（双括号）
	var userlist2 = new Array();//用来存cookie数组
	var userType = true;
	function userRepeat(num,pass){
		console.log("判断是否被注册");
		if(getCookie("userlist")==""){
			console.log("内存为空");
			$("#warning").html("");
			userlist.push("{{phonenumber:"+"'"+num+"'"+",password:"+"'"+pass+"'"+"}}");
			setCookie("userlist",userlist,30);
			//console.log("注册成功1"+userlist);
			alert("注册成功！点击进入登录页面")
			window.location.href = "signIn.html";
		} else {
			userlist2 = changeCookie(getCookie("userlist"));
			userType = true;
			for (var i in userlist2){
				console.log(eval("("+userlist2[i]+")"));
				//for循环只能判断存在，不能判断不存在
				if(eval("("+userlist2[i]+")").phonenumber == num){
					console.log("已存在");
					$("#warning").html("该手机号已经被注册！");
					userType = false;
					break;
				}
			}	
			//当确定数组中不存在时
			if(userType){
				console.log("新号码");
				$("#warning").html("");
				userlist.push("{{phonenumber:"+"'"+num+"'"+",password:"+"'"+pass+"'"+"}}");
				setCookie("userlist",userlist,30);
				alert("注册成功！点击进入登录页面");
				window.location.href = "signIn.html";
				//console.log("注册成功2，"+userlist);
			}
		}
	}
	//将获取的cookie值（字符串）进行修改
	function changeCookie(cookie){
		var list = new Array();
		list = cookie.split("},{");
		//console.log("分割后数组："+list);
		if(list.length==1){
			//console.log("数组长度为1");
			list[0] = list[0].replace("{","");
			list[0] = list[0].replace("}","");
		} else {
			//console.log("数组长度大于1");
			list[0] = list[0].replace("{","");
			list[list.length-1] = list[list.length-1].replace("}","");
		}
		console.log("返回数组："+list);
		return list;
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
	
//手机号判断是否被注册本地版（无cookie）
//	var userlist = new Array();
//	var userType = true;
//	userlist = ["{phonenumber:0,password:0}"];
//	function userRepeat(num,pass){
//		console.log("调用了该函数");
//		for(var i=0;i<userlist.length;i++){
//			console.log("开始循环");
//			console.log(userlist[i]);
//			console.log(eval("("+userlist[i]+")"));
//			if(eval("("+userlist[i]+")").phonenumber == num){
//				console.log("已存在");
//				$("#warning").html("该手机号已经被注册！");
//				userType = false;
//				break;
//			}
//		}
//		if(userType){
//			console.log("新号码");
//			$("#warning").html("");
//			userlist.push("{phonenumber:"+"'"+num+"'"+",password:"+"'"+pass+"'"+"}");
//			alert("注册成功！")
//			console.log(userlist);
//		}
//	}

})