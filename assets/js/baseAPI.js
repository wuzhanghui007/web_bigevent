//发起请求时会调用
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    //http://api-breakingnews-web.itheima.net
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
})