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
		slides:{
			selectorType:"elm",
			selector:"a"
		},
		playInterval:5000,
		onload_play:true,
		effect:function(slides,currentSlide,settings,nextSlideIndex){
			$(slides.get(currentSlide)).slideUp(settings.animateSpeed);
			$(slides.get(nextSlideIndex)).slideDown(settings.animateSpeed);
		}
	});
	
});
