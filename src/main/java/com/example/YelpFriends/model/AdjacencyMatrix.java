package com.example.YelpFriends.model;

import java.util.*;
import com.example.YelpFriends.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdjacencyMatrix {

    public Integer size;

    //0th index of row or column will contain the userID of the respective user
    public String[][] fullAdjacency;

    //To check if users exist in the matrix and to retrieve the index
    public HashMap<String,Integer> userIndex = new HashMap<>();

    @Autowired
    private  UserRepository userRepository;


    public void buildAdjacencyMatrix() {
        long startTime = System.nanoTime();

        //Populate a list with all the users
        List<User> users = userRepository.findAll();
        int lenOfUsers = users.size();
        
        //Extra space is to store user_ID
        this.fullAdjacency = new String[lenOfUsers+1][lenOfUsers+1];
        for(int i = 0; i < lenOfUsers; i++){
            String userId = users.get(i).getUserId();
            fullAdjacency[0][i+1] = userId;
            fullAdjacency[i+1][0] = userId;
            userIndex.put(userId, i+1);
        }

        for (User user : users){
            int indexOfUser = userIndex.get(user.getUserId());
            Set<String> friendsList = user.getFriends();
            for(String friend: friendsList){
                //Get index of user
                Integer indexOfFriend = userIndex.get(friend);
                if (indexOfFriend != null){
                    //Set edge to "1"
                    fullAdjacency[indexOfUser][indexOfFriend] = "1";
                    fullAdjacency[indexOfFriend][indexOfUser] = "1";
                }

            }
        }
        this.size = lenOfUsers+1;
        long endTime = System.nanoTime();
        System.out.println("Time taken to build an Adjacency Matrix is " + (endTime - startTime) + "ns");
    }

    public Set<String> getFirstDegree(String userId){

        long startTime = System.nanoTime();
        int indexOfUser = userIndex.get(userId);
        //Using a hashset to ensure no duplicates
        Set<String> firstDegree = new HashSet<>();
        for (int i = 1; i < this.size; i++){
            //Get first degree connections
            if (fullAdjacency[indexOfUser][i] != null && fullAdjacency[indexOfUser][i].equals("1")){
                firstDegree.add(fullAdjacency[i][0]);
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get first degree from Adjacency Matrix is " + (endTime - startTime) + "ns");
        return firstDegree;
    }

    public HashMap<String, Integer> getSecondDegree(String userId) {
        long startTime = System.nanoTime();
        int indexOfUser = userIndex.get(userId);
        Set<Integer> firstDegree = new HashSet<>();

        //Maps user_id to number of mutual friends
        HashMap<String,Integer> secondDegree = new HashMap<>();

        //Get firstDegree connections
        for (int i = 1; i < this.size; i++) {
            if (fullAdjacency[indexOfUser][i]!=null && fullAdjacency[indexOfUser][i].equals("1")){
                firstDegree.add(i);
            }
        }

        //For each firstDegree connections, retrieve all their corresponding friends
        for (Integer friendIndex : firstDegree) {
            for (int index = 1; index < this.size; index++) {
                // 3 conditions for adding to second degree:
                //      1.Person is a friend of first degree connection
                //      2.Person is not in the first degree connection of User
                //      3.Person is not User itself

                if (fullAdjacency[friendIndex][index]!= null && fullAdjacency[friendIndex][index].equals("1") && !firstDegree.contains(index) && index != indexOfUser){
                    String secondDegreeUserID = fullAdjacency[0][index];
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
