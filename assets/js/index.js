$(function() {
    getUserInfo();
    $('#btnLogout').on('click', function() {

        const layer = layui.layer;
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function(index) {

            //跳转到登录页
            location.href = "./login.html"
                //清空本地token
            localStorage.removeItem('token')
                //关闭询问框
            layer.close(index)
        });
    })
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //请求头配置对象
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
            const layered = layui.layer;
            if (res.status !== 0) {
                return layered.msg('获取用户信息失败')
            }
            //调用renderAvatar 熏染用户头像
            renderAvatar(res.data)
        },

        /*    //无论请求成功还是失败请求完成后回调
           complete: function(res) {
               if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                   localStorage.removeItem('token');
                   //跳转到登录页
                   location.href = "./login.html"
               }
           } */
    });

}
//染用户头像
function renderAvatar(user) {
    const name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp; &nbsp;  ' + name)
    if (user.user_pic == null) {
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    } else {
        //渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }


}