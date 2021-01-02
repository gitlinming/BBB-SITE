var help = {
	template: '\
	<div class="helpWrap">\
		<div class="helpBox">\
			<div>\
				<h1>常见问题</h1>\
				<ul>\
					<li v-for="i in helpList" class="helpList" @click="helpListOpen">\
						<h2>{{i.title}}</h2>\
						<p>{{i.content}}</p>\
					</li>\
				</ul>\
			</div>\
			<div>\
				<h1>联系我们</h1>\
				<p>你的数据安全和使用体验是我们在设计后台时的重中之重。</p>\
				<p>你的任何疑惑或建议对我们的帮助都很大。</p>\
				<p class="helpEmail">技术支持：ml@bbbstud.io</p>\
				<p>网站链接：<a href="https://www.bbbstud.io">www.bbbstud.io</a></p>\
			</div>\
		</div>\
	</div>',
	data: function () {
		return {
			helpList: helpList,
		}
	},
    methods: {
    	helpListOpen: function(e){
    		var $this = $(e.target).parents('.helpList');
    		if($this.hasClass('helpListOpen')){
    			$this.removeClass('helpListOpen');
    		}else{
    			$this.addClass('helpListOpen');
    		}
    	}
    }
}

