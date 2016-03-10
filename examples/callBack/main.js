$( document ).ready(function() {

	$(".slideshow").Slideshow({
		controls:{
			prvBtn:"<i class='fa fa-chevron-left'></i>",
			nextBtn:"<i class='fa fa-chevron-right'></i>",
			pauseBtn:"<i class='fa fa-pause'></i>",
			playBtn:"<i class='fa fa-play'></i>",
			pager:{
				class:{
					active:"fa-circle",
					hidden:"fa-circle-o"
				},
				elm:"<i class='fa'></i>",
				containerElm:"nav",
			},
			selectorType:"class",//could also be id or elm
			selector:"control-panel"
		},
		playInterval:2000,
		animateSpeed:"fast",
		onload_play:true,
		onNextSlide:function(){
			console.log("next slide");
		},
		onPreviousSlide:function(){
			console.log("prev slide");
		},
		onSlideChange:function(){
			console.log("slide change");
		},
		onSlideJump:function(){
			console.log("slide jump to");
		}
	});
	
});
