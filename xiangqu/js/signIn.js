$(document).ready(function(){
	$("#log").click(function(){
		var userName = $("#phonenum input").val();
		var passWord = $("#password input").val();
		var userList = changeCookie(getCookie("userlist"));
		var userType = false;//true表示cookie中存在该用户，false表示不存在
		for(var i in userList){
			if(eval("("+userList[i]+")").phonenumber == userName){
				console.log("存在该用户");
				userType = true;
				break;
			}
		}
		if(userType){
			for(var i in userList){
				if(eval("("+userList[i]+")").phonenumber == userName){
					if(eval("("+userList[i]+")").password == passWord){
						//将登录成功的用户名存起来并进行登录操作
						setCookie("username",userName,15);
						window.location.href = "index.html";
					} else {
						$("#warning").html("对不起，您输入的用户名或密码有误！");
					}
					break;
				}
			}
		} else {
			$("#warning").html("该用户名不存在！");
		}
	})
	
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
	
})
