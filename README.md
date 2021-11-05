# YelpFriends

### Goal of the project
In this project, we aim to bring about a new aspect of social network that Yelp can utilise with their rich user dataset. 

We explored different data structures that Yelp can use to help bring this feature to live. These data structure are: 
- Trees
- Adjacency Matrix
- Customised Adjacency Matrix
- Adjacency List

We compare the efficiecy of each of these algorithms through an empirical analysis. You will be able to see these data being calculated in real time from our UI Interface

---

### Deployment Instructions

REQUIREMENTS:
Ensure yelp_academic_dataset_user.json is in src/main/resources before running the backend.
Dataset available here: https://www.yelp.com/dataset

BACKEND: 
Run the backend by running the YelpFriendsApplication.java in Intellij IDEA or using the Spring Boot Dashboard in Visual Studio Code.
Using a browser, enter the url `localhost:8080/{functionName}` to load the functions in src/main/java/com/example/YelpFriends/controller/UserController.java
Alternatively, load the frontend using the instructions below

FRONTEND:
Our frontend was built using Next.js as our primary framework.
Open another terminal and cd into the client/ folder. Ensure backend is running first before attempting to start the frontend. 
Run npm install to install node modules and required dependencies:
To run start the frontend:
```bash
npm run dev
# or
yarn dev
```
Navigate to localhost:3000 to interact with our application.
Follow the instructions on the website! 

---

### Reflections
Our group realised from this project that there is no one size fits all kind of data structure. Ultimately it boils down to the priority of needs from Yelp.

If Yelp were to prioritise space, we see that the most efficient method would be to build an adjacency list for storing its users. Additionally, an adjacency list would also be appropriate if Yelp were to focus its features on users' direct friends, as it has the fastest time for gathering first degree connections. Conversely, if Yelp were to take an approach of trying to connect users, which requires constant usage of second degree connections, then either a tree or string adjacency matrix would be appropriate. 

Last but not least, we realised that there is a limitation to how accurate Big-O analysis can be. We see that in some cases, the Big-O notation of a algorithm may indicate that the method is faster, but in actual fact their run times are slower due to the nature of Big-O being an upper bound concept and the difference in N for the different algorithms

---

### Scalability and new features
Our group recognised that this analysis and implementation are merely the groundwork for many of the other functionalities Yelp can explore. We hope that continuing forward, we will be able to allow users to add each other as friends through our User Interface. Additionally, we also hope to utilise other datasets that Yelp provides such as reviews, to suggest a common place for users to meet up.
