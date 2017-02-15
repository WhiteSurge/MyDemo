mui.init();

//读取本地存储的任务数据并动态加载出来
(function showAllMission(){
	var mission = JSON.parse(localStorage.getItem("mission"));
	$.each(mission, function(i){
		console.log($(mission).eq(i));
		//为已完成的任务添加className：mission-complete
		var div1 = $(mission).eq(i)[0].complete?'<div class="mission-card mission-complete">':'<div class="mission-card">';
		console.log(div1);
		var div2 = '<p class="mission-time">'+$(mission).eq(i)[0].deathline+'</p>'
		+'<p class="mission-title">'+$(mission).eq(i)[0].title+'</p>'
		+'<p class="mission-detail_message">'+$(mission).eq(i)[0].content+'</p>'
		+'<p class="mission-remind_time">提醒时间：'+$(mission).eq(i)[0].remindtime+'</p>'
		+'<img src="img/pass.png"></img></div>';
		var div = div1+div2
		
		
		$("#mission-content").append($(div));
	});
	
	//点击对应的卡片进入详情页面
	$.each($(".mission-card"), function(i) {
		$(".mission-card")[i].addEventListener("tap",function(){
			mui.openWindow({
				url: 'detail_mission.html', 
				id:'detail_mission',
				waiting:{
					autoShow:false
				},
				extras:{
					num:i
				}
			});
		})
	});
})()

//创建新的任务
var addmission = document.getElementById("add_mission")
addmission.addEventListener("tap",function(){
	//点击加号按钮，创建一个新的任务，进入任务编辑页面
	mui.openWindow({
		url: 'new_mission.html', 
		id:'new_mission',
		waiting:{
			autoShow:false
		}
	});
})	


