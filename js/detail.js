var maxWidth = 2880;
// maxWidth = 828;

var detail = {
	props : ['noPadding'],
	components: {
		'loading': loading,
	},
	template: '\
			<div id="detailWrap" class="detailWrap">\
				<div id="detailBox" class="detailBox">\
					<loading :class="{loadingShow: loadingShow,loadingClose: datas.title}"></loading>\
					<div class="detail">\
						<div :class="[detailHeader,colD12,colT8,{ h1Ready:detailMask}]">\
							<div class="returnWrap" @click="retrun">\
								<div class="returnBox">\
									<ul class="return">\
										<li class="returnTop">\
											<div></div>\
										</li>\
										<li class="returnBottom">\
											<div></div>\
										</li>\
									</ul>\
								</div>\
							</div>\
							<h1 :style="{opacity: opacity}">{{datas.title}}</h1>\
						</div>\
						<div class="contentWrap">\
							<div class="colD4 colI12 colT8 contentCapWrap" :style="{opacity: opacity}">\
								<p :class="{capReady:detailMask}">{{datas.des}}</p>\
								<div :class="[contentCapBox,{capReady:detailMask}]">\
									<ul id="contentCap" class="contentCap" :style="{ width: boxWidth(len),transform: translateX }">\
										<li v-for="i in datas.imgs" v-if="!i.cover" :style="{ width: liWidth(len) }">{{i.caption}}</li>\
									</ul>\
								</div>\
							</div>\
							<div id="contentImgWrap" :class="[colD8,colI12,colT8,contentImgWrap,{lightBox:lightBox}]" :style="{opacity: opacity}">\
								<div id="contentImgBox" :class="[contentImgBox,{contentImgBoxFade: detailMask,slideBox: lightBox}]" :style="{opacity: opacity}">\
									<ul id="contentImg" :class="[lightBox ? slideBoxImg : contentImg,{noTransition: noTransition}]" :style="{ width: boxWidth(len),transform: translateX }" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)">\
										<li v-for="(i,index) in datas.imgs" v-if="!i.cover" :style="{ width: liWidth(len) }" @click="openLightBox(index)">\
											<div :style="{backgroundImage: addUrl(i.url)}">\
												<img :src="compress(i.url)" @load="loaded(index)"/>\
											</div>\
										</li>\
									</ul>\
									<ul class="hoverOverlay" v-show="!hoverOverlay">\
										<li @click="prePage" @mousemove="cursor($event)" class="arrowLeft">\
											<div :style="{transform: translate(cursorLeft,cursorTop)}">\
												<div :class="{leftActived: arrowMove}">\
													<div class="aa"></div>\
													<div class="bb"></div>\
													<ul>\
														<span ></span>\
														<li v-for="i in arrowLeftWidth(pagenation)" :style="{width: arrowWidth}"></li>\
													</ul>\
												</div>\
											</div>\
										</li>\
										<li @click="nextPage" @mousemove="cursor($event,true)" class="arrowRight">\
											<div :style="{transform: translate(cursorLeft,cursorTop)}">\
												<div  :class="{rightActived: arrowMove}">\
													<div class="aa"></div>\
													<div class="bb"></div>\
													<ul>\
														<li v-for="i in arrowRightWidth(len - pagenation + 1)" v-if="i > 2" :style="{width: arrowWidth}"></li>\
														<span></span>\
													</ul>\
												</div>\
											</div>\
										</li>\
									</ul>\
								</div>\
								<div class="lightBoxClose" @click="closeLightBox">close</div>\
							</div>\
							<div :class="[colD4,colI12,contentAction,{ actionReady:detailMask}]">\
								<div class="next" @click="nextPage">next</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div :class="[lightBoxOverlay,{lightBoxOverlayOn: overlay}]" :style="{ opacity: OverlayOpacity }"></div>\
			</div>\
	',
	beforeRouteLeave: function(to, from, next) {
		app.noPadding = false;
		next();
	},
	created: function(){
		hub.$emit('backgorundNav');
		this.fetchData();
		this.loadingShowFn();
	},
	mounted: function(){
		document.body.style.backgroundColor = '';
		toTop(0,0);
		maxWidth = document.getElementById('contentImgWrap').offsetWidth*2;
	},
	data: function(){
		return {
			datas: {},
			len: 0,
			translateX: 'translateX(0)',
			pagenation: 1,
			loadedImg: [],
			top: 0,
			left: 0,
			detailMask: true,
			colD3: 'colD3',
			colD4: 'colD4',
			colI12: 'colI12',
			colD12: 'colD12',
			colD8: 'colD8',
			colT8: 'colT8',
			detailHeader: 'detailHeader',
			contentAction: 'contentAction',
			contentCapBox: 'contentCapBox',
			contentImgWrap: 'contentImgWrap',
			contentImgBox: 'contentImgBox',
			contentImg: 'contentImg',
			slideBoxImg: 'slideBoxImg',
			lightBoxOverlay: 'lightBoxOverlay',
			OverlayOpacity: 0,
			overlay: false,
			startX: 0,
			endX: 0,
			imgBoxWidth: 0,
			pos: 0,
			dis: 0,
			noTransition: false,
			loadingShow: false,
			lightBox: false,
			opacity: 1,
			scrollTop: 0,
			turnPage: true,
			cursorLeft: 0,
			cursorTop: 0,
			arrowWidth: 0,
			hoverOverlay: isTouchDevice,
			arrowMove: true,
			returnHome: false,
		}
	},
	methods: {
		loadingShowFn: function(){
			if(!this.datas.length){
				var c = this;
				window.setTimeout(function(){
					c.loadingShow = true;
				},100);
			}
		},
		compress: function(i){
			return i + '?imageView2/0/w/'+maxWidth+'/interlace/1/ignore-error/1';
		},
		addUrl: function(i){
			return 'url('+i+'?imageView2/0/w/'+maxWidth+'/interlace/1/ignore-error/1)';
		},
		boxWidth: function(l){
			return l*100 + '%';
		},
		liWidth: function(l){
			return 100/l + '%';
		},
		fetchData: function(){
			var c = this;
			this.noTransition = true;
			function sub(detailData){
				var min = 0;
				var firstSlide = '';
				var lastSlide = '';
				var data = detailData;
				var images = [];
				for (var i = 0; i < data.imgs.length; i++) {
					if(!data.imgs[i].cover){
						images.push(data.imgs[i]);
					}
				}
				for (var x = 0; x < images.length; x++) {
					if(firstSlide.length === 0){
						firstSlide = images[x];
						min++;
					}
					if(x === images.length - 1){
						lastSlide = images[x];
						min++;
					}
				}
				images.push(firstSlide);
				images.unshift(lastSlide);
				c.datas.company = data.company;
				c.datas.cover = data.cover;
				c.datas.day = data.day;
				c.datas.des = data.des;
				c.datas.id = data.id;
				c.datas.imageAve = data.imageAve;
				c.datas.month = data.month;
				c.datas.tag = data.tag;
				c.datas.title = data.title;
				c.datas.year = data.year;
				c.datas.imgs = images;
				c.len = c.datas.imgs.length;
				c.arrowWidth = Math.round(80/(c.len-2)) + 'px';
				c.translateX = 'translateX(-'+c.pagenation*100/c.len+'%)';
				analytics.send({
				    event: 'products',
				    attr: {
				        name: data.title,
				        id: data.id,
				    },
				}, function(result) {
				    // if (result) {
				    //     console.log('统计数据发送成功！');
				    // }
				});
				window.setTimeout(function(){
					c.noTransition = false;
				},200);
				window.clearInterval(postQueryInterval);
			}
			function postQuery(){
				if(app){
					if(app.postQueryed){
						if(app.detailData.title){
							sub(app.detailData);
						}else{
	            			var url = c.$route.params.title;
	            			// var url = post.replace("-"," ");
	            			if(url){
	            				var noData = true;
								for (var i = 0; i < allList.length; i++) {
									if(allList[i].url === url){
										noData = false;
										c.returnHome = true;
										sub(allList[i]);
										break;
									}
								}
								if(noData){
	            					window.clearInterval(postQueryInterval);
	            					router.push('/');
								}
	            			}else{
								window.clearInterval(postQueryInterval);
	            				router.push('/');
	            			}
						}
					}
				}
			}
			var postQueryInterval = window.setInterval(postQuery,10);
		},
		cursor: function(e,right){
			var marginLeft = e.target.offsetParent.offsetParent.offsetLeft+e.target.offsetParent.offsetParent.offsetParent.offsetParent.offsetLeft+e.target.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetLeft;
			var marginTop = e.target.offsetParent.offsetParent.offsetTop+e.target.offsetParent.offsetParent.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop - 10;
			var half = 0;
			if(right){
				half = e.target.offsetWidth;
			}
			// console.dir(e.target.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop);
			this.cursorLeft = e.clientX - marginLeft - half + 'px';
			this.cursorTop = e.clientY - marginTop + 'px';
		},
		arrowRightWidth: function(i){
			if(i === 2){
				return this.len;
			}else{
				return i;
			}
		},
		arrowLeftWidth: function(i){
			if(i === 0){
				return this.len - 2;
			}else{
				return i;
			}
		},
		translate: function(x,y){
			return 'translate('+x+','+y+')';
		},
		nextPage: function(){
			if(this.turnPage){
				this.pagenation++;
				this.arrowMove = false;
				var duration = 600;
				if(this.lightBox){
					duration = 200;
				}
				var c = this;
				if(this.pagenation === this.len - 1){
					window.setTimeout(function(){
						c.turnPage = false;
						c.noTransition = true;
						c.pagenation = 1;
						c.translateX = 'translateX(-'+c.pagenation*100/c.len+'%)';
						window.setTimeout(function(){
							c.noTransition = false;
							c.turnPage = true;
						},20);
					},duration);
				}
				this.translateX = 'translateX(-'+this.pagenation*100/this.len+'%)';
				window.setTimeout(function(){
					c.arrowMove = true;
				},100);
			}
		},
		prePage: function(){
			if(this.turnPage){
				this.pagenation--;
				this.arrowMove = false;
				var duration = 600;
				if(this.lightBox){
					duration = 100;
				}
				var c = this;
				if(this.pagenation === 0){
					window.setTimeout(function(){
						c.turnPage = false;
						c.noTransition = true;
						c.pagenation = c.len - 2;
						c.translateX = 'translateX(-'+c.pagenation*100/c.len+'%)';
						window.setTimeout(function(){
							c.noTransition = false;
							c.turnPage = true;
						},20);
					},duration);
				}
				this.translateX = 'translateX(-'+this.pagenation*100/this.len+'%)';
				window.setTimeout(function(){
					c.arrowMove = true;
				},100);
			}
		},
		touchstart: function(e){
			this.startX = e.pageX;
			var $imgBox = document.getElementById('contentImg');
			this.imgBoxWidth = $imgBox.clientWidth;
			var imgWidth = this.imgBoxWidth/this.len;
			this.pos = this.pagenation*imgWidth;
			this.translateX = 'translateX(-'+this.pos+'px)';
			this.noTransition = true;
		},
		touchmove: function(e){
			var nowX = e.pageX;
			var dis = this.startX - nowX;
			this.dis = dis;
			var translateX = this.pos + this.dis;
			var minus = '-'
			if(translateX < 0){
				minus = '';
				if(this.pagenation === 0){
					translateX = -translateX;
				}
			}
			this.translateX = 'translateX(' + minus + translateX + 'px)';
		},
		touchend: function(e){
			var touchmoveDis = this.imgBoxWidth/this.len/5;
			if(this.dis > touchmoveDis){
				this.nextPage();
			}else{
				this.translateX = 'translateX(-'+this.pagenation*100/this.len+'%)';
			}
			if(this.dis < -touchmoveDis){
				this.prePage();
			}else{
				this.translateX = 'translateX(-'+this.pagenation*100/this.len+'%)';
			}
			this.dis = 0;
			this.noTransition = false;
		},
		loaded: function(index){
			if(index === 0 || index === 1 || index === 2){
				this.loadedImg.push(index);
				if(this.loadedImg.length === 1){
					if(app){
						if(app.detailMaskShow){
							var context = app.detailMaskContext;
							var windowH = window.innerHeight;
							var windowW = window.innerWidth;
							var $bodyPaddingD = 60;
							var $bodyPaddingT = 32;
							var $bodyPaddingP = 16;
							var bottom = $bodyPaddingP;
							if(windowW > 414){
								bottom = $bodyPaddingT;
								if(windowW > 1024){
									bottom = $bodyPaddingD;
								}
							}
							var c = this;
							var $detailWrap = document.getElementById('detailWrap');
							var $detailBox = document.getElementById('detailBox');
							var $imgBox = document.getElementById('contentImg');
							var $ImgWrap = document.getElementById('contentImgBox');
							var $li = $imgBox.childNodes;
							var $img;
							for (var i = 0; i < $li.length; i++) {
								if($li[i].nodeName === 'LI'){
									$img = $li[i].childNodes[0];
									break;
								}
							}
							var h = $img.clientHeight;
							var w = $img.clientWidth;
							var left = $img.offsetLeft + $detailBox.offsetLeft + $ImgWrap.offsetLeft + $detailWrap.offsetLeft;
							// var top = windowH - bottom - h;
							var top = $img.offsetParent.offsetParent.offsetTop+$img.offsetParent.offsetParent.offsetParent.offsetTop + $img.offsetParent.offsetParent.offsetParent.offsetParent.offsetParent.offsetTop;
							var oldLeft = app.detailMaskLeft;
							var oldTop = app.detailMaskTop;
							var oldW = app.detailMaskWidth;
							var oldH = app.detailMaskHeight;
							var duration = 150;
							var frame = 10;
							var start = 0;
							var loop = duration/frame;
							var disLeft = (left - oldLeft)/loop;
							var disTop = (top - oldTop)/loop;
							var disW = (w - oldW)/loop;
							var disH = (h - oldH)/loop;
							context.beginPath();
							function draw(){
								oldLeft = oldLeft + disLeft;
								oldTop = oldTop + disTop;
								oldW = oldW + disW;
								oldH = oldH + disH;
								context.clearRect(0,0,context.canvas.width,context.canvas.height);
								context.fillRect(oldLeft, oldTop, oldW, oldH);
								context.fill();
								start++;
								if(start >= loop){
									window.clearInterval(drawInterval);
									app.detailMaskShow = false;
									c.detailMask = false;
									c.$emit('update:no-padding', true);
									window.setTimeout(function(){
										app.zIndex2 = -1;
									},400);
								}
							}
							var drawInterval = window.setInterval(draw,frame);
						}else{
							this.detailMask = false;
							this.$emit('update:no-padding', true);
						}
					}else{
						this.detailMask = false;
						this.$emit('update:no-padding', true);
					}
				}
			}
		},
		openLightBox: function(index){
			var windowW = window.innerWidth;
			if(windowW < 415){
				var c = this;
				c.overlay = true;
				c.OverlayOpacity = 1;
				var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
				c.scrollTop = scrollTop;
				console.log(document.body.style.backgroundColor);
				document.body.style.backgroundColor = '#000000';
				window.setTimeout(function(){
					c.noTransition = true;
					c.pagenation = index;
					c.translateX = 'translateX(-'+index*100/c.len+'%)';
					c.opacity = 0;
					window.setTimeout(function(){
						c.lightBox = true;
					},100);
				},200);
			}
		},
		closeLightBox: function(){
			document.body.style.backgroundColor = '';
			this.lightBox = false;
			this.overlay = false;
			this.noTransition = true;
			this.pagenation = 0;
			this.translateX = 'translateX(-'+0+'%)';
			var c = this;
			window.setTimeout(function(){
				toTop(0,c.scrollTop);
			},0);
			window.setTimeout(function(){
				c.opacity = 1;
			},200);
			window.setTimeout(function(){
				c.OverlayOpacity = 0;
			},400);
		},
		retrun: function(){
			this.detailMask = true;
			this.opacity = 0;
			var c = this;
			window.setTimeout(function(){
				if(!c.returnHome){
					router.go(-1);
				}else{
					router.push('/');
				}
				app.beforeRoute = true;
				app.readyRoute = true;
			},200);
		},
	},
	destroyed: function(){
		app.detailData = {};
		this.returnHome = false;
	}
}






