var est = 'est.';
var date = '20170401';
var which = 'which is';
var since = new Date(2017,3,1);
var about = {
	template: '\
		<div class="about">\
			<ul class="header colD12">\
				<li>we do design.</li>\
				<li class="lie">only with bold and optimistic mind.</li>\
				<li class="actually">and we wont charge cheap.</li>\
			</ul>\
			<div class="sevicesBox colD12">\
			    <div class="designBox">\
			          <div class="design" title="meeting">\
			                <ul class="meeting">\
			                      <li class="meeting1"></li>\
			                      <li class="meeting2"></li>\
			                </ul> \
			          </div>\
			    </div>\
			    <div class="strategyBox">\
			          <div class="strategy" title="strategy">\
			                <ul class="survey">\
			                      <li class="survey1"></li>\
			                      <li class="survey2"></li>\
			                      <li class="survey3"></li>\
			                      <li class="survey4"></li>\
			                      <li class="survey5"></li>\
			                </ul>\
			          </div>\
			    </div>\
			    <div class="developmentBox">\
			          <div class="development" title="design">\
			                <ul class="hardWork">\
			                      <li class="hardWork1"></li>\
			                      <li class="hardWork2"></li>\
			                </ul>\
			          </div>\
			    </div>\
			    <div class="creativeBox">\
			          <div class="creative" title="creative">\
			                <ul class="delivery">\
			                      <li class="box1"></li>\
			                      <li class="box2"></li>\
			                      <li class="box3"></li>\
			                      <li class="box4"></li>\
			                      <li class="box5"></li>\
			                      <li class="box6"></li>\
			                </ul>\
			          </div>\
			    </div>\
			</div>\
			<div v-if="0" class="estBox colD3" @mouseenter="age" @mouseleave="leave">\
				<p class="est">{{est}}</p>\
				<p class="date">{{date}}</p>\
			</div>\
			<ul class="aboutFooter colD12">\
				<li>5 reasons why we are better than others</li>\
				<ol>\
					<li v-for="(i,index) in reasons">{{index+1+"."}}&nbsp;{{i}}</li>\
				</ol>\
			</ul>\
		</div>\
	',
	created: function(){
		hub.$emit('noBackgorund');
		hub.$emit('navBlack');
		hub.$emit('navClose');
		hub.$emit('backgorundNav');
		this.$emit('message','Basically, we can do anything.');
	},
	mounted: function(){
		document.body.style.backgroundColor = '';
	},
	data: function(){
		return {
			reasons: ['we love ideas','we keep an open mind','we talk to our clients','we think freely','we never stop explore'],
			est: est,
			date: date,
			which: which,
			leaveCheck: false,
		}
	},
	methods: {
		age: function(){
			this.leaveCheck = false;
			var title = this.est.split("");
			var c = this;
			var a = 0;
			var time = 50;
			for (var i = 0; i < title.length; i++) {
				window.setTimeout(function(){
					if(!c.leaveCheck){
						var q = c.est.split("").slice(0,title.length - i - 1);
						if(a === title.length - 1){
							var which = c.which;
							var len = which.split("").length;
							var s = [];
							var b = 0;
							var z = [0,3,6,7];
							for (var x = 0; x < len; x++) {
								window.setTimeout(function(){
									if(!c.leaveCheck){
										if(b===z[0]||b===z[1]||b===z[2]||b===z[3]){
											s.push(alphabet[parseInt(26*Math.random())]);
											for (var f = 0; f < z.length; f++) {
												var t = 0;
												window.setTimeout(function(){
													if(!c.leaveCheck){
														var k = c.est.split("");
														k[z[t]] = 'which is'.split("")[z[t]];
														c.est = k.join("");
														t++;
													}
												},f*time*3);
											}
										}else{
											s.push(which[b]);
										}
										c.est = s.join("");
										b++;
									}
								},x*time*2);
							}
						}else{
							c.est = q.join("");
						}
						a++;
					}
				},i*time);
			}
			var myDate = new Date();
			var today = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate()).getTime();
			var long = today - since.getTime();
			var days = long/(1000*60*60*24);
			var len = days.toString().length;
			var x = [];
			for (var t = 0; t < len; t++) {
				x.push(0);
			}
			this.date = x.join("")+' years old';
			var m = 0;
			var g = this;
			var setTime = 1000/days;
			for (var y = 0; y < days; y++) {
				window.setTimeout(function(){
					if(!g.leaveCheck){
						var lenlen = len - m.toString().length;
						var w = [];
						if(lenlen > 0){
							for (var e = 0; e < lenlen; e++) {
								w.push(0);
							}
						}
						g.date = w.join("") + m + ' days old';
						m++;						
					}
				},y*setTime);
			}
		},
		leave: function(){
			this.leaveCheck = true;
			this.est = est;
			this.date = date;
			//clear all setTimeout
			var end = setTimeout(function(){},1);
			var start = (end -100)>0?end-100:0;
			for(var i=start;i<=end;i++){
				clearTimeout(i);
			}
		}
	}
}