// "use strict";
// AV.init({
//   appId: '2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz',
//   appKey: '5r6kUUiCUQex97AL1L4sTjgT'
// });
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];

function toTop(x,y){
	window.scrollTo(x,y);
}

function slideToTop(){
  var scroll = document.body.scrollTop||document.documentElement.scrollTop; 
  var second = 200;
  var loopTime = 10;
  var times = second/loopTime;
  var dis = scroll/times;
  window.clearInterval(app.scrollInterval);
  function scrollTop(){
    scroll = scroll - dis;
    window.scrollTo(0,scroll);
    if(scroll <= 0){
      window.scrollTo(0,0);
      window.clearInterval(app.scrollInterval);
    }
  }
  var scrollInterval = window.setInterval(scrollTop,loopTime);
  app.scrollInterval = scrollInterval;
}

function checkBlankSpace(str){
    if(str){
        while(str.lastIndexOf(" ")>=0){
           str = str.replace(" ","");
        }
        if(str.length === 0){
           return false;
        }else{
           return true;
        }
    }else{
        return false;
    }
}

function checkEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
} 

function clearAllTimeout(){ 
  var end = setTimeout(function(){},1);
  var start = (end -100)>0?end-100:0;
  for(var i=start;i<=end;i++){
      clearTimeout(i);
  }
}

var isTouchDevice = 'ontouchstart' in document.documentElement;

var hub = new Vue();

function sendEmail(c,sendTo,email,caption,name){
  function addPara(type,data){
    return '%22%25'+type+'%25%22%3A%5B%22'+data+'%22%5D%2C';
  }
  function replace(email){
    var pattern = "@";
    email = email.replace(new RegExp(pattern), "%40");
    return email;
  }
  var addEmail = addPara('email','( unknown )');
  var addCaption = addPara('content','( This customer did not apply any question, please contact he or her soon.)');
  var addName = addPara('name','( unknown )');
  var template = 'bbb_say_hi';
  
  var to = replace(sendTo);
  var now = new Date();
  var month = now.getMonth()+1;
  var time = now.getFullYear()+'-'+month+'-'+now.getDate();
  var string = '';
  if(email){
    email = replace(email);
    addEmail = addPara('email',email);
  }
  if(caption){
    addCaption = addPara('content',caption);
  }
  if(name){
    addName = addPara('name',name);
  }
  string = addEmail+addName+addCaption;
  var content = 'email:%20'+email+'%3cbr%2f%3ename:%20'+name+'%3cbr%2f%3econtent:%20'+caption;

  // var request = 'https://sendcloud.sohu.com/apiv2/mail/sendtemplate?apiUser=bbstudio&apiKey=uc0DD4rw6snEH2lz&from=bbbstudio%40support.bbbstud.io&xsmtpapi=%7B%22to%22%3A%5B%22' + to + '%22%5D%2C' + '%22sub%22%3A%7B' + '%22%25time%25%22%3A%5B%22'+time+'%22%5D%2C' + string + '%7D%2C%22section%22%3A%7B%7D%7D&templateInvokeName='+template+'&respEmailId=true';
  c.$http.get('http://sendcloud.sohu.com/webapi/mail.send.json?api_user=bbstudio&api_key=uc0DD4rw6snEH2lz&from=bbbstudio%40support.bbbstud.io&subject=Someone%20says%20hi&html='+content+'&to='+sendTo+'&resp_email_id=true').then(function(response){
    // console.log(response);
  },function(){
    // console.log(response);
  });
}


var loading = {
  template: '\
  <div class="loadingBox">\
    <ul class="loading">\
      <li class="loadBall loadBall1"></li>\
      <li class="loadBall loadBall2"></li>\
      <li class="loadBall loadBall3"></li>\
    </ul>\
  </div>\
  '
};

var projectsList = [];
var LabList = [];
var allList = [];
var app;

var postQueryCount = 0;

// if(window.XDomainRequest){
//   var myUrl  = 'https://api.leancloud.cn/1.1/classes/Products';
//   var myData = '{"_method":"GET","_ApplicationId":"2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz","_ApplicationKey":"5r6kUUiCUQex97AL1L4sTjgT"}';
//     var xdr = new XDomainRequest();
//     xdr.onload = function() {
//         //readyStateChanged(xdr);
//         console.dir(xdr.responseText);
//     };
//     xdr.open("post", myUrl);
//     xdr.send(myData);
// }


function getPostData(app){
  // app.$http.get('https://app-router.leancloud.cn/2/route?appId=2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz').then(function(response){
    // var subLeanCloud = response.body.api_server;
    function processData(response){
      var resulte = response.body.results;
      if(resulte.length > 0){
        for (var i = 0; i < resulte.length; i++) {
          var data = resulte[i];
          var obj = {};
          var category = data.category;
          var title = data.titleEN;
          var des = data.desEN;
          var tag = data.tagEN;
          var company = data.companyEN;
          var imgs = data.images;
          var cover = '';
          var imageAve = '#144BAF';
          for (var x = 0; x < imgs.length; x++) {
            if(imgs[x].cover){
              cover = imgs[x].url + '?imageView2/0/w/912/interlace/1/ignore-error/1';
              if(imgs[x].imageAve.RGB){
                imageAve = '#' + imgs[x].imageAve.RGB.substring(2,8);
              }
            }
          }
          obj.title = title;
          obj.url = title.replace(/\s+/g,"-");
          obj.des = des;
          obj.tag = tag;
          obj.company = company;
          obj.imgs = imgs;
          obj.cover = cover;
          obj.id = data.objectId;
          obj.year = data.caseYear;
          obj.month = data.caseMonth;
          obj.day = data.caseDay;
          obj.imageAve = imageAve;
          obj.chosen = false;
          allList.push(obj);
          if(category === 1){
            projectsList.push(obj);
          }else if(category === 2){
            LabList.push(obj);
          }
        }
        postQueryCount = postQueryCount + 1;
        app.postQueryed = true;
        if(resulte.length === postQueryLimit){
          app.postQueryed = false;
          getPostData(app);
        }
      }else{
        console.log('无搜索结果');
      }
    }
    if(window.XDomainRequest){
      // ie 9 and less
      app.$http.post(
        'getData.php',
      ).then(function(response){
        processData(response);
      },function(error){
        console.log(error);
      });      
    }else{
      var subLeanCloud = '2qskybpx.api.lncld.net';
      var postQueryLimit = 1000;
      app.$http.post(
        'https://'+subLeanCloud+'/1.1/classes/Products',
        '{"_method":"GET","_ApplicationId":"2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz","_ApplicationKey":"5r6kUUiCUQex97AL1L4sTjgT"}',
        {
          headers: {
            // 'X-LC-Id': '2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz',
            // 'X-LC-Key': '5r6kUUiCUQex97AL1L4sTjgT',
            // 'Content-Type': 'application/json',
            'Content-Type': 'text/plain',
          },
          params: {
            'limit': postQueryLimit,
            'skip': postQueryCount*postQueryLimit,
            'order': '-updatedAt'
          },
        }
      ).then(function(response){
        processData(response)
      },function(error){
        // console.log(error);
      });      
    }
  // },function(response){
  //   console.log('second leancloud fail');
  // });
}
// function fetchProducts(){
//   function query(){
//     var postQueryLimit = 1000;
//     var postQuery = new AV.Query('Products');
//     postQuery.limit(postQueryLimit);
//     // postQuery.include('file');
//     postQuery.addDescending('createdAt');
//     postQuery.skip(postQueryCount*postQueryLimit);
//     postQuery.find().then(function (resulte) {
//       if(resulte.length > 0){
//         for (var i = 0; i < resulte.length; i++) {
//           var data = resulte[i];
//           var obj = {};
//           var category = data.get('category');
//           var title = data.get('titleEN');
//           var des = data.get('desEN');
//           var tag = data.get('tagEN');
//           var company = data.get('companyEN');
//           var imgs = data.get('images');
//           var cover = '';
//           var imageAve = '#144BAF';
//           for (var x = 0; x < imgs.length; x++) {
//               // console.log(imgs[x].imageAve);
//               if(imgs[x].cover){
//                 cover = imgs[x].url + '?imageView2/0/w/912/interlace/1/ignore-error/1';
//                 if(imgs[x].imageAve.RGB){
//                   imageAve = '#' + imgs[x].imageAve.RGB.substring(2,8);
//                 }
//               }
//           }
//           obj.title = title;
//           obj.des = des;
//           obj.tag = tag;
//           obj.company = company;
//           obj.imgs = imgs;
//           obj.cover = cover;
//           obj.id = data.id;
//           obj.year = data.get('caseYear');
//           obj.month = data.get('caseMonth');
//           obj.day = data.get('caseDay');
//           obj.imageAve = imageAve;
//           obj.chosen = false;
//           allList.push(obj);
//           if(category === 1){
//             projectsList.push(obj);
//           }else if(category === 2){
//             LabList.push(obj);
//           }
//         }
//         postQueryCount = postQueryCount + 1;
//         app.postQueryed = true;
//         if(resulte.length === postQueryLimit){
//           app.postQueryed = false;
//           fetchProducts();
//         }
//       }else{
//         console.log('无搜索结果');
//       }
//     }, function (error) {
//       // alert('查询出错');
//       console.log(error);
//       // console.log('1111'+error.message);
//     });
//   }
//   if(app){
//     if(!app.postQueryed){
//       query();
//     }
//   }else{
//     query();
//   }
// }
// fetchProducts();

var analytics = AV.analytics({
    appId: '2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz',
    appKey: '5r6kUUiCUQex97AL1L4sTjgT',
    version: '1.8.6',
    channel: 'web'
});