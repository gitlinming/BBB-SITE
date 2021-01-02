AV.init({
  appId: '2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz',
  appKey: '5r6kUUiCUQex97AL1L4sTjgT'
});

var domain = 'www.bbbstud.io';
var path = 'https://'+domain+'/';
var domainRoute = ['/','work']
var nav = {
  logo: 'BBB studio',
  menuList:[
      {message: 'analysis', class: 'analysisMenu', link: 'analysis'},
      {message: 'projects', class: 'productsMenu', link: 'products'},
      {message: 'article', class: 'articleMenu', link: 'article'},
      {message: 'gallery', class: 'galleryMenu', link: 'gallery'},
      {message: 'help', class: 'helpMenu', link: 'help'},
  ]
}

//not useing
var productsTypeList = [
  {name: '沙发',type: 'sofa'},
  {name: '椅子',type: 'chair'},
  {name: '茶几',type: 'desk'},
  {name: '桌子',type: 'table'},
]

var helpList=[
  {
    title: '我应该使用什么浏览器？',
    content: '请确保你使用的是Chorme，Safari，Firefox等现代浏览器，并升级到最新版本，请不要使用IE10以下版本的浏览器，它们并不安全且体验差。',
  },
  {
    title: '我的数据安全吗？',
    content: '数据安全和隐私安全是 BBB 工作室的工作中心之一。我们使用加密技术和白名单来保护客户的数据。我们不会收集，分析和分享客户的任何数据。',
  },
  {
    title: '后台支持哪些设备？',
    content: '在电脑端使用后台可以达到最佳的使用体验，ipad端的支持正在我们的开发计划中。由于屏幕的限制，我们不会在手机端提供支持。',
  },
  {
    title: '后台会增加新的功能吗？',
    content: '是的，我们不定时有新的功能或优化推出，所有选择了运维方案的客户都可以进行免费的升级，升级前我们会通知管理者。',
  },
  {
    title: '如何快速找到我想要的图片？',
    content: '有图片描述的图片可以快速的被搜索出来，你可以在图库上传图片时添加描述，或在图库对图片添加或更改图片描述。',
  },
  {
    title: '如何注册新的账号？',
    content: '只有管理者才能创建账号，管理者在后台右上角点击‘创建账号’按钮，输入新用户的邮箱即可，新用户按照收到的邮件来完成注册。',
  },
]

var currentPage = '/'
var isProductsEdit = false;