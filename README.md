# JQuery-Slideshow
A JQuery Slideshow plugin

This slideshow is fully compatable with font awesome
https://fortawesome.github.io/Font-Awesome/icons/

To setup a slideshow  with clickable slides:

HTML:
  <!-- if you want the slides to be clickable-->
  <div class="slideshow">      
				<a href="#" title="a">
					<img src="a.png" alt="a"/>
				</a>
				<a href="#" title="b" style="display:none;">
					<img src="b.png" alt="b"/>
				</a>
				<a href="#" title="c" style="display:none;">
					<img src="c.png" alt="c"/>
				</a>
				<a href="#" title="d" style="display:none;">
					<img src="d.png" alt="d"/>
				</a>
				<div class="control-panel"></div>
	</div>
	
Javascript:

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
				elm:"<i class='fa'></i>"
			},
			selectorType:"class",
			selector:"control-panel"
		},
		slides:{
			selectorType:"elm",
			selector:"a"
		},
		playInterval:5000,
		onload_play:true
	});
