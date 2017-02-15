mui.init({
	swipeBack:true, //启用右滑关闭功能
});

var old_back = mui.back;
(function(mui) {
	//重写返回键
	mui.back = function(){
		var diarycontent = document.getElementById("new-diary-content").value;
		if(diarycontent==""){
			old_back();
		} else {
			var btn = ["确定","取消"];
	  		mui.confirm('页面内容将不会保存，确认返回？','放弃保存？',btn,function(e){
	    		if(e.index==0){
	    			//执行mui封装好的窗口关闭逻辑；
	    			old_back();
	   	 		}
	  		});
		}
	}
})(mui);

var creatediary = document.getElementById("create_diary");
//点击事件
creatediary.addEventListener("tap",function(){
   	var diarycontent = document.getElementById("new-diary-content").value;
	if(diarycontent==""){
		alert("空白的日记不会保存哦~写点东西再保存吧~")
	} else {
		//获取当前的时间
		var date = new Date();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var week = date.getDay();
		var hour = date.getHours();
		var min = date.getMinutes();
		hour = hour>9?hour:"0"+hour;
		min = min>9?min:"0"+min;
		var diarytime = hour+":"+min;
		var diaryday = month+"月"+day+"日";
		var diaryweek = "";
		switch(week){
			case 0: diaryweek = "星期日";
			break;
			case 1: diaryweek = "星期一";
			break;
			case 2: diaryweek = "星期二";
			break;
			case 3: diaryweek = "星期三";
			break;
			case 4: diaryweek = "星期四";
			break;
			case 5: diaryweek = "星期五";
			break;
			case 6: diaryweek = "星期六";
			break;
		}
		console.log(diarytime+","+diaryday+","+diaryweek)
		//获取当前的天气
		var diaryweather = "";
		//获取当前的地理位置
		var diarylocal = "";
		//设置本次任务的详细内容
   		var thediary = {
   			content:diarycontent,
   			time:diarytime,
   			day:diaryday,
   			week:diaryweek,
   			weather:diaryweather,
   			local:diarylocal
   		}
   		//获取之前上传的日记，转变成数组，如果为空则新建一个数组
   		var diaryList = JSON.parse(localStorage.getItem('diary')||"[]");
   		//将本次添加的日记添加到数组的前面（方便读取时按照后进先出的顺序读取）
   		diaryList.unshift(thediary);
   		//将新日记数组保存在本地
   		localStorage.setItem("diary",JSON.stringify(diaryList));
		//跳转到任务页
		mui.toast('日记保存成功',{ duration:'long', type:'div' });
		old_back();
		//返回主页后重新加载页面
		var wobj = plus.webview.getWebviewById("diary.html");
		wobj.reload(true);
	}
})