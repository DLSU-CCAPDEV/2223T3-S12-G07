
$(document).ready(function(){

    var $upButtons = document.getElementsByClassName('upvote_button');
    var $downButtons = document.getElementsByClassName('downvote_button');
    console.log($upButtons);
    
    //check upvoted comments
   for (let i = 0; i <$upButtons.length; i++){
         getVoteData($($upButtons[i]));
         getVoteData($($downButtons[i]));
   }
    attachEventListeners();
});

// helpers

function attachEventListeners(){
    console.log("attaching event listeners");

    $('a.reply_button').click( function(){render_replies($(this).parent().parent())});
    $('.create_reply_button').click(function(){create_reply($(this))});
    $('.create_comment_button').click(function(){create_comment($(this))});
    $('a.comment_button').click(function(){render_comments($(this).parent().parent())});
    $('.upvote_button').click(function(){click_upvote($(this))}); 
    $('.downvote_button').click(function(){click_downvote($(this))});

    $('.delete_comment').click(function(){delete_comment($(this))});
    $('.delete_reply').click(function(){delete_reply($(this))});
    $('.delete_post').click(function(){delete_post($(this))});
    $('.edit_content').click(function(){edit_post($(this))});

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
        console.log("upvote or downvote id  = " + id);
        if(id != null){
        $.get('/checkVote',{id:id}, function(req, res){
            if(res!=null){
                console.log("req = " + req.upvote);
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
    console.log("upvote button clicked after ");
    var details = render_upvote($button);
    console.log("details = " + details);
    $.post('/voteContent', details,function(req,res){
        if(req.flag){
            if(req.upvotes != null && req.upvotes > 0){
                var text = $button.children('.actions');
                text.html(req.upvotes + 'upvotes');
            }
           
        }
        
    })   

}
function click_downvote(button){
    console.log("downvote button clicked");
    console.log(button.attr('id'));
    var details = render_downvote(button);
    $.post('/voteContent', details,function(req,res){
        if(req.flag){
            if(req.downvotes != null && req.downvotes > 0){
                var text = button.children('.actions');
                text.html(req.downvotes + 'downvotes');
            }
            
        }
        
    })
}
function create_comment(button){
    console.log("this is comment function claled")
    var comment_section = button.parent().parent().parent().parent();
        var post = comment_section.parent();
        var post_id = post.attr('id');
        console.log("comment"+post_id);
        var date = new Date();
        var content = button.siblings("textarea").val();
        console.log("content = " + content);
        details ={
            content: content,
            post: post_id,
            date: date,
        }
        $.post('/postComment',details, function(data){           
            if(data!=null){
                console.log(data);
                $.get('/getComment', {id: data._id}, function(object){
                    var $feed = comment_section.find('.comment_feed')
                    $feed.append(object);
                    var $comment = $feed.find(`#${data._id}`);
                    console.log("data id "+ data._id);
                    var $reply = $comment.find('.create_reply_button');
                    $reply.on("click", function(){create_reply($reply)});
                    var $upvote = $comment.find('.upvote_button');
                    $upvote.on("click", function(){click_upvote($upvote)});
                    var $downvote = $comment.find('.downvote_button');
                    $downvote.on("click",function(){click_downvote($downvote)});
                    button.siblings("textarea").val("");
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
        console.log("reply details: " + details);

        $.post('/postReply',details, function(data){
            if(data!=null){
                console.log(object);
                $.get('/getReply', data._id, function(object){
                    var $feed = reply_section.find('.reply_feed');
                    $feed.append(object);
                    var $reply = $feed.find(`#${data._id}`);
                    var $upvote = $reply.find('.upvote_button');
                    $upvote.click(click_upvote($upvote));
                    var $downvote = $reply.find('.downvote_button');
                    $downvote.click(click_downvote($downvote));
                    button.siblings("textarea").val("");
                });
            }
        });
}
function render_comments(post){
    var comment = post.children('.comment_section');
    console.log(comment);
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
    console.log(comment.css('display'));
    if(comment.css('display')=="flex"){
        comment.css('display', "none");
    }else{
        console.log("here");
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
    console.log("button_id = "+ $button.attr('id'));
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