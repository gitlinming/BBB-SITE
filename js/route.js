var router = new VueRouter({
	// mode: 'history',
	routes: [
		{
			name: 'home',
			path: '/',
			component: home,
		},
		{
			name: 'home2',
			path: '/index.html',
			component: home,
		},
		{
			name: 'about',
			path: '/about',
			component: about,
		},
		{
			name: 'contact',
			path: '/contact',
			component: contact,
		},
		{
			name: 'lab',
			path: '/lab',
			component: lab,
		},
		{
			name: 'labDetail',
			path: '/lab/:title',
			component: detail,
		},
		{
			name: 'work',
			path: '/work',
			component: work,
		},
		{
			name: 'workDetail',
			path: '/work/:title',
			component: detail,
		},
		// {
		// 	name: 'detail',
		// 	path: '/detail/:title',
		// 	component: detail,
		// },
	],
	// scrollBehavior (to, from, savedPosition) {
	// 	if (savedPosition) {
	// 		return savedPosition
	// 	} else {
	// 		return { x: 0, y: 0 }
	// 	}
	// }
});

router.beforeEach(function(to, from, next) {
	if(app){
		if(app.beforeRoute){
			var a = 0;
			function to(){
				a++;
				if(app.readyRoute){
					app.readyRoute = false;
					app.beforeRoute = false;
					next();
					toTop(0,0);
					window.clearInterval(app.routerInterval);
					app.routerInterval = null;
				}
				//patch, routerInterval dont stop when click too qiuck
				if(a > 2000){
					window.clearInterval(app.routerInterval);
				}
			}
			window.clearInterval(app.routerInterval);
			var routerInterval = window.setInterval(to,1);
			app.routerInterval = routerInterval;
		}else{
			next();
		}
	}else{
		next();
	}
});

// window.addEventListener('popstate', function () {
// 	// window.history.pushState('forward', null, '#');
// 	// window.history.forward(1);
// 	console.dir(window.history);
// 	alert("不可回退");
// });

  // if (window.history && window.history.pushState) {

    // window.addEventListener('popstate', function() {
    //   var hashLocation = location.hash;
    //   var hashSplit = hashLocation.split("#");
    //   var hashName = hashSplit[1];
    //   console.log(hashName);
      
    //   if (hashName !== '') {
    //     var hash = window.location.hash;
    //     if (hash === '') {
    //       alert('後退按鈕點擊');
    //     }
    //   }
    // });

    // window.history.pushState('forward', null, './#forward');
  // }

var app = new Vue({
	router: router,
	el: '#wrap',
	components: {
		'navigation': navigation,
		'home': home,
		'background': background,
	},
	data: {
		noPadding: false,
		helloEmail: 'hello@bbbstud.io',
		zIndex: -1,
		zIndex2: -1,
		readyRoute: false,
		beforeRoute: false,
		transportLeave: false,
		navCellMask: 'navCellMask',
		navMaskHalf: false,
		navMaskFull: false,
		routerInterval: null,
		scrollInterval: null,
		detailMask: 'detailMask',
		detailMaskShow: false,
		detailMaskContext: null,
		detailMaskLeft: 0,
		detailMaskTop: 0,
		detailMaskWidth: 0,
		detailMaskHeight: 0,
		stayScroll: 0,
		postQueryed: false,
		detailData: {},
		msgTop: '',
		thisYear: new Date().getFullYear(),
		// postQueryLimit: 0,
	},
	created: function(){
		getPostData(this);
	},
	methods: {
		messageTop: function(msg){
			this.msgTop = msg;
		},
		isNoPadding: function(noPadding){
			if(noPadding){
				this.noPadding = noPadding;
			}
		},
		transporting: function(){
			this.zIndex = 49;
		},
		fillUp: function(){
			hub.$emit('fillUp');
		},
		detailMaskOpen: function(color,left,top,width,height,scrollTop,data){
			var canvas = document.getElementById('detailMask');
			var windowH = window.innerHeight;
			var windowW = window.innerWidth;
			canvas.width = windowW;
			canvas.height = windowH;
			var context = canvas.getContext('2d');
			context.fillStyle = color;
			context.strokeStyle = color;
			data.chosen = true;
			context.beginPath();
			context.fillRect(left, top, width, height);
			context.fill();
			this.detailMaskLeft = left;
			this.detailMaskTop = top;
			this.detailMaskWidth = width;
			this.detailMaskHeight = height;
			this.zIndex2 = 9;
			this.detailMaskShow = true;
			this.detailMaskContext = context;
			this.stayScroll = scrollTop;
			var c = this;
			window.setTimeout(function(){
				c.readyRoute = true;
				data.chosen = false;
			},300);
		},
	},
}).$mount('#wrap');
