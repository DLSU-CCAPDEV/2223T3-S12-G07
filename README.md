# 2223T3-S12-G07
##Forum Web application

###Phase 1 features: 

* email validation:xx@xx.com
* password validation : password must be atleast 8 characters long and have atleast 1 capitalized, 1 lowercase, and 1 digit with no special characters
* contact number validation: accepts different formats (+639xxxxxxxxxx   09xxxxxxxxx) source for the regex is provided below
* post content: contents in this forum are text-only and must contain a title
* comment : you can comment on posts, you can hide/unhide the comment section of each post
* reply : you can reply on comments, oyu can hide/unhide the reply section of each comment
* upvotes/downvotes : you can upvote/downvote every post, comment, and reply on the forum
* profile page redirection: you can visit the profile page of users by clicking on their profile picture (works for newly created posts but not for newly made comments/ replies)
* home(visitor) : this forum is public and you can view the posts shared here without having an account but you cannot post content as a visitor
* signout : you can sign out after log in
* view post : a post has a separate page on its own, different expercience for visitors and registered users


###Limitations:

* search_user : since there is no database yet, this feature has not yet been implemented
* log in: you can log in as long as the inputs pass the email and password verification, 
        however there is only one default user as of now which is "John Doe" since 
        there is no database implementation yet.
* feed ranking : There is no algorithm for the rankings of the posts you see on the feed based on the upvotes/downvotes as of now.
* profile comments : There is no dedicated page yet for viewing all the comments of a user
* profile upvotes : There is no dedicated page yet for viewing all the upvoted posts/comments by a user
* profile downvotes : There is no dedicated page yet for viewing all the downvoted posts/comments by a user
* view who upvoted/downvoted : The number of downvotes/upvotes are not counted and the user who upvoted/downvoted is not stored
* can't track if user is logged in : this experience is simulated through hard coded webpages for logged in / visitor versions but a loop hole exists for a visitor to accomplish what a logged in user can do. For instance, all our current profile pages are viewed a registered users perspective even when visited by a visitor user


***NOTES***
This repo contains alot of html files and a lot of those files are duplicates to hardcode the users and posts that were used to fill up the forum.
The important html files are: 
* create_post.html
* editprofile.html
* register.html
* login.html
* profile_page_John.html
* home(loggedin).html
* home(visitor).html
* post(visitor)_John.html
* post(loggedin)_John.html

Sources:
https://stackoverflow.com/questions/31175221/regex-pattern-for-philippine-phone-number
https://www.insidethediv.com/javascript-login-form-validation-with-source-code
https://www.svgrepo.com/vectors/upvote/ (this is where the assets inside icons folder were taken from)
https://www.freepik.com/free-photos-vectors/cover-art
https://pixabay.com/images/search/cover%20art/
https://www.pexels.com/search/profile%20picture/

Members:
Rovic Balanon
David Grasparil
Ralph Dawson G. Pineda
