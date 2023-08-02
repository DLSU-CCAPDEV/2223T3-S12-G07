
$(document).ready(function(){
    $('.upvote_button').ready(function(){
        console.log("upvote id  = " + $(this).attr('id'));

        $.get('/checkVote',{id:$(this).attr('id')}, function(req, res){
            if(res!=null){
                if(res.upvote==true){
                    render_upvote($(this));
                }else if(res.downvote == true){
                    render_downvote($(this));
                }
            }
        });
    });
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

}
function click_upvote(button){
        var details = render_upvote(button);
      /*  $.post('/voteContent', details,function(req,res){
            var text = button.children('.actions');
            text.text(res.upvotes + 'upvotes');
        })   
        */
}
function click_downvote(button){
    var details = render_downvote(button);
        $.post('/voteContent', details,function(req,res){
            var text = button.children('.actions');
            text.text(res.downvotes + 'downvotes');
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
        details ={
            content: content,
            post: post_id,
            date: date,
        }
        $.post('/postComment',details, function(data){
            console.log(data);
            data.flag= true;
            var $feed = comment_section.find('.comment_feed')
            feed.append(data);
            var $comment = $feed.find(`#${data._id}`);
            var $reply = $comment.find('.create_reply_button');
            $reply.click(create_reply($reply));
            var $upvote = $comment.find('.upvote_button');
            $upvote.click(click_upvote($upvote));
            var $downvote = $comment.find('.downvote_button');
            $downvote.click(click_downvote($downvote));
            button.siblings("textarea").val("");
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
            console.log(data);
            data.flag= true;
            var $feed = reply_section.find('.reply_feed');
            $feed.append(data);
            var $reply = $feed.find(`#${data._id}`);
            var $upvote = $reply.find('.upvote_button');
            $upvote.click(click_upvote($upvote));
            var $downvote = $reply.find('.downvote_button');
            $downvote.click(click_downvote($downvote));
            button.siblings("textarea").val("");
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