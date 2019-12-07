$('#category').on('submit',function(e){
    // 阻止表单的默认提交事件
    e.preventDefault();
    
    var formData = $(this).serialize();

    $.ajax({
        url:"/categories",
        type:'post',
        data:formData,
        success:function(){
            location.reload();
        }
    })
})

$.ajax({
    url:'/categories',
    type:'get',
    success:function(resp){
        var html = template('categoryTpl',{data:resp})
        // console.log(html);
        
        $('#categoryBox').html(html)
    }
})

// 点击编辑按钮
$('#categoryBox').on('click','.edit',function(){
    var  id = $(this).attr('data-id')
    
    $.ajax({
        type:'get',
        url:'/categories/'+ id ,
        success:function(resp){

            var html = template('modifyTpl',resp)
            console.log(html);
            
            $('#modifyBox').html(html)
        }
    })
})

// 当修改分类行为提交的时候
$('#modifyBox').on('submit','#modifyForm',function(e){
    e.preventDefault();
    var  formData= $(this).serialize();
    var id =$(this).attr('data-id')

    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            location.reload();
        }
    })
})

