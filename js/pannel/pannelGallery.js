function captionClean(){
    var caption = $('.imgDetailCaption').html();
    while(caption.lastIndexOf(" ")>=0){
       caption = caption.replace(" ","");
    }
    while(caption.lastIndexOf("&nbsp;")>=0){
       caption = caption.replace("&nbsp;","");
    }
    if(caption=="<br/>"||caption=="<br>"){
        caption=null;
    }
    return caption;
}

var gallery = {
    props: ['id','fileUrl','fileCaption','resolution','createdTime','authorName','fileSize','authorId','fileId','link','placeholder','contenteditableCheck','captionEditBoxActive','listEditActive','items','galleryLoading','galleryLoadFinished','imgDetailBoxShow','galleryReferCount','galleryRefer'],
    template: `
    <div class="galleryWrap" ref="gallery">
        <div class="galleryHead">
            <ul>
                <li :class="{ galleryHeadActive: allImgActive }" @click="all">所有文件</li><li :class="{ galleryHeadActive: myImgActive }" @click="my">我的文件</li>
            </ul>
            <searchBar  :search-placeholder="searchPlaceholder"></searchBar>
            <div class="uploadButton">上传文件<input id="photoFileUpload" type="file" accept="image/jpg, image/jpeg, image/png, image/gif, audio/mp4, video/mp4" onchange="preview(this)" /></div>
        </div>
        <div :class="[galleryBox,{galleryBoxDetail:imgDetailBoxShow}]">
            <div class="imgDetailBox">
                <div class="imgDetail" :data-authorId=authorId :data-fileId=fileId :data-id=id>
                    <p class="imgDetailTitle">文件预览</p>
                    <div class="imgDetailImageBox">
                        <img class="imgDetailImage" :src=link @error.capture="imgError"/>
                        <a target="_blank" :href=fileUrl></a>
                    </div>
                    <div :class="{imgDetailCaption, imgDetailCaptionActive: contenteditableCheck}" :placeholder="placeholder" :contenteditable="contenteditableCheck" @keyup="captionEditing()" v-html="fileCaption"></div>
                    <ul :class="{captionEditBox, captionEditBoxActive: captionEditBoxActive}">
                        <li :class="[captionEdit, listEditActive ? '' : listButtonHide]" @click="editCaption">更改注释</li>
                        <li :class="[captionEditCancel, listEditActive ? listButtonHide : '']" @click="editCancel">取消</li>
                        <li :class="[captionEditConfirm, listEditActive ? listButtonHide : '']" @click="editConfirm">完成</li>
                    </ul>
                    <p class="imgDetailTitle">文件详情</p>
                    <ul class="imgDetailInfo">
                        <li class="detailResolution">{{resolution}}</li>
                        <li class="detailFileSize">{{fileSize}}</li>
                        <li class="detailCreatedTime">{{createdTime}}</li>
                        <li class="detailAuthorName">{{authorName}}</li>
                    </ul>
                    <p class="imgDetailTitle" v-show="galleryReferShow(galleryRefer)">被引用于</p>
                    <ul class="imgDetailRefer" v-show="galleryReferShow(galleryRefer)">
                        <li v-for="(i,index) in galleryRefer"><router-link :to="{ path: postType(i.name), query: { post: i.id }}">{{index+1}}</router-link></li>
                    </ul>
                    <div class="deleteImg" @click="deleteImg(galleryRefer,$event)">删除图片</div>
                </div>
            </div>
            <ul class="gallery">
                <div class="searchContentBox" @click="closeSearch"><div class="searchContent"></div></div>
                <li class="imgList" v-for="(item,index) in items" :class="{ notMyFile: item.notMyFile, searchList: item.search }">
                    <div class="imgWrap" @click="showDetail($event,index)" :data-id=item.id :data-resolution=item.resolution :data-createdAt=item.createdAt :data-authorName=item.authorName :data-authorId=item.authorId :data-fileId=item.fileId :data-size=item.size :data-imageAve="item.imageAve" >
                        <div class="imgBox">
                            <div class="img" :style="{ backgroundImage: item.link }"><a :href=item.url @click.prevent></a></div>
                            <div class="imgListInfo" v-html="item.caption"></div>
                        </div>
                    </div>
                </li>
                <div :class="[galleryLoaidngBox, {galleryLoaidngShow: galleryLoading}]" v-show="!galleryLoadFinished">
                    <loading></loading>
                    <div class="loadMore galleryLoadMore">
                        <div @click="galleryLoadMore">加载更多</div>
                    </div>
                </div>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    `,
    components: {
        'searchBar': searchBar,
        'loading': loading,
    },
    data: function () {
        return {
            allImgActive: true,
            myImgActive: false,
            galleryBox: 'galleryBox',
            searchPlaceholder: 'Search image',
            imgDetailCaption: 'imgDetailCaption',
            captionEditBox: 'captionEditBox',
            captionEdit: 'captionEdit',
            captionEditCancel: 'captionEditCancel',
            captionEditConfirm: 'captionEditConfirm',
            editActive: 'editActive',
            listButtonHide: 'listButtonHide',
            galleryLoaidngBox: 'galleryLoaidngBox',
        }
    },
    watch: {
        '$route': 'fetchData'
    },
    created: function(){
        currentPage = 'gallery';
        galleryQueryCount = 0;
        this.fetchData();
    },
    mounted: function(){
        plaintext($('.uploadDescription'));
        plaintext($('.imgDetailCaption'));
    },
    beforeDestroy: function(){
        pannel.galleryLoading = true;
        pannel.items = [];
        galleryQueryCount = 0;
        pannel.galleryLoadFinished = false;
    },
    methods: {
        fetchData: function(){
            if(currentUser){
                galleryQuery();
            }
        },
        all: function () {
            this.allImgActive = true;
            this.myImgActive = false;
            $('.notMyFile').show();
        },
        my: function () {
            this.allImgActive = false;
            this.myImgActive = true;
            $('.notMyFile').hide();
        },
        closeSearch: function(event){
            $('.searchList').remove();
            $('.imgList').fadeIn();
            $(event.target).parent().hide();
            $('.fileSearchBox').children('input').val('');
        },
        galleryLoadMore: function(event){
            pannel.galleryLoading = true;
            galleryQuery();
        },
        showDetail: function(event,index){
            var $this = $(event.target).parents('.imgWrap');
            if(currentPage === 'gallery' && !isProductsEdit){
                setImgDetail(index);
            }
            if(isProductsEdit){
                var id = $this.attr('data-id');
                var link = $this.children('.imgBox').children('.img').children('a').attr('href');
                var referProduct = $this.attr('data-referProduct');
                var imageAve = $this.attr('data-imageAve');
                if($this.hasClass('imgWrapSlected')){
                    $this.removeClass('imgWrapSlected');
                    pannel.productsGalleryCount = pannel.productsGalleryCount - 1;
                    for (var i = 0; i < pannel.imgSelectList.length; i++) {
                        if(pannel.imgSelectList[i].id == id){
                            pannel.imgSelectList.splice(i,1);
                            break;
                        }
                    }
                }else{
                    $this.addClass('imgWrapSlected');
                    pannel.productsGalleryCount = pannel.productsGalleryCount + 1;
                    var obj = {
                        id: id,
                        link: link,
                        referProduct: referProduct,
                        imageAve: imageAve,
                    };
                    if(pannel.productsCoverSelect){
                        $this.parent().siblings().children().removeClass('imgWrapSlected');
                        pannel.imgSelectList = [obj];
                        pannel.productsGalleryCount = 1;
                    }else{
                        pannel.imgSelectList.push(obj);
                    }
                }
            }
        },
        galleryReferShow: function(galleryRefer){
            if(galleryRefer){
                if(galleryRefer.length > 0){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        postType: function(name){
            if(name === 'products'){
                return 'productsEdit';
            }
        },
        imgError: function(){
            if(pannel.link != pannel.fileUrl){
                pannel.link = pannel.fileUrl;
                return false;
            }else{
                return false;
            }
        },
        editCaption: function(event){
            pannel.contenteditableCheck = true;
            pannel.captionEditBoxActive = true;
            pannel.listEditActive = false;
        },
        captionEditing: function(event){
            if(captionClean() != pannel.fileCaption){
                pannel.captionEditBoxActive = true;
                pannel.listEditActive = false;
            }else{
                pannel.captionEditBoxActive = false;
                pannel.listEditActive = true;
            }
        },
        editCancel: function(event){
            var $caption = $(event.target).parent().siblings('.imgDetailCaption');
            if(pannel.fileCaption){
                pannel.contenteditableCheck = false;
                pannel.captionEditBoxActive = true;
            }else{
                pannel.contenteditableCheck = true;
                pannel.captionEditBoxActive = false;
            }
            pannel.listEditActive = true;
            $caption.html(pannel.fileCaption);
        },
        editConfirm: function(event){
            var $this = $(event.target);
            var $caption = $this.parent().siblings('.imgDetailCaption');
            var caption = $caption.html();
            while(caption.lastIndexOf("&nbsp;")>=0){
               caption = caption.replace("&nbsp;"," ");
            }
            function trim(str){  
              return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');  
            }
            caption = trim(caption);
            if(caption=="<br/>"||caption=="<br>"){
                caption=null;
            }
            if(caption != pannel.fileCaption){
                var galleryPost = AV.Object.createWithoutData('Gallery', pannel.id);
                galleryPost.set('caption', caption);
                galleryPost.save().then(function(newPost){
                    console.log('完成');
                    pannel.fileCaption = caption;
                    if(checkBlankSpace(caption)){
                        pannel.contenteditableCheck = false;
                        pannel.captionEditBoxActive = true;
                        pannel.listEditActive = true;
                    }else{
                        pannel.contenteditableCheck = true;
                        pannel.captionEditBoxActive = false;
                        pannel.listEditActive = false;
                    }
                    $('.imgWrap').each(function(index, el) {
                        if($(el).attr('data-id') == pannel.id){
                            if(!caption){
                                caption = '...'
                            }
                            pannel.items[index].caption = caption;
                            return false;
                        };
                    });
                }, function(error){
                    alert('由于网络故障，麻烦重新上传。');
                    console.log(error);
                });                
            }else{
                if(checkBlankSpace(caption)){
                    pannel.contenteditableCheck = false;
                    pannel.captionEditBoxActive = true;
                    pannel.listEditActive = true;
                }else{
                    pannel.contenteditableCheck = true;
                    pannel.captionEditBoxActive = false;
                    pannel.listEditActive = false;
                }
            }
        },
        deleteImg: function(galleryRefer,event){
            var confirmTip = '';
            if(galleryRefer){
                if(galleryRefer.length > 0){
                    confirmTip = '这个文件被其他文章或产品引用，删除的话会导致图片显示错误，确定删除吗？';
                }else{
                    confirmTip = '确定删除吗？';
                }
            }else{
                confirmTip = '确定删除吗？';
            }
            if(confirm(confirmTip)){
                var $this = $(event.target);
                var $imgDetail = $this.parents('.imgDetail');
                var fileId = $imgDetail.attr('data-fileid');
                var id = $imgDetail.attr('data-id');
                var galleryPost = AV.Object.createWithoutData('Gallery', id);
                galleryPost.destroy().then(function (success) {
                    var file = AV.File.createWithoutData(fileId);
                    file.destroy().then(function (success) {
                        console.log('成功');
                    }, function (error) {
                        alert('file error');
                    });
                }, function (error) {
                    alert('gallery error');
                });
                var deleteIndex = -1;
                $(pannel.items).each(function(index, el) {
                    if(pannel.fileId === el.fileId){
                        deleteIndex = index;
                        return false;
                    }
                });;
                if(deleteIndex > -1){
                    pannel.items.splice(deleteIndex, 1);
                    if(pannel.items.length > 0){
                        setImgDetail(deleteIndex);
                    }else{
                        pannel.imgDetailBoxShow = false;
                    }
                }
            }
        }
    }
}


