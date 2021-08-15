$(function() {
  /* 点击去注册账号 */
  $('#link_reg').on('click', function() {
      $('.login-box').hide();
      $('.reg-box').show();

    })
    /* 点击去登录*/
  $('#link_login').on('click', function() {
    $('.reg-box').hide();
    $('.login-box').show();
  })

  // 从layui中获取form对象
  const form = layui.form;
  const layered = layui.layer;
  /* //自定义校验规则 */
  form.verify({
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码是否一致的规则
    repwd: function(value) {
      const pwd = $('.reg-box [name=password]').val();

      if (pwd !== value) {
        return '两次密码不一致'
      }

    }
  })

  /* 监听注册事件的提交 */
  $('#form_reg').on('submit', function(e) {
    //阻止默认行为
    e.preventDefault();
    //console.log($('#form_reg').serialize());
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      /*  data: {
           username: $('#form_reg [name=username]').val(),
           password: $('#form_reg [name=repassword]').val()

       }, */
      data: $('#form_reg').serialize(),

      success: function(res) {
        if (res.status !== 0) {
          return layered.msg(res.message);
        }
        layered.msg('注册成功将跳转登录页面');
        setTimeout(function() {
          //模拟点击登录界面
          $('#link_login').click();
          //清空表单内容
          $('#form_reg')[0].reset();
        }, 3000)
      }
    });
  })


  /* 监听登录事件 提交 */
  $('#form_login').on('submit', function(e) {
    e.preventDefault();
    console.log($('#form_login').serialize());
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $('#form_login').serialize(),
      success: function(res) {
        console.log(res);
        if (res.status !== 0) {
          return layered.msg('登录失败');
        }
        layered.msg(res.message);
        console.log(res.token);
        //将token值存在本地
        localStorage.setItem('token', res.token)
          //跳转到后台主页
        location.href = "./index.html"

      }
    });





  })





})