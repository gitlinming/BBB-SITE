AV.init({
	appId:"2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz",
	appKey:"5r6kUUiCUQex97AL1L4sTjgT"
});

var path="https://www.bbbstud.io/";
var currentUser = AV.User.current();
if(currentUser){
	var existequery = new AV.Query('_User');
	existequery.equalTo('id', currentUser.id);
	existequery.find().then(function (results) {
		location.href = path+'pannel';
	}, function (error) {
		AV.User.logOut();
		currentUser = null;
		location.reload();
	});
}
var hello=[
	'is anyone over your shoulder?',
	'smile, and i will smile back.',
	"in case you don't know what human looks like.",
	'you, sitting in a black room.',
	'lost employee.',
	'仪容镜',
	'"mirror mirror on the wall, who is the blackest one of all?"',
	'😘',
	'do not touch, works of art.',
	"if you're reading this, you can't see you.",
	'a portrait of an sexual maturity homo sapiens.',
	'Created by Charlie Brooker.',
	'can you see me?',
	'#000000',
	'Black humour'
];

var random = Math.floor(Math.random()*hello.length);

function sayHello(random){
	if(localStorage.loginHello){
		if(localStorage.loginHello == random){
			random = Math.floor(Math.random()*hello.length);
			sayHello(random);
		}else{
			$('.loginImg').text(hello[random]);
		}
	}else{
		localStorage.loginHello = random;
		$('.loginImg').text(hello[random]);
	}
}
sayHello(random);

function checkBlankSpace(str){
	while(str.lastIndexOf(" ")>=0){
	   str = str.replace(" ","");
	}
	if(str.length === 0){
	   return false;
	}else{
	   return true;
	}
}

function login($target){
	var userName = $('.userName').val();
	var password = $('.password').val();
	if(userName.length > 0 && checkBlankSpace(userName)){
		if(password.length > 0 && checkBlankSpace(password)){
			$target.text('登录中...');
			AV.User.logIn(userName, password).then(function (loginedUser) {
				$target.text('成功，正在跳转...');
				var user = AV.Object.createWithoutData('_User', loginedUser.id);
				user.set('session', loginedUser._sessionToken);
				user.save().then(function(data){
					location.href = path+'pannel';
				}, function(error){
					//失败
				});
			}, function (error) {
				if(error.code === 211){
					alert('该用户不存在');
				}else if(error.code === 210){
					alert('密码错误');
				}
				$target.text('登录');
			});
		}else{
			alert('请输入密码');
		}
	}else{
		alert('请输入正确的用户名');
	}

}

$(window).keydown(function(event){ 
    if(event.which == 13){
    	login($('.submitBox'));
    }
});

$('.submitBox').click(function() {
	login($(this));
});

$('.createAdmin').click(function() {
	var $this = $(this);
	if($this.hasClass('comfirmCreate')){
		var userName = $('.userNameSign').val();
		var email = $('.emailSign').val();
		var pas1 = $('.passwordSign1').val();
		var pas2 = $('.passwordSign2').val();
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(userName.length > 0 && checkBlankSpace(userName)){
			if(reg.test(email)){
				if(pas1.length > 5){
					if(pas1 === pas2){
						var user = new AV.User();
						user.setUsername(userName);
						user.setPassword(pas2);
						user.setEmail(email);
						user.signUp().then(function (loginedUser) {
							console.log(loginedUser);
							var roleAcl = new AV.ACL();
							roleAcl.setPublicReadAccess(true);
							roleAcl.setPublicWriteAccess(false);
							roleAcl.setWriteAccess(AV.User.current(), true);
							var administratorRole = new AV.Role('Administrator', roleAcl);
							var relation = administratorRole.getUsers();
							relation.add(AV.User.current());
							administratorRole.save().then(function(role) {
								alert('创建成功');
								location.href = path+'pannel';
							}).catch(function(error) {
								console.log(error);
							});
						}, function (error) {
							alert('出现了未知的错误');
							console.log(error.massage);
						});
					}else{
						alert('密码不一致，请再次输入');
					}
				}else{
					alert('密码至少需要6位数');
				}
			}else{
				alert('email格式错误，请再次输入');
			}
		}else{
			alert('请输入正确的用户名');
		}
	}else{
		var $loginWrap = $this.parents('.loginWrap');
		if($this.hasClass('adminExist')){
			alert('已有管理员啦');
		}else{
			$this.text('查询中...');
			var roleQuery = new AV.Query(AV.Role);
			roleQuery.equalTo('name', 'Administrator');
			roleQuery.first().then(function(adminRole) {
				if(adminRole && adminRole.id){
					alert('已有管理员');
					$this.text('创建管理员');
					$this.addClass('adminExist');
				}else{
					$loginWrap.addClass('creatingAdmin');
					$this.text('确认创建');
					$this.addClass('comfirmCreate');
				}
			}).catch(function(error) {
				console.log(error);
			});				
		}
	}
});

$('.cancel').click(function() {
	var $createAdmin = $(this).siblings('.createAdmin');
	$createAdmin.removeClass('comfirmCreate');
	$createAdmin.text('创建管理员');
	$(this).siblings('.inputBox').each(function(index, el) {
		$(el).children('input').val('');
	});
	$('.loginWrap').removeClass('creatingAdmin forgetPasWrap');
});

$('.forgetPas').click(function() {
	$('.loginWrap').addClass('forgetPasWrap');
});

$('.getPassword').click(function() {
	var email = $('.emailForget').val();
    AV.User.requestPasswordReset(email).then(function (success) {
        console.log(success);
        alert('已发送邮件至你的邮箱，请及时查看。');
        $('.cancel').click();
    }, function (error) {
        console.log(error.code);
        alert(error);
    });
});
