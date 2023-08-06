# 2223T3-S12-G07 #
## Forum Web application ##

Members:
Rovic Balanon
David Grasparil
Ralph Dawson G. Pineda

### Introduction ### 

Animo Hub is a social media app...

### Setting up the app: Guide ###
Note: include dotenv and the variable names and dependencies used
1. asdf
2. asdf
3. asdf
4. asdf

### Features: ###
Note: pick applicable phase 1 features as well
* CRUD operations
* Upvotes and downvotes
* Edit profile
* Upload profile picture and cover photo
* encrypt password, session, form validation


### Phase 1 features: ###

* email validation:xx@xx.com
* password validation : password must be atleast 8 characters long and have atleast 1 capitalized, 1 lowercase, and 1 digit with no special characters
* contact number validation: accepts different formats (+639xxxxxxxxxx   09xxxxxxxxx) source for the regex is provided below
* post content: contents in this forum are text-only and must contain a title
* comment : you can comment on posts, you can hide/unhide the comment section of each post
* reply : you can reply on comments, oyu can hide/unhide the reply section of each comment
* upvotes/downvotes : you can upvote/downvote every post, comment, and reply on the forum
* profile page redirection: you can visit the profile page of users by clicking on their profile picture (works for newly created posts but not for newly made comments/ replies)
* home(visitor) : this forum is public and you can view the posts shared here without having an account but you cannot post content as a visitor
* signout : you can sign out after log-in
* view post : a post has a separate page on its own, different expercience for visitors and registered users
* image preview : can view what your profile picture or cover photo will look like whhile in edditing the profile. 
* can apply the  updated name/ about me / profile picture / cover photo of the user (john dee is the default)


### Limitations: ###
Note: test first to see which are applicable
* view who upvoted/downvoted : The number of downvotes/upvotes are not counted and the user who upvoted/downvoted is not stored
* can't track if user is logged in : this experience is simulated through hard coded webpages for logged in / visitor versions but a loop hole exists for a visitor to accomplish what a logged in user can do. For instance, all our current profile pages are viewed a registered users perspective even when visited by a visitor user

### FLOW of navigation ###

## START ##
* either register / login / home (visitor)

* register  -  profile_page_JohnDoe(loggedin) after registering,  home(visitor) after clicking the mascot sheep (not registered)
* login - profile_page_JohnDoe(loggedin) after login,  home(visitor) after clicking the mascot sheep (not logged in)
* home (visitor) - can lead to profile_page(visitor) by clicking the profile pictures, post pages when clicking on the posts, log in and register pages
* profile page - can lead to post page  or home
* unimplemented features : { trending, search, profile[comments, upvotes,downvotes] } will lead to maintenance page
* mainteance page signs out the user and leads to home(visitor)

Sources:
https://stackoverflow.com/questions/31175221/regex-pattern-for-philippine-phone-number
https://www.insidethediv.com/javascript-login-form-validation-with-source-code
https://www.svgrepo.com/vectors/upvote/ (this is where the assets inside icons folder were taken from)
https://www.freepik.com/free-photos-vectors/cover-art
https://pixabay.com/images/search/cover%20art/
https://www.pexels.com/search/profile%20picture/
