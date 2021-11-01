# yelpfriends!

Making use of the Yelp user dataset, YelpFriends aims to help users find new friends using mutual connections. The dataset can be found here: https://www.yelp.com/dataset

We make use of trees and graphs to conduct searching, creating Breadth First Search algorithm to compute the 1st and 2nd degree connections of each user. 

Requirements:
Ensure yelp_academic_dataset_user.json is in src/main/resources before running the backend.

BACKEND: 
Run the backend by running the YelpFriendsApplication.java in Intellij IDEA or using the Spring Boot Dashboard in Visual Studio Code.
Using a browser, use the url `localhost:8080/{functionName}` to load the functions in src/main/java/com/example/YelpFriends/controller/UserController.java
Alternatively, load the frontend using the instructions below

FRONTEND:
cd into client/ folder. Ensure backend is running first before attempting to start the frontend on another terminal.
Run the following commands:
npm i
npm run dev

Follow the instructions on the website! 