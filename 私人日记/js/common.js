//var addbtn = document.getElementById("add_mission");
//监听滚动条的滚动距离
//var scroll = mui('.mui-scroll-wrapper').scroll(); 
//  mui('.mui-scroll-wrapper' ).on('swipedown', function(e){ 
//  	console.log(scroll.y); 
//  	if(scroll.y>10){
//  		alert("成功！")
//  	}
//  }) 

$(document).ready(function(){
	var isOut = false;
	$(window).scroll(function(){
	    if($(window).scrollTop()>25){
	    	if(!isOut){
	    		isOut = true;
		        $(".addbtn").animate({
		       		bottom:'-3.6rem'
		       	},300);
	    	}
	    }
	    else if($(window).scrollTop()==0){
	    	$(".addbtn").stop();
	    	$(".addbtn").animate({
	       		bottom:'1rem'
	       	},300,function(){
	       		$(".addbtn").stop(false,true);
	       		isOut = false;
	       	});
	    };
	});
})

