function submit_post_form(){
    const form = document.getElementById("create_post_form");
    form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    // Convert to raw query string
    const GetURL = `${form.action}?${params.toString()}`;
    console.log(GetURL);
        window.location = GetURL;
    });
}
function render_posts(){
    var post =document.querySelector('#new_post');
    queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var post_title = urlParams.get('post_create_title');
    var post_content = urlParams.get('post_create_content');
    if(post_title != "" || post_content != ""){
        
        //post header elements like profile picture and username
        var posts_header = document.createElement('div');
        posts_header.className = "posts_header";
        var profile_picture_bubble = document.createElement('div');
        profile_picture_bubble.className = "profile_picture_bubble";
        var user_name = document.createElement('span');
        user_name.className = "user_name";
        user_name.innerHTML = "John Doe";
        posts_header.appendChild(profile_picture_bubble);
        posts_header.appendChild(user_name);
        post.appendChild(posts_header);

        //post main content
        var title = document.createElement('h3');
        title.innerHTML = post_title;
        var content = document.createElement('p');
        content.innerHTML = post_content;
        post.appendChild(title);
        post.appendChild(content);
        //post footer elements like comment, upvote and downvote
        var posts_footer = document.createElement('div');
        posts_footer.className = "posts_footer";
        var comment_icon = document.createElement('div');
        comment_icon.className = "comment_icon";
        var actions1 = document.createElement('div');
        actions1.className = "actions";
        actions1.innerHTML = "comment";
        var upvote_icon = document.createElement('div');
        upvote_icon.className = "upvote_icon";
        var actions2 = document.createElement('div');
        actions2.className = "actions";
        actions2.innerHTML = "upvote";
        var downvote_icon = document.createElement('div');
        downvote_icon.className = "downvote_icon";
        var actions3 = document.createElement('div');
        actions3.className = "actions";
        actions3.innerHTML = "downvote";
        var link = document.createElement('a');
        link.href = "login.html";
        var link2 = document.createElement('a');
        link2.href = "login.html";
        var link3 = document.createElement('a');
        link3.href = "login.html";
        link.appendChild(comment_icon);
        link.appendChild(actions1);
        link2.appendChild(upvote_icon);
        link2.appendChild(actions2);
        link3.appendChild(downvote_icon);
        link3.appendChild(actions3);
       
        posts_footer.appendChild(link);
        posts_footer.appendChild(link2);
        posts_footer.appendChild(link3);
        post.appendChild(posts_footer);

        post.removeAttribute('id');
    }
}
