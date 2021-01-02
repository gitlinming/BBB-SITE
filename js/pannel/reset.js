var $alert = $('.alert');
var path = 'https://www.bbbstud.io/';
$('.update').click(function(event) {
      var $this = $(event.target);
      var $profileLoading = $this.parent().siblings('.profileLoading');
      $profileLoading.show();
      var $setProfileBox = $('.setProfileBox');
      // var username = $setProfileBox.children('.username');
      var password1 = $setProfileBox.children('.password1').val();
      var password2 = $setProfileBox.children('.password2').val();
      if(password1 && password1 && password1 == password2){
            var token = location.search.match(/token=(\w*)/);
            if(token&&token[1]){
                  token = token[1];
            }
            console.log(password1);
            $.jsonp({
                  url:"https://api.leancloud.cn/1.1/resetPassword/"+token,//如果页面运行在自己的服务器，需要写定一个绝对 URL,类似 "https://api.leancloud.cn/1.1/resetPassword/"
                  data:{"password": password1},
                  callbackParameter: "callback",
                  cache: false,
                  success:function(result){
                        if(result.error){
                              $alert.fadeIn();
                              $profileLoading.hide();
                        }else{
                              $profileLoading.hide();
                              $this.parent().addClass('actionUpdated');
                              location.href = path+'login';
                        }
                  },
                  error:function(result,text){
                        $alert.fadeIn();
                  }
            });
      }else{

      }
});