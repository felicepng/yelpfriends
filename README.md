# YelpFriends

### Goal of the project
In this project, we aim to bring about a new aspect of social network that Yelp can utilise with their rich user dataset. 

We explored different data structures that Yelp can use to help bring this feature to life. These data structures are: 
- Tree
- Adjacency Matrix (Boolean)
- Customised Adjacency Matrix (String)
- Adjacency List

We compared the efficiecy of each of these algorithms through an empirical analysis. You will be able to see these data being calculated in real-time from our user interface.

---

### Deployment Instructions

REQUIREMENTS:
Ensure yelp_academic_dataset_user.json is in src/main/resources before running the backend.
Dataset available here: https://www.yelp.com/dataset

BACKEND: 
Run the backend by running the YelpFriendsApplication.java in Intellij IDEA or using the Spring Boot Dashboard in Visual Studio Code.
Using a browser, enter the url `localhost:8080/{functionName}` to load the functions in src/main/java/com/example/YelpFriends/controller/UserController.java
Alternatively, load the frontend using the instructions below.

FRONTEND:
Our frontend was built using Next.js as our primary framework and Tailwind CSS.
Open another terminal and cd into the client/ folder. Ensure the backend is running before attempting to start the frontend. 
Run `npm install` to install node modules and required dependencies.
To run the frontend:
```bash
npm run dev
```
Navigate to http://localhost:3000 to interact with our application.
Follow the instructions provided on the website! 

---

### Reflections
Our group realised from this project that there is no one-size-fits-all kind of data structure. Ultimately, the appropriate data structure to use boils down to the priority of needs from Yelp.

If Yelp were to prioritise space, we see that the most efficient method would be to build an adjacency list for storing its users. Additionally, an adjacency list would also be appropriate if Yelp were to focus its features on users' direct friends, as it has the fastest time for gathering first degree connections. Conversely, if Yelp were to take an approach of trying to connect users, which requires constant usage of second degree connections, then either a tree or string adjacency matrix would be appropriate. 

Last but not least, we realised that there is a limitation to how accurate Big-O analysis can be. We see that in some cases, the Big-O notation of a algorithm may indicate that the method is faster, but in actual fact their runtimes are slower due to the nature of Big-O being an upper bound concept and the difference in `n` for the different algorithms.

---

### Scalability and new features
Our group recognised that this analysis and implementation are merely the groundwork for many of the other functionalities Yelp can explore. We hope that moving forward, we will be able to allow users to add or delete friends through our user interface. Additionally, we also hope to utilise other datasets that Yelp provides such as reviews, to explore personalised friend suggestion features and recommend a common venue for friends to meet up.
