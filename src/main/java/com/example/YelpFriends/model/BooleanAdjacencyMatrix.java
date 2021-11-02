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
            for(String friend: friendsList){
                // String friendUserId = friend.getUserId();
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
        Set<String> firstDegree = new HashSet<>();
        for (int i = 0; i < this.size; i++){
            if (fullAdjacency[indexOfUser][i]){
               firstDegree.add(getKeyByValue(i));
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get first degree from Adjacency Matrix is " + (endTime - startTime) + "ns");
        System.out.println(firstDegree.size());
        return firstDegree;
    }

    public HashMap<String, Integer> getSecondDegree(String userId) {
        // Get column for userId
        long startTime = System.nanoTime();
        int indexOfUser = userIndex.get(userId);
        Set<Integer> firstDegree = new HashSet<>();
        HashMap<String,Integer> secondDegree = new HashMap<>();
        for (int i = 0; i < this.size; i++) {
            // if (fullAdjacency.get(indexOfUser).get(i).equals("1")) {
            //     firstDegree.add(i);
            // }
            if (fullAdjacency[indexOfUser][i]){
                firstDegree.add(i);
            }
        }
        for (Integer friendIndex : firstDegree) {
            for (int index = 0; index < this.size; index++) {
                // 3 conditions for adding to second degree:
                //      1.Person is a friend of first degree connection
                //      2.Person is not in the first degree connection of User
                //      3.Person is not User itself

                if (fullAdjacency[friendIndex][index] && !firstDegree.contains(index) && index != indexOfUser){
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
        System.out.println(secondDegree.keySet().size());
        return secondDegree;
    }

}
