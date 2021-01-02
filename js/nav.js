var navigation = {
	props : ['navMaskFull'],
	template: '\
		<nav :class="{backgorundNav: backgorundNav,navActived: navActived,navToBottom: navMaskFull}">\
			<div class="mask"></div>\
			<div :class="[navBox,{navWhite: navWhite}]">\
				<div>\
					<ul class="navMenu">\
						<li v-for="(i,index) in menu" :class="li(index)" @mousedown.left="transport($event,i)" @mouseup="fill($event,i)">\
							<router-link :to="{ name: i}">\
								<div class="text">{{i}}</div>\
								<div class="line"></div>\
							</router-link>\
						</li>\
					</ul>\
					<div class="logo" @mousedown.left="transport($event)" @mouseup="fill($event)">\
						<router-link to="/">\
							<div><p>bad</p><p>bbb</p></div>\
							<div><p>studio</p><p>design</p></div>\
						</router-link>\
					</div>\
					<ol class="menuIcon" @click="menuOpen">\
						<li class="menuIconTop"></li>\
						<li class="menuIconMiddle"></li>\
						<li class="menuIconBottom"></li>\
					</ol>\
				</div>\
			</div>\
		</nav>\
	',
	created: function(){
		var c = this;
		hub.$on('navWhite', function () {
			c.navWhite = true;
		});
		hub.$on('navBlack', function () {
			c.navWhite = false;
		});
		hub.$on('navClose', function () {
			c.navActived = false;
		});
		// hub.$on('noBackgorund', function () {
		// 	c.backgorundNav = false;
		// });
		// hub.$on('backgorundNav', function () {
		// 	c.backgorundNav = true;
		// });
		hub.$on('fillUp', function (e) {
			c.fill(e,c.route,true);
		});
	},
	data: function(){
		return {
			menu: ['work','lab','about','contact'],
			navBox: 'navBox',
			navWhite: false,
			backgorundNav: false,
			navActived: false,
			openInterval: null,
			tranColor: ['#f4eae9','#eff4f8','#fffde1','#f6edf2','#eeeef6'],
			colorIndex: 0,
			radius: 0,
			x: 0,
			y: 0,
			color: '',
			startInterval: null,
			transportInterval: null,
			leaveInterval: null,
			scrollInterval: null,
			context: null,
			transporting: false,
			route: '',
		}
	},
	methods: {
		menuOpen: function(){
			if(!this.navActived){
				this.navActived = true;
				app.navMaskHalf = true;
				// this.navWhite = true;
			}else{
				this.navActived = false;
				app.navMaskHalf = false;
				// this.navWhite = false;
			}
		},
		li: function(index){
			return 'navLi'+index;
		},
		transport: function(e,route){
			var windowH = window.innerHeight;
			var windowW = window.innerWidth;
			var sameRoute = false;
			var transport = true;
			if(router.currentRoute.name === route){
				sameRoute = true;
			}
			if(router.currentRoute.name === 'home' && typeof(route)=="undefined"){
				sameRoute = true;
			}
			if(windowW < 415){
				//cell phone
				transport = false;
			}
			if(!route && !this.navActived){
				//go home
				transport = true;
			}
			if(!this.transporting && transport){
				this.route = route;
				this.$emit('transport');
				var canvas = document.getElementById('transport');
				var y = e.clientY;
				var x = e.clientX;
				this.x = x;
				this.y = y;
				var windowR = Math.sqrt((windowH)*(windowH)+windowW*windowW);
				var context = canvas.getContext('2d');
				this.context = context;
				var radius = 5;
				if(sameRoute){
					var radius = 0;
				}
				window.clearInterval(this.transportInterval);
				canvas.width = windowW;
				canvas.height = windowH;
				var a = 1;
				var color = this.tranColor[this.colorIndex];
				this.color = color;
				context.fillStyle = color;
				context.strokeStyle = color;
				this.colorIndex++;
				if(this.colorIndex > this.tranColor.length - 1){
					this.colorIndex = 0;
				}
				if(sameRoute){
					context.fillStyle = '#eeeeee';
					context.strokeStyle = '#eeeeee';
					this.color = '#eeeeee';
				}
				context.beginPath();
				var c = this;
				function transportStart(){
					radius = radius + a;
					c.radius = radius;
					context.arc(x, y, radius, 0, Math.PI*2);
					context.fill();
					if(sameRoute){
						windowR = 30/4;
					}
					if(radius > windowR/4){
						window.clearInterval(c.startInterval);
						window.setTimeout(function(){
							c.fill(e,route,true);
						},100);
					}
				}
				var startInterval = window.setInterval(transportStart,1000/60);
				c.startInterval = startInterval;
			}
		},
		fill: function(e,route,gotoRoute){
			app.stayScroll = 0;
			var windowH = window.innerHeight;
			var windowW = window.innerWidth;
			var sameRoute = false;;
			var noFill = true;
			if(router.currentRoute.name === route){
				sameRoute = true;
			}
			if(router.currentRoute.name === 'home' && typeof(route)=="undefined"){
				sameRoute = true;
			}
			if(sameRoute){
				slideToTop();
			}
			if(typeof(route)=="undefined" && !this.navActived && windowW < 415){
				noFill = false;
			}
			if(windowW < 415){
				if(noFill){
					if(!sameRoute){
						var c = this;
						function routeGo(){
							app.readyRoute = false;
							app.navMaskFull = true;
							app.beforeRoute = true;
							window.setTimeout(function(){
								app.navMaskFull = false;
								app.navMaskHalf = false;
								c.navActived = false;
								app.readyRoute = true;
							},350);
						}
						if(typeof(route)=="undefined"){
							if(app.navMaskHalf){
								 routeGo();
							}else{
								app.readyRoute = true;
								app.beforeRoute = true;
							}
						}else{
							routeGo();
						}
					}else{
						app.navMaskHalf = false;
						this.navActived = false;
					}
					return false;					
				}
			}
			//app.zIndex > 0 避免一直左键后，mouseup触发两次fill()
			if(!this.transporting && app.zIndex > 0){
				this.transporting = true;
				this.$emit('transport');
				var y = this.y;
				var x = this.x;
				var windowR = Math.sqrt((windowH-y)*(windowH-y)+windowW*windowW);
				var context = this.context;
				window.clearInterval(this.startInterval);
				window.clearInterval(this.transportInterval);
				var a = 1;
				if(sameRoute){
					a = 1.6;
				}
				var b = 2;
				var radius = this.radius;
				context.fillStyle = this.color;
				context.strokeStyle = this.color;
				var c = this;
				function transportLeave(){
					context.arc(x, y, radius, 0, Math.PI*2);
					context.clearRect(0,0,context.canvas.width,context.canvas.height);
					context.fill();
					context.beginPath();
					// b = b + 1;
					if(!sameRoute){
						// b = b * 1.03;
						if(radius < windowR/2){
							if(radius < windowR/3){
								if(radius < windowR/8){
									if(radius < windowR/16){
										if(radius < windowR/32){
											if(radius < windowR/64){
												b = 3;
											}else{
												b = 5;
											}
										}else{
											b = 18;
										}
									}else{
										b = 27;
									}
								}else{
									b = 36;
								}
							}else{
								b = 45;
							}
						}else{
							b = 54;
						}
						if(!noFill){
							// cell phone go home
							b = b/2;
						}
					}else{
						b = b *0.98;
					}
					radius = radius - b;
					if(radius < 0){
						radius = 0;
						window.clearInterval(c.leaveInterval);
						app.zIndex = -1;
						app.transportLeave = false;
						c.transporting = false;
						context.clearRect(0,0,context.canvas.width,context.canvas.height);
					}
				}
				function transport(){
					if(sameRoute){
						a = a * 0.99;
					}else{
						if(windowW > 1920){
							a = a * 1.15;
						}else{
							if(noFill){
								a = a * 1.1;
							}else{
								a = a * 1.08;
							}
						}
					}
					radius = radius + a;
					context.arc(x, y, radius, 0, Math.PI*2);
					context.fill();
					if(sameRoute){
						windowR = 30;
					}
					if(radius > windowR){
						window.clearInterval(c.transportInterval);
						if(gotoRoute){
							if(route){
								router.push(route);
							}else{
								router.push('/');
							}
						}
						if(!sameRoute){
							app.readyRoute = true;
						}
						radius = windowR;
						window.setTimeout(function(){
							var leaveInterval = window.setInterval(transportLeave,10);
							c.leaveInterval = leaveInterval;
						},200);
					}
				}
				var transportInterval = window.setInterval(transport,10);
				c.transportInterval = transportInterval;
				app.beforeRoute = true;
			}
		},
	}
}

var background = {
	template: '\
		<div class="whiteBackground" v-show="backgorundNav"></div>\
	',
	created: function(){
		var c = this;
		hub.$on('backgorundNav', function () {
			c.backgorundNav = true;
		});
		hub.$on('noBackgorund', function () {
			c.backgorundNav = false;
		});
	},
	data: function(){
		return {
			backgorundNav: false,
		}
	},
	methods: {
		// lanChange: function(){
		// }
	}
}
