# Welcome to Cook Around The World

This app brings together chef's around the world to share recipes of different cuisines. Users can get inspired by favorite dishes of other cultures.

![Responsive Starting Page](/src/assets/img_readme/AmIResponsive.PNG)

## Deployed Version
The deployed application can be found here: [Cook-Around-The-World](https://cookingaroundtheworld.herokuapp.com/)

# User Experience

## Strategy Plane

### Core Functionalities
The core functionality of Cook-Around-The-World is posting your personal favorite recipes and interacting with other chefs around the world.

Once logged in users can enjoy the following features:
* create and manage their recipes
* browse the food feed for inspiration
* filter the food feed by search term, ingredients or cuisine
* follow other chefs
* manage their own profile
* rate and comment on other recipes

To create a safe space of exhange, logged in users can mark inappropriate comments as such. If a user keeps misbehaving the user account will be set to inactive (5 inappropriate comments or more).

### Target Group
The target group of the Cook-Around-the-World Application are hobby chef's that want to connect with inspirational, like-minded people from around the world. 

### USP
Another recipe page, really? - Well most other recipe pages are editorial, meaning that a dedicated staff selects recipes. Although this effort is highly appreciated, it limits the variety, creativity and amount of recipes presented. At Cook-Around-The-World the recipes are user generated and feature interactions that are similar to an instagram for recipes!

### Agile Development Method
Following agile development practices, I created the user stories for the project in the Canban tool of Github.

Thereby I treated the backend and frontend as two separate subprojects with the  user stories and overarching end goals. First, I developed the backend  and then continued with the frontend. Both projects were developed in weekly cycles. For the backend sprint plan, please visit backend documentation.

![Agile Develelopment](/src/assets/img_readme/AgileDevelopment.PNG)

For the frontend development I had the following weekly sprint plan:

Sprint 1: Basic Set up (Axios etc.), NavBar Component and basic navigation

Sprint 2 and 3: Registration Set Up with Current User and Profile Context

Sprint 4: Login Set Up, JWT Token connection

Sprint 5: Debug Registration/Login Set up

Sprint 6: Recipe Creation Form and Display

Sprint 7: Profile Page and FoodFeed (Displaying of Data)

Sprint 8: Welcome Page (Profile Card, Recipe Card, Slider, Intro Component)

Sprint 9: Implementing Contexts for Recipe Card

Sprint 10: Add Rating Functionality with Rating Context

Sprint 11: Add Comments Functionality with Mark as Inappropriate

Sprint 12: Add follow/unfollow functionality and multistep form on profile page

Sprint 13: Add Filter and SearchBar Functionality to FoodFeed

Sprint 14: Add Email verification functionality 

Sprint 15: Add Routes to Filter FriendsFeed and Own Recipe Feed, Add Delete Recipe and Comment functionality

Sprint 16: Debug Rating functionality and multistep form on profile page

Sprint 17: Add User Feedback, Documentation and Clean Up

### CRUD Functionality
Cook-Around-The-World handles data with a Django Rest Framework API and provides  full CRUD Functionality:

Create - Users can create, an account/profile, recipes, comments, ratings, follow other users.
Read - Users can view their own recipes, other user recipes, their own profile, other profiles, all comments, average ratings.
Update - Users can update their profile and recipes as well as mark comments as inappropriate.
Delete - Users can delete their own recipes and comments.

## Scope Plane

### User Stories

The user stories were the North Star for both the frontend and backend development. For me it was clear from the start that the Minimum Viable Product needs to offer more than just basic CRUD functionality and interactivity for the user. One thing that was crucial for as well were security and user safety. 

**Security**: Noone but the user themselves should be allowed to create an account on their behalf. So implementing a functional email verification was crucial for me.
**Safety**: Cyber Mobbing and Trolling is a huge Topic of our Time, thus the ability to mark comments as inappropriate was a crucial functionality for me as well. This marking leads to immediate hiding of the comment. On top of that, users that repetitively troll or mob should be locked out of this application. Only this way the application can become a safe place of exchange.


#### MVP - The Minimum Viable Product

The following user stories describe the feature scope of the Minimum Viable Product:

1. As a **user** I can **create an account** so that **I can post recipes, access my profile and follower other users**.
2. As a **registered user** I can **log in** so that **I can manage my profile and recipes**.
3. As a **user** I can **always see if I am logged in or logged out** so that **I know whether I am capable to use a certain feature with the current status**.
4. As a **logged-in user** I can **post a new recipe** so that **I can share my unique recipes with the world**.
5. As a **logged-in user** I can **access the details of a recipe** so that **I can try it myself**.
6. As a **logged-in user** I can **rate recipes** so that **I can share my personal experience about other recipes**.
7. As a **user** I can **view a list of recipes** that were recently added so that **I have an overview of the newest, added recipes**.
8. As a **user**, I can **search for recipes by cuisine(drop down menu), by ingredients, by keywords** so that **I can find the recipes and chef profiles I am most interested in**.
9. As a **recipe owner** I can **edit my recipe title, pic, time effort, ingredients and description** so that **I can make corrections or update my recipe after it was created**.
10. As a **logged in user** I can **delete my own recipes** so that **I can get rid of information I don't want to share anymore**.
11. As a **logged in user** I can **access my profile page** so that **I can manage the information about me**.
12. As a **user** I can **navigate through pages fast** so that **I can view content without refreshing the page**.
13. As a **logged in user** I can **create comments** so that **I can share my thoughts on other chef's recipes.**
14. As a **logged-in user** I can **delete my own comments** so that **I have full control over my shared content**.
15. As a **logged-in user** I can **mark another comment as inappropriate** so that **I can help keep cyber mobbing and trolling in place.**
16. As a **logged-in user** I can **follow and unfollow other chef profiles** so that I keep up to date with them.
17. As a **logged-in user** I can **see a feed of my chef friends recipes** so that **I can access recipes of chefs I like quick and easy.**
18. As a **logged-in user**, I can **see a feed of my own posted recipes** so that **I can easily access and manage these posts easily**.
19. As a **user**, I can **navigate through the application intuitively** so that **I can easily find the features I am looking for**.
20. As a **user**, I can **access the application from different devices** so that **I can have a consistent user experience on all devices**.
21. As a **user** I want **to see messages as feedback for my actions within the application** so that **I can know if my actions were successful**.
22. As a **user** I can **confirm my registration via email** so that **my data is save and not used in a way I dont want it to be used (e.g. somebody else registers with my email)**.

#### Future Features

Features that should be implmented in future sprints and development cycles:

* option to reset password (forgotten password)
* option to login with social media accounts (gmail and facebook)
* option to lable recipes as vegan, vegetarian, applicable for lactose-intolerant people etc.
* option to add allergies information to recipes
* social media sharing buttons to share recipes on other platforms (e.g. instagram, facebook etc.)


## Structure Plane

### Main Page Structure

The main page structure of the application is:

* Welcome Page: renders once a user is logged in successfully and gives an overview of what to discover (recipes, profiles)

**Auth**
* **login page**: page with form to login
* **registration page**: page with form to register
* **verify email page**: page that matches the verification code in the url  
  the one stored in the backend, showing the status of verification to the user
* **confirmation page**: a page the user is redirected to after successful email verification
* **inactive account page**: in case the user is inactive, it is directed to this page, getting information about possible causes (email verification or set to inactive due to inappropriate comments) and contact details/recommendations

**Posts**
* **create recipe form**: a form page where the users can enter their recipe data and upload the recipe picture and upload everything to the database.
* **food feed**: page displaying the recipe cards in a feed with search and filter options
* **recipe display**: page handling the display of a specific recipe including associated comments and ratings. If the current user is the owner of the recipe the edit and delete button is shown, otherwise a rating and comment form is shown.
* **recipe edit**: form page handling the editing of a recipe data, including the change of the image file
* **recipe page**: handling the logic of displaying either the recipe display or the recipe edit page

**Profiles**
* **multi step form**: If the current user is the owner of a profile, a multistep form encourages the user to enter additional data(bio and favorite cuisine, image)
* **profile page**: page displaying the profile of a user (name, image, bio, favorite cuisine, stats, other profiles)



### React

#### Data Usage

To use and display data about the current user, profiles, recipes and ratings across the application, I created the following contexts:

* **Current User Context**: handling the user data and refresh tokens
* **Profile Data Context**: handling the profile data, the follow/unfollow  
  logic and the ordering of the profiles by updated_at - used in the application as top profiles
* **Rating Data Context**: handling rating data
* **Recipe Data Context**: handling the recipe data

Since comments are currently only used locally with the recipe page, I decided against a comment data context for now, but for potential future features it might be a feasable decision to add one.

#### React Components

The frontend was programmed in React. Thus, the structure of the frontend can be broken down into components. Where applicable created components where reused across the application.

 Each component comes with an individual CSS file in the styles folder (styles/components), following the naming convention: componentname.module.css
 Most pages come with an individual CSS file in the styles folder as well (styles/pages), following the naming convention: pagename.module.css

The following components where created for this Application:
* **Asset**: This component serves to render an asset which can be a spinner, 
  src (image), and message.
* **Avatar**: reusable component to show the picture of the profile in various 
  parts of the application, e.g. in the navbar as identification icon, in profile cards or next to comments.
* **Bulletin Board**: reusable component to show the 3 most recent recipes in 
  an appealing design
* **Circle Row**: reusable component to display data in 3 columns next to each 
  other.
* **Filters**: component to filter recipes by search term, selected cuisine/s 
  or selected ingredients
* **Footer**: optical component at the end of the page, with copyright and 
  contact information
* **Header**: reused component to implement individual Header Images for 
  individual pages
* **ImageBlock**: reusable sub-component that is part of the intro but can 
  also be used separately
* **Intro**: A reuseable component to provide an intro text and custom image 
  choices as an introduction to a page, like e.g. starting and profile page
* **NavMenu**: Navigation for logged in and logged out users
* **ProfileCard**: reusable component to show the most recent profiles on the 
  welcome page and the profile page
* **RecipeCard**: reusable to component to show the key facts of a recipe plus 
  image on various places in the application, like e.g. in the bulleting board or in the food feed.
* **Slider**: A reuseable component to create an image slider with chosen 
  images for e.g. starting Page and welcome Page teasing the amazing content ahead
* **TopProfiles**:reusable component to show the 6 most recent profiles in 
  an appealing design


* **AverageRatingDisplay**: reusable component to calculate and display the 
  average rating of the associated recipe
* **CommentDisplay**: reusable component to display the comments associated    with a certain recipe
* **CommentForm**:
* **MarkAsInappropriateButton**:
* **RatingDisplay**:
* **RatingForm**:
* **RatingSelect**:


## Skeleton Plane

Database, Authentification Process and wireframes (im wireframe e drin?)

## Surface Plane
Design, colors, typography ...

# alt
# Functionality of the Cook Around The World App
Similar to Facebook or Instagram Cook Around The World is an APP to interact. On the main page recently posted recipes are shown - also for not logged in users. As soon as a user is registered and logged in, they can create recipes, check the recipe feed, show their liked recipes and do basic editing of their profiles.
Register:
![Register](/src/assets/img_readme/app/Register.png)
Login:
![Login](/src/assets/img_readme/app/Login.png)


They also can access information on other Chef's using the app. Cook Around The World shows for each chef profile, how many recipes the person posted, how many likes these recipes have and how many followers the chef has.

LoggedInUser
![LoggedIn User Page](/src/assets/img_readme/app/LoggedInUser.png)

Profile: ![Profile](/src/assets/img_readme/app/profile.png)


## User Experience
The main user experience of the app is to find regional recipes and cooking tips from other parts of the world. 
Newcomers and Pros alike can show what they are made of and share their finest recipes. While there are other recipe websites out there, the recipes on Cook Around the World are created and rated by the community. Mostly cooking websites offer a list of recipes done by an editorial team. Cook Around The World on the other hand, lets the (hobby) chefs from home take the lead. After all they know best what's their best dishes in the country.

![RecipeView1](/src/assets/img_readme/app/recipeview1.png)
![RecipeView2](/src/assets/img_readme/app/recipeview2.png)

In order the create this functionalities the app was build in React with Bootstrap.

# Debugging and Testing

## Debugging
After creating a new js file I always started the app in the preview to check if the code was working how expected. The same procedure applied for adding and adapting CSS styling.
Central debugging issues included:

### Wiring the frontend to the backend
The major issue indeed was making the backend and frontend come together and knowing which urls need to go where.
Initially I wired the frontend with the deployed frontend in the axios file.

![Axios Error](/src/assets/img_readme/debugging/wrongaxioswire.png)


After fixing this error I was able to register a user and login a user but I could not retrieve data from the backend, I also couldn't make the Avatar work in the NavMenu. 

![Avatar ](/src/assets/img_readme/debugging/Avatarwontload.png)

At first I checked the code of the Registration Form and Login Form for typos or logic mistakes. After not finding anything I checked if cloudinary was wired up correctly. Then I decided to delete the Avatar style sheet and component for now until I had found the root cause.
 Realizing it was not just the avatar default profile picture but data retrieval in general a long search in the frontend and backend began. 
 I tested if I only had problems retrieving the recipes or if the problem also applied for the profiles data. Thus, I created the Profile Page in a next step, before starting out on the Recipe Overview Page. It showed that the profiles could not be retrieved as well.

 ![Retrival Error](/src/assets/img_readme/debugging/ProfilePagenotloading.png)

Eventually I checked the  Heroku Config Vars and realized that I initially put the dev url of the backend in the CLIENT_ORIGIN_DEV. After correcting this, I had a console error about the CORS Variables.

### CORS Variables
The wrong position of the CORS variables in the settings.py of the backend gave me a headache in the frontend. I was able to figure it out and rearrange the data in the settings.py file accordingly and fix some typos. Although the root of the error was in the backend, the error surfaced in the console of the frontend that's why I mention it here.

### Database in development mode and production
In order to run the automated tests that I had written in the backend, I made sure to create an if else statement for the database useage in the settings.py file. Initially this set-up was not working correctly - something I also only realized when trying to send data to the database. After fixing some logic mistake I was able to wire the database correctly (checking it with a console log statement in the backend). Again this error showed in the frontend that's why it is addressed here.

### Permission issues suspected
Despite the steps explained above (fixing the wrong urls in axios and Heroku Confi Vars, fixing backend issues with CORS variables and the database), I still could not retrieve data from the backend. Although I assume all of these issues came together to trouble the data retrieval, the last missing piece seemed to be the permissions in the backend. It was a bad idea of mine to name the user field of the profiles model chef. Although I managed to create a permission IsChefOrReadOnly the concept of using chef instead of owner was confusing. So I decided to change it to owner instead. This way I was able to follow through with the logic and eventually make the permissions work. BUT that was a long road of deleting migrations, dropping databases etc.

![Access Errors](/src/assets/img_readme/debugging/accesserrors.png)

![User Data Error](/src/assets/img_readme/debugging/UserDataError_Access.png)

### React App wouldn't start
After dropping the databases and basically resetting part of my backend due to the change from chef to owner in the profile models (and other models, since it was a foreign key), I finally managed to make my backend work again. Only to find out that now my React App wouldn't even load anymore.

![React Won't Start](/src/assets/img_readme/debugging/ReactAppWontStart.png)

The github issue arising that day might have added to the issue because with the old backend set-up the frontend was at least allowing me to register users and log them in. Still, I assumed that fixing all the stated errors above, lead to probably other issues showing now that everything was wired up correctly. So I dove back in, not an easy task considering the console would not even start. I set the following steps:

1. I started commenting out existing code in order to figure out when the code would work again
2. Unfortunetely there were so many interdependencies already due to imports and exports between files that the issues became worst instead of better
3. In the deployed React App I managed to see the console and apparently there was some issue with an import or export
4. I commented out even more code until only the App.js and index.js was left in its basic code.
5. restarted the workspace
6. started to delete the comments tags in my code again
7. checked stackoverflow and found that the pachage.json files might be the problem
8. contacted student tutor to help me since issues got worst and I feared I had crashed everything with touching pachage.json
9. restoring json file with tutor
10. Temporarily deleting the NavMenu from the App.js file because the console was suggesting the issue came from there
11. The App ran again but only showed an empty Recipe page without a NavMenu

![NavMenuBug](/src/assets/img_readme/debugging/NavMenuBug.png)

12. Debugging the NavMenu.js file, finding inconstistincies in naming elements NavMenu and NavBar.
13. App ran again and suddenly showed avatar in the menu as well as the rendered Profile page.

### DOM class error

![DOM Class Error](/src/assets/img_readme/debugging/Console_DOM_Classname.png)

An error that accompanied me for weeks was a DOM error stating that I had used class instead of ClassName somewhere in the code. I check all files searching for the terms class and name separately but couldn't find it. So I let the issue be and waited for the issue to show itself. The night before handing in the React App I worked on the icons for liking Recipes and realized I had copied the class from the fontawesome homepage. I corrected the class to className and searched for icons in the NavMenu - there the issue had routet from.

### Typos and logic errors
Now and again, when writing code in the .js files there was a typo or e.g. a forgotten export of variables. These errors were always quickly found and fixed with the help of the terminal and console. Compared to the beginning of the course where it took me forever to find these kind of errors, I got better good at solving such issues alone and making the most of the debugging via DevTools.

![Typical debug ](/src/assets/img_readme/debugging/typicaldebug.png)


# Deployment

For the deployment of the Cook Around the World I so far took the following steps:
1. create a new app in Heroku for the frontend
2. deployed a basic frontend in react

While re-wiring the frontend and backend I re-deployed the frontend only to find an error in the log files.
Since I am not completely done with the frontend programming, I will take a look at this once I am ready to finally deploy.

![Deployment Error](/src/assets/img_readme/debugging/HerokuBug.png)

Sadly the wiring up process between frontend and backend has cost me a lot of time but at the same time has thought me a lot.
That's why the frontend is not fully done yet.

# Next Steps
The next basic steps to finish this frontend are:
1. finish the functionality of the post component (like icons and functionality)
2. adding comments to the post component
3. displaying the posted recipes on the RecipePost Page
4. Finishing up the CSS
5. Deployment to Heroku



