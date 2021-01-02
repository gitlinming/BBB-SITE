var router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: analysis,
            name: 'home',
        },
        {
            path: '/analysis',
            component: analysis,
            name: 'analysis',
        },
        {
            path: '/gallery',
            component: gallery,
            name: 'gallery',
        },
        {
            path: '/products',
            name: 'products',
            component: products,
        },
        {
            path: '/article',
            name: 'article',
            component: products,
        },
        {
            path: '/productsEdit',
            component: productsEdit,
        },
        {
            path: '/articleEdit',
            component: articleEdit,
        },
        {
            path: '/help',
            component: help,
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});
var pannel = new Vue({
    router: router,
    el: '#pannel',
    components: {
        'loading': loading,
        'products': products,
        'gallery': gallery,
        'productsEdit': productsEdit,
        'help': help,
    },
    created: function () {
        currentPage = '/';
        this.getInfo();
        if(currentUser){
            var c = this;
            currentUser.getRoles().then(function(roles){
                if(roles[0].attributes.name === 'Administrator'){
                    c.admin = true;
                }
            });
            if(currentUser.get('avatarUrl')){
                this.hasAvatar = true;
            }
            if(!currentUser.get('avatarUrl')){
                this.profileAvatar = '';
            }
        }
    },
    mounted: function () {
        if(currentUser.get('username') == currentUser.get('email')){
            this.profileButton();
            this.profileName = '';
        }
    },
    data: {
        logo: nav.logo,
        menuList: nav.menuList,
        admin: false,
        avatarBox: 'avatarBox',
        avatarClass: 'avatar',
        profileAvatarClass: 'profileAvatar',
        profileConfirmBoxClass: 'profileConfirmBox',
        newEmail: '',
        overlay: false,
        createAcountBoxClass: 'createAcountBox',
        createAcountBox: false,
        creatingAcount: false,
        subAcount: [],
        profileBox: false,
        profileName: currentUser.get('username'),
        profileEmail: currentUser.get('email'),
        profileAvatar: 'url('+currentUser.get('avatarUrl')+'?imageMogr2/strip/thumbnail/132x)',
        hasAvatar: false,
        profileAvatarReady: false,
        processing: false,
        uploadWaitingLine: [],
        overlayTip: '点击背景返回',
        pannelProgress: false,
        pannelProgressWidth: '-100%',
        pannelProgressInfo: '处理中，请稍等。',
        pannelProgressInfoList: [],
        pannelProgressWarp: 'pannelProgressWarp',
        pannelProgressShow: false,
        /////////anli///////////
        // date: ['2017-08-08', '2017-08-15'],
        // range: true,
        // datePickerLan: 'en',
        /////////gallery////////
        items: [],
        galleryLoading: true,
        galleryLoadFinished: false,
        fileUrl: '',
        fileCaption: '',
        resolution: '',
        fileSize: '',
        createdTime: '',
        authorName: '',
        authorId: '',
        fileId: '',
        id: '',
        link: '',
        placeholder: '添加注释',
        contenteditableCheck: false,
        captionEditBoxActive: false,
        listEditActive: false,
        imgDetailBoxShow: false,
        galleryReferCount: 0,
        galleryRefer: [],
        /////////products////////
        productsLoading: true,
        productsLoadFinished: false,
        productsImgOverlayShow: true,
        pleaseAddImg: '请选择一种方式添加产品图',
        pageActionCount: 0,
        containerWidth: '100%',
        containerTransform: 'translateX(0)',
        currentProductImg: 0,
        sliderImage: [],
        productsList: [],
        productsGalleryCount: 0,
        imgSelectList: [],
        productsSearchContent: '',
        postDataImages: '',
        productsSearchShow: false,
        productCover: false,
        productsCoverSelect: false,
    },
    methods: {
        getInfo: function(){
            // var timestamp = new Date().getTime();
            // var hash = md5(timestamp+'4wsFU5nAJfrWnpN8Qqh4c1tL');
            // this.$http.get('https://api.leancloud.cn/1.1/stats/appmetrics?platform=web&start=20170801&end=20170817&metrics=event_label_count&event=test-event-name&event_label=testa',{
            //     params: {foo: 'bar'},
            //     headers: {
            //         'X-LC-Id': '2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz',
            //         'X-LC-Sign': hash+','+timestamp+',master',
            //     }
            // }).then(function(ret){
            //     console.log(JSON.parse(ret.bodyText).data);
            // },function(err){
            //     console.log(err)
            // });
        },
        profileButton: function(){
            this.overlay = true;
            this.profileBox = true;
        },
        createAcountButton: function(){
            this.overlay = true;
            this.createAcountBox = true;
            var component = this;
            var query = new AV.Query('_User');
            query.find().then(function (results) {
                component.subAcount = [];
                for (var i = 0; i < results.length; i++) {
                    if(currentUser.id != results[i].id && results[i].get('session')){
                        component.subAcount.push(results[i]);
                    }else{

                    }
                }
            }, function (error) {
                alert('用户查找失败');
            });
        },
        subAvatar: function(data){
            if(data){
                return 'url('+data+')';
            }
        },
        dressName: function(data){
            if(!data.get("avatarUrl")){
                return data.get("username").slice(0,2);
            }
        },
        acountDelete: function(id,name,index){
            if(confirm('你确定删除'+name+'的账号吗？')){
                var component = this;
                console.log(id);
                var userQuery = new AV.Query('_User');
                userQuery.get(id).then(function (data) {
                    console.log(data);
                    $.ajax({
                        url: "https://api.leancloud.cn/1.1/users/"+id,
                        type: "DELETE",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("X-LC-Id", "2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz");
                            xhr.setRequestHeader("X-LC-Key", "5r6kUUiCUQex97AL1L4sTjgT");
                            xhr.setRequestHeader("X-LC-Session", data.get('session'));
                        },
                        success: function (data) {
                            component.subAcount.splice(index,1);
                        },
                        error: function (xhr, textStatus, errorThrow) {
                            if(JSON.parse(xhr.responseText).code === 206){
                                alert('删除失败，该账号尚未激活。');
                            }
                        }
                    });
                }, function (error) {
                    alert('删除失败');
                });
            }
        },
        avatarName: function(data){
            if(!this.hasAvatar){
                return data.slice(0,2);
            }
        },
        profileConfirm: function(){
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.profileName.length > 0){
                if(reg.test(this.profileEmail)){
                    if(!this.processing){
                        this.processing = true;
                            if(this.profileAvatarReady){
                                upload($(".avatarInput")[0],true,false);
                            }else{
                                updateUser();
                            }                    
                    }else{
                        alert('正在保存中');
                    }
                }else{
                    alert('邮箱格式错误');
                }
            }else{
                alert('请输入用户名');
            }
        },
        createAcount: function(event){
            if(!this.processing){
                var $component = this;
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var newEmail = $component.newEmail;
                if(reg.test(newEmail)){
                    var username = newEmail.split("@")[0];
                    $component.processing = true;
                    $component.creatingAcount = true;
                    var $createAcountload = $('.createAcountload');
                    $createAcountload.addClass('createAcountload1');
                    var query = new AV.Query('Default');
                    query.first().then(function (data) {
                        $createAcountload.addClass('createAcountload2');
                        function finish(text){
                            $createAcountload.addClass('createAcountload3');
                            alert(text);
                            $component.overlay = false;
                            $component.createAcountBox = false;
                            $component.processing = false;
                            $component.creatingAcount = false;
                            window.setTimeout(function(){
                                $component.newEmail = '';
                                $createAcountload.removeClass('createAcountload1 createAcountload2 createAcountload3');
                            },300);
                        }
                        var user = new AV.User();
                        user.setUsername(newEmail);
                        user.setPassword(data.get('funnyShit'));
                        user.setEmail(newEmail);                        
                        user.set('passwordSet',false);
                        console.log(newEmail);
                        user.save().then(function (newUser) {
                            console.log(newUser);
                            AV.User.requestPasswordReset(newEmail).then(function (success) {
                                console.log(success);
                                finish('创建成功，请提醒对方查看邮件');
                            }, function (error) {
                                console.log(error.code);
                                alert(error);
                            });
                        }, function (error) {
                            console.log(error,error.code);
                            if(error.code === 203){
                                AV.User.requestPasswordReset(newEmail).then(function (result) {
                                    console.log(result);
                                    finish('邮件已发送，请提醒对方查看邮件');
                                }, function (error) {
                                    console.log('no'+error);
                                    alert(error);
                                });
                            }else{
                                $component.processing = false;
                                $component.creatingAcount = false;
                                alert('由于网络故障，麻烦重新创建。');
                            }
                        });
                    }, function (error) {
                        console.log(error);
                        $component.processing = false;
                        $component.creatingAcount = false;
                        alert('由于网络故障，麻烦重新创建。');
                    });
                }else{
                    alert('邮箱输入错误');
                }                    
            }else{
                alert('正在保存中');
            }
        },
        avatarFile: function(event){
            // console.log(event);
        },
        avatarInputClick: function(){
            // alert(1);
        },
        overlayClose: function(){
            if(this.processing){
                alert('正在上传，请稍后再关闭');
            }else{
                this.overlay = false;
                this.createAcountBox = false;
                this.profileBox = false;
                this.profileName = currentUser.get('username');
                this.profileEmail = currentUser.get('email');
                //pannelProgress
                this.pannelProgress = false;
                this.pannelProgressInfoList = [];
                this.pannelProgressInfo = '处理中，请稍等。';                 
            }
        },
        showPannelProgress: function(){
            this.pannelProgressShow = true;
        },
        logout: function(){
            AV.User.logOut();
            location.href = path+'login.html';
        }
    }
}).$mount('#pannel');
// pannel.component(VeLine.name, VeLine)