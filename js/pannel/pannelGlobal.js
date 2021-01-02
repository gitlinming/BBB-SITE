var currentUser = AV.User.current();

if(!currentUser){
    location.href = path+'login';
}else{
  currentUser.isAuthenticated().then(function(authenticated){
    if(!authenticated){
      AV.User.logOut();
      currentUser = null;
      location.href = path+'login';
    }
  });
}

function checkBlankSpace(str){
    if(str){
        while(str.lastIndexOf(" ")>=0){
           str = str.replace(" ","");
        }
        if(str.length == 0){
           return false;
        }else{
           return true;
        }
    }else{
        return false;
    }
}

function plaintext($target){
    $.support.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    //禁止粘贴富文本，只允许纯文本
    if($.support.webkit){
        $target.attr('contenteditable','plaintext-only');
    }else{
        $target.each(function() {
            // 干掉IE http之类地址自动加链接
            try {
                document.execCommand("AutoUrlDetect", false, false);
            } catch (e) {}
            $(this).off('paste');
            $(this).on('paste', function(e) {
                e.preventDefault();
                var text = null;
                if(window.clipboardData && clipboardData.setData) {
                    // IE
                    text = window.clipboardData.getData('text');
                } else {
                    text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
                }
                if (document.body.createTextRange) {    
                    if (document.selection) {
                        textRange = document.selection.createRange();
                    } else if (window.getSelection) {
                        sel = window.getSelection();
                        var range = sel.getRangeAt(0);
                        // 创建临时元素，使得TextRange可以移动到正确的位置
                        var tempEl = document.createElement("span");
                        tempEl.innerHTML = "&#FEFF;";
                        range.deleteContents();
                        range.insertNode(tempEl);
                        textRange = document.body.createTextRange();
                        textRange.moveToElementText(tempEl);
                        tempEl.parentNode.removeChild(tempEl);
                    }
                    textRange.text = text;
                    textRange.collapse(false);
                    textRange.select();
                } else {
                    // Chrome之类浏览器
                    document.execCommand("insertText", false, text);
                }
            });
        });
    }
}

function sliderJs($target){
  $target.slidesjs({
    width: 960,
    height: 654,
    navigation: {
      active: false,
      effect: "slide"
    },
    pagination: {
      active: false,
      effect: "slide"
    },
    play: {
      active: true,
      effect: "slide",
      interval: 5000,
      auto: true,
      swap: true,
      pauseOnHover: false,
      restartDelay: 2500
    }
  });
}

function setImgDetail(index){
  var $this =  pannel.items[index];
  var caption = $this.caption;
  if(caption === '...'){
      // var placeholder = '添加注释';
      caption = '';
      var contenteditable = true;
      var captionEditBoxActive = false;
      var listEditActive = false;
  }else{
      // var placeholder = '';
      var contenteditable = false;
      var captionEditBoxActive = true;
      var listEditActive = true;
  }
  pannel.fileUrl = $this.url;
  pannel.link = $this.url+'?imageMogr2/strip/thumbnail/580x';
  pannel.fileCaption = caption;
  $('.imgDetailCaption').html(caption);
  pannel.contenteditableCheck = contenteditable;
  pannel.resolution = $this.resolution;
  pannel.fileSize = $this.size;
  pannel.createdTime = $this.createdAt;
  pannel.authorName = $this.authorName;
  pannel.authorId = $this.authorId;
  pannel.fileId = $this.fileId;
  pannel.id = $this.id;
  pannel.captionEditBoxActive = captionEditBoxActive;
  pannel.listEditActive = listEditActive;
  pannel.galleryReferCount = $this.refer.length;
  pannel.galleryRefer = $this.refer;
}

function clearUploadBox(){
    //清空路径  
    var file = $("#photoFileUpload");
    file.after(file.clone().val(""));      
    file.remove();
    //清空预览图
    var $uploadWrap = $('.uploadWrap');
    $uploadWrap.children("#preview").empty();
    $uploadWrap.children(".uploadDescription").text('');
    //reset button
    var $uploadButton = $uploadWrap.children('.uploadButton');
    $uploadButton.children('.uploadStatus').removeClass('uploading success');
    $uploadButton.children('.progressBar').removeAttr('style');
}

function colseUploadBox(){
  if(!pannel.processing){
    var $overlayA = $('.overlayA');
    var $uploader = $('.uploadWrap');
    var $body = $('body');
    $body.removeClass('noScroll');
    $overlayA.fadeOut(200);
    $uploader.removeClass('uploadWrapActived');
      $uploader.children('.uploadButton').removeClass('uploadingButton');
    $uploader.fadeOut(200,function(){
      clearUploadBox();
    });    
  }else{
    alert('处理中，请稍后再返回。');
  }
}

function openUploadBox(){
  var $overlayA = $('.overlayA');
  var $uploader = $('.uploadWrap');
  var $body = $('body');
  $body.addClass('noScroll');
  $overlayA.fadeIn(200);
  $uploader.fadeIn(200);
  $uploader.addClass('uploadWrapActived');
  $uploader.click(function(event) {
    event.stopPropagation();
  });
  $overlayA.click(function(event) {
    colseUploadBox();
  });
  $uploader.children('.uploadButton').click(function(event) {
        var $this = $(this);
        if($this.hasClass('uploadingButton')){
            console.log('不要再点啦');
            return false;
        }else{
            $this.addClass('uploadingButton')
            upload($("#photoFileUpload")[0],false,false);
        }
  });
}

function load(){
  console.log('预览加载完成');
}

function addToSlider(components,list,existPost,localfile,cover){
  var x = 0;
  for (var i = 0; i < list.length; i++) {
    if(!cover){
      var current = pannel.currentProductImg;
      var count = pannel.pageActionCount;
      // var compress = '?imageMogr2/strip/thumbnail/580x';
      // if(existPost){
      //   compress = '?imageMogr2/strip/thumbnail/1000x';
      // }
      // if(!localfile){
      //   compress = '?imageMogr2/strip/thumbnail/920x';
      // }
      pannel.productsImgOverlayShow = false;
      pannel.pleaseAddImg = '继续添加图片或删除此张图片';
      pannel.pageActionCount = count + 1;
      if(pannel.pageActionCount > 1){
        pannel.currentProductImg = current + 1;
      }
      var index = pannel.currentProductImg;
      var s = 100/(count + 1) + '%';
      pannel.containerWidth = pannel.pageActionCount*100 + '%';
    }else{
      for (var a = 0; a < pannel.sliderImage.length; a++) {
        if(pannel.sliderImage[a].cover){
          pannel.sliderImage.splice(a,1);
        }
      }
    }
    var caption = '';
    if(list[i].caption){
      caption = list[i].caption;
    }
    var obj = {
      width: s,
      id: list[i].id,
      link: list[i].link,
      referProduct: list[i].referProduct,
      local: false,
      cover: cover,
      caption: caption,
      imageAve: list[i].imageAve,
      // image: 'url('+list[i].link+compress+')',
    };
    if(localfile){
      obj = {
        width: s,
        link: list[i].link,
        // image: 'url('+list[i].link+')',
        type: list[i].type,
        size: list[i].size,
        name: list[i].name,
        local: true,
        cover: cover,
        caption: caption,
      };
    }
    if(cover){
      components.sliderImage.unshift(obj);
    }else{
      components.sliderImage.splice(pannel.currentProductImg,0,obj);
    }
    if(!cover){
      for (var a = 0; a < components.sliderImage.length; a++) {
        components.sliderImage[a].width = s;
      }
      pannel.containerTransform = 'translateX(-'+(100*index/pannel.pageActionCount)+'%)';
    }
    x++;
    if(!existPost && x === list.length && !cover){
      pannel.imgSelectList.length = 0;
    }
    if(cover){
      pannel.imgSelectList.length = 0;
    }
  }
}

function galleryReferUpdate(oldImg,newImg,id,type){
  if(oldImg){
    var oldArry = oldImg;
  }else{
    var oldArry = [];
  }
  var newArry = newImg;
  for (var m = 0; m < oldArry.length; m++) {
    for (var n = 0; n < newArry.length; n++) {
      // if(!newArry[n].refer){
        if(newArry[n].galleryId === oldArry[m].galleryId){
          newArry[n].same = true;
          oldArry[m].same = true;
        }
      // }
    }
  };
  var avObject = [];
  for (var i = 0; i < oldArry.length; i++) {
    if(!oldArry[i].same){
      avObject.push(AV.Object.createWithoutData('Gallery', oldArry[i].galleryId).remove('refer', {name: type,id: id}));
    }
  }
  for (var y = 0; y < newArry.length; y++) {
    if(!newArry[y].same){
      avObject.push(AV.Object.createWithoutData('Gallery', newArry[y].galleryId).addUnique('refer', {name: type,id: id}));
    }
  }
  if(avObject.length > 0){
    AV.Object.saveAll(avObject).then(function (objects) {
    }, function (error) {
      // 异常处理
    });    
  }
}

function preview(target,locate,cover){
  var files = $(target)[0].files;
  if(files.length > 0){
    for (var i = 0; i < files.length; i++) {
      var type = files[i].type;
      if(type=="image/jpg"||type=="image/jpeg"||type=="image/png"||type=="image/gif"||type=="audio/mp4"||type=="not now video/mp4"){
          if(files[i].size < 20971520){
              if(locate === 1){
                //avatar
                  var $profileAvatar = $(target).parent().siblings('.profileAvatar');
                  if(target.files && target.files[i]){
                      var reader = new FileReader();
                      reader.onload = function(evt){
                          var data = evt.target.result;
                          var $img = $('<img onload="load()" class="profileAvatarImg" src="' + evt.target.result + '" />');
                          $profileAvatar.css('backgroundImage', 'url('+data+')');
                          $profileAvatar.empty();
                          $profileAvatar.append($img);
                          pannel.profileAvatarReady = true;
                      };
                      reader.readAsDataURL(target.files[i]);
                  }else{
                      $profileAvatar.empty();
                      $profileAvatar.append($('<div onload="load()" class="profileAvatarImg" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + target.value + '\'"></div>'));
                      pannel.profileAvatarReady = true;
                  }
              }else if(locate === 2){
                //products
                if(cover){
                  var prevDiv = document.getElementById('coverImg');
                }else{
                  var prevDiv = document.getElementById('productsImgContainer');
                }
                if(target.files && target.files[i]){
                  var reader = new FileReader();
                  function add(size,name){
                    reader.onload = function(evt){
                      var obj = {
                        id: '',
                        link: evt.target.result,
                        type: type,
                        size: size,
                        name: name,
                      };
                      var isCover = false
                      if(cover){
                        pannel.productCover = true;
                        isCover = true;
                      }
                      addToSlider(pannel,[obj],false,true,isCover);
                    };
                    reader.readAsDataURL(target.files[i]);
                  }
                  add(files[i].size,target.files[i].name);
                }else{
                    prevDiv.innerHTML = '<div onload="load()" class="imagePreview" data-base64="'+target.value+'" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + target.value + '\'"></div>';
                    c();
                }
              }else{
                  openUploadBox();
                  var prevDiv = document.getElementById('preview');
                  if(target.files && target.files[i]){
                      var reader = new FileReader();
                      reader.onload = function(evt){
                          var $img = $('<img onload="load()" class="imagePreview" src="' + evt.target.result + '" />');
                          $(prevDiv).empty();
                          $(prevDiv).append($img);
                      };
                      reader.readAsDataURL(target.files[i]);
                  }else{
                      $(prevDiv).empty();
                      prevDiv.innerHTML = '<div onload="load()" class="imagePreview" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + target.value + '\'"></div>';
                  }                
              }
          }else{
              alert("很抱歉！只能上传小于20MB的图片。");
          }
      }else{
        console.log('error type is '+type);
        // alert("很抱歉！只能上传格式为jpg、jepg、png、gif的照片或mp4的视频。");
        alert("很抱歉！只能上传格式为jpg、jepg、png、gif的图片。");
      }
    }
  }
}

function updateUser(avFile,imageUrl,newPost){
    var userId = currentUser.id;
    if(pannel.hasAvatar){
      var oldAvatarId = currentUser.get('avatar').id;
      var oldAvatarGalleryId = currentUser.get('avatarGallery').id;  
    }
    console.log(userId);
    var user = AV.Object.createWithoutData('_User', userId);
    function fetchUser(){
        currentUser.fetch().then(function () {
            var url = currentUser.get('avatarUrl');
            if(url){
              if(url.length > 0){
                  pannel.hasAvatar = true;
                  pannel.profileAvatar = 'url('+url+'?imageMogr2/strip/thumbnail/132x)';
              }              
            }
            $('.profileAvatarImg').remove();
            //清空路径
            var input = $(".avatarInput");
            input.after(input.clone().val(""));      
            input.remove();
            pannel.overlay = false;
            pannel.profileBox = false;
            pannel.profileAvatarReady = false;
            pannel.processing = false;
            alert('保存成功');
        }, function (error) {
            console.log(error);
        });
    }
    if(imageUrl){
        user.set("avatar", avFile);
        user.set("avatarUrl",imageUrl);
        user.set("avatarGallery",newPost);
    }
    user.set("username",pannel.profileName);
    user.set("email",pannel.profileEmail);
    console.log(pannel.profileName);
    user.save().then(function(object){
        if(imageUrl){
            if(pannel.hasAvatar){
                var file = AV.Object.createWithoutData('_File', oldAvatarId);
                file.destroy().then(function (success) {
                    console.log('file deleted');
                    var galleryPost = AV.Object.createWithoutData('Gallery', oldAvatarGalleryId);
                    galleryPost.destroy().then(function (success) {
                        console.log('gallery deleted');
                        fetchUser();
                        var deleteIndex = -1;
                        $(pannel.items).each(function(index, el) {
                            if(el.fileId === oldAvatarId){
                                deleteIndex = index;
                                return false;
                            }
                        });
                        if(deleteIndex > -1){
                            pannel.items.splice(deleteIndex, 1);
                            setImgDetail(0);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }, function (error) {
                    console.log(error);
                });
            }else{
              fetchUser();
            }
        }else{
            fetchUser();
        }
    }, function(error){
        console.log(error.message);
        if(error.code === 202){
            alert("该用户名已存在");
        }else{
            alert("保存失败，请刷新后再试");
        }
        pannel.processing = false;
    });
}

var galleryWidthMax = 580;
function upload($target,avatar,productsUp){
  pannel.processing = true;
  if(!avatar && !productsUp){
    var $uploadWrap = $('.uploadWrap');
    var $caption = $uploadWrap.children('.uploadDescription');
    var $uploadButton = $uploadWrap.children('.uploadButton');
    var $progressBar = $uploadButton.children('.progressBar');
    var $uploadStatus = $uploadButton.children('.uploadStatus');
  }
  if($target.files.length > 0) {
    var file = $target.files[0];
    if(productsUp){
      var sliderIndex = file;
      var products = pannel.sliderImage[sliderIndex];
      file = {base64: products.link};
      var postId = $target.id;
      var name = products.name;
      var type = products.type;
      var cover = products.cover;
      var productsCaption = products.caption;
      var size = parseInt(products.size);
      var progressStepWidth = 50/$target.totoal;
      progressSys('正在上传第'+$target.index+'张本地图片',pannel.pannelProgressWidth);
    }else{
      var name = file.name;
      var type = file.type;
      var size = file.size;
    }
    var avFile = new AV.File(name, file);
    if(avatar || productsUp){
      var video = ["image/jpg","image/jpg"];
    }else{
      var video = ["image/jpg","image/jpg"];
      //暂不支持视频
      // var video = ["audio/mp4","video/mp4"];
    }
    if(type=="image/jpg"||type=="image/jpeg"||type=="image/png"||type=="image/gif"||type==video[0]||type==video[1]){
      console.log("文件上传中");
      if(!avatar && !productsUp){
        $uploadStatus.addClass('uploading');
      }
      avFile.save({
        onprogress:function (e)  {
          console.log(e.percent);
          if(!avatar && !productsUp){
            var per = e.percent - 6;
            $progressBar.css('transform', 'translatex('+per+'%)');
          }
        },
      }).then(function(data){
        console.log("文件上传完成");
        if(productsUp){
          progressSys('第'+$target.index+'张本地图片上传成功',pannel.pannelProgressWidth);
        }
        var fileUrl = data.url();
        $.ajax({
          url:fileUrl+'?imageInfo',
          success:function(imageInfo){
            function wrap(imageAve){
              console.log("打包文件中");
              // var fileWidth = $img[0].naturalWidth;
              // var fileHeight = $img[0].naturalHeight;
              if(imageInfo.width){
                var fileWidth = imageInfo.width;
              }else{
                var fileWidth = 0;
              }
              if(imageInfo.height){
                var fileHeight = imageInfo.height;
              }else{
                var fileHeight = 0;
              }
              // var ratio = $fileWidth/$fileHeight;
              var imageUrl = avFile.url();
              var galleryPost = new AV.Object("Gallery");
              var fileId = avFile.id;
              var caption = '';
              var isAvatar = false;
              if(!avatar && !productsUp){
                caption = $caption.html();
                // 当删空$captionEdit时其会保留<br>故清除
                if(caption=="<br/>"||caption=="<br>"){
                  caption=null;
                }
              }
              if(avatar){
                isAvatar = true;
              }
              var imgRefer = [];
              if(productsUp){
                var productsRefer = {name: 'products',id: postId};
                imgRefer.push(productsRefer);
                galleryPost.set("refer",imgRefer);
                progressSys('准备包装第'+$target.index+'张本地图片',pannel.pannelProgressWidth);
              }
              galleryPost.set("author",currentUser);
              galleryPost.set("file", avFile);
              galleryPost.set("url",imageUrl);
              galleryPost.set("fileId",fileId);
              galleryPost.set("width",fileWidth);
              galleryPost.set("height",fileHeight);
              galleryPost.set("size",size);
              galleryPost.set("caption", caption);
              galleryPost.set("avatar", isAvatar);
              if(imageAve){
                galleryPost.set("imageAve", imageAve);
              }
              galleryPost.save().then(function(newPost){
                console.log("打包文件完成");
                if(size > 1024*1024){
                  size = (size/1024/1024).toFixed(1) + ' M';
                }else if(size > 1024){
                  size = (size/1024).toFixed(1) + ' KB';
                }else if(size > 0){
                  size = size + ' B';
                }
                if(caption.length == 0){
                  caption = '...';
                }
                var createdTime = styleTime(newPost.createdAt);
                if(!avatar){
                  //如果是头像，则不添加至gallery
                  pannel.items.unshift({
                    url: imageUrl,
                    link: 'url('+imageUrl+'?imageMogr2/strip/thumbnail/'+galleryWidthMax+'x)',
                    caption: caption,
                    resolution: fileWidth +' X '+ fileHeight,
                    createdAt: createdTime,
                    authorName: currentUser.get('username'),
                    authorId: currentUser.id,
                    fileId: fileId,
                    size: size,
                    id: newPost.id,
                    notMyFile: false,
                    search: false,
                    refer: imgRefer,
                    imageAve: imageAve,
                  });
                }
                if(pannel.items.length === 1){
                  setImgDetail(0);
                  pannel.imgDetailBoxShow = true;
                }
                if(avatar){
                  updateUser(avFile,imageUrl,newPost);
                }else if(!productsUp){
                  $uploadStatus.addClass('success');
                  $progressBar.css('transform', 'translatex(100%)');
                  window.setTimeout(function(){
                    colseUploadBox();
                  },800);                                  
                }
                if(productsUp){
                  pannel.pannelProgressWidth = pannel.pannelProgressWidth - progressStepWidth;
                  progressSys('第'+$target.index+'张本地图片包装成功，等待其他图片包装',pannel.pannelProgressWidth);
                  console.log('准备更新图片列表');
                  var len = pannel.uploadWaitingLine.length;
                  var a = 0;
                  var b = true;
                  if(len > 0){
                    $(pannel.uploadWaitingLine).each(function(index, el) {
                      console.log(el);
                      if(el.galleryId){
                        a++;
                      }else{
                        if(el.url === (sliderIndex+products.name + products.size.toString())){
                          var obj = {
                            galleryId: newPost.id,
                            url: imageUrl,
                            referProduct: [],
                            refer: true,
                            cover: cover,
                            caption: productsCaption,
                          };
                          if(imageAve){
                            obj.imageAve = imageAve;
                          }
                          pannel.uploadWaitingLine.splice(index,1,obj);
                          a++;
                          b = true;
                        }else{
                          b = false;
                        }
                      }
                    });
                    if(a === len && b){
                      progressSys('所有本地图片包装成功,准备更新图片列表',15);
                      console.log('开始更新图片列表');
                      var productsPost = AV.Object.createWithoutData('Products', postId);
                      productsPost.set('images', pannel.uploadWaitingLine);
                      productsPost.save().then(function (data) {
                        galleryReferUpdate(pannel.postDataImages,pannel.uploadWaitingLine,postId,'products');
                        console.log('更新图片成功');
                        progressSys('更新图片列表成功，产品成功发布',0);
                        router.go(-1);
                      }, function (error) {
                      });
                    }
                  }
                }
                console.log("结束");
                pannel.processing = false;
              }, function(error){
                alert('由于网络故障，麻烦重新上传。');
                pannel.processing = false;
                console.log(error);
              });
            }
            $.ajax({
              url:fileUrl+'?imageAve',
              success:function(imageAve){
                wrap(imageAve);
              },error:function(xhr){
                wrap();
              }
            });
          },error:function(xhr){
            // alert("错误提示： " + xhr.status + " " + xhr.statusText);
            if(xhr.status == 400){
              avFile.destroy();
              if(!avatar && !productsUp){
                clearUploadBox();
              }
              pannel.processing = false;
              alert("该文件已损坏，请重新检查您的文件");
            }
          }
        });
      }, function(error) {
        if(!avatar && !productsUp){
          clearUploadBox();
        }
        pannel.processing = false;
        alert("由于网络故障，麻烦重新上传。");
        console.log(error);
      });
    }else{
      if(!avatar && !productsUp){
        clearUploadBox();
      }
      pannel.processing = false;
      // alert("很抱歉！只能上传格式为jpg、jepg、png、gif的照片或mp4的视频。");
      alert("很抱歉！只能上传格式为jpg、jepg、png、gif的照片。");
    }
  }else{
    if(!avatar && !productsUp){
      clearUploadBox();
    }
    pannel.processing = false;
    alert("你似乎还没提交文件呀。");
  }
}

function styleTime(time,onlyDate) {
    var month = time.getMonth()+1;
    if(month < 10){
      month = '0'+ month.toString();
    }
    var styleTime = time.getFullYear()+'.'+month+'.'+time.getDate();
    if(!onlyDate){
      styleTime = time.getFullYear()+'.'+month+'.'+time.getDate()+' '+time.getHours()+':'+time.getMinutes();
    }
    return styleTime;
}

var postQueryCount = 0;
function postQuery(search) {
  if(pannel){
    pannel.productsLoading = true;
  }
  var postQueryLimit = 100;
  var isSearch = false;
  if(search){
    postQueryLimit = 1000;
    isSearch = true;
    pannel.productsSearchContent = search;
  }
  var postQuery = new AV.Query('Products');
  postQuery.limit(postQueryLimit);
  postQuery.include('author');
  postQuery.include('file');
  postQuery.addDescending('createdAt');
  if(search){
    var titleENQuery = new AV.Query('Products');
    titleENQuery.contains('titleEN',search);
    var desENQuery = new AV.Query('Products');
    desENQuery.contains('desEN',search);

    var tagENQuery = new AV.Query('Products');
    tagENQuery.contains('tagEN',search);
    var companyENQuery = new AV.Query('Products');
    companyENQuery.contains('companyEN',search);

    postQuery = AV.Query.or(titleENQuery, desENQuery, tagENQuery, companyENQuery);
    var $productsList = $('.productsUlList');
    $productsList.hide();
  }
  if(!search && postQueryCount > 0){
    postQuery.skip(postQueryCount*postQueryLimit);
  }
  postQuery.find().then(function (results) {
    if(results.length > 0){
      for (var i = 0; i < results.length; i++) {
        var obj = {};
        obj.id = results[i].id;
        obj.query = i;
        obj.name = results[i].get('titleEN');
        obj.user = results[i].get('author').get('username');
        var cat = results[i].get('category');
        if(cat === 1){
          obj.category = 'project';
        }else if(cat === 2){
          obj.category = 'lab';
        }
        // for (var x = 0; x < productsTypeList.length; x++) {
        //   if(productsTypeList[x].type === cat){
        //     obj.category = productsTypeList[x].name;
        //     break;
        //   }
        // }
        obj.time = styleTime(results[i].createdAt,true);
        obj.data = results[i];
        obj.search = isSearch;
        pannel.productsList.push(obj);
      }
      pannel.productsLoading = false;
      if(search){
        pannel.productsSearchShow = true;
      }
      if(!search && results.length < postQueryLimit){
        pannel.productsLoadFinished = true;
      }
    }else{
      pannel.productsLoadFinished = true;
      console.log('无搜索结果');
      if(search){
        alert('无搜索结果');
        $productsList.fadeIn();
      }
    }
    postQueryCount ++;
  }, function (error) {
    alert('查询出错');
    console.log(error.message);
  }); 
}

var galleryQueryCount = 0;
function galleryQuery(search){
    if(pannel){
      pannel.galleryLoading = true;
    }
    var galleryQueryLimit = 20;
    if(search){
      galleryQueryLimit = 1000;
    }
    var galleryQuery = new AV.Query('Gallery');
    galleryQuery.limit(galleryQueryLimit);
    galleryQuery.include('author');
    galleryQuery.include('file');
    if(!search && galleryQueryCount > 0){
      galleryQuery.skip(galleryQueryCount*galleryQueryLimit);
    }
    if(search){
        galleryQuery.contains('caption',search);
        var $imgList = $('.imgList');
        $imgList.hide();
    }
    galleryQuery.addDescending('createdAt');
    galleryQuery.find().then(function (results) {
        if(results.length > 0){
            pannel.imgDetailBoxShow = true;
            var imgDetailBoxFirst = false;
            $(results).each(function(index, el) {
                var id = el.id;
                var url = el.get('file').get('url');
                var size = el.get('size');
                var caption = el.get('caption');
                var resolution = el.get('width') +' X '+el.get('height');
                var createdTime = styleTime(el.createdAt);
                var authorName = el.get('author').get('username');
                var authorId = el.get('author').id;
                var fileId = el.get('file').id;
                var isAvatar = el.get('avatar');
                var refer = el.get('refer');
                var imageAve = el.get('imageAve').RGB;
                function pushItem(){
                  if(size > 1024*1024){
                      size = (size/1024/1024).toFixed(1) + ' M';
                  }else if(size > 1024){
                      size = (size/1024).toFixed(1) + ' KB';
                  }else if(size > 0){
                      size = size + ' B';
                  }
                  if(currentUser.id == authorId){
                      var notMyFile = false;
                  }else{
                      var notMyFile = true;
                  }
                  if(!caption){
                      // var placeholder = '添加注释';
                      var contenteditable = true;
                      var captionEditBoxActive = false;
                      var listEditActive = false;
                  }else{
                      var contenteditable = false;
                      var captionEditBoxActive = true;
                      // var placeholder = '';
                      var listEditActive = true;
                  }
                  if(!imgDetailBoxFirst && galleryQueryCount === 0){
                      // $('.imgDetailCaption').text('');
                      pannel.id = id;
                      pannel.fileUrl = url;
                      pannel.fileCaption = caption;
                      pannel.resolution = resolution;
                      pannel.createdTime = createdTime;
                      pannel.authorName = authorName;
                      pannel.fileSize = size;
                      pannel.authorId = authorId;
                      pannel.fileId = fileId;
                      pannel.link = url +'?imageMogr2/strip/thumbnail/'+galleryWidthMax+'x';
                      // pannel.placeholder = placeholder;
                      pannel.contenteditableCheck = contenteditable;
                      pannel.captionEditBoxActive = captionEditBoxActive;
                      pannel.listEditActive = listEditActive;
                      pannel.galleryReferCount = refer.length;
                      pannel.galleryRefer = refer;
                      imgDetailBoxFirst = true;
                  }
                  if(!caption){
                      caption = '...'
                  }
                  if(search){
                      var isSearch = true;
                      var $searchContent = $('.searchContentBox');
                      $searchContent.children('.searchContent').text(search);
                      $searchContent.show();
                  }else{
                      var isSearch = false;
                  }
                  pannel.items.push({
                      url: url,
                      link: 'url('+url+'?imageMogr2/strip/thumbnail/'+galleryWidthMax+'x)',
                      caption: caption,
                      resolution: resolution,
                      createdAt: createdTime,
                      authorName: authorName,
                      authorId: authorId,
                      fileId: fileId,
                      size: size,
                      id: id,
                      notMyFile: notMyFile,
                      search: isSearch,
                      refer: refer,
                      imageAve: imageAve,
                  });
                }
                if(isAvatar){
                  if(search){
                    pushItem();
                  }else{
                    //自己的头像
                    // if(currentUser.id === authorId){
                    //   pushItem();
                    // }
                  }
                }else{
                  pushItem();
                }
            });
            galleryQueryCount++;
            pannel.galleryLoading = false;
            if(results.length < galleryQueryLimit){
              pannel.galleryLoadFinished = true;
            }
        }else{
          console.log('无照片');
          pannel.galleryLoadFinished = true;
            if(search){
                alert('无搜索结果');
                $imgList.fadeIn();
            }
        }
    }, function (error) {
        alert('查询出错');
        console.log(error.message);
    });    
}

function progressSys(step,progress){
  pannel.pannelProgressInfoList.push({name: step});
  pannel.pannelProgressWidth = progress;
  if(parseInt(progress) == 0){
    pannel.pannelProgressInfo = '发布成功';
    pannel.processing = false;
    pannel.overlayTip = "点击背景返回";  
    window.setTimeout(function(){
      pannel.overlay = false;
      pannel.pannelProgress = false;
      pannel.pannelProgressShow = false;
      pannel.pannelProgress = false;
    },1000);
  }
}

var bus = new Vue();

var user = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

var loading = {
  template: `
    <ul class="loading">
      <li class="loadBall loadBall1"></li>
      <li class="loadBall loadBall2"></li>
      <li class="loadBall loadBall3"></li>
    </ul>
  `
}

var searchBar = {
  props: ['searchPlaceholder'],
  template: `
    <div class="searchBox">
      <input type="text" :placeholder="searchPlaceholder" v-model="searchText" @keyup.enter="search"/>
      <div class="search" @click="search"></div>
    </div>
  `,
  data: function(){
    return {
      searchText: '',
    }
  },
  methods: {
    search: function(event){
      var searchContent = this.searchText;
      if(checkBlankSpace(searchContent)){
        var type = this.searchPlaceholder;
        console.log(type);
        if(type === 'Search case'){
          postQuery(searchContent);
        }else if(type === 'Search image'){
          galleryQuery(searchContent);
        }
      }else{
        return false;
      }
    },
  }
}