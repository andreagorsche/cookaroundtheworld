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
* **CommentDisplay**: reusable component to display the comments associated with a certain recipe
* **CommentForm**:  component to enter a comment and save it to the database
* **MarkAsInappropriateButton**: component to mark a comment as inappropriate


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

The npm list command shows the following technologies in use:

cookaroundtheworld@0.1.0 /workspace/cookaroundtheworld
├── @fortawesome/fontawesome-svg-core@6.5.1
├── @fortawesome/free-regular-svg-icons@6.5.1
├── @fortawesome/free-solid-svg-icons@6.5.1
├── @fortawesome/react-fontawesome@0.2.0
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@11.2.7
├── @testing-library/user-event@12.8.3
├── axios@0.21.4
├── bootstrap@4.6.2
├── msw@0.35.0
├── react-bootstrap@1.6.8
├── react-dom@17.0.2
├── react-infinite-scroll-component@6.1.0
├── react-router-dom@5.3.4
├── react-scripts@5.0.1
├── react-select@5.8.0
├── react@17.0.2
└── web-vitals@1.1.2

### Fontawesome
I installed parts of the Fontawesome library to use icons where required in the application.

### Testing Libraries
I installed testing libraries like JEST to play around with. And after successful assessment I will definitely keep playing with it. That's why I keep these libraries installed.

### Axios
Obiviously for the data handling with the backend.

### Bootstrap
For responsive design of components.

### MSW
I didn't install this myself, it came with the creation of create React app. But MSW is short for Mock Service Worker, which is a library for intercepting and mocking HTTP requests made by applications during development or testing

### React 17
The main framework used for this application.

## React Bootstrap
For designing purposes and implement wireframe and UX design as planned.

### React DOM
It provides the necessary functionality to render React components into the browser DOM and interact with the DOM elements

## React Select
I used this react component in the filters component, for filtering the ingredients.

## React Infinite Scroll Component
One high priority missing feature that I also want to implement in a next step, is the infinite scroll. Thus the library is set up.

## React Scripts
Part of the Create React App tool chain, simplifies the build and development process for React applications.

## Summary
As you can see I minimize the use of additional libraries. I am aware there is a lot out there. But I did not want to show the assessors that I can use pre-programmed libraries but rather show them what I am capable of as programmer with as few libraries as possible. Also a combination of libraries also threatens the stability of an application due to interferences. Thus my choice was to keep the libraries slim.

# Testing
## Manuel Testing

The complete application was tested by comparing  expected result and actual result of every functionality.

### Registration
**User story: As a user I can create an account so that I can post recipes, access my profile and follower other users.**

**Expected Result**: A User can register with username, email and password.

**Actual Result**: Works as Expected

<details><summary>Registration</summary>
    <img src="/src/assets/img_readme/ManualTesting/6.RegistrationEntry.png">
    <br>
    <img src="/src/assets/img_readme/ManualTesting/3_ThankYouRegistration.png">
</details>

### Login

**User story: As a registered user I can log in so that I can manage my profile and recipes.**

**Expected Result**: Users can login with their credentials.

**Actual Result**: Works as Expected

<details><summary>Login</summary>
     <img src="/src/assets/img_readme/ManualTesting/11_Login.png">
    <br>
     <img src="/src/assets/img_readme/ManualTesting/12_WelcomeScreen.png">
</details>

### Login Status

**User story: As a user I can always see if I am logged in or logged out so that I know whether I am capable to use a certain feature with the current status.**

**Expected Result**: Users always know their login status.

**Actual Result**: Works as Expected

<details><summary>Login</summary>
     <img src="/src/assets/img_readme/ManualTesting/1_StartPage.png">
    <br>
     <img src="/src/assets/img_readme/ManualTesting/12_WelcomeScreen.png">
</details>


### New Recipe

**User story: As a logged-in user I can post a new recipe so that I can share my unique recipes with the world.**

**Expected Result**: A logged in user can post a recipe.

**Actual Result**: Works as Expected

<details><summary>Recipe Post</summary>
  <img src="/src/assets/img_readme/ManualTesting/13_CreateARecipe.png">
  <br>
 <img src="/src/assets/img_readme/ManualTesting/14_CreateARecipe.png">
  <br>
 <img src="/src/assets/img_readme/ManualTesting/16_CreateARecipe.png">
  <br>
 <img src="/src/assets/img_readme/ManualTesting/17_CreateARecipe.png">
 <br>
 <img src="/src/assets/img_readme/ManualTesting/18_RecipeCreated.png">
 </details>

### Recipe Detail

**User story: As a logged-in user I can access the details of a recipe so that I can try it myself.**

**Expected Result**: When clicking on a recipe, a recipe detail page gives the user more information.

**Actual Result**: Works as Expected

<details><summary>Recipe Detail</summary>
 <img src="/src/assets/img_readme/ManualTesting/38_CommentOnOtherRecipe.png">
</details>

### Recipe List

**User story: As a user I can view a list of recipes that were recently added so that I have an overview of the newest, added recipes.**

**Expected Result**: In the foodfeed the user can browse the newest recipes.

**Actual Result**: Works as Expected

<details><summary>FoodFeed</summary>
     <img src="/src/assets/img_readme/ManualTesting/33_FoodFeed.png">
</details>

### Search for Recipes

**User story: As a user, I can search for recipes by cuisine(drop down menu), by ingredients, by keywords so that I can find the recipes and chef profiles I am most interested in.**

**Expected Result**: In the foodfeed the user can filter the recipes by search term, cuisine and ingredients.

**Actual Result**: Works as Expected

<details><summary>Filter the FoodFeed</summary>
     <img src="/src/assets/img_readme/ManualTesting/35_SearchTermFilter.png">
     <br>
     <img src="/src/assets/img_readme/ManualTesting/36_CuisineFilter.png">
     <br>
     <img src="/src/assets/img_readme/ManualTesting/37_IngredientsFilter.png">
</details>

**User story: As a recipe owner I can edit my recipe title, pic, time effort, ingredients and description so that I can make corrections or update my recipe after it was created.**

**Expected Result**: When accessing my own recipe I can click on edit and edit the recipe.

**Actual Result**: Works as Expected

<details><summary>Edit Recipe</summary>
     <img src="/src/assets/img_readme/ManualTesting/22_RecipeDetailUpdate.png">
    <br>
     <img src="/src/assets/img_readme/ManualTesting/23_RecipeSavedSuccessfully.png">
      <br>
     <img src="/src/assets/img_readme/ManualTesting/24_RecipeUpdated.png">
</details>

### Delete Recipes

**User story: As a logged in user I can delete my own recipes so that I can get rid of information I don't want to share anymore.**

**Expected Result**: On click of the button delete I can delete my own recipe.

**Actual Result**: Works as Expected

<details><summary>Delete Recipes</summary>
      <img src="/src/assets/img_readme/ManualTesting/25_RecipeDelete.png">
</details>

### Profile Update

**User story: As a logged in user I can access my profile page so that I can manage the information about me.**

**Expected Result**: By clicking edit profile, I can add information to my profile.

**Actual Result**: Works as Expected

<details><summary>Profile Update</summary>
      <img src="/src/assets/img_readme/ManualTesting/1_UpdateProfile.png">
      <br>
      <img src="/src/assets/img_readme/ManualTesting/2_UpdateProfile.png">
       <br>
      <img src="/src/assets/img_readme/ManualTesting/3_UpdateProfile.png">
       <br>
      <img src="/src/assets/img_readme/ManualTesting/4_UpdateProfile.png">
</details>


### Fast Navigation

**User story: As a user I can navigate through pages fast so that I can view content without refreshing the page.**

**Expected Result**: By implemented routes, users can navigate fast and easy.

**Actual Result**: Works as Expected

<details><summary>Fast Navigation</summary>
      <img src="/src/assets/img_readme/ManualTesting/12_WelcomeScreen.png">
</details>

### Create Comments

**User story: As a logged in user I can create comments so that I can share my thoughts on other chef's recipes.**

**Expected Result**: I can add comments to other users recipes.

**Actual Result**: Works as Expected

<details><summary>Add a Comment</summary>
     <img src="/src/assets/img_readme/ManualTesting/39_CommentOnOtherRecipe.png">
    <br>
     <img src="/src/assets/img_readme/ManualTesting/40_CommentSuccessMessage.png">
      <br>
     <img src="/src/assets/img_readme/ManualTesting/41_Comment.png">
</details>

### Delete Comments

**User story: As a logged-in user I can delete my own comments so that I have full control over my shared content.**

**Expected Result**: I can delete my own comment.

**Actual Result**: Works as Expected

<details><summary>Delete a Comment</summary>
     <img src="/src/assets/img_readme/ManualTesting/42_DeleteComment.png">
    <br>
      <img src="/src/assets/img_readme/ManualTesting/43_CommentDeleteSuccessfully.png">
</details>

### Mark as Inappropriate

**User story: As a logged-in user I can mark another comment as inappropriate so that I can help keep cyber mobbing and trolling in place.**

**Expected Result**: In case I find a worrying comment I can mark it as inappropriate.

**Actual Result**: Works as Expected

<details><summary>Mark Comment as Inappropriate</summary>
      <img src="/src/assets/img_readme/ManualTesting/34_MarkAsInappropriate.png">
      <br>
      <img src="/src/assets/img_readme/ManualTesting/35_MarkAsInappropriate.png">
        <br>
      <img src="/src/assets/img_readme/ManualTesting/36_MarkAsInappropriate.png">
      <br>
      <img src="/src/assets/img_readme/ManualTesting/37_MarkAsInappropriate.png">
</details>

### Follow/Unfollow

**User story: As a logged-in user I can follow and unfollow other chef profiles so that I keep up to date with them.**

**Expected Result**: I can follow and unfollow other users.

**Actual Result**: Works as Expected

<details><summary>Follow and Unfollow Functionality</summary>
    <img src="/src/assets/img_readme/ManualTesting/1_Follow.png">
    <br>
    <img src="/src/assets/img_readme/ManualTesting/2_Unfollow.png">
     
</details>

### Ease-of-Navigation

**User story: As a user, I can navigate through the application intuitively so that I can easily find the features I am looking for.**

**Expected Result**: I always know where I am in the application and how to get back and forth.

**Actual Result**: Works as Expected

<details><summary>Ease-Of-Navigation</summary>
      <img src="/src/assets/img_readme/ManualTesting/12_WelcomeScreen.png">
</details>

### Responsiveness

**User story: As a user, I can access the application from different devices so that I can have a consistent user experience on all devices.**

**Expected Result**: I can follow and unfollow other users.

**Actual Result**: Works as Expected

<details><summary>Responsiveness</summary>
      <img src="/src/assets/img_readme/AmIResponsive.PNG/">
</details>

### User Feedback

**User story: As a user I want to see messages as feedback for my actions within the application so that I can know if my actions were successful.**

**Expected Result**: Registration Form, Login Form and Recipe Create Form are giving user feedback on potential data issues (e.g. size of image in recipe creation form), when ever data is updated are stored in the database the user receives feedback as well. 

**Actual Result**: Works as Expected

<details><summary>User Feedback</summary>
    <img src="/src/assets/img_readme/ManualTesting/43_CommentDeleteSuccessfully.png">
    <br>
    <img src="/src/assets/img_readme/ManualTesting/40_CommentSuccessMessage.png">
     <br>
      <img src="/src/assets/img_readme/ManualTesting/32_ImageSizeCheck_Recipe.png">
     <br>
      <img src="/src/assets/img_readme/ManualTesting/25_RecipeDelete.png">
       <br>
      <img src="/src/assets/img_readme/ManualTesting/23_RecipeSavedSuccessfully.png">
      <br>
      <img src="/src/assets/img_readme/ManualTesting/9.FeedbackWrongCredentials.png">
         <br>
      <img src="/src/assets/img_readme/ManualTesting/8_WrongCredentials.png">
         <br>
      <img src="/src/assets/img_readme/ManualTesting/7_EmailConfirmationSuccessful.png">
</details>

### Email Confirmation

**User story: As a user I can confirm my registration via email so that my data is save and not used in a way I dont want it to be used (e.g. somebody else registers with my email).**

**Expected Result**: Upon submitting my data I get guided through the email verification process.

**Actual Result**: Works as Expected

<details><summary>Confirmation Mail</summary>
     <img src="/src/assets/img_readme/ManualTesting/3_ThankYouRegistration.png">
    <br>
     <img src="/src/assets/img_readme/ManualTesting/4_EmailVerification.png">
    <br>
    <img src="/src/assets/img_readme/ManualTesting/5_EmailVerification.png">
      <br>
    <img src="/src/assets/img_readme/ManualTesting/7_EmailConfirmationSuccessful.png">
</details>

## Validators

### HTML Validator

The generated HTML passes the W3C Markup Validator with no erros. The warnings about trailing slashes are due to the structure of the index.html file generated by Create React App and can be ignored.

<details><summary>HTML Validator</summary>
     <img src="/src/assets/img_readme/Validators/1_HTMLValidator.png">
    <br>
     <img src="/src/assets/img_readme/Validators/2_HTMLValidator.png">
    <br>
     <img src="/src/assets/img_readme/Validators/3_HTMLValidator.png">
      <br>
     <img src="/src/assets/img_readme/Validators/4_HTMLValidator.png">
      <br>
     <img src="/src/assets/img_readme/Validators/5_HTMLValidator.png">
     <br>
     <img src="/src/assets/img_readme/Validators/6_HTMLValidator.png">
     <br>
     <img src="/src/assets/img_readme/Validators/7_HTMLValidator.png">
</details>


### CSS Validator

Initially I had 6 errors with the CSS Validator. 5 of those 6 errors I could eliminated. The other seems not to be part of the CSS files I created. I searched for the error in the whole environment but didn't find it. So for me this one error in the Validator can be ignored.


<details><summary>HTML Validator</summary>
     <img src="/src/assets/img_readme/Validators/CSSValidator.png">
    <br>
     <img src="/src/assets/img_readme/Validators/NoParseErrorFound.png">
</details>


## Bug Fixes

Regarding the Bug fixes I focused heavily on the not met assessment criteria and debugged accordingly.

### UX Design
**Bug**: Design a Front-End for a Full-Stack web application that meets accessibility guidelines, follows the principles of UX design, meets its given purpose and provides a set of user interactions.

**Bug Fix**
I optimized the application with regards to its appearance. This included 

* choosing Roboto over Dancing Script as a main font
* debug the CSS error regarding the footer - now it is finally stuck to the bottom of the page
* the button colors were aligned to indigo (instead of blue)
* the buttons regarding registration and user handling stayed in the defined gray shade

### Data Manipulation and responses to user actions
**Bug** Implement custom JSX (HTML, JavaScript and CSS) code to create a responsive, dynamic Front-End application consisting of one or more pages with relevant responses to user actions and a set of data manipulation functions.

**Bug Fix**
I went through all user interactions, identified console errors and fixed them. My fixes inluded:

* creating a new recipe edit form, for better handling of input data and sending data 
* stepping away from a multistep form in the profile update and creating a new function form version here as well
* fixed console errors when marking a comment as inappropriate
* the search feature in the foodfeed is not causing an infinite loop anymore
* sending a comment is not causing an infinite loop anymore either

### Email Verification
**Bug**
Email verification leading the user to the backend

**Bug Fix**
This was probably my biggest win in this application. I managed to program a custom frontend url with the django all auth verification key and with that navigate the user to the frontend directly. In the frontend the verify email component is handling the verification (checking key in url with key in database) and then redirects to the confirmation page component. I am very proud of this one.

### Comments
**Bug**
Comments not being submit effectively and all comments displaying under all recipes

**Bug Fix** 
This was fixed effectively. Comments are now sent to the database without issues, the right comments are filtered below the associated recipe and a success message is displayed 

### ReadMe File
**Bug** Not really a bug but the ReadMe File was lacking due to running out of time in previous submissions.

**Bug Fix**
I made sure of adding the following information in the ReadMe File:

* my UX Design process
* the agile methode in use
* the reusable react component structure
* the database structure
* the user flow and wireframes
* the manual testing
* the validation
* the deployment
* technologies used

### Favorites Route
**Bug** 
Favourites route was not filtering correctly.

**Bug Fix**
I sadly had to drop this issue for now. There were so many bugs in the application, and interferences with each other I had to prioritize which features to fix and which to drop for this application. The goal was a MVP that offers basic functionality.

### Interactions
**Bug**
Write code that correctly handles user interactions such as clicks, changes to input fields etc.

**Bug Fix**
As mentioned above already I made sure that the interactions remaining are causing no issues anymore.

### CRUD Functionality
**Bug**
CRUD functionalities on the front end work without issues and update records on the back end, with exceptions

**Bug Fix**
I eliminated the issues in the CRUD functionalities and focused on less is more for MVP and deadline reasons. CRUD works for:

Recipes - create, retrieve, update, delete
Comments - create, retrieve, delete
Profile - create, retrieve, update

### User Feedback
**Bug**
All changes to the data should be notified to the relevant user on the Front-End application. Implement exception-handling for user actions when communicating with the API, and relay any relevant feedback to the user on the Front-End application.

**Bug Fix**
I added user feedback to almost all functionlities, namely:

* registration process
* create recipe
* update recipe
* create comment
* delete comment
* update profile

The only exception is the delete of the recipe. Because the recipe page itself is deleted, the status is not shown on the page. But there is a message asking if the user really wants to delete before deletion. Then the user is redirected to the main page.

I also took a closer look at exception handling and optimized where I could.

### Improve API data displayed on the Front-End 
**Bug**
API data is largely effectively displayed on the Front-End however implementation can be improved. (e.g not all relevant fields on a model are displayed or are editable where the option to have these displayed and to be editable would enhance the overall user experience)

**Bug Fix**
I looked extra closely at the API data and its useage on the frontend. Unnecessary data in the API was removed, functionalities on the frontend improved. The only exception is the filter set for the recipes view - the filters for the user feed and the following feed I left in the API on purpose. This will be my first fix once the application is free for me to work on.



## Remaining Issues

### CSS
In some areas of the application the CSS is not perfect. In the profile page the edit profile button is not completely centrally alligned, it is slanted to the right. Also in the FoodFeed when clicking on the filter for cuisines, the filter expands beyond the height of the application causing a white space underneath the footer. The mobile view of the menu has no background so the menu items are a bit harder to read. Again, time constraints forced me to prioritize issues and since the menu in the mobile is readable just not ideal, I had to drop this for this release.

### Console Errors and Warnings
There are three 401 errors in the console which are caused by the API returning 401 errors when the user is not logged in. This is expected behaviour and does not affect the application's functionality.

# Deployment

The application was deployed to Heroku. A live version of the application can be found at https://cookingaroundtheworld.herokuapp.com/

Please follow these steps to deploy the application:

    Deploy your own version of the Sonic Explorers API by following the deployment instructions for the Sonic Explorers API.

    Clone or fork this repository. For forking it, go to https://github.com/andreagorsche/cookaroundtheworld, click on Fork and follow the instructions. For cloning the repository, run git clone https://github.com/andreagorsche/cookaroundtheworld.git in your terminal.
   
    Go to the repository folder and edit the file src/api/axiosDefaults.js. In the file, change the value of axios.defaults.baseURL to the URL of your deployed API. You can find the URL by clicking on your API app from the Heroku dashboard and then copying the URL from the Open app button.

    If you haven't done so yet, login to your Heroku account at https://heroku.com. Now start a new app from the Heroku dashboard by clicking on New and then on Create new app.
   
    Give your app an available name and choose your region (US or Europe).

    Click on the Deploy tab and connect the Heroku app to your GitHub repository.

    Scroll down and select the branch you want to deploy in the Manual deploy section. Now click on Deploy Branch for the first deployment of the application.

    In case you run into any issues while deploying your App you can access Heroku logs by clicking on More and then View logs or you can check the Activity tab for debugging.
   
    After successful deployment, click on View to open your deployed app.
  
    If everything went well, you should see the Cook Around The World starting page.


# Credits

Besides the walkthrough project moments of Code Institute I used the following sources for this project:

React documentation
Bootstrap documentation

# Acknowledgements

I would like to thank my mentor Akshat Garg, the great student care and tutoring of Code Institute.
Marko and Roman from our pp5 advfe project support group as well as Mohammad Shami from the masterclass.

On top of that I would like to thank my family and friends for their continuous support and for believing in me.