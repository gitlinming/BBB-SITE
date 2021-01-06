var home = {
	props : ['helloEmail','msgTop'],
	template: '\
		<div class="index" @touchend="fill">\
				<canvas id="canvas" @mouseup="unspread" :style="{zIndex: zIndex,display: display}"></canvas>\
				<canvas id="canvasBlack" :class="{canvasTop:spreading}"></canvas>\
				<ul class="colD12 intro">\
					<li v-for="i in whoWeAre">{{i}}</li>\
				</ul>\
				<div :class="[colD12,colDP4,clear,{clearShow: clearShow}]" @click="clearCanvas">clear</div>\
				<div :class="[colD12,colDP4,clear,{clearShow: !clearShow},{dragNoShow: clearShow},drag]" @click="clearCanvas">Click and drag your mouse</div>\
				<div class="contactUsIndex" v-show="contactUs">\
					<h1>请联系</h1>\
					<p><a :href="mailto(helloEmail)">{{helloEmail}}</a></p>\
				</div>\
				<div class="cnBox">\
					<div id="cn" class="cn" @mousedown.stop="spread" @touchstart="spread" @mouseup="fill">{{chinese}}</div>\
					<div :class="[mask,{spreading: spreading,full: full,clossing: clossing}]"></div>\
				</div>\
		</div>\
	',
	created: function(){
		console.log(this);
		if(localStorage.movement){
			var localMovement = JSON.parse(localStorage.movement); 
			if(localMovement){
				this.$emit('message','crazy.');
				if(!localMovement.path){
					localStorage.removeItem('movement');
				}
			}			
		}else{
			this.$emit('message','Click and drag your mouse and do something crazy.');
		}
		function myBrowser(){
		    var userAgent = navigator.userAgent; //get userAgent
		    var isOpera = userAgent.indexOf("Opera") > -1;
		    if (isOpera) {
		        return "Opera"
		    } //if Opera
		    if (userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    } //if Firefox
		    if (userAgent.indexOf("Chrome") > -1){
		  return "Chrome";
		 }
		    if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    } //if Safari
		    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		        return "IE";
		    } //if IE
		}

		//safari disabled viewprot scale
		var mb = myBrowser();
		if ("Safari" == mb) {
		  window.onload=function () { 
		      document.addEventListener('touchstart',function (event) { 
		          if(event.touches.length>1){ 
		              event.preventDefault(); 
		          } 
		      });
		      var lastTouchEnd=0; 
		      document.addEventListener('touchend',function (event) { 
		          var now=(new Date()).getTime(); 
		          if(now-lastTouchEnd<=300){ 
		              event.preventDefault(); 
		          } 
		          lastTouchEnd=now; 
		      },false);
		  }
		}
		hub.$emit('navBlack');
		hub.$emit('noBackgorund');
		hub.$emit('navClose');
	},
	mounted: function(){
		document.body.style.backgroundColor = '';
		this.canvas();
		var c = this;
		function indexResize(){
			if(c.resizeAble){
				c.display = 'none';
				clearAllTimeout();
				var resizeTime = setTimeout(function(){
					c.canvas();
				},400);				
			}else{
				window.removeEventListener('resize', indexResize ,false);
			}
		}
		window.addEventListener('resize', indexResize ,false);
	},
	data: function(){
		return {
			mask: 'mask',
			whoWeAre: ['we are creators.','bold and optimistic.','we don’t obey any single set of rules.'],
			spreading: false,
			full: false,
			readyToClose: false,
			chinese: '汉',
			clossing: false,
			context: null,
			openInterval: null,
			// scale: 'scale(1, 1)',
			radius: 0,
			x: 0,
			y: 0,
			contactUs: false,
			zIndex: 1,
			clear: 'clear',
			colD12: 'colD12',
			colDP4: 'colDP4',
			drag: 'drag',
			clearShow: false,
			display: 'none',
			resizeAble: true,
		}
	},
	methods: {
		mailto: function(email){
			return 'mailto:'+email;
		},
		clearCanvas: function(){
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			var a = 0;
			var dis = 60;
			var c = this;
			if(window.innerWidth > 414){
				for (var i = 0; i < canvas.width/dis; i++) {
					window.setTimeout(function(){
						a = a + dis;
						context.clearRect(canvas.width-a,0,a,canvas.height);
						if(a > canvas.width - dis*10){
							localStorage.removeItem('movement');
							c.clearShow = false;
						}
					},i*16);
				}
			}else{
				for (var i = 0; i < canvas.height/dis; i++) {
					window.setTimeout(function(){
						a = a + dis;
						context.clearRect(0,0,canvas.width,a);
						if(a > canvas.height - dis*10){
							localStorage.removeItem('movement');
							c.clearShow = false;
						}
					},i*16);
				}
			}
			this.$emit('message','Drag your mouse and do something crazy.');
		},
		canvas: function(){
			this.display = 'block';
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');		
			var radius = 24;
			var dragging = false;
			var component = this;
			canvas.width = window.innerWidth*2;
			canvas.height = window.innerHeight*2;
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			// context.lineWidth = radius * 2;
			// var color = ['#114BAF','#FA5A3C','#F1C3D6'];
			var color = ['blue','red','#f6f6f6'];
			var colorIndex = 0;
			var movement = {path: []};
			function fill(x,y,noPush,engage){
				context.beginPath();
				context.arc(x, y, radius, 0, Math.PI*2);
				context.fillStyle = color[colorIndex];
				context.strokeStyle = color[colorIndex];
				// context.shadowBlur=1;
				// context.shadowColor="#fff";
				colorIndex += 1;
				if(colorIndex > 2){
					colorIndex = 0;
				}
				context.fill();
				if(!engage){
					engage = false;
				}
				if(!noPush){
					movement.path.push({x: x,y: y,engage: engage});
				}
			}
			var autoDrawing = false;
			var drawing = function(e,engage,local){
				if(dragging||local){ 
					var x = e.clientX*2;
					var y = e.clientY*2;
					if(isTouchDevice){
						x = e.pageX*2;
						y = e.pageY*2;
					}
					// context.lineTo(x, y);
					// context.stroke();
					if(movement.path.length > 0 && !engage){
						var distanceX = x - movement.path[movement.path.length-1].x;
						var distanceY = y - movement.path[movement.path.length-1].y;
						var unit = 2;
						var unitX = unit;
						if(distanceX < 0){
							distanceX = -distanceX;
							unitX = -unitX;
						}
						// var unitY = distanceY*2/distanceX;
						var unitY = unit;
						if(distanceY < 0){
							distanceY = -distanceY;
							unitY = -unitY;
						}
						if(distanceX < 10 && distanceY < 10){
							fill(x, y);
						}else{
							if(distanceX >= distanceY){
								var figure = (y - movement.path[movement.path.length-1].y)*2/distanceX;
								for (var i = 0; i < distanceX; i++) {
									if(i%2 && i%3 && i%7 && i%9){
										if(distanceX > unit*i){
											fill(movement.path[movement.path.length-1].x + unitX*i, movement.path[movement.path.length-1].y + figure*i, true);
										}
									}
								}
							}else{
								var figure = (x - movement.path[movement.path.length-1].x)*2/distanceY;
								for (var i = 0; i < distanceY; i++) {
									if(i%2 && i%3 && i%7 && i%9){
										if(distanceY > unit*i){
											fill(movement.path[movement.path.length-1].x + figure*i, movement.path[movement.path.length-1].y + unitY*i, true);
										}
									}
								}
							}
							fill(x, y);
						}
					}else{
						fill(x, y, false, engage);
					}
					// context.beginPath();
					// context.lineCap="round";
					// context.lineJoin="round";
					// context.moveTo(x, y);
				}
				if(isTouchDevice && !local){
					e.preventDefault();
				}
			};
			var hasLocalMovement = false;
			if(localStorage.movement){
				hasLocalMovement = true;
				var localMovement = JSON.parse(localStorage.movement); 
				var engageCheck = false
				var blinkInterval;
				function blink(){
					var engageCheck2 = false;
					for (var i = 0; i < localMovement.path.length; i++) {
						var dot = localMovement.path[i];
						if(i === 0){
							engageCheck2 = true;
						}else{
							engageCheck2 = dot.engage;
						}
						drawing({clientX: dot.x/2, clientY: dot.y/2, pageX: dot.x/2, pageY: dot.y/2},engageCheck2,true);
						if(i === (localMovement.path.length - 1)){
							drawing({clientX: dot.x/2, clientY: dot.y/2, pageX: dot.x/2, pageY: dot.y/2},engageCheck2,true);
						}
					}
				}
				var nowW = window.innerWidth;
				var nowH = window.innerHeight;
				function autoDraw(c,dot,engageCheck,finished,localMovement){
					var oldW = localMovement.windowW;
					var oldH = localMovement.windowH;
					var disX = nowW - oldW;
					var disY = nowH - oldH;
					var aa = 18*c - c*2;
					if(isTouchDevice){
						aa = 24*c - c*2;
					}
					var t = setTimeout(function(){
						drawing({clientX: dot.x/2 + disX/2, clientY: dot.y/2 + disY/2, pageX: dot.x/2, pageY: dot.y/2},engageCheck,true);
						if(finished){
							autoDrawing = false;
							//clearShow after autoDraw
							// component.clearShow = true;
							// blinkInterval = window.setInterval(blink,80);
						}
					},aa);
				}
				for (var i = 0; i < localMovement.path.length; i++) {
					var dot = localMovement.path[i];
					var finished = false;
					if(i === 0){
						autoDrawing = true;
						engageCheck = true;
					}else{
						engageCheck = dot.engage;
					}
					if(i === (localMovement.path.length - 1)){
						finished = true;
					}
					autoDraw(i,dot,engageCheck,finished,localMovement);					
				}
			}
			var engage = function(e){
				function putPoint(){
					component.zIndex = 99;
					if(hasLocalMovement){
						context.clearRect(0,0,canvas.width,canvas.height);
						movement = {path: []};
						// localStorage.movement = JSON.stringify(movement);
						localStorage.removeItem('movement');
						hasLocalMovement = false;
						window.clearInterval(blinkInterval);
					}
					if(!component.clearShow){
						movement = {path: []};
						// localStorage.movement = JSON.stringify(movement);
						localStorage.removeItem('movement');
					}
					dragging = true;
					drawing(e,true);
				}
				if(!autoDrawing){
					if(isTouchDevice){
						putPoint();
					}if(e.button === 0){
						putPoint();
					}
				}
			}
			var disengage = function(e){
				if(!autoDrawing){
					dragging = false;
					context.beginPath();
					movement.windowW = window.innerWidth;
					movement.windowH = window.innerHeight;
					localStorage.movement = JSON.stringify(movement);
					component.$emit('message','crazy.');
					component.zIndex = 1;
					// var data = canvas.toDataURL();
				}
				component.clearShow = true;
			}
			if(isTouchDevice){
				canvas.addEventListener('touchstart',engage);
				canvas.addEventListener('touchmove',drawing);
				canvas.addEventListener('touchend',disengage);				
			}else{
				canvas.addEventListener('mousedown',engage);
				canvas.addEventListener('mousemove',drawing);
				canvas.addEventListener('mouseup',disengage);				
			}
		},
		spread: function(e){
			if(!this.spreading && !this.full && !this.readyToClose && !this.clossing){
				if(!isTouchDevice){
					if(e.button !== 0){
						return false;
					}
				}
				this.spreading = true;
				// var scale = window.innerWidth/18 - 1;
				// this.scale = 'scale('+scale+', '+scale+')';
				var windowH = window.innerHeight;
				var windowW = window.innerWidth;
				var canvasBlack = document.getElementById('canvasBlack');
				canvasBlack.width = windowW;
				canvasBlack.height = windowH;
				canvasBlack.style.width = windowW + 'px';
				canvasBlack.style.height = windowH + 'px';
				var a = 1;
				var context = canvasBlack.getContext('2d');
				this.context = context;
				var parent = e.target.offsetParent;
				var h = e.target.offsetHeight;
				var w = e.target.offsetWidth;
				var y = windowH - 48 - h/2;
				var x = parent.offsetLeft + w/2 + parent.offsetParent.offsetLeft;
				var radius = h*0.5*0.5;
				var half = window.innerWidth/2;
				this.x = x;
				this.y = y;
				context.fillStyle = '#000';
				context.strokeStyle = '#000';
				context.beginPath();
				var c = this;
				function open(){
					radius = radius + a;
					context.arc(x, y, radius, 0, Math.PI*2);
					context.fill();
					c.radius = radius;
					if(radius > half){
						window.clearInterval(c.openInterval);
					}
				}
				this.openInterval = window.setInterval(open,10);
			}
		},
		fill: function(e){
			if(!this.clossing && this.spreading){
				if(!this.readyToClose){
					this.full = true;
					// var scale = window.innerWidth/18;
					this.chinese = '关';
					window.clearInterval(this.openInterval);
					var c = this;
					var a = 1;
					var radius = this.radius;
					var x = this.x;
					var y  =this.y;
					var sqrt = Math.sqrt(x*x+y*y) + 360;
					var context = this.context;
					function open1(){
						a = a * 1.16;
						radius = radius + a;
						context.arc(x, y, radius, 0, Math.PI*2);
						context.fill();
						if(radius > sqrt){
							window.clearInterval(openInterval2);
							c.radius = radius;
							c.readyToClose = true;
						}else if(radius > sqrt/2){
							c.contactUs = true;
							if(radius > sqrt*4/5){
								hub.$emit('navWhite');
							}
						}
					}
					var openInterval2 = window.setInterval(open1,10);
				}else{
					if(e.target.id === 'cn'){
						var c = this;
						c.clossing = true;
						var a = 1;
						var x = c.x;
						var y  =c.y;
						var sqrt = Math.sqrt(x*x+y*y);
						var radius = sqrt;
						var context = this.context;
						var canvas = context.canvas;
						var context = canvas.getContext('2d');
						context.fillStyle = '#000';
						context.strokeStyle = '#000';
						function open2(){
							if(radius > 0){
								context.beginPath();
								context.arc(x, y, radius, 0, Math.PI*2);
								context.clearRect(0,0,context.canvas.width,context.canvas.height);
								context.fill();
								a = a * 1.15;
								radius = radius - a;
								if(radius < sqrt/2){
									c.contactUs = false;
									hub.$emit('navBlack');
								}
							}else{
								context.clearRect(0,0,context.canvas.width,context.canvas.height);
								window.clearInterval(openInterval3);
								c.spreading = false;
								c.full = false;
								c.chinese = '汉';
								c.readyToClose = false;
								c.clossing = false;
							}
						}
						var openInterval3 = window.setInterval(open2,10);
					}
				}
			}
		},
		unspread: function(){
			this.spreading = false;
		}
	},
	destroyed: function(){
		this.resizeAble = false;
	}
};