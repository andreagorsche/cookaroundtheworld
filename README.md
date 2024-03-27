# Welcome to Cook Around The World

This app brings together chef's around the world to share recipes of different cuisines. Users can get inspired by favorite dishes of other cultures.Registration is for free. 

Once logged in users can enjoy the following features:
* create and manage their recipes
* browse the food feed for inspiration
* filter the food feed by search term, ingredients or cuisine
* follow other chefs
* manage their own profile
* rate and comment on other recipes

To create a safe space of exhange, logged in users can mark inappropriate comments as such. If a user keeps misbehaving the user account will be set to inactive (5 inappropriate comments or more).


![Responsive Starting Page](/src/assets/img_readme/AmIResponsive.PNG)

## USP
Another recipe page, really? - Well most other recipe pages are editorial, meaning that a dedicated staff selects recipes. Although this effort is highly appreciated, it limits the variety, creativity and amount of recipes presented. At Cook-Around-The-World the recipes are user generated and feature interactions that are similar to an instagram for recipes!

## Deployed Version
The deployed application can be found here: [Cook-Around-The-World](https://cookingaroundtheworld.herokuapp.com/)

# User Experience

## User Stories

### MVP - The Minimum Viable Product

1. As a registered user I can log in so that I can manage my profile and recipes.

2. As a user I can create an account so that I can post recipes, access my profile and follower other users.
3. As a registered user I can log in so that I can manage my profile and recipes.
4. As a user I can always see if I am logged in or logged out so that I know whether I am capable to use a certain feature with the current status.
5. As a logged-in user I can post a new recipe so that I can share my unique recipes with the world.
6. As a logged-in user I can access the details of a recipe so that I can try it myself.
7. As a logged-in user I can rate recipes so that I can share my personal experience about other recipes.
8. As a user I can view a list of recipes that were recently added so that I have an overview of the newest, added recipes.
9. As a user, I can search for recipes by cuisine(drop down menu), by ingredients, by keywords so that I can find the recipes and chef profiles I am most interested in.
10. As a recipe owner I can edit my recipe title, pic, time effort, ingredients and description so that I can make corrections or update my recipe after it was created.
11. As a logged in user I can delete my own recipes so that I can get rid of information I don't want to share anymore.
12. As a logged in user I can access my profile page so that I can manage the information about me.
15. As a user I can navigate through pages fast so that I can view content without refreshing the page.
16. As a **logged in user** I can **create comments** so that **I can share my thoughts on other chef's recipes.**
17. As a logged-in user I can delete my own comments so that I have full control over my shared content.
18. As a **logged-in user** I can **mark another comment as inappropriate** so that **I can help keep cyber mobbing and trolling in place.**
19. As a logged-in user I can follow and unfollow other chef profiles so that I keep up to date with them.
20. As a **logged-in user** I can **see a feed of my chef friends recipes** so that **I can access recipes of chefs I like quick and easy.**
21. As a logged-in user, I can see a feed of my own posted recipes so that I can easily access and manage these posts easily.
22. As a user, I can navigate through the application intuitively so that I can easily find the features I am looking for.
23. As a user, I can access the application from different devices so that I can have a consistent user experience on all devices.
24. As a user I want to see messages as feedback for my actions within the application so that I can know if my actions were successful.
25. As a user I can confirm my registration via email so that my data is save and not used in a way I dont want it to be used (e.g. somebody else registers with my email)

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



