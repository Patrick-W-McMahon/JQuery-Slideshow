(function ( $ ) {
	var currentSlide = 0;
	var state=true;
	$.fn.Slideshow = function(args){
		var self = this;
		var defaults={
			onNextSlide:function(){},
			onPreviousSlide:function(){},
			onSlideChange:function(){},
			onSlideJump:function(){},
			animateSpeed:"slow",
			onload_play:true,
			playInterval:8000,
			effect:function(slides,currentSlide,settings,nextSlideIndex){
				$(slides.get(currentSlide)).fadeOut(settings.animateSpeed);
				$(slides.get(nextSlideIndex)).fadeIn(settings.animateSpeed);	
			},
			slides:{
				selectorType:"elm",
				selector:"a"
			},
			controls:{
				prvBtn:"<button>&#60;</button>",
				nextBtn:"<button>&#62;</button>",
				pauseBtn:"<button>pause</button>",
				playBtn:"<button>play</button>",
				pager:{
					class:{
						active:"active",
						hidden:"not-active"
					},
					elm:"<button>#</button>",
					containerElm:"nav",
				},
				selectorType:"class",
				selector:"control-panel"
			},
		}
		var settings = $.extend( {}, defaults, args );
		var slides = getSlides(this,settings.slides.selectorType,settings.slides.selector);
		var controls = buildControls();
		this.start = function(){
			state=true;
			loop(settings.playInterval);
		}
		
		this.stop = function(){
			state=false;
		}
		
		if(settings.onload_play){
			self.start();
		}
		
		function buildControls(){
			if(settings.controls){
				var ac = settings.controls,cnt = $("."+settings.controls.selector);
				var prvBtn = $(ac.prvBtn).appendTo(cnt);
				prvBtn.click(function(){
					self.prev()
				});
				var nextBtn = $(ac.nextBtn).appendTo(cnt);
				nextBtn.click(function(){
					self.next();
				});
				var paganator = getPaganator(cnt,settings.controls.pager.containerElm);
				slides.each(function(index){
					var typeT = (index == 0 ? "active" : "hidden");
					var acp = ac.pager,pager = $(acp.elm).appendTo(paganator);
					pager.addClass(acp.class[typeT]);
					pager.attr("index",index);
					pager.click(function(){
						var si = $(this).attr("index");
						self.setTo(si);
						settings.onSlideJump.call(self.getSlide(si));
					});
				});
				return cnt;
			}
			return undefined;
		}
		
		function loop(interval){
			if(state){
				self.next();
				setTimeout(function(){
					loop(interval);
				}, interval);
			}
		}
		
		this.setTo = function(i){
			if(settings.controls){
				var pagers = controls.children(settings.controls.pager.containerElm).children();
				var cpc = settings.controls.pager.class;
				pagers.each(function(){
					if($(this).hasClass(cpc.active)){
						currentSlide = $(this).attr("index");
						$(this).removeClass(cpc.active).addClass(cpc.hidden);
					}
				});
				$(pagers.get(i)).removeClass(cpc.hidden).addClass(cpc.active);
			}
			if(currentSlide != i){
				settings.effect(slides,currentSlide,settings,i);
			}
			currentSlide=parseInt(i);
			settings.onSlideChange.call(this.getSlide(i));
		}
		
		this.getSlide = function(i){
			if(i<0||i>slides.length){
				return undefined;
			}
			return slides.get(i)
		}
		
		this.next = function(){
			var s = (parseInt(currentSlide)+1>slides.length-1 ? 0 : parseInt(currentSlide)+1);
			self.setTo(s);
			settings.onNextSlide.call(this.getSlide(s));
		}
		
		this.prev = function(){
			var s = (parseInt(currentSlide)-1<0 ? slides.length-1 : parseInt(currentSlide)-1);
			self.setTo(s);
			settings.onPreviousSlide.call(this.getSlide(s));
		}
		
		function getSlides(slideShow,selType,sel){
			return slideShow.children(sel);
		}
		return this;
	};
	
	function getPaganator(controls_element, container){
		var p = document.createElement(container);
		controls_element.append(p);
		return $(p);
	}	
		
}( jQuery ));
