//发起请求时会调用
$.ajaxPrefilter(function(option) {
    //http://api-breakingnews-web.itheima.net


    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
        //统一为有权限的hearders请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    option.complete = function(res) {
        //无论请求成功还是失败请求完成后回调

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            //跳转到登录页
            location.href = "./login.html"
        }

    }


})