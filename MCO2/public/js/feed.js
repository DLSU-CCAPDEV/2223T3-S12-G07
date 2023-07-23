

$(document).ready(function(){
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
        var comment = post.querySelector('.reply_section');
        if(comment.style.display =="flex"){
            comment.style.display= "none";
        }else{
            comment.style.display="flex";
            comment.style.flexDirection = "column";
            comment.style.alignItems = "flex-end";
        }
    }

    $('a.comment_button').click(function(){
        var post = $(this).parent().parent();
        console.log(post.attr('id'));
        render_comments(post); 

    });

    $('.upvote_button').click( async function(){
        var id = $(this).attr('id');
        id = id.slice(6);
        $.get('/getUpvote', {id: id}, function(data){

        });
    });

    $('.downvote_button').click(async function(){
        var id = $(this).attr('id');
        id = id.slice(8);
        $.get('/getDownvote', {id: id}, function(data){

        });
    });
});


function render_upvote(button){
    var upvote = button.querySelector('.upvote_icon');
    var text = button.querySelector('.actions');
    if(upvote!=null){
        upvote.setAttribute("class","upvote_icon_true");
        text.style.color = "#0C6DB7";

        var downvote = button.parentNode.querySelector('.downvote_icon_true');
        if(downvote!=null){
            downvote.setAttribute("class","downvote_icon");
            var downvote_text = downvote.parentNode.querySelector('.actions');
            downvote_text.style.color = "#797878";
        }
    }else{
        upvote = button.querySelector('.upvote_icon_true');
        upvote.setAttribute("class","upvote_icon");
        text.style.color = "#797878";        
    }
}
function render_downvote(button){
    var downvote = button.querySelector('.downvote_icon');
    var text = button.querySelector('.actions');
    if(downvote!=null){
        downvote.setAttribute("class","downvote_icon_true");
        text.style.color = "#B70C0C";
        var upvote = button.parentNode.querySelector('.upvote_icon_true');
        if(upvote!=null){
            upvote.setAttribute("class","upvote_icon");
            var upvote_text = upvote.parentNode.querySelector('.actions');
            upvote_text.style.color = "#797878";
        }
    }else{
        downvote = button.querySelector('.downvote_icon_true');
        downvote.setAttribute("class","downvote_icon");
        text.style.color = "#797878";
    }
}