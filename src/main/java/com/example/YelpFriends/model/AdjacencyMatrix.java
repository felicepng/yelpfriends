package com.example.YelpFriends.model;

import java.util.*;
import com.example.YelpFriends.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdjacencyMatrix {
    // 0th row of Adjacency will be UserID and 0th column will be UserID
    // Depends on buffer reader of DB, can use String[][] fullAdjacency will be
    // easier
    // public ArrayList<ArrayList<String>> fullAdjacency;

    public Integer size;

    public String[][] fullAdjacency;

    public HashMap<String,Integer> userIndex = new HashMap<>();

    // Remove if testing
    @Autowired
    private  UserRepository userRepository;

//    public List<User> users;


//     @Autowired
//    public AdjacencyMatrix(Integer size, String[][] fullAdjacency, HashMap<String, Integer> userIndex,
//            UserRepository userRepository, List<User> users) {
//        this.size = size;
//        this.fullAdjacency = fullAdjacency;
//        this.userIndex = userIndex;
//        this.userRepository = userRepository;
////        this.users = users;
//    }

    public void buildAdjacencyMatrix() {
        long startTime = System.nanoTime();
        List<User> users = userRepository.findAll();
        int lenOfUsers = users.size();
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
                // String friendUserId = friend.getUserId();
                Integer indexOfFriend = userIndex.get(friend);
                if (indexOfFriend != null){
                    fullAdjacency[indexOfUser][indexOfFriend] = "1";
                    fullAdjacency[indexOfFriend][indexOfUser] = "1";
                }

            }
        }
        long endTime = System.nanoTime();
        this.size = lenOfUsers+1;
        System.out.println("Time taken to build an Adjacency Matrix is " + (endTime - startTime) + "ns");
    }

    // public int getIndexOfUser(String userId) {
    //     // Binary search on rows to check for userId
    //     // fullAdjacency[0][n/2] == userId?
    //     int top = fullAdjacency.size();
    //     int bottom = 0;
    //     int middle = (top + bottom) / 2;
    //     while (!(fullAdjacency.get(0).get(middle).equals(userId))) {
    //         String current = fullAdjacency.get(0).get(middle);
    //         if (userId.compareTo(current) < 0) {
    //             top = middle - 1;
    //         } else {
    //             bottom = middle + 1;
    //         }
    //         middle = (top + bottom) / 2;
    //     }
    //     return middle;
    // }
    public Set<String> getFirstDegree(String userId){

        long startTime = System.nanoTime();
        int indexOfUser = userIndex.get(userId);
        Set<String> firstDegree = new HashSet<>();
        for (int i = 1; i < this.size; i++){
            if (fullAdjacency[indexOfUser][i] != null && fullAdjacency[indexOfUser][i].equals("1")){
                firstDegree.add(fullAdjacency[i][0]);
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
        for (int i = 1; i < this.size; i++) {
            // if (fullAdjacency.get(indexOfUser).get(i).equals("1")) {
            //     firstDegree.add(i);
            // }
            if (fullAdjacency[indexOfUser][i]!=null && fullAdjacency[indexOfUser][i].equals("1")){
                firstDegree.add(i);
            }
        }
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
        System.out.println(secondDegree.keySet().size());
        long endTime = System.nanoTime();
        System.out.println("Time taken to get second degree from Adjacency Matrix is " + (endTime - startTime) + "ns");
        return secondDegree;
    }

//    public static void main(String[] args) {
//
//        List<User> users = new ArrayList<>();
//
//
//        // adjList.put("Tom", new HashSet<>());
//        // adjList.put("John", new HashSet<>(Arrays.asList("Jack", "Mary")));
//        // adjList.put("Jack", new HashSet<>(Arrays.asList("John")));
//        // adjList.put("Mary", new HashSet<>(Arrays.asList("John")));
//        Set<String> nicsFriends = new HashSet<String>();
//        nicsFriends.add("yvonne");
//        nicsFriends.add("felice");
//        nicsFriends.add("jer");
//        nicsFriends.add("daryl");
//        User nic = new User("nic", nicsFriends);
//        users.add(nic);
//        Set<String> everyonesFriend = new HashSet<String>();
//        everyonesFriend.add("nic");
//        Set<String> darylsFriends = new HashSet<String>();
//        User daryl = new User("daryl", everyonesFriend);
//        users.add(daryl);
//        User yvonne = new User("yvonne", everyonesFriend);
//        users.add(yvonne);
//        User felice = new User("felice", everyonesFriend);
//        users.add(felice);
//        User jer = new User("jer", everyonesFriend);
//        users.add(jer);
//
//        AdjacencyMatrix adjMat = new AdjacencyMatrix();
//        adjMat.users = users;
//        adjMat.buildAdjacencyMatrix();
//        for (int i = 0; i < adjMat.size;i++){
//            for (int j = 0; j < adjMat.size; j++){
//                System.out.println(adjMat.fullAdjacency[i][j]);
//            }
//        }
//        // adjList.put("Daryl", new ArrayList<>());
//        // adjList.put("nic >:(", new ArrayList<>());
//        // adjList.put("Yvonne", new ArrayList<String>(Arrays.asList("Jack", "Mary")));
//        // adjList.put("Felice :)", new ArrayList<String>(Arrays.asList("John")));
//        // adjList.put("Jerald", new ArrayList<String>(Arrays.asList("John")));
//    }
}
