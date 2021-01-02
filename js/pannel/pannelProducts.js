var products = {
	props: ['productsList','productsLoading','productsLoadFinished','productsSearchContent','productsSearchShow'],
	template: '<div class="productsWrap">\
		<div class="productsBox">\
			<ul class="productsNav">\
				<li class="productsTitle">CASES</li>\
				<searchBar :search-placeholder="searchPlaceholder"></searchBar>\
				<li class="productsAdd">\
					<router-link to="productsEdit">Add case</router-link>\
				</li>\
			</ul>\
			<ul class="productsUl">\
				<ul class="productsUlHead">\
					<li class="productsUlName"><p>Title</p></li>\
					<li class="productsUlCrafts"><p>Category</p></li>\
					<li class="productsUlUser"><p>Author</p></li>\
					<li class="productsUlTime"><p>Date</p></li>\
				</ul>\
                <div class="searchContentBox" @click="closeSearch" v-show="productsSearchShow"><div class="searchContent">{{productsSearchContent}}</div></div>\
				<template v-for="i in productsList">\
					<ul :class="[productsUlList,{productsSearchList: i.search}]">\
						<router-link :to="{ path: productsEdit, query: { post: i.id,index: i.query }}">\
							<li><p>{{i.name}}</p></li>\
							<li><p>{{i.category}}</p></li>\
							<li><p>{{i.user}}</p></li>\
							<li><p>{{i.time}}</p></li>\
						</router-link>\
					</ul>\
				</template>\
			</ul>\
		</div>\
        <div :class="[productsLoaidngBox, {productsLoaidngShow: productsLoading}]" v-show="!productsLoadFinished">\
            <loading></loading>\
            <div class="loadMore productsLoadMore">\
                <div @click="productsLoadMore">加载更多</div>\
            </div>\
        </div>\
	</div>',
    components: {
        'loading': loading,
        'searchBar': searchBar,
    },
    created: function () {
    	currentPage = 'products';
    	postQueryCount = 0;
        this.fetchProducts();
        this.closeSearch();
        console.log();
    },
    watch: {
        '$route': 'fetchProducts'
    },
    beforeDestroy: function () {
        pannel.productsList = [];
        postQueryCount = 0;
    },
	data: function () {
		return {
			productsUlList: 'productsUlList',
			productsEdit: 'productsEdit',
        	searchPlaceholder: 'Search case',
        	productsLoaidngBox: 'productsLoaidngBox',
		}
	},
    methods: {
    	fetchProducts: function(){
    		if(pannel){
                if(this.$route.name !== 'articel'){
                    pannel.productsLoadFinished = false;
                    pannel.productsLoading = true;
                } 			
    		}
            if(this.$route.name !== 'articel'){
                postQuery();
            }
    	},
    	productsLoadMore: function(){
            if(this.$route.name !== 'articel'){
        		pannel.productsLoading = true;
        		postQuery();
            }
    	},
    	closeSearch: function(){
            if(pannel){
                pannel.productsSearchContent = '';
                pannel.productsSearchShow =false;
                $('.productsSearchList').remove();
                $('.productsUlList').fadeIn();                
            }
    	},
    }
}

