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
* comment on other recipes

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

Sprint 17: Add User Feedback, Documentation and Clean Up, Remove of rating functionality due to time constraints

### CRUD Functionality
Cook-Around-The-World handles data with a Django Rest Framework API and provides  full CRUD Functionality:

Create - Users can create, an account/profile, recipes, comments, follow other users.
Read - Users can view their own recipes, other user recipes, their own profile, other profiles, all comments.
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
6. As a **user** I can **view a list of recipes** that were recently added so that **I have an overview of the newest, added recipes**.
7. As a **user**, I can **search for recipes by cuisine(drop down menu), by ingredients, by keywords** so that **I can find the recipes and chef profiles I am most interested in**.
8. As a **recipe owner** I can **edit my recipe title, pic, time effort, ingredients and description** so that **I can make corrections or update my recipe after it was created**.
9. As a **logged in user** I can **delete my own recipes** so that **I can get rid of information I don't want to share anymore**.
10. As a **logged in user** I can **access my profile page** so that **I can manage the information about me**.
11. As a **user** I can **navigate through pages fast** so that **I can view content without refreshing the page**.
12. As a **logged in user** I can **create comments** so that **I can share my thoughts on other chef's recipes.**
13. As a **logged-in user** I can **delete my own comments** so that **I have full control over my shared content**.
14. As a **logged-in user** I can **mark another comment as inappropriate** so that **I can help keep cyber mobbing and trolling in place.**
15. As a **logged-in user** I can **follow and unfollow other chef profiles** so that I keep up to date with them.
16. As a **logged-in user** I can **see a feed of my chef friends recipes** so that **I can access recipes of chefs I like quick and easy.**
17. As a **logged-in user**, I can **see a feed of my own posted recipes** so that **I can easily access and manage these posts easily**.
18. As a **user**, I can **navigate through the application intuitively** so that **I can easily find the features I am looking for**.
19. As a **user**, I can **access the application from different devices** so that **I can have a consistent user experience on all devices**.
20. As a **user** I want **to see messages as feedback for my actions within the application** so that **I can know if my actions were successful**.
21. As a **user** I can **confirm my registration via email** so that **my data is save and not used in a way I dont want it to be used (e.g. somebody else registers with my email)**.

#### Future Features

Features that should be implmented in future sprints and development cycles:

* option to reset password (forgotten password)
* option to login with social media accounts (gmail and facebook)
* option to lable recipes as vegan, vegetarian, applicable for lactose-intolerant people etc.
* option to add allergies information to recipes
* social media sharing buttons to share recipes on other platforms (e.g. instagram, facebook etc.)
* option to mark recipes as inappropriate, after all postings themselves can be a source of mobbing, trolling or otherwise inappropriate behavior
* 5 star rating for recipes 

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
* **recipe display**: page handling the display of a specific recipe including associated comments. If the current user is the owner of the recipe the edit and delete button is shown, otherwise a comment form is shown.
* **recipe edit**: form page handling the editing of a recipe data, including the change of the image file
* **recipe page**: handling the logic of displaying either the recipe display or the recipe edit page

**Profiles**
* **multi step form**: If the current user is the owner of a profile, a multistep form encourages the user to enter additional data(bio and favorite cuisine, image)
* **profile page**: page displaying the profile of a user (name, image, bio, favorite cuisine, stats, other profiles)



### React

#### Data Usage

To use and display data about the current user, profiles and recipes across the application, I created the following contexts:

* **Current User Context**: handling the user data and refresh tokens
* **Profile Data Context**: handling the profile data, the follow/unfollow  
  logic and the ordering of the profiles by updated_at - used in the application as top profiles
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



* **CommentDisplay**: reusable component to display the comments associated    with a certain recipe
* **CommentForm**:
* **MarkAsInappropriateButton**:


## Skeleton Plane

### Database Models and Relations

The database models structure is illustrated in the ReadMe File of the Backend.

### UserFlow and Wireframes  

Each User starts their journey on the starting page.
From there the first time visitors can register and returning users can login directly.
The **registration process** includes an email verification process:

1. Email is sent to user as soon as registration form is sent
2. User needs to click verification link
3. User is directed back to the frontend, where the frontend checks the verification link in the url with the verification key stored in the database.
4. User is informed about the verification status and is eventually lead to the confirmation page.

The **login** is performed by the user with their credentials. In case their are any issues, a warning pops up, informing the user that there can be reasons for inactive accounts. A provided link leads to the inactive account information page. This page informs the user of the 2 scenarios why accounts are typically inactive:

* missing email verification
* malpractice in inappropriate comments

Once logged in successfully, the user is directed to a **welcome page**. There the bulletin board shows newest recipes and the top profiles component shows most recent profiles. This information is supposed to inspire the user to browse through the application and give incentives to do so.

Through the navigation menu the user can easily switch between welcome page, create recipe form, the food feeds and the profile page of the current user. In cases where the user lands on the own profile page or the own recipe page - editing options are given to the user. Own recipes can also be deleted. 

In case the user lands on another persons profile, the user can follow/unfollow that user. When the user lands on the recipe page of another user the option to comment these recipes are given.

The complete user flow is also summed up in this graphic that combines User Flow and wireframes:

![UserFlow and Wireframes](/src/assets/images/Cook%20Around%20The%20World.jpeg)



## Surface Plane

### Color Scheme

The central colors of the application are indigo (#4b0082) and a pure shade of yellow (#f6be00).

![Indigo](/src/assets/img_readme/indigo.png)
Indigo #4b0082

![Yellow](/src/assets/img_readme/yellow.png)
Yellow #f6be00

The third color in use, more as a supporting color, is a pale violet (#ede3ff).

![Pale Violet](/src/assets/img_readme/paleviolet.png)
Pale Violet #ede3ff

### Typography
At first I had Dancing Script as a font, but the feedback on my previous submission was that I should choose another because of readabilty. So I went for a font classic: Roboto.

### Logo
For the logo I went with an icon that visualizes a classic cookbook. For the logo I wanted a visual that symbolizes the purpose of the application.

### Imagery
The application works mostly with user-generated content, this includes user-generated images. Still I made sure that the Slider images are catchy and show the taste of food. Also for the bulletin board on the welcome page I went for a background image in bulletin board optics.

# Technologies Used

# Testing
## Manuel Testing

## Validators

## Bug Fixes

# Deployment

# Credits

# Acknowledgements