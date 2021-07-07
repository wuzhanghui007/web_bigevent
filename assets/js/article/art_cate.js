$(function() {

    const layer = layui.layer
    const form = layui.form
    initArtCateList()
        //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    /* 添加列表 */
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                title: '在线调试',
                content: $('#dialog-add').html(),
                type: 1,
                area: ['500px', '250px']
            });


        })
        //通过代理的方式进行监听
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                layer.close(indexAdd)
                initArtCateList()
            }
        });

    })

    //点击弹出修改层
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function() {

        indexEdit = layer.open({
            title: '在线调试',
            content: $('#dialog-edit').html(),
            type: 1,
            area: ['500px', '250px']
        })
        var id = $(this).attr('data-id')
            // console.log(id);


        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,

            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                form.val('form-edit', res.data)
            }
        });
    })

    ////修改层内容提交数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
            //  console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),

            success: function(res) {
                //    console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                layer.msg('获取成功')

                layer.close(indexEdit)
                    //初始化列表
                initArtCateList()
            }
        });


    })

    //删除对应选项
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            //提示文本
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,

                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initArtCateList()
                    layer.close(index);
                }
            });

        });
    })








})