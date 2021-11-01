# yelpfriends!

Making use of the Yelp user dataset, YelpFriends aims to help users find new friends using mutual connections.

We make use of trees and graphs to conduct searching, creating Breadth First Search algorithm to compute the 1st and 2nd degree connections of each user. For our graphs, we used Adjacency Matrix and Adjacency List implementations to build our graph. 

Requirements:
Ensure yelp_academic_dataset_user.json is in src/main/resources before running the backend.
Dataset available here: https://www.yelp.com/dataset

BACKEND: 
Run the backend by running the YelpFriendsApplication.java in Intellij IDEA or using the Spring Boot Dashboard in Visual Studio Code.
Using a browser, enter the url `localhost:8080/{functionName}` to load the functions in src/main/java/com/example/YelpFriends/controller/UserController.java
Alternatively, load the frontend using the instructions below

FRONTEND:
Open another terminal and cd into the client/ folder. Ensure backend is running first before attempting to start the frontend.

Run the following commands:
npm i
npm run dev

Follow the instructions on the website! 