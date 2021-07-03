$(function() {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "长度必须在1~6个字符串之间"
            }
        }
    })
    initUserInfo()
        //初始化用户数据
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('获取用户失败')
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                form.val("initUserInfo", res.data)
            }
        });
    }
    /* 重置按钮 */
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();
        })
        /* 监听表单提交事件 */
    $('.layui-form').on('submit', function(e) {

        e.preventDefault();
        //console.log($('.layui-form').serialize());
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                    //调用index.js中渲染头像和昵称的方法
                window.parent.getUserInfo()
            }
        });
    })



})