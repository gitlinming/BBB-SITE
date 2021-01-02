var lab = {
	// props : ['clear','row','nav','indexPage','change'],
	components: {
		'loading': loading,
	},
	template: '\
		<div id="lab" class="lab">\
			<loading :class="{loadingShow: loadingShow,loadingClose: datas.length > 0}"></loading>\
			<ul id="labWrap" :class="{labShow: labShow}">\
				<li v-for="(i,index) in datas"  @mousedown="beforeOpenProject" @click="openProject(index,i)">\
					<router-link :to="{ name: labDetail, params: {title: i.url}}">\
					<div class="colD4 colI5 colT4 colP4 imgWrap">\
						<div class="imgBox">\
							<div class="img" :style="{ backgroundImage: addUrl(i.cover) }"></div>\
						</div>\
					</div>\
					<div class="colD8 colI7 colT4 colP4 labInfoBox">\
						<div class="labInfo">\
							<h1>\
								<span>PROJECT</span>\
								<span class="innerOrder">{{order(datas.length - index - 1)}}</span>\
							</h1>\
							<h1 class="order">{{order(datas.length - index - 1)}}</h1>\
							<div class="labInfoTag">{{i.tag}}</div>\
							<p>{{month(i.month)}}.{{month(i.day)}}</p>\
						</div>\
					</div>\
					</router-link>\
				</li>\
			</ul>\
		</div>\
	',
	created: function(){
		hub.$emit('navClose');
		hub.$emit('backgorundNav');
		hub.$emit('navBlack');
		this.$emit('message','Something we do for no reason.');
		this.loadingShowFn();
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
			c.labShow = true;
		},0);
	},
	data: function(){
		return {
			datas: LabList,
			detail: 'detail',
			labDetail: 'labDetail',
			labShow: false,
			loadingShow: false,
		}
	},
	methods: {
		order: function(i){
			var a = i + 1;
			if(a < 100){
				if(a < 10){
					return '00' + a;
				}else{
					return '0' + a;
				}
			}else{
				return a;
			}
		},
		month: function(i){
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
			if(this.datas.length === 0){
				var c = this;
				window.setTimeout(function(){
					c.loadingShow = true;
				},100);
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
				var img = data.cover;
				var img = data.cover;
				var color = data.imageAve;
				window.setTimeout(function(){
					var $lab = document.getElementById('lab');
					var $labWrap = document.getElementById('labWrap');
					var $thisProject = $labWrap.childNodes[index];
					var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
					var $img = $thisProject.childNodes[0].childNodes[0].childNodes[0];
					var left = $lab.offsetLeft + $labWrap.offsetLeft + $img.offsetLeft;
					var top = $lab.offsetTop + $labWrap.offsetTop + $thisProject.offsetTop - scrollTop;
					var width = $img.clientWidth;
					var height = $img.clientHeight;
					app.detailMaskOpen(color,left,top,width,height,scrollTop,data);
				},10);
				RGBaster.colors(img, {
					paletteSize: 30,
					exclude: [ 'rgb(255,255,255)', 'rgb(255,254,255)'],
					success: function(payload) {
						// payload.dominant
						color = payload.dominant;
					}
				});
			}
		}
	}
}