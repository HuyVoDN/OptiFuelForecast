### Huy - 2/11/2024
I've set up the express, vite, and installed some basic libraries for us to get started. 
I think we can go ahead and start to delete the templates installed from Vite to begin our project. 
> We'll need Ashna to help us with the UI/UX before we can begin coding tho lol.

### Huy - 2/16/2024
Customer Page - Input their fuel suggestion, and then we make the prediction using our api to do math.
Admin Page - manually adjust fuel rate, the math behind it, basically just doing the backend work using an interface?

### Huy - 2/17/2024
Keep things simple for now, don't have to overdo it.

### Huy - 2/19/2024
After project we can add light/dark mode, would be dope.

### Huy - 2/28/2024
- Sue made a suggestion to visually upgrade our website, I'd say we should do this during the 1 month gap between the #4 checkpoint and the demo.
- I'll start doing user login authentication and creation of user into the database, along with JWT key for now.

### Huy - 2/29/2024
- I've finished with setting up the connection to the database, I have the .env file so I'll send yall that thru our server instead.
- I'll help you guys setting up your AWS connection as well as the connection for MySQL Workbench and RDS.
- I'll start doing the signup page and authentication now.

### Huy - 3/2/2024
- Finished with Registering Functionality, right now I'm making a new column within the database called username, so we can dynamically route according to the username, instead of an id of the user, since its harder to do so as well as security practices.
- Will look at ClientProfile, and change the username on there accordingly, as well as some validation for the routes.
- Sidebar codes are fucked since it's hardcode, so i have to figure out a way to fix them...
- Consider adding in cookie for session logged in as well..
### Huy - 3/7/2024
- [BUG] Found another bug where you can just login, and change the route to the existing username and switch to their profil and it would just work.
- [BUG] Another bug where only one user can be signed in at the same time...
- [BUG] Looks like the Axios.get() is being called for every page refreshes for Sidebar.jsx, check useEffect.
- [BUG] From Fuel Quote Form, you can change the route to any user, whether it exists or not, will render the page and any user can view any user's fuel quote. Potential solution: Use Client Profile's logic and can route to 404 page.

### Huy - 3/13/2024
- Fixed Bug #3 on 3/7/2024
- Add unit tests to every functionality of backend, just create a new folder called test or something like that lol :5head:

### Huy - 3/27/2024
- I want to make it so when you change your first and last name on Client Profile, it'll rerenders the Sidebar component correctly right away instead of having to log out and login.
- It always have an error where it'll take a frame to render "undefined" then renders correctly, probably due to the nature of Axios.get() method
- I'm also adding a new column in the database called profilePic where the user is allowed to change their pfp, if they dont want to, it'll display the template pfp instead. When the click on the pfp on the sidebar, the user is prompted to change the pfp or not.
- These changes will be added to main once I have fixed all bugs.