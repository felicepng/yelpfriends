package com.example.YelpFriends.model;

import com.example.YelpFriends.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
public class BooleanAdjacencyMatrix {
    public Integer size;

    //This 2D array will be the adjacency matrix that contains a boolean to indicate the presence of an edge between the two users
    public boolean[][] fullAdjacency;

    //This hashmap allows us to map the user_ID to the index of the user in the array so that we are able to retrieve the index of the user quickly
    public HashMap<String,Integer> userIndex = new HashMap<>();

    @Autowired
    private UserRepository userRepository;


    public void buildAdjacencyMatrix() {
        long startTime = System.nanoTime();
        List<User> users = userRepository.findAll();
        int lenOfUsers = users.size();
        this.fullAdjacency = new boolean[lenOfUsers][lenOfUsers];

        //Populating the hashmap
        for(int i = 0; i < lenOfUsers; i++){
            String userId = users.get(i).getUserId();
            userIndex.put(userId, i);
        }

        for (User user : users){
            int indexOfUser = userIndex.get(user.getUserId());
            Set<String> friendsList = user.getFriends();

            //For each first degree friends, set the respective index of the matrix to true
            for(String friend: friendsList){
                Integer indexOfFriend = userIndex.get(friend);
                if (indexOfFriend != null){
                    fullAdjacency[indexOfUser][indexOfFriend] = true;
                    fullAdjacency[indexOfFriend][indexOfUser] = true;
                }

            }
        }
        this.size = lenOfUsers;
        long endTime = System.nanoTime();
        System.out.println("Time taken to build an Adjacency Matrix is " + (endTime - startTime) + "ns");
    }

    //Reverse look up formula to get the userID key from the index(Position in the adjacency matric) value
    public String getKeyByValue( Integer value) {
        for (Map.Entry<String, Integer> entry : this.userIndex.entrySet()) {
            if (Objects.equals(value, entry.getValue())) {
                return entry.getKey();
            }
        }
        return null;
    }


    public Set<String> getFirstDegree(String userId){

        long startTime = System.nanoTime();
        int indexOfUser = userIndex.get(userId);

        //Using hashset to prevent duplicates
        Set<String> firstDegree = new HashSet<>();

        
        for (int i = 0; i < this.size; i++){
            if (fullAdjacency[indexOfUser][i]){
                //Do a reverse lookup using index to get user_id
                firstDegree.add(getKeyByValue(i));
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get first degree from Adjacency Matrix is " + (endTime - startTime) + "ns");
        return firstDegree;
    }

    public HashMap<String, Integer> getSecondDegree(String userId) {
        long startTime = System.nanoTime();

        //Get index of user from their userID
        int indexOfUser = userIndex.get(userId);
        Set<Integer> firstDegree = new HashSet<>();
        
        //Mapping user_id to number of mutual friends
        HashMap<String,Integer> secondDegree = new HashMap<>();

        //Populate firstDegree set
        for (int i = 0; i < this.size; i++) {
            if (fullAdjacency[indexOfUser][i]){
                firstDegree.add(i);
            }
        }

        //For each user in first degree, get all connections
        for (Integer friendIndex : firstDegree) {
            for (int index = 0; index < this.size; index++) {
                // 3 conditions for adding to second degree:
                //      1.Person is a friend of first degree connection
                //      2.Person is not in the first degree connection of User
                //      3.Person is not User itself

                if (fullAdjacency[friendIndex][index] && !firstDegree.contains(index) && index != indexOfUser){
                    
                    //Reverse lookup with index to get user_id
                    String secondDegreeUserID = getKeyByValue(index);
                    if (secondDegree.containsKey(secondDegreeUserID)){
                        int mutualFriends = secondDegree.get(secondDegreeUserID);
                        secondDegree.put(secondDegreeUserID,mutualFriends+1);
                    }
                    else{
                        secondDegree.put(secondDegreeUserID,1);
                    }
                }
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get second degree from Adjacency Matrix is " + (endTime - startTime) + "ns");
        return secondDegree;
    }

}
