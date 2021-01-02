var nameMap ={
	"不丹": "Bhutan",
	"东帝汶": "East Timor",
	"中国": "China",
	"中非共和国": "Central African Rep.",
	"丹麦": "Denmark",
	"乌克兰": "Ukraine",
	"乌兹别克斯坦": "Uzbekistan",
	"乌干达": "Uganda",
	"乌拉圭": "Uruguay",
	"乍得": "Chad",
	"也门": "Yemen",
	"亚美尼亚": "Armenia",
	"以色列": "Israel",
	"伊拉克": "Iraq",
	"伊朗": "Iran",
	"伯利兹": "Belize",
	"俄罗斯": "Russia",
	"保加利亚": "Bulgaria",
	"克罗地亚": "Croatia",
	"冈比亚": "Gambia",
	"冰岛": "Iceland",
	"几内亚": "Guinea",
	"几内亚比绍": "Guinea Bissau",
	"刚果共和国": "Congo",
	"刚果民主共和国": "Dem. Rep. Congo",
	"利比亚": "Libya",
	"利比里亚": "Liberia",
	"加拿大": "Canada",
	"加纳": "Ghana",
	"加蓬": "Gabon",
	"匈牙利": "Hungary",
	"北塞浦路斯": "N. Cyprus",
	"北朝鲜": "Dem. Rep. Korea",
	"南苏丹": "South Sudan",
	"南非": "South Africa",
	"博茨瓦纳": "Botswana",
	"卡塔尔": "Qatar",
	"卢旺达": "Rwanda",
	"卢森堡": "Luxembourg",
	"印尼": "Indonesia",
	"印度": "India",
	"危地马拉": "Guatemala",
	"厄瓜多尔": "Ecuador",
	"厄立特里亚": "Eritrea",
	"叙利亚": "Syria",
	"古巴": "Cuba",
	"吉尔吉斯斯坦": "Kyrgyzstan",
	"吉布提": "Djibouti",
	"哈萨克斯坦": "Kazakhstan",
	"哥伦比亚": "Colombia",
	"哥斯达黎加": "Costa Rica",
	"喀麦隆": "Cameroon",
	"土库曼斯坦": "Turkmenistan",
	"土耳其": "Turkey",
	"圭亚那": "Guyana",
	"坦桑尼亚联合共和国": "Tanzania",
	"埃及": "Egypt",
	"埃塞俄比亚": "Ethiopia",
	"塔吉克斯坦": "Tajikistan",
	"塞内加尔": "Senegal",
	"塞尔维亚共和国": "Serbia",
	"塞拉利昂": "Sierra Leone",
	"塞浦路斯": "Cyprus",
	"墨西哥": "Mexico",
	"多哥": "Togo",
	"多明尼加共和国": "Dominican Republic",
	"奥地利": "Austria",
	"委内瑞拉": "Venezuela",
	"孟加拉国": "Bangladesh",
	"安哥拉": "Angola",
	"尼加拉瓜": "Nicaragua",
	"尼日利亚": "Nigeria",
	"尼日尔": "Niger",
	"尼泊尔": "Nepal",
	"巴哈马": "The Bahamas",
	"巴基斯坦": "Pakistan",
	"巴布亚新几内亚": "Papua New Guinea",
	"巴拉圭": "Paraguay",
	"巴拿马": "Panama",
	"巴西": "Brazil",
	"布基纳法索": "Burkina Faso",
	"布隆迪": "Burundi",
	"希腊": "Greece",
	"德国": "Germany",
	"意大利": "Italy",
	"所罗门群岛": "Solomon Islands",
	"拉脱维亚": "Latvia",
	"挪威": "Norway",
	"捷克共和国": "Czech Republic",
	"摩尔多瓦": "Moldova",
	"摩洛哥": "Morocco",
	"文莱": "Brunei",
	"斐": "Fiji",
	"斯威士兰": "Swaziland",
	"斯洛伐克": "Slovakia",
	"斯洛文尼亚": "Slovenia",
	"斯里兰卡": "Sri Lanka",
	"新喀里多尼亚": "New Caledonia",
	"新西兰": "New Zealand",
	"日本": "Japan",
	"智利": "Chile",
	"柬埔寨": "Cambodia",
	"格陵兰": "Greenland",
	"格鲁吉亚": "Georgia",
	"比利时": "Belgium",
	"毛里塔尼亚": "Mauritania",
	"沙特阿拉伯": "Saudi Arabia",
	"法国": "France",
	"法属南半球和南极领地": "French Southern and Antarctic Lands",
	"法属圭亚那": "French Guiana",
	"波兰": "Poland",
	"波多黎各": "Puerto Rico",
	"波斯尼亚和黑塞哥维那": "Bosnia and Herzegovina",
	"泰国": "Thailand",
	"津巴布韦": "Zimbabwe",
	"洪都拉斯": "Honduras",
	"海地": "Haiti",
	"澳大利亚": "Australia",
	"爱尔兰": "Ireland",
	"爱沙尼亚": "Estonia",
	"牙买加": "Jamaica",
	"特里尼达和多巴哥": "Trinidad and Tobago",
	"玻利维亚": "Bolivia",
	"瑞典": "Sweden",
	"瑞士": "Switzerland",
	"瓦努阿图": "Vanuatu",
	"白俄罗斯": "Belarus",
	"百慕大": "Bermuda",
	"福克兰群岛": "Falkland Islands",
	"科威特": "Kuwait",
	"科索沃": "Kosovo",
	"秘鲁": "Peru",
	"突尼斯": "Tunisia",
	"立陶宛": "Lithuania",
	"索马里": "Somalia",
	"索马里兰": "Somaliland",
	"约旦": "Jordan",
	"纳米比亚": "Namibia",
	"缅甸": "Myanmar",
	"罗马尼亚": "Romania",
	"美国": "United States",
	"老挝": "Laos",
	"肯尼亚": "Kenya",
	"芬兰": "Finland",
	"苏丹": "Sudan",
	"苏里南": "Suriname",
	"英国": "United Kingdom",
	"荷兰": "Netherlands",
	"莫桑比克": "Mozambique",
	"莱索托": "Lesotho",
	"菲律宾": "Philippines",
	"萨尔瓦多": "El Salvador",
	"葡萄牙": "Portugal",
	"蒙古": "Mongolia",
	"西岸": "West Bank",
	"西撒哈拉": "W. Sahara",
	"西班牙": "Spain",
	"象牙海岸": "Ivory Coast",
	"贝宁": "Benin",
	"赞比亚": "Zambia",
	"赤道几内亚": "Equatorial Guinea",
	"越南": "Vietnam",
	"阿塞拜疆": "Azerbaijan",
	"阿富汗": "Afghanistan",
	"阿尔及利亚": "Algeria",
	"阿尔巴尼亚": "Albania",
	"阿曼": "Oman",
	"阿根廷": "Argentina",
	"阿联酋": "United Arab Emirates",
	"韩国": "Korea",
	"马其顿": "Macedonia",
	"马拉维": "Malawi",
	"马来西亚": "Malaysia",
	"马达加斯加": "Madagascar",
	"马里": "Mali",
	"黎巴嫩": "Lebanon",
	"黑山": "Montenegro",
};
var analysis = {
    components: {
        'datepicker': datePicker,
    },
	template: '\
	<div class="analysisWrap">\
		<div class="analysisBox">\
			<div class="datepickWrap">\
				<div :class="[datePickBox,datePick]">\
					<div class="lastWeek" @click="lastWeekData">last week</div>\
					<div class="lastMonth" @click="lastMonthData">last month</div>\
				</div>\
		        <datepicker v-model="date" :range="range" :language="datePickerLan" :tmp-start-year="thisYear" :tmp-start-month="thisMonth" :tmp-start-date="thisDate" :tmp-end-year="lastYear" :tmp-end-month="lastMonth" :tmp-end-date="lastDate"></datepicker>\
			</div>\
			<div class="analysis">\
				<div class="pvAnaBox">\
					<div class="pvAna">\
						<div class="anaAction">\
							<div><p>audience</p></div>\
							<ul :class="audienceStatus">\
								<li @click="getPvData" class="pvAna"><span></span><div>page visit</div></li>\
								<li @click="getNewUserData" class="newUserAna"><span></span><div>new user</div></li>\
								<li @click="getActiveUserData" class="activedUserAna"><span></span><div>active user</div></li>\
							</ul>\
						</div>\
						<ve-line :height="height" :data="pvData" :legend-visible="legendVisible" :grid="pvGrid" :settings="pvSettings"></ve-line>\
					</div>\
				</div>\
				<div class="productAnaBox">\
					<div class="productAna">\
						<div class="anaAction">\
							<div><p>projects</p></div>\
						</div>\
						<div class="anaBox">\
							<div class="noData" v-show="productData.length === 0">no data</div>\
							<ul :class="{ pageAnaUl:productData.length > 0 }">\
								<li v-for="a in productData" :title="a.name">\
									<p>{{a.name}}</p>\
									<div>\
										<div class="dataBarMask" :style="{width: dataBar(a.count,false,false)}">{{pageDataFormat(a.count,true)}}</div>\
										<div class="dataBar" :style="{width: dataBar(a.count,false,true)}"></div>\
									</div>\
								</li>\
							</ul>\
						</div>\
					</div>\
				</div>\
				<div class="pageAnaBox">\
					<div class="pageAna">\
						<div class="anaAction">\
							<div><p>pages</p></div>\
							<ul :class="{pagesDurationActived:!pagesVisit}">\
								<li class="pagesVisit" @click="showPagesVisit"><span></span><div>pages visit</div></li>\
								<li class="pagesDuration" @click="showPagesDuration"><span></span><div>pages duration</div></li>\
							</ul>\
						</div>\
						<div class="anaBox">\
							<div class="noData" v-show="pageData.length === 0">no data</div>\
							<ul :class="{ pageAnaUl:pageData.length > 0,pagesDurationBar:!pagesVisit,pageDataUpdating:pageDataUpdating }">\
								<li v-for="a in pageData" :title="href(a.name)">\
									<p><a :href="href(a.name)" target="_blank" >{{a.name}}</a></p>\
									<div>\
										<div class="dataBarMask" :style="{width: dataBar(a.count,true,false)}">{{pageDataFormat(a.count)}}</div>\
										<div class="dataBar" :style="{width: dataBar(a.count,true,true)}"></div>\
									</div>\
								</li>\
							</ul>\
						</div>\
					</div>\
				</div>\
				<div class="locatAnaBox">\
					<div class="locatAna" id="allmap">\
						<div class="anaAction">\
							<div><p>locations</p></div>\
							<ul :class="{chinaActived: !worldwide}">\
								<li class="worldwide" @click="worldwideMap"><span></span><div>Worldwide</div></li>\
								<li class="china" @click="chinaMap"><span></span><div>China</div></li>\
							</ul>\
						</div>\
						<ve-map :height="mapHeight" :mark-point="markPoint" :data="locateData" :legend-visible="legendVisible"  :settings="loacateSettings"></ve-map>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>',
	created: function () {
		this.getRecentTime(8);
		this.getLoacteData();
		if(this.pagesVisit){
			this.getAnalysis('page_visit');
		}else{
			this.getAnalysis('page_duration');
		}
		var c = this;
		bus.$on('customRange', function () {
			c.datePick = '';
		});
	},
	mounted: function(){
	},
	data: function () {
		var now = new Date(new Date().getTime()-1000*60*60*24);
		return {
			range: true,
			datePickerLan: 'en',
			date: [],
			datePickBox: 'datePickBox',
			datePick: 'weekData',
			now: new Date(),
			thisYear: now.getFullYear(),
			thisMonth: now.getMonth() + 1,
			thisDate: now.getDate(),
			lastYear: now.getFullYear(),
			lastMonth: now.getMonth() + 1,
			lastDate: now.getDate(),
			language: 'en',
			//chart
			pvData: {
				columns: ['date'],
				rows: [],
			},
			pvSettings: {},
			height: '440px',
			legendVisible: false,
			pvGrid: {
				show: false,
			},
		    markPoint: {
		    	symbol: 'pin',
		    	symbolSize: 20,
		    	itemStyle: {
		    		normal: {
		    			color: '#000000',
		    		}
		    	}
		    },
			//Audience
			audienceData: [],
			audienceRangeData: [],
			columns: {
				cn: {
					'page visit': '页面浏览量',
					'new users': '新用户',
					'active users': '活跃用户',
				},
				en: {
					'page visit': 'page visit',
					'new users': 'new users',
					'active users': 'active users',
				}
			},
			audienceStatus: 'pvAnaSelected',
			sessionData: false,
			avgPageCountData: false,
			newUserData: [],
			pageVisitData: [],
	    	activeUserData: [],
			//page chart
			pageData: [],
			pagesVisit: true,
			pageDataUpdating: false,
			//location
			locateData: {},
			loacateSettings: {},
			mapHeight: '420px',
			worldwideData: [],
			chinaData: [],
			newLoacteData: false,
			activeLoacteData: false,
			worldwide: true,
			//product
			productData: [],
		}
	},
    methods: {
    	getRecentTime: function(l){
    		l--;
    		this.date = [];
			var now = this.now;
			var year = this.thisYear;
			var month = this.thisMonth;
			var date = this.thisDate;
			function style(month){
				if(month < 10){
					month = '0' + month;
				}
				return month;
			}
			var lastTime = new Date(now.getTime()-1000*60*60*24*l);
			var lastTimeYear = lastTime.getFullYear();
			var lastTimeMonth = lastTime.getMonth() + 1;
			var lastTimeDate = lastTime.getDate();
			this.lastYear = lastTimeYear;
			this.lastMonth = lastTimeMonth;
			this.lastDate = lastTimeDate;

			this.date.push(lastTimeYear+'-'+style(lastTimeMonth)+'-'+style(lastTimeDate));
			this.date.push(year+'-'+style(month)+'-'+style(date));
			window.setTimeout(function(){
				bus.$emit('rangeChange');
			},0);
    	},
    	lastWeekData: function(e){
    		this.datePick = 'weekData';
    		this.getRecentTime(8);
    	},
    	lastMonthData: function(e){
    		this.datePick = 'monthData';
    		this.getRecentTime(31);
    	},
    	getAnalysis: function(metrics,map){
    		var c = this;
            var timestamp = new Date().getTime();
            var hash = md5(timestamp+'4wsFU5nAJfrWnpN8Qqh4c1tL');
	        var startTime = this.date[0].split("-").join("");
	        var endTime = this.date[1].split("-").join("");
	    	$.ajax({
	            url: "https://api.leancloud.cn/1.1/stats/appmetrics?platform=web&start="+startTime+"&end="+endTime+"&metrics="+metrics,
	            type: "GET",
	            beforeSend: function (xhr) {
	                xhr.setRequestHeader("X-LC-Id", "2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz");
	                xhr.setRequestHeader("X-LC-Sign", hash+','+timestamp+',master');
	            },
	            success: function (ret) {
	            	if(!map){
	            		c.dataSort(ret.data,metrics);
	            	}else{
	            		if(metrics === 'active_user_locations'){
	            			c.activeLoacteData = ret.data;
							c.getAnalysis('new_user_locations',true);
	            		}else if(metrics === 'new_user_locations'){
	            			c.newLoacteData = ret.data;
	            			c.mapSort();
	            		}else if(metrics === 'avg_page_count'){
	            			c.avgPageCountData = ret.data;
	            			c.audienceSort(ret.data,false,metrics);
	            		}else if(metrics === 'session'){
	            			c.sessionData = ret.data;
	            			c.audienceSort(ret.data,false,metrics);
	            		}else if(metrics === 'new_user'){
	            			c.audienceSort(ret.data,true,metrics);
	            		}else if(metrics === 'active_user'){
	            			c.audienceSort(ret.data,true,metrics);
	            		}
	            	}
	            },
	            error: function (xhr, textStatus, errorThrow) {
	                if(JSON.parse(xhr.responseText).code === 206){
	                    alert('无法获取分析数据，请稍后再试');
	                }
	            }
	        });
    	},
    	dataSort: function(data,metrics){
    		var propsArray = [];
    		var dataObj = {};
    		var isPageData = false;
    		var isProductData = false;
			if(metrics === 'page_visit' || metrics === 'page_duration'){
				isPageData = true;
			}
			if(metrics === 'event_label_count&event=products&event_label=name'){
				isProductData = true;
			}
    		for (var prop2 in data) {
    			if(prop2.indexOf("www.") === 1){
	    			var noWWW = prop2.substring(5,prop2.length);
	    			if(data['/'+noWWW]){
	    				data['/'+noWWW] = data['/'+noWWW] + data['/'+noWWW];
	    				delete data[prop2];
	    			}
    			}
    		}
			for (var prop in data) {
				if(prop.indexOf("10.0.1") === -1 && prop.indexOf("localhost:") === -1 && prop.indexOf("#") === -1 ){
					propsArray.push(prop);
				}
			}
			for (var i = 0; i < propsArray.length; i++) {
				dataObj[data[propsArray[i]]] = propsArray[i];
			}
			var len = Object.keys(dataObj).length;
			var topCount = len - 6;
			var a = 0;
			var dataArray = [];
			var subDomain = '/';
			for (var prop2 in dataObj) {
				a++;
				if(a > topCount){
					if(dataObj[prop2].substr(0, subDomain.length) === subDomain && isPageData){
						dataObj[prop2] = dataObj[prop2].substr(subDomain.length);
					}
					dataArray.unshift({
						count: prop2,
						name: dataObj[prop2]
					});
				}
			}
			if(isPageData){
				this.pageData = dataArray;
			}else if(isProductData){
				this.productData = dataArray;
			}
    	},
    	mapSort: function(){
    		if(this.newLoacteData && this.activeLoacteData){
    			var worldData = [];
    			var chinaData = [];
				for (var newLoacte in this.newLoacteData) {
					if(nameMap[newLoacte]){
						//word
						for (var activeLoacte in this.activeLoacteData) {
							if(newLoacte === activeLoacte){
								worldData.push({
									'location': nameMap[newLoacte],
									'active users': this.activeLoacteData[activeLoacte],
									'new users': this.newLoacteData[newLoacte],
								});
								delete this.activeLoacteData[activeLoacte];
								delete this.newLoacteData[newLoacte];
							}
						}
					}else{
						//china
						for (var activeLoacte in this.activeLoacteData) {
							if(newLoacte === activeLoacte){
								chinaData.push({
									'location': newLoacte,
									'active users': this.activeLoacteData[activeLoacte],
									'new users': this.newLoacteData[newLoacte],
								});
								delete this.activeLoacteData[activeLoacte];
								delete this.newLoacteData[newLoacte];
							}
						}
					}
				}
				for (var newLoacteUnic in this.newLoacteData) {
					if(nameMap[newLoacteUnic]){
						//world
						worldData.push({
							'location': nameMap[newLoacteUnic],
							'active users': 0,
							'new users': this.newLoacteData[newLoacteUnic],
						});
						delete this.newLoacteData[newLoacteUnic];						
					}else{
						//china
						chinaData.push({
							'location': newLoacteUnic,
							'active users': 0,
							'new users': this.newLoacteData[newLoacteUnic],
						});
						delete this.newLoacteData[newLoacteUnic];
					}
				}
				for (var activeLoacteUnic in this.activeLoacteData) {
					if(nameMap[activeLoacteUnic]){
						//world
						worldData.push({
							'location': nameMap[activeLoacteUnic],
							'active users': this.activeLoacteData[activeLoacteUnic],
							'new users': 0,
						});
						delete this.activeLoacteData[activeLoacteUnic];						
					}else{
						//china
						chinaData.push({
							'location': activeLoacteUnic,
							'active users': this.activeLoacteData[activeLoacteUnic],
							'new users': 0,
						});
						delete this.activeLoacteData[activeLoacteUnic];
					}
				}
				var chinaActiveUsers = 0;
				var chinaNewUsers = 0;
				for (var i = 0; i < chinaData.length; i++) {
					chinaActiveUsers = chinaActiveUsers + chinaData[i]['active users'];
					chinaNewUsers = chinaNewUsers + chinaData[i]['new users'];
				}
				worldData.push({
					'location': 'China',
					'active users': chinaActiveUsers,
					'new users': chinaNewUsers,
				});
				this.worldwideData = worldData;
				this.chinaData = chinaData;
				if(!this.worldwide){
					this.locateData.rows = chinaData;
				}else{
					this.locateData.rows = worldData;
				}
	    	}
    	},
    	setPvData: function(){
    		var oldDate = new Date(this.date[0]);
    		var latestDate = new Date(this.date[1]);
    		var range = (latestDate.getTime() - oldDate.getTime())/(1000*60*60*24) + 1;
    		this.audienceRangeData = [];
    		for (var i = 0; i < range; i++) {
    			var thisTime = new Date(oldDate.getTime()+1000*60*60*24*i);
    			this.audienceRangeData.push(this.getXaxisUnit(thisTime.getDate(),thisTime.getMonth()+1));
    		}
			var columns = ['date'];
			this.pvData = {
				columns: columns,
				rows: [],
			};
			this.pvSettings = {
				area: true,
				lineStyle: {
					normal: {
						opacity: 1,
						width: 0,
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 3,
					}
				},
				areaStyle: {
					normal: {
						opacity: .8,
					}
				}
				// areaStyle: [
				// 	{
				// 		normal: {
				// 			opacity: .8,
				// 		}
				// 	},
				// 	{
				// 		normal: {
				// 			opacity: .8,
				// 		}
				// 	},
				// 	{
				// 		normal: {
				// 			opacity: .8,
				// 		}
				// 	},
				// ]
			};
    	},
    	getXaxisUnit: function(date,month){
            switch (this.language) {
                case 'en':
                    return date + ' ' + {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                     7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[month];
                case 'ch':
                    return {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月',
                     7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[month]+ date + '日';
                default:
                    return month;
            }
    	},
    	// getXaxis: function(date,month){
     //        return date + ' ' + {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[month]
    	// },
    	audienceSort: function(data,push,metrics){
    		var prop = '';
			if(metrics === 'active_user'){
				this.activeUserData = [];
				prop = this.columns[this.language]['active users'];
			}else if(metrics === 'new_user'){
				this.newUserData = [];
				prop = this.columns[this.language]['new users'];
			}else{
				prop = this.columns[this.language]['page visit'];
			}
			var array = [];
			for (var objProp in data) {
				array.push(data[objProp]);
			}
    		if(push){
    			for (var i = 0; i < this.audienceRangeData.length; i++) {
    				var obj = {};
    				obj.date = this.audienceRangeData[i];
    				obj[prop] = array[i];
    				if(metrics === 'new_user'){
	    				this.newUserData.push(obj);
	    			}else if(metrics === 'active_user'){
						this.activeUserData.push(obj);
					}
    			}
    			if(this.audienceStatus === 'newUserAnaSelected'){
    				this.getNewUserData();
    			}else if(this.audienceStatus === 'activedUserAnaSelected'){
    				this.getActiveUserData();
    			}
    		}else{
    			if(this.avgPageCountData && this.sessionData){
    				var avgPageArray = [];
    				var sessionArray = [];
    				this.pageVisitData = [];
					for (var avgPageProp in this.avgPageCountData) {
						avgPageArray.push(this.avgPageCountData[avgPageProp]);
					}
					for (var sessioneProp in this.sessionData) {
						sessionArray.push(this.sessionData[sessioneProp]);
					}
	    			for (var i = 0; i < this.audienceRangeData.length; i++) {
	    				this.pageVisitData.push({
	    					date: this.audienceRangeData[i],
	    					'page visit': avgPageArray[i]*sessionArray[i]
	    				})
	    			}
	    			if(this.audienceStatus === 'pvAnaSelected'){
	    				this.getPvData();
	    			}
    			}
    		}
    	},
    	getPvData: function(){
    		if(this.pvData.columns.length > 1){
    			this.pvData.columns[1] = 'page visit'
    		}else{
    			this.pvData.columns.push('page visit');
    		}
    		this.pvData.rows = this.pageVisitData;
    		this.pvSettings.areaStyle.normal.color = '#2196F3';
    		this.pvSettings.itemStyle.normal.color = '#2196F3';
    		this.audienceStatus = 'pvAnaSelected';
    	},
    	getNewUserData: function(){
    		if(this.pvData.columns.length > 1){
    			this.pvData.columns[1] = 'new users'
    		}else{
    			this.pvData.columns.push('new users');
    		}
			this.pvData.rows = this.newUserData;
    		this.pvSettings.areaStyle.normal.color = '#ff9800';
    		this.pvSettings.itemStyle.normal.color = '#ff9800';
    		this.audienceStatus = 'newUserAnaSelected';
    	},
    	getActiveUserData: function(){
    		if(this.pvData.columns.length > 1){
    			this.pvData.columns[1] = 'active users'
    		}else{
    			this.pvData.columns.push('active users');
    		}
			this.pvData.rows = this.activeUserData;
    		this.pvSettings.areaStyle.normal.color = '#009688';
    		this.pvSettings.itemStyle.normal.color = '#009688';
    		this.audienceStatus = 'activedUserAnaSelected';
    	},
    	href: function(i){
    		return '//'+i;
    	},
    	pageDataFormat: function(i,product){
    		if(this.pagesVisit || product){
    			if(i > 1000){
    				return (i/1000).toFixed(1) + 'k views';
    			}else{
					return i + ' views';
    			}
    		}else{
    			if(i > 3600){
    				return (i/3600).toFixed(1) + ' Hours';
    			}else if(i > 60){
    				return (i/60).toFixed(1) + ' Mins';
    			}else{
    				return i + ' Seconds';
    			}
    		}
    	},
    	dataBar: function(i,page,fix){
    		var firstData = {};
    		if(page){
    			firstData = this.pageData[0];
    		}else{
    			firstData = this.productData[0];
    		}
    		if(firstData){
    			var max =firstData.count/0.9;
    			if(fix){
    				return 100-i*100/max+'%';
    			}else{
    				return i*100/max+'%';
    			}
    		}
    	},
    	showPagesVisit: function(){
    		this.pageDataUpdating = true
    		var c = this;
    		window.setTimeout(function(){
    			c.pagesVisit = true;
				c.getAnalysis('page_visit');
				c.pageDataUpdating = false;
    		},500);
    	},
    	showPagesDuration: function(){
    		this.pageDataUpdating = true;
    		var c = this;
    		window.setTimeout(function(){
    			c.pagesVisit = false;
				c.getAnalysis('page_duration');
				c.pageDataUpdating = false;
			},500);
    	},
    	getLoacteData: function(){
		    this.locateData = {
		      columns: ['location', 'new users', 'active users'],
		      rows: []
		    },
		    this.loacateSettings = {
		    	position: 'world',
		    	selectData: true,
		   //  	mapGrid: {
					// top: '10%',
		   //  	},
		    	zoom: 1.1,
		    	roam: true,
		    	scaleLimit: {
		    		max: 2,
		    		min: 1.1
		    	},
		    	label: {
		    		normal: {
		    			show: false,
		    		},
		    		emphasis: {
		    			show: false,
		    		}
		    	},
		    	itemStyle: {
		    		normal: {
		    			areaColor: '#E3F2FD',
		    			borderWidth: 0,
		    		},
		    		emphasis: {
		    			areaColor: '#90CAF9',
		    		}
		    	}
		    }
    	},
    	worldwideMap: function(){
    		this.loacateSettings.position = 'world';
    		this.loacateSettings.itemStyle = {
	    		normal: {
	    			areaColor: '#E3F2FD',
	    			borderWidth: 0,
	    		},
	    		emphasis: {
	    			areaColor: '#90CAF9',
	    		}
	    	}
    		this.locateData.rows = this.worldwideData;
    		this.worldwide = true;
    	},
    	chinaMap: function(){
    		this.loacateSettings.position = 'china';
    		this.loacateSettings.itemStyle = {
	    		normal: {
	    			areaColor: '#ef9a9a',
	    			borderWidth: 0,
	    		},
	    		emphasis: {
	    			areaColor: '#f44336',
	    		}
	    	}
    		this.locateData.rows = this.chinaData;
    		this.worldwide = false;
    	}
    },
    watch: {
    	date: function(val,oldVal){
    		if(!val[2]){
				this.setPvData();
				this.getAnalysis('avg_page_count',true);
				this.getAnalysis('session',true);
				this.getAnalysis('new_user',true);
				this.getAnalysis('active_user',true);
				this.getAnalysis('active_user_locations',true);
				this.getAnalysis('event_label_count&event=products&event_label=name');
				if(this.pagesVisit){
					this.getAnalysis('page_visit');
				}else{
					this.getAnalysis('page_duration');
				}
    		}
    	}
    }
}

