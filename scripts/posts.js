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
    post.style.display = "block";
    queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var post_title = urlParams.get('post_create_title');
    var post_content = urlParams.get('post_create_content');
    if(post_title != null || post_content != null){
        //post header elements like profile picture and username
        var posts_container = document.createElement('div');
        posts_container.className = "posts";
        var posts_header = document.createElement('div');
        posts_header.className = "posts_header";
        var profile_picture_bubble = document.createElement('div');
        profile_picture_bubble.className = "profile_picture_bubble JohnDoe";
        var user_name = document.createElement('span');
        user_name.className = "user_name";
        user_name.innerHTML = "John Doe";
       
        posts_header.appendChild(profile_picture_bubble);
        posts_header.appendChild(user_name);
        posts_container.appendChild(posts_header);

        //post main content
        var title = document.createElement('h3');
        title.innerHTML = post_title;
        var content = document.createElement('p');
        content.innerHTML = post_content;
        posts_container.appendChild(title);
        posts_container.appendChild(content);


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
        var link2 = document.createElement('a');
        var link3 = document.createElement('a');
        link.appendChild(comment_icon);
        link.appendChild(actions1); 
        link.addEventListener("click",(evt) => {render_comments(posts_container)});
        link2.appendChild(upvote_icon);
        link2.appendChild(actions2);
        link2.addEventListener("click",(evt) => {render_upvote(link2)});
        link3.appendChild(downvote_icon);
        link3.appendChild(actions3);
        link3.addEventListener("click",(evt) => {render_downvote(link3)});
       
        posts_footer.appendChild(link);
        posts_footer.appendChild(link2);
        posts_footer.appendChild(link3);
        posts_container.appendChild(posts_footer);
        

        var comment_section = document.createElement('div');
        comment_section.className = "comment_section";
        var create_comment = document.createElement('div');
        create_comment.className = "create_comment";
        var center_align = document.createElement('span');
        center_align.className = "center_alig width_100";
        var create_comment_form = document.createElement('form');
        create_comment_form.id = "create_comment_form";
        var create_comment_input = document.createElement('textarea');
        create_comment_input.name = "create_comment_input";
        create_comment_input.id = "create_comment_input";
        create_comment_input.placeholder = "Write a comment...";

        var create_comment_button = document.createElement('button');
        create_comment_button.type = "button";
        create_comment_button.name = "create_comment_button";
        create_comment_button.innerHTML = "post";
        create_comment_button.addEventListener("click",(evt)=>{post_comment(comment_section)});

        create_comment_form.appendChild(create_comment_input);
        create_comment_form.appendChild(create_comment_button);

        var comment_feed = document.createElement('div');
        comment_feed.className = "comment_feed";
        
        create_comment.appendChild(create_comment_form);
        center_align.appendChild(create_comment);
        comment_section.appendChild(comment_feed);
        comment_section.appendChild(center_align);
        posts_container.appendChild(comment_section);
        post.appendChild(posts_container);

        post.style.display="flex";
        post.style.flexDirection = "column";
    }
}
function render_comments(post){
    var comment = post.querySelector('.comment_section');
    if(comment.style.display =="flex"){
        comment.style.display= "none";
    }else{
        comment.style.display="flex";
        comment.style.flexDirection = "column";
        comment.style.alignItems = "flex-end";
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

function post_comment(comment_section){
    var comment = comment_section.querySelector('#create_comment_input');
    if(comment.value != ""){
        var indiv_comment_container = document.createElement('div');
        indiv_comment_container.className = "indiv_comment_container";
        var p = document.createElement('p');
        p.innerHTML = comment.value;
        comment.value="";
        var comment_feed = comment_section.querySelector('.comment_feed');
        var comment_header = document.createElement('div');
        comment_header.className = "posts_header";
        var profile_picture_bubble = document.createElement('div');
        profile_picture_bubble.className = "profile_picture_bubble JohnDoe";
        var user_name = document.createElement('span');
        user_name.className = "user_name";
        user_name.innerHTML = "John Doe";
        var comment_footer = document.createElement('div');
        comment_footer.className = "posts_footer";
        var link1 = document.createElement('a');
        var link2 = document.createElement('a');
        var link3 = document.createElement('a');
        var comment_icon = document.createElement('div');
        comment_icon.className = "comment_icon";
        var upvote_icon = document.createElement('div');
        upvote_icon.className = "upvote_icon";
        var downvote_icon = document.createElement('div');
        downvote_icon.className = "downvote_icon";
        var actions1 = document.createElement('span');
        actions1.className = "actions";
        actions1.innerHTML = "reply";
        var upvote_icon = document.createElement('div');
        upvote_icon.className = "upvote_icon";
        var actions2 = document.createElement('span');
        actions2.className = "actions";
        actions2.innerHTML = "upvote";
        var downvote_icon = document.createElement('div');
        downvote_icon.className = "downvote_icon";
        var actions3 = document.createElement('span');
        actions3.className = "actions";
        actions3.innerHTML = "downvote";
        link1.addEventListener("click",(evt) => {render_replies(indiv_comment_container)});
        link2.addEventListener("click",(evt) => {render_upvote(link2)});
        link3.addEventListener("click",(evt) => {render_downvote(link3)});
        link1.appendChild(comment_icon);
        link1.appendChild(actions1);
        link2.appendChild(upvote_icon);
        link2.appendChild(actions2);
        link3.appendChild(downvote_icon);
        link3.appendChild(actions3);
        comment_footer.appendChild(link1);
        comment_footer.appendChild(link2);
        comment_footer.appendChild(link3);

        var hr = document.createElement('hr');

        var reply_section = document.createElement('div');
        reply_section.className = "reply_section";
        var center_align = document.createElement('span');
        center_align.className = "center_align";
        var create_comment = document.createElement('div');
        create_comment.className = "create_comment";
        var create_comment_form = document.createElement('form');
        create_comment_form.id = "create_comment_form";
        var create_comment_input = document.createElement('textarea');
        create_comment_input.name = "create_reply_input";
        create_comment_input.id = "create_reply_input";
        create_comment_input.placeholder = "Write a comment...";
        var create_comment_button = document.createElement('button');
        create_comment_button.type = "button";
        create_comment_button.name = "create_comment_button";
        create_comment_button.innerHTML = "post";
        create_comment_button.addEventListener("click",(evt)=>{post_reply(indiv_comment_container);});
        create_comment_form.appendChild(create_comment_input);
        create_comment_form.appendChild(create_comment_button);
        create_comment.appendChild(create_comment_form);
        center_align.appendChild(create_comment);
        
        var reply_feed = document.createElement('div');
        reply_feed.className = "reply_feed";
        reply_section.appendChild(reply_feed);
        reply_section.appendChild(center_align);

        comment_header.appendChild(profile_picture_bubble);
        comment_header.appendChild(user_name);
        indiv_comment_container.appendChild(comment_header);
        indiv_comment_container.appendChild(p);
        indiv_comment_container.appendChild(comment_footer);
        indiv_comment_container.appendChild(reply_section);
        indiv_comment_container.appendChild(hr);
        comment_feed.appendChild(indiv_comment_container);
    }else
        alert("Please enter a comment");
        profile_redirect();
}
function post_reply(reply_section){
    var reply = reply_section.querySelector('textarea');
    if(reply.value != ""){
        var p = document.createElement('p');
        p.innerHTML = reply.value;
        reply.value="";
        var reply_feed = reply_section.querySelector('.reply_feed');
        var reply_header = document.createElement('div');
        reply_header.className = "posts_header";
        var profile_picture_bubble = document.createElement('div');
        profile_picture_bubble.className = "profile_picture_bubble JohnDoe";
        var user_name = document.createElement('span');
        user_name.className = "user_name";
        user_name.innerHTML = "John Doe";
        var reply_footer = document.createElement('div');
        reply_footer.className = "posts_footer";
        var link2 = document.createElement('a');
        var link3 = document.createElement('a');
        var upvote_icon = document.createElement('div');
        upvote_icon.className = "upvote_icon";
        var downvote_icon = document.createElement('div');
        downvote_icon.className = "downvote_icon";
        var upvote_icon = document.createElement('div');
        upvote_icon.className = "upvote_icon";
        var actions2 = document.createElement('span');
        actions2.className = "actions";
        actions2.innerHTML = "upvote";
        var downvote_icon = document.createElement('div');
        downvote_icon.className = "downvote_icon";
        var actions3 = document.createElement('span');
        actions3.className = "actions";
        actions3.innerHTML = "downvote";
        link2.addEventListener("click",(evt) => {render_upvote(link2)});
        link3.addEventListener("click",(evt) => {render_downvote(link3)});
        link2.appendChild(upvote_icon);
        link2.appendChild(actions2);
        link3.appendChild(downvote_icon);
        link3.appendChild(actions3);
        reply_footer.appendChild(link2);
        reply_footer.appendChild(link3);

        var hr = document.createElement('hr');

        reply_header.appendChild(profile_picture_bubble);
        reply_header.appendChild(user_name);
        reply_feed.appendChild(reply_header);
        reply_feed.appendChild(p);
        reply_feed.appendChild(reply_footer);
        reply_feed.appendChild(hr);
    }
    profile_redirect();
}
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

function profile_redirect(){
    var John = document.getElementsByClassName('JohnDoe');
    var Miguel = document.getElementsByClassName('Miguel');
    var Sophia = document.getElementsByClassName('Sophia');
    var Yuri = document.getElementsByClassName('YuriB');
    var Xavier = document.getElementsByClassName('Xavier');
    
    for(John of John){
        John.addEventListener("click",(evt)=>{window.location.href = "profile_page_John.html";});
    }
    for(Miguel of Miguel){
        Miguel.addEventListener("click",(evt)=>{window.location.href = "profile_page_Miguel.html";});
    }
    for(Sophia of Sophia){
        Sophia.addEventListener("click",(evt)=>{window.location.href = "profile_page_Sophia.html";});
    }
    for(Yuri of Yuri){
        Yuri.addEventListener("click",(evt)=>{window.location.href = "profile_page_YuriB.html";});
    }
    for(Xavier of Xavier){
        Xavier.addEventListener("click",(evt)=>{window.location.href = "profile_page_Xavier.html";});
    }
}

function profile_redirect_visitor(){
    var John = document.getElementsByClassName('JohnDoe');
    var Miguel = document.getElementsByClassName('Miguel');
    var Sophia = document.getElementsByClassName('Sophia');
    var Yuri = document.getElementsByClassName('YuriB');
    var Xavier = document.getElementsByClassName('Xavier');
    
    for(John of John){
        John.addEventListener("click",(evt)=>{window.location.href = "profile_page(visitor)_John.html";});
    }
    for(Miguel of Miguel){
        Miguel.addEventListener("click",(evt)=>{window.location.href = "profile_page(visitor)_Miguel.html";});
    }
    for(Sophia of Sophia){
        Sophia.addEventListener("click",(evt)=>{window.location.href = "profile_page(visitor)_Sophia.html";});
    }
    for(Yuri of Yuri){
        Yuri.addEventListener("click",(evt)=>{window.location.href = "profile_page(visitor)_YuriB.html";});
    }
    for(Xavier of Xavier){
        Xavier.addEventListener("click",(evt)=>{window.location.href = "profile_page(visitor)_Xavier.html";});
    }
}



function render_edit_profile(){
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var firstName= urlParams.get('first_name');
    var lastName= urlParams.get('last_name');
    var profile_picture= urlParams.get('prof_pic');
    var cover_photo= urlParams.get('cov_pic');
    var bio= urlParams.get('bio');
    var contact_number= urlParams.get('contact_number');
    var new_first_name="John";
    var new_last_name="Doe";
    var gate = false;
    if(firstName!=null&&firstName!=""){
        new_first_name=firstName;
        gate = true;
    }
    if(lastName!=null&&lastName!=""){
        new_last_name=lastName;
        gate = true;
    }
    var name = new_first_name+" "+new_last_name;
    console.log(name);
    if(bio!=null&&bio!=""){
        var aboutMe = document.getElementsByClassName('about_me')
        aboutMe_p = aboutMe[0].getElementsByTagName('p');
        aboutMe_p[0].innerHTML = bio;
        gate = true;
    }
    var profileNames = document.getElementsByClassName('name');
    var profileNames_small = document.getElementsByClassName('user_identity')[0].getElementsByTagName('div');
    var profileNames_smallest = document.getElementsByClassName('user_name jd');
    profileNames[0].innerHTML = name;
    profileNames_small[0].innerHTML = name;
    for (pf of profileNames_smallest){
        pf.innerHTML = name;
        console.log(pf.innerHTML);
    }

    //limitations of a frontend phase project, the  browser does not allow loading local files
    if(cover_photo!=null&&cover_photo!=""){
        gate= true;
        var coverPhoto = document.getElementsByClassName('cover_photo_img');
        coverPhoto[0].src = window.decodeURI(cover_photo);
    }
    if(profile_picture!=null&&profile_picture!=""){
        var profilePicture = document.getElementsByClassName('profile_pic_img');
        for (pf of profilePicture){
            pf.src =window.decodeURI(profile_picture);
            gate= true;
        }
    }
    return gate;

}

function render_register_profile(){
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    var username = urlParams.get('username');
    var firstName = urlParams.get('firstname');
    var lastName = urlParams.get('lastname');

    var new_first_name="John";
    var new_last_name="Doe";
    if(firstName!=null&&firstName!=""){
        new_first_name=firstName;
    }
    if(lastName!=null&&lastName!=""){
        new_last_name=lastName;
    }
    var name = new_first_name+" "+new_last_name;
    var profileNames = document.getElementsByClassName('name');
    var profileNames_small = document.getElementsByClassName('user_identity')[0].getElementsByTagName('div');
    var profileNames_smallest = document.getElementsByClassName('user_name jd');
    var profile_username = document.getElementsByClassName('user_identity')[0].getElementsByTagName('p')
    profileNames[0].innerHTML = name;
    profileNames_small[0].innerHTML = name;
    profile_username[0].innerHTML = username;
    for (pf of profileNames_smallest){
        pf.innerHTML = name;
    }
}