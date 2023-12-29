# RipeBanana
RipeBanana is a CRM website for students, businesses, and hobbyists who want to create projects using available hardware sets on our website. It allows registered users to checkout hardware for any of the projects they created or signed up for based on project permissions. So if you have aspirations for creating something unique, this is the website for you!


# Signing In
When first opening up the website, you will be met with the Log In page below.



If you have already created an account, then simply input your login credentials, press Log In, and you will be allowed entry. If not, click on the Sign up here link and it will redirect you to a page where you can create a first time user account like shown below.



On this page, enter your desired Username, Password, and confirm your Password in order to create a new RipeBanana account. If any of these fields produce any errors, the error messages will guide you to what you are meant to fix. 

After successfully creating an account, you will be asked to go back to the Log In page where you can enter your new credentials and access the website.


# Joining and Creating Projects
On this page you will be able to either join existing projects or create a project from scratch.  



# Joining Existing Projects

In order to join a project, that project must have been created by any previous user of RipeBanana. This allows for easy collaboration between multiple users as you aren’t only allowed to access projects you have created but also projects created by other users as long as you input a valid Project ID

# Creating New Projects

Creating new projects is fairly simple. Just give your project a name, provide a description for what the project is meant to do, and come up with a projectID (MAKE SURE TO SAVE THIS SOMEWHERE AS YOU WON’T BE ABLE TO RECOVER IT IF YOU FORGET). 

# Accessing Hardware Sets
Once you have joined an existing project or created a new one, you will be redirected to a new screen where you can check-in or check-out hardware sets for use in your project. This page looks like this:



Currently, there are only two hardware sets available at RipeBanana and in order to create more, you will need to reach out to admins who will allocate new hardware sets for you in our database based upon request and approval.

Here you are presented with the two hardware sets currently available. You can see the availability of hardware and how much hardware you have checked out for that project for each hardware set.

# Checking-in Hardware:
	
Checking in hardware means you are returning some hardware that you have already checked out beforehand. Requirements for checking in are as follows:
In the case that you check in an amount that exceeds what you have currently, you forfeit all your hardware.
In the case that you check in hardware that exceeds the capacity of the hardware set, we will fill up the capacity and leave you with the remaining hardware.

# Checking-out Hardware:

Checking out hardware means that you are trying to fetch hardware items from the hardware sets that you need for your project. Requirements for checking out are as follows:
In the case that you check out an amount that exceeds the availability, you will be given the remaining amount in the set, however, not the full amount you requested.

In either case, you will be presented with error messages on the bottom left of the screen to guide you on what you should fix in order to properly check in and check out hardware.

At any stage of your session, you are allowed to log out of the user as well as go back and forth between different screens without changing the state of your project. 


Thank you for using RipeBanana!



 

Sources Used

https://www.youtube.com/watch?v=7LNl2JlZKHA
This video was used at the beginning of the project to help start the connection between the front end and back end and also helped set up our virtual environment. We were able to send json objects from our back end server to appear in the front end. 

https://www.mongodb.com/docs/drivers/pymongo/
This page was used to get drivers to establish the connection between our backend server and mongoDB.

https://stackoverflow.com/questions/42173786/react-router-pass-data-when-navigating-programmatically. 
This page was used to implement sending project information when navigating between pages like log in to project management.

https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object.
This page was used to fix issues with being unable to run npm start.

https://github.com/abhaysamantni/Python_Mongodb/blob/master/mongodb_InsertOne.py
This github page helped our group insert documents into databases in mongoDB. We would use it as a template to insert user info into our user database and insert new projects into our project database.

https://github.com/abhaysamantni/react-class-code
This github repository was used as guidance for the frontend React code, specifically routing and sending and receiving information to/from the backend.
