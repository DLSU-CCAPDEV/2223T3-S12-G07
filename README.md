# 2223T3-S12-G07 #
## Forum Web application ##

Members:
Rovic E. Balanon
David Grasparil
Ralph Dawson G. Pineda
Lance Labarrete

### Introduction ### 

Animo Hub is an online social media app/website made by Lasallians for Lasallians. This is a web forum for all things DLSU-related. The website can be visited either as a visitor or a registered user. Visitors can only view the posts, comments, and replies that registered users made in Animo Hub. To log in, users need to have an Animo Hub account. If they don't have an account yet, users can sign up to create their account and enjoy the full services this website can offer to Lasallians.

### Setting up the app: ###
1. Upon pulling the source code, run the command 'npm install' on the projects' root directory to install all of the dependencies specified in the package.json file.
2. Create a new .env file in the root directory of the project.
3. Use the variables PORT, HOSTNAME, and DATABASE_URL to store environmental variables for your application.

### Features: ###

* sign-up: requires real name, username, password, email address, contact number, and ID number
* log-in: requires username and password
* email validation:xx@xx.com
* password validation: password must be at least 8 characters long and have at least 1 capitalized, 1 lowercase, and 1 digit with no special characters
* contact number validation: accepts different formats (+639xxxxxxxxxx   09xxxxxxxxx) source for the regex is provided below
* post content: contents in this forum are text-only and must contain a title
* edit post: contents in this forum are text-only and must contain a title
* delete post: remove a post from your profile and in the database 
* comment: you can comment on posts, you can hide/unhide the comment section of each post
* edit comment: you can comment on posts, you can hide/unhide the comment section of each post
* delete comment: remove a comment from the post, your profile, and in the database
* reply: you can reply on comments, you can hide/unhide the reply section of each comment
* edit reply: you can reply on comments, you can hide/unhide the reply section of each comment
* delete reply: remove a reply from the comment, the post, your profile, and in the database
* upvotes/downvotes: you can upvote/downvote every post, comment, and reply on the forum
* profile page redirection: you can visit the profile page of users by clicking on their profile picture
* sign out: you can sign out after log-in
* view post: a post has a separate page on its own, a different experience for visitors and registered users
* image preview: can view what your profile picture or cover photo will look like while editing the profile.
* CRUD operations (CREATE, READ, UPDATE, DELETE)
* create and edit profile
* upload a profile picture and cover photo
* search by username
* sort by trending
* encrypt password
* session
* form validation
* hashing

Sources:
https://stackoverflow.com/questions/31175221/regex-pattern-for-philippine-phone-number
https://www.insidethediv.com/javascript-login-form-validation-with-source-code
https://www.svgrepo.com/vectors/upvote/ (this is where the assets inside icons folder were taken from)
https://www.freepik.com/free-photos-vectors/cover-art
https://pixabay.com/images/search/cover%20art/
https://www.pexels.com/search/profile%20picture/
