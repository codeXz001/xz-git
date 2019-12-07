$('#userForm').on('submit',function(){
    var formData= $(this).serialize()
    console.log(formData);
    

    $.ajax({
        url:'/users',
        type:'post',
        data:formData,
        success:function(data){
            location.reload()
        },
        error:function(err){
            console.log('添加用户失败')
        }
    })
    return false;
})


$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    // console.log( this.files[0]);
    
    formData.append('avatar', this.files[0]);

    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(resp){
            console.log(resp);
            
            $('#preview').attr('src',resp[0].avatar)
            $('#hiddenAvatar').val(resp[0].avatar)
        }
    })
})


$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        var html = template('userTpl',{data:response})

        $('#userBox').html(html)
    }

})


$('#userBox').on('click','.edit',function(){
    var  id = $(this).attr('data-id')
    console.log(id)

    $.ajax({
        url:'/users/'+id,
        type:'get',
        success:function(data){
            console.log(data);
            
            var html = template('modifyTpl',data)

            console.log(html)
            $('#modifyBox').html(html)
        }
    })
})


// 为修改表单添加表单提交事件

$('#modifyBox').on('submit','#modifyForm',function(e){

    e.preventDefault();
    var formData= $(this).serialize();

    var id = $(this).attr('data-id') 

    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(resp){
            location.reload()
        }
    })
})

// 删除按钮被点击时
$('#userBox').on('click','.delete',function(){
    if(confirm('确定要删除吗？')) {
        var  id =  $(this).attr('data-id');

        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload()
            }
        })
    }
});


// 全选反选
 var  selectAll = $('#selectAll');
 var  deleteMany = $('#deleteMany')

 selectAll.on('click',function(){
     var status = $(this).prop('checked');
     if (status){
         deleteMany.show();
     } else {
         deleteMany.hide()
     }

     $('#userBox').find('input').prop('checked',status)
 })

 $('#userBox').on('change','.userStatus',function(){
     var inputs = $('#userBox').find('input');

     if(inputs.length == inputs.filter(':checked')) {
         selectAll.prop('checked',true)
     } else{
        selectAll.prop('checked',false)
     }

     if(inputs.filter(':checked').length>0) {
         deleteMany.show()
     } else {
         deleteMany.hide()
     }
 })

//  为批量删除添加点击事件
 deleteMany.on('click',function(){
     var ids= []

     var checkUser = $('#userBox').find('input').filter(':checked')

     checkUser.each(function(index,element){
         ids.push($(element).attr('data-id'));
     })

     if(confirm('确定要进行批量删除操作吗？')){
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success:function(){
                location.reload();
            }
        })
     }
 })