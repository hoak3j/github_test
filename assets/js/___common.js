var $grid;

function visualHeight(){
	var h = window.innerHeight;
	$(".visualSlide .item, #videoBg").css("height", h+"px");
}

common = {
	etcEvt:function(){
		$("body").on("click",".btnService",function(){
			var ck = $(this).hasClass("on");
			if(ck){
				$(this).removeClass("on");
				$(".serviceLayer").hide();
			}else{
				$(this).addClass("on");
				$(".serviceLayer").show();
			}
		});

		$(".btnFamilySite").hammer().on("tap", function(ev){
			var ck = $(this).hasClass("on");
			ev.stopPropagation();
			if(!ck){
				$(this).addClass("on");
				$(".familySiteBox").slideDown(200);
			}else{
				$(this).removeClass("on");
				$(".familySiteBox").slideUp(200);
			}
		});
		$(".familySiteBox a").hammer().on("tap", function(ev){
			$(".btnFamilySite").removeClass("on");
			$(".familySiteBox").slideUp(200);
		});
		$(window).hammer().on("resize scroll", function(ev){
			$(".searchSelect, .btnFamilySite").removeClass("on");
			$(".searchListBox, .familySiteBox").hide();
		});

	},
	openProj01:function(){
		$(".dialog").stop().fadeIn(200, 'easeOutQuad');
		$(".lnbArea").delay(200).stop().animate({"right":"0"}, 200, 'easeOutQuad');
		$(".project_area").delay(200).stop().animate({"right":"-20px"}, 200, 'easeOutQuad');
	},
	lnbOpen:function(){
		$(".dialog").stop().fadeIn(200, 'easeOutQuad');
		$(".lnbArea").delay(200).stop().animate({"right":"0"}, 200, 'easeOutQuad');
	},
	lnbClose:function(){
		$(".project_area").stop().animate({"right":"-1000px"}, 200, 'easeOutQuad', function(){
			$(".lnbArea").stop().animate({"right":"-300px"}, 200, 'easeOutQuad');
		});
		$(".dialog").delay(200).stop().fadeOut(200, 'easeOutQuad');
	},
	headerFixed:function(){
		var h = window.innerHeight;
		var st = $(window).scrollTop();
		if (st < h){
			$(".header").removeClass("on");
		}else{
			$(".header").addClass("on");
		}
	},
	popOpen:function(o){
		$(o).show();
	},
	popClose:function(o){
		$(o).hide();
	}
}
