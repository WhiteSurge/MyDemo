mui.init();

//读取本地存储的日记数据并动态加载出来
(function showAllDiary(){
	var diary = JSON.parse(localStorage.getItem("diary"));
	$.each(diary, function(i){
		
		var div = '<div class="diary-card">'
		+'<p class="diary-title"><span id="diary-time">'+$(diary).eq(i)[0].day+'</span>'
		+'<span id="diary-day">'+$(diary).eq(i)[0].week+'</span>'
		+'<span id="diary-weather">'+$(diary).eq(i)[0].weather+'</span></p>'
		+'<p class="diary-text">'+$(diary).eq(i)[0].content+'</p>'
		+'<p class="diary-write_info">'
		+'<span id="diary-write_address">'+$(diary).eq(i)[0].local+'</span>'
		+'<span id="diary-write_time">'+$(diary).eq(i)[0].time+'</span></p>';
		
		$("#diary-content").append($(div));
	});
	
	//点击对应的卡片进入详情页面
	$.each($(".diary-card"), function(i) {
		$(".diary-card")[i].addEventListener("tap",function(){
			mui.openWindow({
				url: 'detail_diary.html', 
				id:'detail_diary',
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
var addDiary = document.getElementById("add_diary");
addDiary.addEventListener("tap",function(){
	//点击加号按钮，创建一个新的任务，进入任务编辑页面
	mui.openWindow({
		url: 'new_diary.html', 
		id:'new_diary',
		waiting:{
			autoShow:false
		}
	});
})	


