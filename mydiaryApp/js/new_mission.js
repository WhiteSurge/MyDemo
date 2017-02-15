mui.init({
	swipeBack:true, //启用右滑关闭功能
});

var old_back = mui.back;
(function(mui) {
	//重写返回键
	mui.back = function(){
		var missiontitle = document.getElementById("new-mission-title").value;
   		var missioncontent = document.getElementById("new-mission-content").value;
		if(missiontitle==""&&missioncontent==""){
			old_back();
		} else{
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

//日期时间选择
$('#basicExample .time').timepicker({
    'showDuration': true,
    'timeFormat': 'g:ia'
});
$('#basicExample .date').datepicker({
    'format': 'yyyy/m/d',
    'autoclose': true
});

var createmission = document.getElementById("create_mission");
//点击事件
createmission.addEventListener("tap",function(){
   	var missiontitle = document.getElementById("new-mission-title").value;
   	var missioncontent = document.getElementById("new-mission-content").value;
   	var deathdate = document.getElementById("death-date").value;
   	var deathtime = document.getElementById("death-time").value;
	//判断标题与内容是否填写
	if(missiontitle==""){
		if(missioncontent==""){
   			alert("空白的任务将不会保存哦，请先输入内容");
		} else {
			alert("请添加任务标题")
		}
	} else {
		//判断是否选择任务完成时间
   		if(deathdate=="设置日期"){
   			alert("请设置任务完成日期！");
   		} else if(deathtime=="设置时间"){
   			alert("请设置任务完成时间！");
   		} else {
   			//判断任务完成日期是否小于当前日期
   			var date = new Date();
   			//首先将am、pm时间格式改成24小时时间格式
   			var finishtime_am = deathtime.indexOf("am");
   			var finishtime_pm = deathtime.indexOf("pm");
   			var finishtime = "";
   			//console.log("上午时间下标"+finishtime_am);
   			//console.log("下午时间下标"+finishtime_pm);
   			if(finishtime_am==-1){
   				finishtime = deathtime.substring(0,finishtime_pm);
   				var timelist = finishtime.split(":");
   				timelist[0]=timelist[0]==12?0:timelist[0];
   				timelist[0] = Number(timelist[0]) + 12;
   				finishtime = timelist.join(":")
   				//console.log("下午"+finishtime);
   			} else {
   				finishtime = deathtime.substring(0,finishtime_am);
   				var timelist = finishtime.split(":");
   				timelist[0]=timelist[0]==12?0:timelist[0];
   				finishtime = timelist.join(":")
   				//console.log("上午"+finishtime);
   			}
   			//console.log("结束时间"+deathdate+" "+finishtime);
   			//将修改好后的时间字符串转成时间对象
			var finishdate = new Date(deathdate+" "+finishtime);
   			//console.log(finishdate)
   			if(date>=finishdate){
	   			alert("任务截止时间不能早于当前时间！")
   			} else {
		   		//设置本次任务的详细内容
		   		var themission = {
		   			title:missiontitle,
		   			content:missioncontent,
		   			deathline:deathdate,
		   			remindtime:deathtime,
		   			complete:false
		   		}
		   		//获取之前上传的任务，转变成数组，如果为空则新建一个数组
		   		//console.log(localStorage.getItem('mission'));
		   		var missionList = JSON.parse(localStorage.getItem('mission')||"[]");
		   		//将本次添加的任务添加到数组的前面（方便读取时按照后进先出的顺序读取）
		   		missionList.unshift(themission);
		   		//console.log(missionList);
		   		//将新任务数组保存在本地
		   		//console.log(JSON.stringify(missionList));
		   		localStorage.setItem("mission",JSON.stringify(missionList));
				//跳转到任务页
				mui.toast('新建任务成功',{ duration:'long', type:'div' });
				old_back();
				//返回主页后重新加载页面
				var wobj = plus.webview.getWebviewById("mission.html");
				wobj.reload(true);
   			}
   		}
	}
})