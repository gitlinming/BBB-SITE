var thisYear = [2,0,2,0];

var work = {
	// props : ['clear','row','nav','indexPage','change'],
	components: {
		'loading': loading,
	},
	template: '\
		<div id="work" :class="[work,{workShow:workShow}]" @touchend="shuffleEnd">\
			<loading :class="{loadingShow: loadingShow,loadingClose: works.length > 0}"></loading>\
			<div v-show="works.length > 0" id="function" class="colD12 function">\
				<ul >\
					<li style="display: none;" v-for="i in thisYear">\
						<p>{{add(i)}}</p>\
						<p>{{i}}</p>\
						<p>{{sub(i)}}</p>\
					</li>\
					<p style="font-size: 72px;font-weight: bold;">Featured works</p>\
				</ul>\
				<div :class="[shuffle,{shuffleHover: shuffleHover}]" @mousedown="shuffleStart" @touchstart="shuffleStart" @mouseup="shuffleEnd">\
					<div>\
						<div class="shuffleBox">\
							<svg v-for="i in 50" width="161px" height="52px" viewBox="0 0 161 52">\
							    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">\
							        <path class="origin" d="M6.11035156,6 C36.3427734,6 52.547557,46 80,46 C110.432243,46 124.012695,6 154.168945,6" stroke-width="11"></path>\
							        <path class="reflection" transform="translate(5, 0)" d="M0,46 C30.2324218,46 46.547557,6 74,6 C104.432243,6 117.902343,46 148.058593,46" stroke-width="11"></path>\
							    </g>\
							</svg>\
						</div>\
					</div>\
					<ul class="arrow arrow1">\
						<li></li>\
						<li></li>\
					</ul>\
					<ul class="arrow arrow2">\
						<li></li>\
						<li></li>\
					</ul>\
				</div>\
			</div>\
			<transition-group id="projects" class="projects" name="shuffle" tag="ul">\
				<li v-for="(i,index) in works" :class="[colD4,colT4,colP4,{chosen: i.chosen}]" :key="i.id" @mousedown="beforeOpenProject" @click="openProject(index,i)">\
					<router-link :to="{ name: workDetail, params: {title: i.url}}">\
						<p>project {{order(works.length - index)}}</p>\
						<div class="projectImgBox">\
							<div class="projectImg" :style="{ backgroundImage: addUrl(i.cover) }"></div>\
							<div class="projectInfo">\
								<p class="tag">{{i.tag}}</p>\
								<p v-if="0">{{i.year}}.{{order(i.month)}}.{{order(i.day)}}</p>\
							</div>\
						</div>\
					</router-link>\
				</li>\
			</transition-group>\
		</div>\
	',
	created: function(){
		hub.$emit('navClose');
		hub.$emit('backgorundNav');
		hub.$emit('navBlack');
		this.loadingShowFn();
		this.$emit('message','Shuffle it.');
	},
	mounted: function(){
		document.body.style.backgroundColor = '';
		if(app){
			if(app.stayScroll > 0){
				window.scrollTo(0,app.stayScroll);
				app.stayScroll = 0;
			}
		}
		var c = this;
		window.setTimeout(function(){
			c.workShow = true;
		},0);
	},
	data: function(){
		return {
			thisYear: thisYear,
			detail: 'detail',
			workDetail: 'workDetail',
			colD4: 'colD4',
			colT4: 'colT4',
			colP4: 'colP4',
			works: projectsList,
			shuffleStop: false, 
			shuffle: 'shuffle',
			shuffleHover: false,
			shuffleHoverStop: false,
			openInterval: null,
			work: 'work',
			projects: 'projects',
			workShow: false,
			loadingShow: false
		}
	},
	methods: {
		sub: function(i){
			if(i-1 < 0){
				return 9;
			}else{
				return i-1;
			}
		},
		add: function(i){
			if(i+1 > 9){
				return 0;
			}else{
				return i+1;
			}
		},
		order: function(i){
			var a = i;
			if(a < 10){
				return '0' + a;
			}else{
				return a;
			}
		},
		addUrl: function(i){
			return 'url('+i+')';
		},
		loadingShowFn: function(l){
			if(this.works.length === 0){
				var c = this;
				window.setTimeout(function(){
					c.loadingShow = true;
				},100);
			}
		},
		shuffleStart: function(e){
			if(!this.shuffleHover){
				if(!isTouchDevice){
					if(e.button !== 0){
						return false;
					}
				}
				var c = this;
				c.shuffleHover = true;
				c.works = _.shuffle(c.works);
				if(!c.shuffleStop){
					function shuffle(){
						if(c.shuffleStop){
							window.clearInterval(shuffleInterval);
						}else{
							c.works = _.shuffle(c.works);
						}
						c.shuffleStop = false;
					}
					var shuffleInterval = window.setInterval(shuffle,1000);
				}else{
					c.shuffleStop = false;
				}				
			}

		},
		shuffleEnd: function(){
			this.shuffleStop = true;
			if(this.shuffleHover){
				var c = this;
				window.setTimeout(function(){
					c.shuffleHover = false;
				},330);
			}
		},
		beforeOpenProject: function(){
			var windowW = window.innerWidth;
			if(windowW > 414){
				app.beforeRoute = true;
			}
		},
		openProject: function(index,data){
			var windowW = window.innerWidth;
			app.detailData = data;
			if(windowW > 414){
				var move = 32;
				var scale = 0;
				var yMove = 2;
				var img = data.cover;
				var color = data.imageAve;
				window.setTimeout(function(){
					var $projects = document.getElementById('projects');
					var $work = document.getElementById('work');
					var $function = document.getElementById('function');
					var $thisProject = $projects.childNodes[index];
					var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
					var left = $work.offsetLeft + $thisProject.childNodes[0].offsetLeft - move - scale;
					var top = $work.offsetTop + $function.offsetTop + $thisProject.offsetTop - scrollTop - move - scale + yMove;
					var width = 0;
					var height = 0;
					for (var i = 0; i < $thisProject.childNodes[0].childNodes.length; i++) {
						if($thisProject.childNodes[0].childNodes[i].className === 'projectImgBox'){
							width = $thisProject.childNodes[0].childNodes[i].clientWidth  + scale*2;
							height = $thisProject.childNodes[0].childNodes[i].clientHeight  + scale*2;
							break;
						}
					}
					app.detailMaskOpen(color,left,top,width,height,scrollTop,data);					
				},10);
				RGBaster.colors(img, {
					paletteSize: 30,
					exclude: [ 'rgb(255,255,255)' ],
					success: function(payload) {
						// payload.dominant
						color = payload.dominant;
					}
				});
			}
		},
	}
}














// <svg width="149px" height="52px" viewBox="0 0 149 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//     <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
//     <desc>Created with Sketch.</desc>
//     <defs></defs>
//     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//         <g id="Line" transform="translate(0.000000, 1.000000)" stroke-width="12" stroke="#000000">
//             <path d="M0,46 C30.2324218,46 46.547557,6 74,6 C104.432243,6 117.902343,46 148.058593,46"></path>
//         </g>
//     </g>
// </svg>




