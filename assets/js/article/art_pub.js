$(function(e) {
    // 初始化富文本编辑器
    initEditor()
    var layer = layui.layer
    var form = layui.form;
    initCate()
        //定义加载文章分类方法
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                const htmlstr = template('tmp_sele', res)
                $('#select_option').html(htmlstr)
                    //调用form.render()方法
                form.render('select')
            }
        });

    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
    $image.cropper(options)
        /* 
           
    /* 点击选择图片 */
    $('#coverSele').on('click', () => {
        $('#coverFile').click()
    })

    //监听coverFile的change事件,赋值新图片
    $('#coverFile').on('change', (e) => {
        //获取文件列表
        var files = e.target.files
        if (files.length === 0) {
            return
        }

        //根据文件创建对应的url地址
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域  */

    })


    //已发布按钮绑定点击
    var art_state = '已发布'
    $('#btnsaver2').on('click', () => {
        art_state = '草稿'
    })

    //表单提交submit事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
            //基于form表单创建formData对象
        var fd = new FormData($(this)[0])
            //将文章的发布状态，存到fd中
        fd.append('state', art_state)

        /*   //将裁剪的图片存储到formdata中 */
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                    /* 发布文章 */
                publishArticle(fd)

            })

        function publishArticle(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                // 注意：如果向服务器提交的是 FormData 格式的数据，
                // 必须添加以下两个配置项
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('发布文章失败！')
                    }
                    layer.msg('发布文章成功！')
                        // 发布文章成功后，跳转到文章列表页面
                    location.href = '/article/art_list.html'

                },
            })
        }


    })






})