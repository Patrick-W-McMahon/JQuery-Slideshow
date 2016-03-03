$.fn.Slideshow = function(args){
	var self = this;
	this.currentSlide = 0;
	var playState=true;
	var slides = getSlides(this,args['slides']['selectorType'],args['slides']['selector']);
	var controls = buildControls(this, args);
	var anSpeed = "slow";
	if(isObj(args['animationSpeed'])){
		anSpeed=args['animationSpeed'];
	}
	autoPlay();
	
	function buildControls(sliderShow, args){
		if(isObj(args["controls"])){
			var ac = args['controls'],cnt = $("."+ac['selector']);
			var prvBtn = $(ac['prvBtn']).appendTo(cnt);
			prvBtn.click(function(){
				self.prev()
			});
			var nextBtn = $(ac['nextBtn']).appendTo(cnt);
			nextBtn.click(function(){
				self.next();
			});
			var paganator = getPaganator(cnt);
			slides.each(function(index){
				var typeT = "hidden";
				if(index==0){
					typeT = "active";
				}
				var acp = ac['pager'],pager = $(acp['elm']).appendTo(paganator);
				pager.addClass(acp["class"][typeT]);
				pager.attr("index",index);
				pager.click(function(){
					setTo($(this).attr("index"));
				});
			});
			return cnt;
		}
		return undefined;
	}
	
	function autoPlay(){
		if(isObj(args['playInterval'])){
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
			$(slides.get(self.currentSlide)).fadeOut(anSpeed);
			$(slides.get(selected)).fadeIn(anSpeed);	
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
	
	function isObj(t){
		return typeof(t)!==undefined;
	}
	
	function getSlides(slideShow,selType,sel){
		var results;
		results = slideShow.children(sel);
		return results;
	}
};
