$.fn.Slideshow = function(args){
	var self = this;
	this.currentSlide = 0;
	var playState=true;
	var slides = getSlides(this,args['slides']['selectorType'],args['slides']['selector']);
	var controls = buildControls(this, args);
	autoPlay();
	
	function buildControls(sliderShow, args){
		if(typeof(args["controls"])!==undefined){
			var cnt = $("."+args['controls']['selector']);
			var prvBtn = $(args['controls']['prvBtn']).appendTo(cnt);
			prvBtn.click(function(){
				self.prev()
			});
			var nextBtn = $(args['controls']['nextBtn']).appendTo(cnt);
			nextBtn.click(function(){
				self.next();
			});
			var paganator = $(document.createElement('nav'));
			paganator.appendTo(cnt);
			slides.each(function(index){
				if(index==0){
					var typeT = "active";
				}else{
					var typeT = "hidden";
				}
				var pager = $(args['controls']['pager']['elm']);
				pager.addClass(args['controls']['pager']["class"][typeT]);
				pager.attr("index",index);
				pager.click(function(){
					setTo($(this).attr("index"));
				});
				paganator.append(pager);
			});
			return cnt;
		}
		return undefined;
	}
	
	function autoPlay(){
		if(typeof(args['playInterval'])!==undefined){
			play(args['playInterval']);
		}else{
			play(8000);
		}
	}
	
	function setTo(i){
		changePager(i);
		changeSlide(i);
		self.currentSlide=parseInt(i);
	}
	
	function play(interval){
		self.next();
		setTimeout(function(){
			play(interval);
		}, interval);
	}
	
	this.next = function(){
		var sn=parseInt(self.currentSlide)+1;
		if(sn>slides.length-1){
			sn=0;
		}
		setTo(sn);
	}
	
	this.prev = function(){
		var s=parseInt(self.currentSlide)-1;
		if(s<0){
			s=slides.length-1;
		}
		setTo(s);		
	}
	
	function changeSlide(selected){
		if(self.currentSlide != selected){
			$(slides.get(self.currentSlide)).fadeOut("slow");
			$(slides.get(selected)).fadeIn("slow");	
		}
	}
	
	function changePager(selected){
		var pagers = controls.children("nav").children("i");
		var cpc = args['controls']['pager']['class'];
		pagers.each(function(){
			if($(this).hasClass(cpc["active"])){
				self.currentSlide = $(this).attr("index");
				$(this).removeClass(cpc['active']).addClass(cpc['hidden']);
			}
		});
		$(pagers.get(selected)).removeClass(cpc['hidden']).addClass(cpc['active']);
	}
	
	function getPaganator(controls_element){
		var p = document.createElement('nav');
		controls_element.append(p);
		return $(p);
	}
	
	function getControls(slideShow,selType,sel){
		var results;
		results = slideShow.children(sel);
		return results;
	}	
	
	function getSlides(slideShow,selType,sel){
		var results;
		results = slideShow.children(sel);
		return results;
	}
};
