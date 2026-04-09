Github link: https://github.com/Rayquaza000/Mobicloud_Ecommerce_Assignment.git

This is the readme file for Mobicloud Ecommerce Assignment.

Tech stack used in this assignment:
1. Frontend: ReactJS, Tailwindcss, React Redux, React Router.
2. Backend: NodeJS, ExpressJS, Mongoose, JWT, Bcrypt.
3. Database: MongoDB (MongoDB Atlas)
4. Deploy: render.com 
-------------------------------------------------------------------------------------------------------------------------------------

Setup Steps:
1. Download the repository as a zip folder or clone the repository using webURL(mentioned on the first line of this document).
2. For deployment purpose, the url in fetch method to interact with the API is set to the online url where the Backend is deployed. If you setup the backend on your localhost you must change those URL's in the frontend to point to the url of your locally hosted backend.
3. To setup the backend locally, create a ".env" file for environment variables and set the following environment variables:
    a. PORT
    b. DATABASE_URL
    c. JWT_SECRET_KEY
    Then install the necessary packages by running "npm install" command in the terminal whose path is properly set to Backend.
    Start the server by running the command "npm start"(The start script is already set to "nodemon index.js").
    You will get the message in terminal that the server is live and database connection successful.
4. For getting the admin and client frontend live, just go to their respective directory(Admin and Client) in the terminal and run commands "npm install" and "npm run dev".
5. Now you can start interacting with the website through the frontend provided through the links in the terminal.
-------------------------------------------------------------------------------------------------------------------------------------

API Documentation:

-------------------------------------------------------------------------------------------------------------------------------------

Guide to use this project

It is an ecommerce website assignment that has 3 parts:
    1. Admin Frontend
    2. Client Frontend
    3. Common Backend

Lets explore all three parts:
1. Admin Frontend
    a. The admin frontend is only for one person who can take on the roll of admin who can update and view the data of Products, Orders and Users registered in the database.
    b. The admin cannot behave like a client side user and do tasks like adding products to cart and then checking out.
    c. When wanting to see the data that an admin can see, the admin must visit https://mobicloud-ecommerce-admin.onrender.com and login using the credentials "pratik@gmail.com" and "1234567890" as the password.
    d. There is only one default admin. No other person can register as admin.
    e. After logging in the admin can open the orders section, products section and users section as he wishes.
    f. In the orders section, the admin can view all the orders that the users have placed. The admin can update the status of the orders by selecting from the following options - "Pending", "Shipped", "Delivered", "Cancelled".
    g. In the products section, the admin can add a new product, look at existing product and search for a product using the search bar. If the admin clicks on adding new product button, then it gets a form to fill the details of the new product like name,imageurl, price, etc. (The admin cannot directly upload an image to the website as there is no storage for images in this project).
    h. In the users section, the admin can view the users registered through the client website.
    i. After the admin is done, he can logout from the system
2. Client Frontend
    a. The client frontend is for anyone who wants to explore the products or buy products from this Ecommerce system.
    b. There can be multiple users. A user cannot register twice using the same email address.
    c. In the client side the home page(first page/ entry point) first shows the header, then current path in the website, then filter by category feature and lastly the products section.
    d. Without logging in a user can explore the products and filter them and search for any product but cannot add it to cart or place an order.
    e. To login, there is a login button in the header. Upon clicking that button, the user is redirected to the login page where he can login by filling his credentials if he has signedup previously. If the user is not registered then he must go to the signup page(Link at the bottom of login page) and signup by filling the details.
    f. After signing up the user will be redirected to login. After logging in the user will be redirected to the home page.
    g. Now the user can browse through the products, add them to cart and finally place an order.
    h. The user can also see his order history by clicking on the button displaying his name.
    i. Lastly the user can logout.
3. Common Backend
    a. The backend is designed to serve both the admin and the client.
    b. There are various API endpoints through which the user can interact with the system and create, read, update and delete the data in the system according to the level of his authority.
-------------------------------------------------------------------------------------------------------------------------------------