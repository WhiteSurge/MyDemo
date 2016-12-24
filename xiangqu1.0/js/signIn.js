$(document).ready(function(){
	$("#log").click(function(){
		var userName = $("#phonenum input").val();
		var passWord = $("#password input").val();
		var userType = false;//true表示cookie中存在该用户，false表示不存在
		//如果cookie中只存入了一个用户信息或没有
		if(getCookie("userlist").indexOf("&&")==-1){
			console.log(getCookie("userlist"));
			var ouser = eval("("+getCookie("userlist")+")");
			if(ouser.phonenumber == userName){
				if(ouser.password == passWord){
					//将登录成功的用户名存起来并进行登录操作
					setCookie("username",userName,15);
					window.location.href = "index.html";
				} else {
					$("#warning").html("对不起，您输入的用户名或密码有误！");
				}
			} else {
				$("#warning").html("该用户名不存在！");
			}
		}else{
			var ousers = getCookie("userlist").split("&&");
			console.log(ousers)
			$.each(ousers,function(i){
				console.log("遍历cookie数组")
				console.log(ousers[i])
				var ouser = eval("("+ousers[i]+")");

				if(ouser.phonenumber == userName){
					userType = true;
					if(ouser.password == passWord){
						//将登录成功的用户名存起来并进行登录操作
						setCookie("username",userName,15);
						window.location.href = "index.html";
					} else {
						$("#warning").html("对不起，您输入的用户名或密码有误！");
					}
				}
			})

			if(!userType){
				$("#warning").html("该用户名不存在！");
			}
		}

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
