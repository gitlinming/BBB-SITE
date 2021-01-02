var productsEdit = {
	props: ['id','fileUrl','fileCaption','resolution','createdTime','authorName','fileSize','authorId','fileId','link','items','productsImgOverlayShow','pleaseAddImg','pageActionCount','containerWidth','containerTransform','currentProductImg','sliderImage','galleryLoadFinished','galleryLoading','imgSelectList','productsGalleryCount','postDataImages','productCover'],
	template: '\
	<div :class="{productsEditWrap,productsGalleryShow: productsGallery}">\
		<div class="productsEditBox">\
			<div class="projectBox">\
				<div class="coverBox">\
					<h1>cover</h1>\
					<div class="coverImgWrap">\
						<div class="coverImgBox" id="coverImg">\
							<div class="coverImg" v-for="i in sliderImage" v-if="i.cover" :style="{backgroundImage: addUrl(i.link,i.local)}"></div>\
							<div :class="{productsImgOverlay,productsImgOverlayShow:!productCover}">\
								<p>{{pleaseAddImg}}</p>\
								<ul class="productsImgAction">\
									<li class="addFromLocal">Local file<input type="file" onchange="preview(this,2,true)" multiple="multiple" accept="image/jpg, image/jpeg, image/png, image/gif"/></li>\
									<div class="line"></div>\
									<li class="addFromGallery" @click="addFromGallery(true)">Gallery file</li>\
									<div class="productsImgdelete" @click="productsImgdelete(true)"><p>Remove</p></div>\
								</ul>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="infoBox">\
					<h1>info</h1>\
					<ul class="info">\
						<li>\
							<p>title</p>\
							<input type="text" placeholder="" v-model="productsInfoTitle"/>\
						</li>\
						<li>\
							<p>description</p>\
							<div class="productsInfoDes" contenteditable="true" v-html="productsInfoDes"></div>\
						</li>\
						<li>\
							<p>tag</p>\
							<input type="text" placeholder="" v-model="productsInfoTag"/>\
						</li>\
						<li>\
							<p>company</p>\
							<input type="text" placeholder="" v-model="productsInfoCompany"/>\
						</li>\
						<li class="infoTime">\
							<p>time</p>\
							<input class="caseYear" v-model="caseYear"/>\
							<span>/</span>\
							<input class="caseMonth" v-model="caseMonth"/>\
							<span>/</span>\
							<input class="caseDay" v-model="caseDay"/>\
						</li>\
					</ul>\
				</div>\
				<div class="contentBox">\
					<h1>content</h1>\
					<div class="productsEdit">\
						<div class="productsImgWrap">\
							<div class="productsImgBox" id="productsImgContainer" :style="{width: containerWidth,transform: containerTransform}">\
								<div v-for="(i,index) in sliderImage" v-if="!i.cover" class="productsImg" :style="{width: i.width}">\
									<div class="imagePreview" :style="{backgroundImage: addUrl(i.link,i.local)}"></div>\
									<div class="sliderImageCap" placeholder="add captions here..." contenteditable="true" v-html="i.caption" @blur="sliderImageCapInput($event,index)"></div>\
								</div>\
							</div>\
							<div :class="{productsImgOverlay,productsImgOverlayShow:productsImgOverlayShow}">\
								<p>{{pleaseAddImg}}</p>\
								<ul class="productsImgAction">\
									<li class="addFromLocal">Local file<input type="file" onchange="preview(this,2)" multiple="multiple" accept="image/jpg, image/jpeg, image/png, image/gif"/></li>\
									<div class="line"></div>\
									<li class="addFromGallery" @click="addFromGallery(false)">Gallery file</li>\
									<div class="productsImgdelete" @click="productsImgdelete(false)"><p>Delete</p></div>\
								</ul>\
							</div>\
							<div :class="[captionHolder,{captionHolderHide:!productsImgOverlayShow}]">add captions here...</div>\
						</div>\
						<ul class="productsTypeWrap">\
							<ul :class="[productsTypeBox, selectType ?  productsTypeBox : productsTypeBoxSelected]">\
								<li class="productsTypeSelect" :data-seleted="typeSelected">{{productsTypeSelect}}</li>\
								<li v-for="i in selectTypeList" :class="i.class" :data-type="i.type" @click="productsType">{{i .name}}</li>\
							</ul>\
							<div class="productsFile">\
								<p>{{productsFileName}}</p>\
								<input v-if="destroyFileInput" key="productsFileInput1" class="productsFileInput" type="file" @change="productsFile1"/>\
								<input v-else key="productsFileInput2" class="productsFileInput" type="file" @change="productsFile2"/>\
								<div  class="fileUploadedDelete" v-show="fileUploaded" @click="fileUploadedDelete">删除此文件</div>\
							</div>\
						</ul>\
					</div>\
				</div>\
					<ul class="pageAction">\
						<li v-for="i in add(pageActionCount)" @click="pageAction"></li>\
					</ul>\
					<div class="productsAction">\
						<div class="productsReturn" @click="productsReturn">back</div>\
						<div class="productsCategory" @click="productsSelect">\
							<div :class="categorySelect">\
								<div>category</div>\
								<div>project</div>\
								<div>lab</div>\
							</div>\
						</div>\
						<div class="productsPublish" @click="productsPublish">{{publishButton}}</div>\
						<div v-if="existPost" class="productsDelete"  @click="productsDelete">delete</div>\
					</div>\
					<ul class="caseTime" style="display: none">\
						<li><input v-model="caseYear"/></li>\
						<span>/</span>\
						<li><input v-model="caseMonth"/></li>\
						<span>/</span>\
						<li><input v-model="caseDay"/></li>\
					</ul>\
			</div>\
		</div>\
		<div class="productsGallery">\
			<gallery  :id="id" :file-url="fileUrl" :file-caption="fileCaption" :resolution="resolution" :created-time="createdTime" :author-name="authorName" :file-size="fileSize" :author-id="authorId" :file-id="fileId" :link="link" :items="items" :gallery-load-finished="galleryLoadFinished" :gallery-loading="galleryLoading"></gallery>\
			<div class="productsGalleryAction">\
				<div class="productsGalleryConfirm" @click="productsGalleryConfirm">确认添加&nbsp;{{productsGalleryCount}}&nbsp;照片</div>\
				<div class="productsGalleryCancel" @click="productsGalleryClose">关闭</div>\
			</div>\
		</div>\
	</div>',
    components: {
        'gallery': gallery,
    },
    created: function () {
    	currentPage = 'productsEdit';
    	isProductsEdit = true;
        galleryQueryCount = 0;
        this.fetchProducts();
    },
    mounted: function () {
    	plaintext($('.productsInfoDes'));
    },
    beforeDestroy: function () {
		pannel.pageActionCount = 0;
		pannel.currentProductImg = 0;
		pannel.sliderImage = [];
		pannel.productsImgOverlayShow = true;
		pannel.items = [];
		pannel.productCover = false;
		galleryQueryCount = 0;
        pannel.galleryLoadFinished = false;
        isProductsEdit = false;
    },
	data: function () {
		return {
        	///////////////////////
        	productsInfoTitle: '',
        	productsInfoDes: '',
        	productsInfoTag: '',
        	productsInfoCompany: '',
        	captionHolder: 'captionHolder',
        	productsGalleryCover: false,
        	productsCategory: 0,
        	categorySelect: 'categorySelect0',
        	caseYear: new Date().getFullYear(),
        	caseMonth: new Date().getMonth() + 1,
        	caseDay: new Date().getDate(),
        	//////////////////////

			productsEditWrap: 'productsEditWrap',
			productsImgOverlay: 'productsImgOverlay',
			productsGallery: false,
			productsInfoCN: true,
			productsInfoWrap: 'productsInfoWrap',
			productsInfoWrapEN: 'productsInfoWrapEN',
			productsInfoActive: 'productsInfoActive',
			productsInfoLanList: 'productsInfoLanList',
			selectType: true,
			productsTypeBox: 'productsTypeBox',
			productsTypeSelect: '类型',
			productsTypeBoxSelected: 'productsTypeBoxSelected',
			productsTypeselected: 'productsTypeselected',
			typeSelected: '',
			selectTypeList: productsTypeList,
			selectedType: false,
			fileUploaded: false,

			// productsInfoWeight: '',
			// productsInfoHeight: '',
			// productsInfoWidth: '',
			// productsInfoLength: '',

			// productsInfoNameCN: '',
			// productsInfoPriceCN: '',
			// productsInfoDesCN: '',
			// productsInfoSeatsCN: '',
			// productsInfoMaterialCN: '',
			// productsInfoCraftsCN: '',
			// productsInfoPaintCN: '',

			// productsInfoNameEN: '',
			// productsInfoPriceEN: '',
			// productsInfoDesEN: '',
			// productsInfoSeatsEN: '',
			// productsInfoMaterialEN: '',
			// productsInfoCraftsEN: '',
			// productsInfoPaintEN: '',

			publishButton: 'publish',
        	productsFileName: '点击上传规格文件',
        	productsFileId: '',
        	productsFileDelete: '',
        	destroyFileInput: true,
        	existPost: false,
        	postId: '',
		}
	},
	watch: {
		'$route': 'fetchProducts'
	},
    methods: {
    	addUrl: function(e,local){
    		if(!local){
    			return 'url('+e+'?imageMogr2/strip/thumbnail/920x)';
    		}else{
    			return 'url('+e+')';
    		}
    	},
    	fetchProducts: function(){
    		var components = this;
            if(currentUser){
            	var post = this.$route.query.post;
            	var index = this.$route.query.index;
            	if(post){
            		var id = post;
            		this.postId = post;
            		function getThisPost() {
						var Products = new AV.Query('Products');
						Products.include('file');
						Products.get(id).then(function (result) {
							set(components,result);
						}, function (error) {
							alert('查询出错');
						});
            		}
            		if(pannel && index){
            			if(pannel.productsList){
	            			var data = pannel.productsList[index].data;
	            			set(this,data);            				
            			}else{
            				getThisPost();
            			}
            		}else{
            			getThisPost();
            		}
            		function set(components,data){
            			components.productsInfoTitle = data.get('titleEN');
            			components.productsInfoDes = data.get('desEN');
            			components.productsInfoTag = data.get('tagEN');
            			components.productsInfoCompany = data.get('companyEN');
            			components.productsCategory = data.get('category');
            			components.categorySelect = 'categorySelect' + data.get('category');
            			components.caseYear = data.get('caseYear');
            			components.caseMonth = data.get('caseMonth');
            			components.caseDay = data.get('caseDay');
						if(data.get('file')){
							components.productsFileName = data.get('file').get('name');
							components.productsFileId = data.get('file').id;
							components.fileUploaded = true;
						}
			    		components.selectType = false;
			    		components.selectedType = true;
			    		components.typeSelected = data.get('category');
			    		components.publishButton = 'save';
			    		components.existPost = true;
			    		// for (var x = 0; x < productsTypeList.length; x++) {
			    		// 	if(components.typeSelected === productsTypeList[x].type){
			    		// 		components.productsTypeSelect = productsTypeList[x].name;
			    		// 		productsTypeList[x].class = 'productsTarget';
			    		// 		break;
			    		// 	}
			    		// }
			    		var imgs = data.get('images');
			    		pannel.postDataImages = imgs;
			    		if(imgs.length > 0){
				    		var sliderList = [];
				    		for (var i = 0; i < imgs.length; i++) {
				    			var obj = {
				    				id: imgs[i].galleryId,
				    				link: imgs[i].url,
				    				referProduct: imgs[i].referProduct,
				    				caption: imgs[i].caption,
				    			};
				    			if(imgs[i].cover){
				    				pannel.productCover = true;
				    			}
				    			addToSlider(pannel,[obj],true,false,imgs[i].cover);
				    		}
			    		}
            		}
            	}
            }
    	},
    	addFromGallery: function(cover){
    		if(this.productsGallery){
    			this.productsGalleryClose();
    		}else{
	    		this.productsGalleryCover = cover;
	    		this.productsGallery = true;
	    		pannel.productsCoverSelect = cover;
	    		$a = $('.imgList').children();
	    		if($a.length === 0){
		    		alert('加载中,请稍后点击');
		    		this.productsGallery = false;
		    	}else{
		    		// $a.each(function(index, el) {
		    		// 	$(el).removeClass('imgWrapSlected');
		    		// });
		    	} 			
    		}
    	},
    	productsImgdelete: function(cover){
    		if(cover){
    			pannel.productCover = false;
    			console.log(pannel.sliderImage);
    			// pannel.sliderImage.shift();
    			for (var i = 0; i < pannel.sliderImage.length; i++) {
    				if(pannel.sliderImage[i].cover){
    					pannel.sliderImage.splice(i,1);
    				}
    			}
    		}else{
	    		var count = pannel.pageActionCount;
	    		var index = pannel.currentProductImg;
	    		pannel.pageActionCount = count - 1;
	    		if((index+1) == count){
	    			pannel.currentProductImg = index - 1;
	    			pannel.containerTransform = 'translateX(-'+(100*pannel.currentProductImg/pannel.pageActionCount)+'%)';
	    		}
	    		var sliderImg = pannel.sliderImage;
	    		sliderImg.splice(index,1);
	    		for (var i = 0; i < sliderImg.length; i++) {
	    			sliderImg[i].width = 100/(pannel.pageActionCount) + '%';
	    		}
	    		pannel.containerWidth = pannel.pageActionCount*100 + '%';
	    		pannel.containerTransform = 'translateX(-'+(100*pannel.currentProductImg/pannel.pageActionCount)+'%)';
	    		if(pannel.pageActionCount == 0){
	    			pannel.productsImgOverlayShow = true;
	    		}    			
    		}
    	},
    	productsGalleryClose: function(){
    		this.productsGallery = false;
    		pannel.productsGalleryCount = 0;
    		$('.imgWrapSlected').removeClass('imgWrapSlected');
    	},
    	productsGalleryConfirm: function(){
    		this.productsGallery = false;
    		pannel.productsGalleryCount = 0;
    		if(this.productsGalleryCover){
    			// pannel.productCover = [{
    			// 	link: pannel.imgSelectList[0].link,
    			// 	local: false,
    			// 	id: pannel.imgSelectList[0].id,
    			// }];
    			pannel.productCover = true;
    			// pannel.imgSelectList.length = 0;
    			addToSlider(pannel,pannel.imgSelectList,this.existPost,false,true);
    		}else{
	    		addToSlider(pannel,pannel.imgSelectList,this.existPost,false,false);
    		}
	    	$('.imgWrapSlected').removeClass('imgWrapSlected');
    	},
    	productsType: function(e){
    		this.selectType = false;
    		this.selectedType = true;
    		var listName = $(e.target).text();
    		this.productsTypeSelect = listName;
    		this.typeSelected = $(e.target).attr('data-type');
    		// $(e.target).siblings().removeClass('productsTarget');
    		// $(e.target).addClass('productsTarget');
			for (var x = 0; x < productsTypeList.length; x++) {
				if(this.typeSelected === productsTypeList[x].type){
					productsTypeList[x].class = 'productsTarget';
				}else{
					productsTypeList[x].class = '';
				}
			}
    	},
    	categoryChoose: function(category){
    		this.productsCategory = category;
    	},
    	productsSelect: function(category){
    		if(this.productsCategory > 1){
    			this.productsCategory = 0;
    		}
    		this.productsCategory++;
    		this.categorySelect = 'categorySelect' + this.productsCategory;
    	},
    	changeLanCN: function(){
    		this.productsInfoCN = true;
    	},
    	changeLanEN: function(){
    		this.productsInfoCN = false;
    		console.log(pannel.postDataImages);
    	},
    	sliderImageCapInput: function(e,i){
    		pannel.sliderImage[i].caption = e.target.innerHTML;
    		console.log(pannel.sliderImage[i].caption);
    	},
    	pageAction: function(e){
    		var $this = $(e.target);
    		var index = $this.index();
    		pannel.currentProductImg = index;
    		pannel.containerTransform = 'translateX(-'+(100*index/pannel.pageActionCount)+'%)';
    	},
    	// productsPreview: function(){
    	// 	alert('available soon');
    	// },
    	productsReturn: function(){
    		router.go(-1);
    	},
    	productsDelete: function(){
    		if(confirm('确认删除吗？')){
	    		var id = this.postId;
	    		if(this.productsFileId){
					var deleteFile = AV.File.createWithoutData(this.productsFileId);
					deleteFile.destroy().then(function (success) {
						console.log('附件删除');
					}, function (error) {
						console.log(error);
						console.log('附件删除失败');
					});
	    		}
				var deletePost = AV.Object.createWithoutData('Products',id);
				deletePost.destroy().then(function (success) {
					galleryReferUpdate(pannel.postDataImages,[],id,'products');
					alert('删除成功');
					router.go(-1);
				}, function (error) {
					alert('删除失败');
				});
			}
    	},
    	productsPublish: function(){
			pannel.overlay = true;
			pannel.pannelProgress = true;
			pannel.processing = true;
			pannel.pannelProgressInfoList = [];
			pannel.uploadWaitingLine = [];
			pannel.pannelProgressInfo = "发布产品信息中...";
			pannel.overlayTip = "请不要关闭窗口";
    		// var desCN = $('.productsInfoDesCN').html();
    		var $productsInfoDes = $('.productsInfoDes');
    		if($productsInfoDes.children().last()[0]){
	    		if($productsInfoDes.children().last()[0].nodeName === 'BR'){
	    			$productsInfoDes.children().last().remove();
	    		}
    		}
    		var desEN = $productsInfoDes.html();
    		// var $img = $('#productsImgContainer').children('.imagePreview');
	     //    if(desCN=="<br/>"||desCN=="<br>"){
	     //        desCN = null;
	     //    }
	        if(desEN=="<br/>"){
	            desEN = null;
	        }
			if(this.existPost){
				var productsPost = AV.Object.createWithoutData('Products', this.postId);
			}else{
				var productsPost = new AV.Object("Products");
			}
			progressSys('开始检测数据',100);
			var components = this;
			function createPost(){
				productsPost.set("titleEN",components.productsInfoTitle);
				productsPost.set("desEN",desEN);
				productsPost.set("tagEN",components.productsInfoTag);
				productsPost.set("companyEN",components.productsInfoCompany);
				productsPost.set("category",components.productsCategory);
				productsPost.set("author",currentUser);
				productsPost.set("caseDay",parseInt(components.caseDay, 10));
				productsPost.set("caseMonth",parseInt(components.caseMonth, 10));
				productsPost.set("caseYear",parseInt(components.caseYear, 10));

				// productsPost.set("nameCN",components.productsInfoNameCN);
				// productsPost.set("materialCN",components.productsInfoMaterialCN);
				// productsPost.set("weight",components.productsInfoWeight);
				// productsPost.set("nameEN",components.productsInfoNameEN);
				// productsPost.set("priceCN",components.productsInfoPriceCN);
				// productsPost.set("priceEN",components.productsInfoPriceEN);
				// productsPost.set("materialEN",components.productsInfoMaterialEN);
				// productsPost.set("category",components.typeSelected);
				// productsPost.set("descriptionCN",desCN);
				// productsPost.set("descriptionEN",desEN);
				// productsPost.set("author",currentUser);

				// productsPost.set("height",components.productsInfoHeight);
				// productsPost.set("width",components.productsInfoWidth);
				// productsPost.set("length",components.productsInfoLength);
				// productsPost.set("seatsCN",components.productsInfoSeatsCN);
				// productsPost.set("seatsEN",components.productsInfoSeatsEN);
				// productsPost.set("craftsCN",components.productsInfoCraftsCN);
				// productsPost.set("craftsEN",components.productsInfoCraftsEN);
				// productsPost.set("paintCN",components.productsInfoPaintCN);
				// productsPost.set("paintEN",components.productsInfoPaintEN);

				productsPost.save().then(function(newPost){
					progressSys('产品数据更新成功，准备检查图片数据',75);
					var a = 0;
					var b = 0;
					var localFileLine = [];
					for (var i = 0; i < components.sliderImage.length; i++) {
						var img = components.sliderImage[i];
						var obj = {};
						if(img.local){
							obj.galleryId = false;
							obj.url = i+img.name+img.size;
							obj.referProduct = [];
							obj.cover = img.cover;
							obj.caption = img.caption;
							pannel.uploadWaitingLine.push(obj);
							var fileObj = {};
							var filesArray = [];
							var localIndex = i;
							filesArray.push(localIndex);
							fileObj.files = filesArray;
							fileObj.id = newPost.id;
							fileObj.cover = img.cover;
							fileObj.caption = img.caption;
							localFileLine.push(fileObj);
							b++;
						}else{
	 						var url = img.link;
	 						var referProduct = img.referProduct;
	 						if(referProduct){
	 							//
	 						}else{
	 							referProduct = [];
	 						}
	 						obj.url = url;
	 						obj.galleryId = img.id;
	 						obj.referProduct = referProduct;
	 						obj.cover = img.cover;
	 						obj.caption = img.caption;
	 						obj.imageAve = { RGB: img.imageAve};
	 						if(img.cover){
								pannel.uploadWaitingLine.unshift(obj);
	 						}else{
	 							pannel.uploadWaitingLine.push(obj);
	 						}
	 						a++;
						}
					}
					progressSys('得到图片数据，准备更新图片数据',75);
					console.log('图片标记完成，准备上传或更新图片列表');
					if(localFileLine.length > 0){
						progressSys('准备上传本地图片',70);
						for (var n = 0; n < localFileLine.length; n++) {
							localFileLine[n].totoal = b;
							localFileLine[n].index = n+1;
							upload(localFileLine[n],false,true);
						}
					}
					function updateSldcerImg(){
						console.log('开始更新图片列表');
						progressSys('开始更新图片数据',50);
						var productsPost = AV.Object.createWithoutData('Products', newPost.id);
						productsPost.set('images', pannel.uploadWaitingLine);
						productsPost.save().then(function (data) {
							console.log('更新图片成功');
							galleryReferUpdate(pannel.postDataImages,pannel.uploadWaitingLine,newPost.id,'products');
							progressSys('更新图片数据成功，产品发布成功',0);
							router.go(-1);
						}, function (error) {
							console.log(error);
							alert('更新图片失败');
						});
					}
					if(a === components.sliderImage.length){
						if(components.sliderImage.length > 0){
							updateSldcerImg()
						}else{
							if(components.existPost){
								console.log(pannel.postDataImages);
								if(pannel.postDataImages.length > 0){
									updateSldcerImg();
								}else{
									progressSys('无需更新图片数据，产品发布成功',0);
									router.go(-1);
								}
							}else{
								progressSys('无需更新图片数据，产品发布成功',0);
								router.go(-1);
							}
						}
					}
				}, function(error){
					console.log(error);
					alert('创建产品失败');
				});						
			}
			progressSys('检测数据结束，检查附件',90);
			function checkDeleteFile(components){
				if(components.productsFileDelete){
					progressSys('需要删除旧附件，准备删除',85);
					var deleteFile = AV.File.createWithoutData(components.productsFileDelete);
					deleteFile.destroy().then(function (success) {
						console.log('附件删除');
						progressSys('旧附件删除成功，准备上传产品数据',80);
						createPost();
					}, function (error) {
						alert('删除附件失败');
						createPost();
					});
				}else{
					progressSys('无需删除旧附件，准备上传产品数据',80);
					createPost();
				}
			}
			var fileUploadControl = $('.productsFileInput')[0];
			if (this.fileUploaded && fileUploadControl.files.length > 0) {
				var localFile = fileUploadControl.files[0];
				var name = this.productsFileName;
				var avfile = new AV.File(name, localFile);
				avfile.save().then(function(file) {
					productsPost.set("file",avfile);
					console.log('规格上传');
					checkDeleteFile(components);
				}, function(error) {
					console.error(error);
				});
			}else{
				progressSys('无添加新附件，检查是否删除旧附件',85);
				checkDeleteFile(components);
			}
    	},
    	productsFile1: function(e){
    		this.productsFileName = e.target.files[0].name;
    		this.fileUploaded = true;
    	},
    	productsFile2: function(e){
    		this.productsFileName = e.target.files[0].name;
    		this.fileUploaded = true;
    	},
    	fileUploadedDelete: function(){
    		this.productsFileName = '点击上传规格文件';
    		this.fileUploaded = false;
    		if(this.productsFileId.length > 0){
    			this.productsFileDelete = this.productsFileId;
    		}
    		if(this.destroyFileInput){
    			this.destroyFileInput = false;
    		}else{
    			this.destroyFileInput = true;
    		}
    	},
    	add: function(numbers){
			this.$nextTick(function(){
				var index = pannel.currentProductImg;
				var $li = $('.pageAction').children();
				$li.removeClass('pageActionActived');
				$li.eq(index).addClass('pageActionActived');
			});
			return numbers;
    	},
    }
}