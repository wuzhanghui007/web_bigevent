$(function() {
    var form = layui.form;
    var laypage = layui.laypage;
    //定义一个查询对象，将来请求数据提交到服务器
    const q = {
        pagenum: 1,
        pagesize: 2, //每页显示几条数据
        cate_id: '', //文章分类id
        state: '', //文章发布的id
    }
    initTable()
        //获取文章列表数据的方法
    const layer = layui.layer

    function initTable() {

        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('获取列表失败');
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                randerPage(res.total)
            }

        });
    }

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())

            var h = padZero(dt.getHours())
            var s = padZero(dt.getSeconds())
            var m = padZero(dt.getMinutes())
            return y + '-' + m + '-' + d + ' ' + h + ':' + m + ':' + s
        }
        //补0函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initCate()
        //初始化文章分类的方法
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取内容失败')
                }
                //请求成功后调用引擎模板渲染
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

                form.render('select') //渲染select
            }
        });
    }

    //为表单绑定submit事件
    //console.log($('#form-search'));
    $('#form-search').on('submit', function(e) {
        console.log(1234);
        e.preventDefault()

        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            //为查询参数对象q中属性赋值
        q.cate_id = cate_id;
        q.state = state;
        //重新渲染
        initTable()


    })

    //定义渲染分页方法
    function randerPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的数据
            curr: q.pagenum, //设置默认选中的fenye
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],


            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }


            }
        });


    }

    //通过代理方式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length
            // 获取的Id
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                data: "data",
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len == 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    }
                    initTable()

                }
            });


            layer.close(index);
        });


    })

    //编辑页面
    $('tbody').on('click', '.btn-eadit', function() {

        window.parent.eadits()
        var eaditID = $(this).attr('data-id')
        console.log(eaditID);

        $.ajax({
            type: "GET",
            url: "/my/article/" + eaditID,
            success: function(res) {
                console.log(res);

            }
        });


    })

})