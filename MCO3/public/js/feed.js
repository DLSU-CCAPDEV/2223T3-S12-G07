
$(document).ready(function(){

    refresh();
    $('#trending').click(function(){sort_trending()});
});

// helpers

function attachEventListeners(){
   // $('.profile_picture_bubble').click(function(){});
    $('a.reply_button').click( function(){render_replies($(this).parent().parent())});
    $('.create_reply_button').click(function(){create_reply($(this))});
    $('.create_comment_button').click(function(){create_comment($(this))});
    $('a.comment_button').click(function(){render_comments($(this).parent().parent())});
    $('.upvote_button').click(function(){click_upvote($(this))}); 
    $('.downvote_button').click(function(){click_downvote($(this))});

    $('.delete_comment').click(function(){delete_comment($(this))});
    $('.delete_reply').click(function(){delete_reply($(this))});
    $('.delete_post').click(function(){delete_post($(this))});

    $('.profile_picture_bubble, .profile_pic_img, .profile_picture, .cover_photo, .cover_photo_img').each( function(){render_image($(this))});
    
        
   //  /*   redirectProfile($(this))*/  }); 
}
/*
function redirectProfile(button){
    //profile picture id should have username
    window.location.href = '/profile_page?userName='+$(button).attr('id');
}
*/
function refresh(){
    var $upButtons = document.getElementsByClassName('upvote_button');
    var $downButtons = document.getElementsByClassName('downvote_button');
    for (let i = 0; i <$upButtons.length; i++){
        getVoteData($($upButtons[i]));
        getVoteData($($downButtons[i]));
  }
    attachEventListeners();
}
function repaint(){
    $('#new_posts').empty();
}
 function sort_trending(){
    
    $.get('/trending',{model:"posts", sort:{upvotes:-1}} , function(data){
        if(data!=null){
            repaint();
            for(var i = 0; i<data.length; i++){
                $.get('render_post', {post: data[i]}, function(data){
                    $('#new_posts').append(data);
                });
            }
    }
    });
    refresh();
    
 }
 function  render_image($img){
       // change id into : author_cover_post_date
       console.log('$img');
       if($img.attr('id') != null){
            const file = $img.attr('id').split('_');
            let pic="";
            console.log('file ' +file);
            if(file.length>2)
                    pic="cover"
                else
                    pic="profile"
            console.log('type ' +pic);
            $.get('/fileNameByAuthor', {name: file[0], type:pic},function(data){
                    if(data!=null&&data.filename!=""){
                        const url = '/imageByName?name='+data.filename;
                        console.log("urlo = "+ url);
                        $img.prop('src', url);
                    }
            });
     }
}

function delete_comment($button){

    var id = $button.attr('id');
    //id = delete_post_id or delete_comment_id or delete_reply_id
    id = id.split('_')[2];
    var details = {id: id};
    $.post('/deleteComment', details, function(req, res){
        $(`#${id}`).remove();
    });
}
function delete_reply($button){
    var id = $button.attr('id');
    var temp = id;
//id = delete_post_id or delete_comment_id or delete_reply_id   
     id = id.split('_')[2];
    var details = {id: id};
    $.post('/deleteReply', details, function(req, res){
        $(`#${id}`).remove();
    });
}
function delete_post($button){
    var id = $button.attr('id');
//id = delete_post_id or delete_comment_id or delete_reply_id
    id = id.split('_')[2];
    var details = {id: id};
    $.post('/deletePost', details, function(req, res){
        $(`#${id}`).remove();
    });
}

function getVoteData($button){
    var id =$button.attr('id');
        if(id != null){
        $.get('/checkVote',{id:id}, function(req, res){
            if(res!=null){

                if(req.upvote==true){
                    render_upvote($button);
                }else if(req.downvote==true){
                    render_downvote($button);
                }
            }
        });
    }
}
function click_upvote($button){
    var details = render_upvote($button);
    $.post('/voteContent', details,function(req){
        if(req.flag){
            if(req.upvotes != null && req.upvotes > 0){
                var text = $button.children('.actions');
                text.html(req.upvotes + 'upvotes');
            }
           
        }
        
    })   

}
function click_downvote(button){
    var details = render_downvote(button);
    $.post('/voteContent', details,function(req){
        if(req.flag){
            if(req.downvotes != null && req.downvotes > 0){
                var text = button.children('.actions');
                text.html(req.downvotes + 'downvotes');
            }
            
        }
        
    })
}
function create_comment(button){
    var comment_section = button.parent().parent().parent().parent();
        var post = comment_section.parent();
        var post_id = post.attr('id');
        var date = new Date();
        var content = button.siblings("textarea").val();
        details ={
            content: content,
            post: post_id,
            date: date,
        }
        $.post('/postComment',details, function(data){           
            if(data!=null){
                    $.get('/getComment', {id: data._id}, function(object){
                    var $feed = comment_section.find('.comment_feed')
                    $feed.append(object);
                    var $comment = $feed.find(`#${data._id}`);
                    var $reply = $comment.find('.create_reply_button');
                    $reply.on("click", function(){create_reply($reply)});
                    var $toggle_reply = $comment.find('a.reply_button');
                    $toggle_reply.on("click", function(){render_replies($toggle_reply.parent().parent())});
                    var $upvote = $comment.find('.upvote_button');
                    $upvote.on("click", function(){click_upvote($upvote)});
                    var $downvote = $comment.find('.downvote_button');
                    $downvote.on("click",function(){click_downvote($downvote)});
                    var $delete_comment = $comment.find('.delete_comment');
                    $delete_comment.on("click", function(){delete_comment($delete_comment)});
                    button.siblings("textarea").val("");
                    $comment.find('.profile_picture_bubble').each( function(){render_image($(this))});
                });
            }
        });
}
function create_reply(button){

    var reply_section = button.parent().parent().parent().parent();
        var comment = reply_section.parent();
        var comment_id = comment.attr('id');
        var date = new Date();
        var content = button.siblings("textarea").val();
        details ={
            content: content,
            comment: comment_id,
            date: date,
        }

        $.post('/postReply',details, function(data){
            if(data!=null){
                $.get('/getReply', {id:data._id}, function(object){
                    var $feed = reply_section.find('.reply_feed');
                    $feed.append(object);
                    var $reply = $feed.find(`#${data._id}`);
                   
                    var $upvote = $reply.find('.upvote_button');
                    $upvote.on("click",function(){click_upvote($upvote)});
                    var $downvote = $reply.find('.downvote_button');
                    $downvote.on("click",function(){click_downvote($downvote)});
                    var $delete_reply = $reply.find('.delete_reply');
                    $delete_reply.on("click", function(){delete_reply($delete_reply)});
                    button.siblings("textarea").val("");
                    $reply.find('.profile_picture_bubble').each( function(){render_image($(this))});
                });
            }
        });

}
function render_comments(post){
    var comment = post.children('.comment_section');
    if(comment.css('display') =="flex"){
        comment.css('display',"none");
    }else{
        comment.css('display',"flex");
        comment.css('flexDirection' ,"column");
        comment.css('alignItems' , "flex-end");
    }
}
function render_replies(post){
    var comment = post.children('.reply_section');
    if(comment.css('display')=="flex"){
        comment.css('display', "none");
    }else{
        comment.css('display',"flex");
        comment.css('flex-direction', "column");
        comment.css('alignItems' , "flex-end");
    }
}

function render_downvote($button){
    var $downvote = $button.children('.downvote_icon');
    var $text = $button.children('.actions');
    var votes={downvotes: 0, upvotes: 0,button_id: $button.attr('id')};
    if(!$downvote.prop("disabled")){
        $downvote.prop("disabled", true);
        $downvote.css("background-image", "url('/images/downvote_true.svg')");
        $text.css("color","#B70C0C");
        votes.downvotes+=1;
        var $upvote = $button.parent().find('.upvote_icon');
        if($upvote.prop("disabled")){
            $upvote.prop("disabled", false);
            $upvote.css("background-image", "url('/images/upvote.svg')");
            var $upvote_text = $upvote.parent().find('.actions');
            $upvote_text.css("color" , "#797878");
            votes.upvotes-=1;
        }
    }else{
        $downvote.prop("disabled", false);
        $downvote.css("background-image", "url('/images/downvote.svg')");
        $text.css("color","#797878");
        votes.downvotes-=1;
    }

    return votes;
}

function render_upvote($button){
    var $upvote = $button.children('.upvote_icon');
    var $text = $button.children('.actions');
    var votes={downvotes: 0, upvotes: 0, button_id: `${$button.attr('id')}`};
    if(!$upvote.prop("disabled")){

        $upvote.prop("disabled", true);
        $upvote.css("background-image", "url('/images/upvote_true.svg')");
        $text.css("color", "#0C6DB7");
        votes.upvotes +=1;
        var $downvote = $button.parent().find('.downvote_icon');

        if($downvote.prop("disabled")){

            $downvote.prop("disabled", false);
            $downvote.css("background-image", "url('/images/downvote.svg')");
            var $downvote_text = $downvote.parent().find('.actions');
            $downvote_text.css("color", "#797878");
            votes.downvotes -=1;

        }
    }else{

        $upvote.prop("disabled", false);
        $upvote.css("background-image", "url('/images/upvote.svg')");
        $text.css("color","#797878");       
        votes.upvotes -=1; 
    }
    return votes;
}