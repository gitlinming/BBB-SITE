var tellMeName = [
	"I'm B-34, what's your name?",
	"I told mine, you should tell me yours.",
	"I would like to know you first.",
	"Fine, Tom Wlaschiha then. it suit you."
];
var tellMeNameIndex = 0;

var emptyEmail = [
	"Tell me a email, so i can reach you.",
	"I promise i will not annoy you.",
	"Would you please type your email?",
	"Give me your god dame email!!!"
];
var emptyEmailIndex = 0;

var wrongEmail = [
	"Is that a email?",
	"Oh yeah, i sure it's a wrong email.",
	"Real email please.",
	"Seriously, what do you want?"
];
var wrongEmailIndex = 0;

var tellMeProject = [
	"What's in your mind?",
	"Basicly, I can do everything.",
	"Name one, and I will do it for you.",
	"Do you need someone to talk to?"
];
var tellMeProjectIndex = 0;

var seeYouAgain= [
	"What's up, ",
	"Long time no see, ",
	"It's been a while, ",
	"You look good! ",
	"Hey there! ",
	"How's it going ",
	"Good to see you! "
];

function memory(c){
	if(localStorage.me){
		var obj = JSON.parse(localStorage.me);
		var input = '';
		if(obj.name){
			input = obj.name;
			c.questions = seeYouAgain[parseInt(7*Math.random())]+input+'.';
			if(obj.email){
				c.status = 3;
				c.placeholder = "please type your needs here";
				if(!c.glitching){
					window.clearTimeout();		
					window.setTimeout(function(){
						c.status = 3;
						c.submit('How can i help you today?',true);
					},2000);
				}
			}else{
				c.status = 2;
				c.placeholder = "please type your email here";
				if(!c.glitching){
					window.clearTimeout();		
					window.setTimeout(function(){
						c.status = 2;
						c.submit('Could you tell me your email?',true);
					},2000);
				}
			}
		}else{
			input = 'Tom Wlaschiha';
		}
	}else{
		// console.log(c.glitching);
	}
}

var contact = {
	template: '\
		<div class="contact" @touchend="fill">\
			<canvas id="canvasBlack" :class="{canvasTop:spreading,canvasOpened: readyToClose}"></canvas>\
			<ul class="header colD12">\
				<li>we work from 9 AM to 8 PM.</li>\
				<li class="lie">everyday.</li>\
				<li class="actually">actually we dont.</li>\
			</ul>\
			<ul class="contactForm colD12">\
				<li>\
					<h4>small talk</h4>\
					<p><a :href="mailto(hello)">{{hello}}</a></p>\
					<h4>join us</h4>\
					<p><a :href="mailto(join)">{{join}}</a></p>\
				</li>\
				<li>\
					<h4>visit</h4>\
					<p>34A, CR Land Building</p>\
					<p>Nanshan</p>\
					<p>Shenzhen</p>\
				</li>\
				<li>\
					<h4>more works</h4>\
					<p style="display: none;"><a target="_blank" href="https://www.behance.net/BBBStudio" rel="noopener">Bēhance</a></p>\
					<p><a target="_blank" href="https://dribbble.com/bbbstudio" rel="noopener">Dribbble</a></p>\
					<p style="display: none;"><a target="_blank" href="https://www.instagram.com/bbbstud.io/" rel="noopener">Instagram</a></p>\
				</li>\
				<li class="call">\
					<h4>call</h4>\
					<p><a href="tel:+8618675572770">+86 186 7557 2770</a></p>\
				</li>\
			</ul>\
			<div class="sayHiBox colD12" @mouseup="fill">\
				<div :class="[sayHi,{fullBox:full}]">\
					<p id="sayHiClose"  @mousedown.stop="spread" @touchstart="spread" @mouseup="fill">{{sayhi}}</p>\
					<div :class="[mask,{spreading: spreading,full: full,clossing: clossing}]"></div>\
				</div>\
			</div>\
			<div :class="[colD12,aiWrap,{aiWrapShow: aiWrapShow}]">\
				<div class="aiBox">\
					<ul class="aiQ">\
						<li id="question" :data-text="questions">{{questions}}</li>\
					</ul>\
					<ul class="aiA">\
						<input :placeholder="placeholder" v-model="input" @keyup.enter="submit" @focus="focus" @blur="blur" @touchstart="intoView"/>\
						<div :class="{readySubmit: readySubmit}" @click="submit"></div>\
					</ul>\
					<ul :class="[pagenation,statusClass(status)]">\
						<li v-for="(i,index) in 3" @click="goBack(index)">\
							<div></div>\
						</li>\
						<span>done</span>\
					</ul>\
				</div>\
			</div>\
		</div>\
	',
	created: function(){
		hub.$emit('navBlack');
		hub.$emit('navClose');
		hub.$emit('backgorundNav');
		this.$emit('message','Please say hi.');
	},
	mounted: function(){
		document.body.style.backgroundColor = '';
	},
	data: function(){
		return {
			sayHi: 'sayHi',
			hello: 'hello@bbbstud.io',
			join: 'join@bbbstud.io',
			mask: 'mask',
			sayhi: 'say hi',
			spreading: false,
			full: false,
			readyToClose: false,
			clossing: false,
			context: null,
			openInterval: null,
			radius: 0,
			x: 0,
			y: 0,
			colD12: 'colD12',
			aiWrap: 'aiWrap',
			aiWrapShow: false,
			placeholder: 'please type your name here',
			input: '',
			readySubmit: false,
			questions: 'Hi, what is your name?',
			status: 0,
			pagenation: 'pagenation',
			glitching: false,
			stop: false,
		}
	},
	methods: {
		mailto: function(email){
			return 'mailto:' + email;
		},
		spread: function(e){
			if(!this.spreading && !this.full && !this.readyToClose && !this.clossing){
				if(!isTouchDevice){
					if(e.button !== 0){
						return false;
					}
				}
				this.spreading = true;
				var canvasBlack = document.getElementById('canvasBlack');
				var windowH = window.innerHeight;
				var windowW = window.innerWidth;
				canvasBlack.width = windowW;
				canvasBlack.height = windowH;
				canvasBlack.style.width = windowW + 'px';
				canvasBlack.style.height = windowH + 'px';
				var a = 1;
				var context = canvasBlack.getContext('2d');
				this.context = context;
				var h = e.target.offsetHeight;
				var w = e.target.offsetWidth;
				var $sayHiBox = e.target.offsetParent.offsetParent;
				var y = windowH - 100 - h/2;
				var x = $sayHiBox.offsetParent.offsetLeft + $sayHiBox.offsetLeft + w/2 + 12;
				if(windowW < 768){
					y = $sayHiBox.offsetTop + $sayHiBox.offsetParent.offsetTop + h/2;
					x = $sayHiBox.offsetLeft + e.target.offsetParent.offsetLeft + w/2;
					if(windowW < 415){
						var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
						y = $sayHiBox.offsetTop - scrollTop + h + 12;
					}
				}
				this.x = x;
				this.y = y;
				var radius = h*0.5*0.6;
				var half = windowW/2;
				context.fillStyle = '#000';
				context.strokeStyle = '#000';
				var c = this;
				function open(){
					radius = radius + a;
					context.moveTo(x-radius,y-radius);
					context.lineTo(x+radius,y-radius);
					context.lineTo(x+radius,y+radius);
					context.lineTo(x-radius,y+radius);
					context.fill();
					c.radius = radius;
					if(radius > half){
						window.clearInterval(c.openInterval);
					}
				}
				this.openInterval = window.setInterval(open,1000/60);
			}
		},
		fill: function(e){
			if(!this.clossing && this.spreading){
				var Longest = 0;
				if(window.innerWidth > window.innerHeight){
					Longest = window.innerWidth - this.x;
				}else{
					Longest = this.y;
				}
				var c = this;
				var a = 0;
				var x = 0;
				var y = 0;
				var radius = 0;
				var context = this.context;
				if(!this.readyToClose){
					this.full = true;
					this.sayhi = 'close';
					window.clearInterval(this.openInterval);
					a = 1;
					radius = this.radius;
					x = this.x;
					y  =this.y;
					var sqrt = Longest+radius;
					var memoryOnce = false;
					function open1(){
						a = a * 1.2;
						radius = radius + a;
						context.moveTo(x-radius,y-radius);
						context.lineTo(x+radius,y-radius);
						context.lineTo(x+radius,y+radius);
						context.lineTo(x-radius,y+radius);
						context.fill();
						context.fill();
						if(radius > sqrt){
							window.clearInterval(openInterval2);
							c.radius = radius;
							c.readyToClose = true;
						}else if(radius > sqrt/2){
							hub.$emit('navWhite');
						}else if(radius > sqrt/3){
							c.aiWrapShow = true;
							if(!memoryOnce){
								memoryOnce = true;
								c.stop = false;
								c.glitching = false;
								memory(c);
							}
						}
					}
					var openInterval2 = window.setInterval(open1,1000/100);
				}else{
					if(e.target.id === 'sayHiClose'){
						c.clossing = true;
						a = 10;
						x = c.x;
						y  =c.y;
						radius = Longest;
						var canvas = context.canvas;
						var context = canvas.getContext('2d');
						context.fillStyle = '#000';
						context.strokeStyle = '#000';
						function open2(){
							if(radius > 0){
								context.beginPath();
								context.moveTo(x-radius,y-radius);
								context.lineTo(x+radius,y-radius);
								context.lineTo(x+radius,y+radius);
								context.lineTo(x-radius,y+radius);
								context.fill();
								context.clearRect(0,0,context.canvas.width,context.canvas.height);
								context.fill();
								a = a * 1.1;
								radius = radius - a;
								if(radius < Longest){
									c.aiWrapShow = false;
									hub.$emit('navBlack');
								}
							}else{
								context.clearRect(0,0,context.canvas.width,context.canvas.height);
								window.clearInterval(openInterval3);
								c.spreading = false;
								c.full = false;
								c.sayhi = 'say hi';
								c.readyToClose = false;
								c.clossing = false;
								//say hi
								c.status = 0;
								c.input = '';
								c.stop = true;
								c.questions = 'Hi, what is your name?';
								c.placeholder = 'please type your name here';
								tellMeNameIndex = 0;
								wrongEmailIndex = 0;
								tellMeProjectIndex = 0;
								emptyEmailIndex = 0;
							}
						}
						var openInterval3 = window.setInterval(open2,1000/100);						
					}
				}
			}
		},
		unspread: function(){
			this.spreading = false;
		},
		focus: function(){
			this.readySubmit = true;
		},
		blur: function(){
			this.readySubmit = false;
		},
		submit: function(respond,holdCheck,clearCheck){
			if(!this.glitching){
				var c = this;
				this.glitching = true;
				var input = this.input;
				var queArray = this.questions.split("");
				var hold = false;
				var clear = false;
				var send = false;
				var content = '';
				if(clearCheck){
					clear = true;
				}
				if(typeof(respond) == 'string'){
					hold = holdCheck;
				}else{
					if(input.toLowerCase() == 'bye' || input.toLowerCase() == 'goodbye' || input.toLowerCase() == 'bye bye'){
						// 全局回答
						var respond = "Nice to see you anyway!";
						this.status === 3;
					}else{
						if(this.status === 0){
							if(checkBlankSpace(input)){
								if(input.toLowerCase() == 'hi' || input.toLowerCase() == 'hey' || input.toLowerCase() == 'hello'){
									var respond = "You are very polite. Thanks!";
									hold = true;
									clear = true;
								}else{
									var respond = 'Nice to meet you ' + input + '!';
									if(localStorage.me){
										var obj = JSON.parse(localStorage.me);
										obj.name = input;
										localStorage.me = JSON.stringify(obj);
									}else{
										localStorage.me = JSON.stringify({name: input});
									}								
								}
							}else{
								var respond = tellMeName[tellMeNameIndex];
								tellMeNameIndex++;
								hold = true;
								if(tellMeNameIndex > 3){
									if(localStorage.me){
										var obj = JSON.parse(localStorage.me);
										obj.name = 'Tom Wlaschiha';
										localStorage.me = JSON.stringify(obj);
									}else{
										localStorage.me = JSON.stringify({name: 'Tom Wlaschiha'});
									}
									hold = false;
								}
							}
						}else if(this.status === 2){
							if(checkBlankSpace(input)){
								if(input.toLowerCase() == 'no' && wrongEmailIndex != 1){
									var respond = "Please, I'll send awsome something.";
									hold = true;
									clear = true;
								}else if(input.toLowerCase() == 'you'){
									var respond = "Tell me your email and i'm all yours.";
									hold = true;							
								}else{
									if(!checkEmail(input)){
										var respond = wrongEmail[wrongEmailIndex];
										if(wrongEmailIndex > 3){
											var respond = "This is not working, email please.";
										}else{
											wrongEmailIndex++;
										}
										hold = true;
									}else{
										if(localStorage.me){
											var obj = JSON.parse(localStorage.me);
											obj.email = input;
											localStorage.me = JSON.stringify(obj);
										}else{
											localStorage.me = JSON.stringify({name: 'Tom Wlaschiha',email: input});
										}
										// this.input = '';
										this.placeholder = 'please type your needs here';
										var respond = 'What can i do for you?';
									}							
								}		
							}else{
								var respond = emptyEmail[emptyEmailIndex];
								if(emptyEmailIndex > 3){
									var respond = "This is not working, email please.";
								}else{
									emptyEmailIndex++;
								}
								hold = true;					
							}
						}else if(this.status === 3){
							if(checkBlankSpace(input)){
								var respond = 'All set! i will get in touch with you soon.';
								send = true;
								content = input;
								if(localStorage.me){
									var obj = JSON.parse(localStorage.me);
									if(input.toLowerCase() === 'nothing' || input.toLowerCase() === 'nope'){
										this.status = 4;
										var addName = '.';
										if(obj.name){
											addName = ', '+obj.name+'.';
										}
										respond = 'Well, have a nice day'+addName;
										send = false;
									}
								}
							}else{
								var respond = tellMeProject[tellMeProjectIndex];
								if(tellMeProjectIndex < 4){
									tellMeProjectIndex++;
									hold = true;
								}else{
									respond = 'Sorry, i have to answer a phone call.';
								}
							}
						}
					}
				}
				var resArray = respond.split("");
				var len = resArray.length;
				var r = 0;
				if(len < queArray.length){
					queArray.length = len;
					this.questions = queArray.join("");
				}
				function hello(){
					if(!c.stop){
						var goon = true;
						for (var i = 0; i < len; i++) {
							var lastQuestions = c.questions;
							var array = lastQuestions.split("");
							if(array[i] != resArray[i]){
								array[i] = alphabet[parseInt(27*Math.random())];
								c.questions = array.join("");
								if(r === 3){
									if(i%3){
										array[i] = resArray[i];
										c.questions = array.join("");
									}
								}
								if(r === 6){
									if(i%4){
										array[i] = resArray[i];
										c.questions = array.join("");
									}
								}
								if(r === 9){
									if(i%5){
										array[i] = resArray[i];
										c.questions = array.join("");
									}
								}
								if(r === 12){
									if(i%7){
										array[i] = resArray[i];
										c.questions = array.join("");
									}
								}
								if(r === 13){
									if(i === 0){
										array[i] = resArray[i];
										c.questions = array.join("");
									}
								}
								if(r === 80){
									array[i] = resArray[i];
									c.questions = array.join("");
								}
							}else{
								if(c.questions == respond && goon){
									window.clearInterval(t1);
									if(clear){
										c.input = '';
										clear = false;
									}
									if(!hold){
										if(c.status > 1){
											c.input = '';
										}
										if(c.status === 0){
											goon = false;
											window.setTimeout(function(){
												c.status = 1;
												c.glitching = false;
												c.submit('Could you tell me your email?',false,true);
												c.glitching = false;
												c.placeholder = 'please type your email here';
											},2000);
										}else if(c.status === 1){
											c.status = 2;
											hold = true;
											c.glitching = false;
										}else if(c.status === 2){
											c.status = 3;
											goon = false;
											c.glitching = false;
										}else if(c.status === 3){
											c.status = 4;
											goon = false;
											if(send){
												if(localStorage.me){
													var sendObj = JSON.parse(localStorage.me);
													// var sendTo = 'yolricha%40yahoo.com%3b850820403%40qq.com';
													var sendTo = 'hello%40bbbstud.io%3b850820403%40qq.com';
													var name = sendObj.name;
													var caption = content;
													var email = sendObj.email;
													sendEmail(c,sendTo,email,caption,name);
												}
											}
											window.setTimeout(function(){
												c.status = 4;
												c.glitching = false;
												c.submit('Bye, See you around.',false);
											},2500);
										}else if(c.status === 4){
											goon = false;
											var e = {target:{id:'sayHiClose'}};
											window.setTimeout(function(){
												c.glitching = false;
												c.fill(e);
											},3000);
										}
									}else{
										c.glitching = false;
									}
								}
							}
						}
						r++;
					}else{
						window.clearInterval(t1);
					}
				}
				var t1 = window.setInterval(hello,100);
			}else{
				return false;
			}
		},
		statusClass: function(status){
			return 'status'+status;
		},
		goBack: function(index){
			var index = index + 1;
				if(this.status === 3 && this.questions != 'How can i help you today?'){
					return false;
				}
			if(index < this.status){
				if(index === 2){
					this.status = 2;
					this.submit('Could you tell me your email?',true);
					this.input = '';
					this.placeholder = 'please type your email here';
				}else if(index === 1){
					this.status = 0;
					this.submit('Hi, what is your name?',true);
					this.input = '';
					this.placeholder = 'please type your name here';
				}
			}
		},
		intoView: function(){
			document.getElementById("question").scrollIntoView(true); 
		}
	},
};