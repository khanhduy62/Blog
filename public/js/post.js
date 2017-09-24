function Post(){
    function bindEvent(){
        $(".post_edit").click(function(e){
            var params = {
                id: $(".id").val(),
                title: $(".title").val(),
                content: tinyMCE.get('mytextarea').getContent().replace(/<br\s*[\/]?>/gi, "\n"),
                author: $(".author").val(),
            }

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            console.log('base_url ', base_url)
            $.ajax({
                url: base_url + "/admin/post/edit",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function(res){
                    console.log('success')
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            })
        })

        $(".post_delete").click(function(e){
            var post_id = $(this).attr("post_id")
            
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/post/delete",
                type: "DELETE",
                data: {id: post_id},
                dataType: "json",
                success: function(res){
                    console.log('success')
                    if(res && res.status_code == 200){
                        location.reload();
                    }
                }
            })
        })
    }

    bindEvent();
}

$(document).ready(function(){
    new Post();
})