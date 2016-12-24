$(document).ready(function(){
	$("#log").click(function(){
		//输入内容合法性验证
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
	//手机号是否被注册验证
	var userType = true;
	function userRepeat(num,pass){
		console.log("判断是否被注册");
		if(getCookie("userlist")==""){
			console.log("内存为空");
			$("#warning").html("");
			var newUser = '{"phonenumber":'+'"'+num+'"'+',"password":'+'"'+pass+'"'+'}';
			//userlist.push(newUser);
			setCookie("userlist",newUser,30);
			//console.log("注册成功1"+userlist);
			alert("注册成功！点击进入登录页面")
			window.location.href = "signIn.html";
		} else {
			userType = true;
			//如果内存中只含有一个用户信息
			if(getCookie("userlist").indexOf("&&")==-1){
				var ouser = eval("("+getCookie("userlist")+")");
				if(ouser.phonenumber == num){
					$("#warning").html("该手机号已经被注册！");
					userType = false;
				}
			} else {
				var ousers = getCookie("userlist").split("&&");
				$.each(ousers,function(i){
					var ouser = eval("("+ousers[i]+")");
					if(ouser.phonenumber == num){
						$("#warning").html("该手机号已经被注册！");
						userType = false;
					}
				})
			}
			//当确定数组中不存在时
			if(userType){
				console.log("新号码");
				$("#warning").html("");
				var oldusers = getCookie("userlist");
				var newUser = '{"phonenumber":'+'"'+num+'"'+',"password":'+'"'+pass+'"'+'}';
				setCookie("userlist",oldusers+"&&"+newUser,30);
				alert("注册成功！点击进入登录页面");
				window.location.href = "signIn.html";
				//console.log("注册成功2，"+userlist);
			}
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