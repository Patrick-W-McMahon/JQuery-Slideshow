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
			animateSpeed: "slow",
			onload_play:true,
			playInterval:8000,
			slides:{
				selectorType:"elm",
				selector:"a"
			},
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
					elm:"<i class='fa'></i>"
				},
				selectorType:"class",
				selector:"control-panel"
			},
		}
		var settings = $.extend( {}, defaults, args );
		var slides = getSlides(this,settings.slides.selectorType,settings.slides.selector);
		var controls = buildControls(this, args);
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
		
		function buildControls(sliderShow, args){
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
				var paganator = getPaganator(cnt);
				slides.each(function(index){
					var typeT = "hidden";
					if(index==0){
						typeT = "active";
					}
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
			var pagers = controls.children("nav").children("i");
			var cpc = settings.controls.pager.class;
			pagers.each(function(){
				if($(this).hasClass(cpc.active)){
					currentSlide = $(this).attr("index");
					$(this).removeClass(cpc.active).addClass(cpc.hidden);
				}
			});
			$(pagers.get(i)).removeClass(cpc.hidden).addClass(cpc.active);
			if(currentSlide != i){
				$(slides.get(currentSlide)).fadeOut(settings.animateSpeed);
				$(slides.get(i)).fadeIn(settings.animateSpeed);	
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
			var s=parseInt(currentSlide)+1;
			if(s>slides.length-1){
				s=0;
			}
			self.setTo(s);
			settings.onNextSlide.call(this.getSlide(s));
		}
		
		this.prev = function(){
			var s=parseInt(currentSlide)-1;
			if(s<0){
				s=slides.length-1;
			}
			self.setTo(s);
			settings.onPreviousSlide.call(this.getSlide(s));
		}
		
		function getSlides(slideShow,selType,sel){
			return slideShow.children(sel);
		}
		return this;
	};
	
	function getPaganator(controls_element){
		var p = document.createElement('nav');
		controls_element.append(p);
		return $(p);
	}	
		
}( jQuery ));
