package com.example.YelpFriends.model;

import java.util.*;

import com.example.YelpFriends.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdjacencyList {
    @Autowired
    public UserRepository userRepository;

    public Map<String, ArrayList<String>> fullAdjacencyList;

    public void buildAdjacencyList() {
        long startTime = System.nanoTime();
        HashMap<String,ArrayList<String>> adjList = new HashMap<>();
        List<User> users = userRepository.findAll();

        for (User user : users){
            Set<String> userFriends = user.getFriends();
            adjList.put(user.getUserId(),new ArrayList<>(userFriends));
        }

        fullAdjacencyList = adjList;
        long endTime = System.nanoTime();
        System.out.println("Time taken to build Adjacency List is " + (endTime - startTime) + "ns");
    }

    public void printAdjacencyList() {
        System.out.println("Adjacency List:");
        for (Map.Entry<String, ArrayList<String>> entry : fullAdjacencyList.entrySet()) {
            System.out.print(entry.getKey() + " -> ");

            for (String friend : entry.getValue()) {
                System.out.print(friend + " ");
            }
            System.out.println();
        }
    }

    public void addUser(String userId) {
        fullAdjacencyList.put(userId, new ArrayList<>());
    }

    public void removeUser(String userId) {
        fullAdjacencyList.remove(userId);

        for (Map.Entry<String, ArrayList<String>> entry : fullAdjacencyList.entrySet()) {
            if (entry.getValue().contains(userId)) {
                entry.getValue().remove(userId);
            }
        }
    }

    public void addEdge(String user1Id, String user2Id) {
        fullAdjacencyList.get(user1Id).add(user2Id);
        fullAdjacencyList.get(user2Id).add(user1Id);
    }

    public void removeEdge(String user1Id, String user2Id) {
        fullAdjacencyList.get(user1Id).remove(user2Id);
        fullAdjacencyList.get(user2Id).remove(user1Id);
    }
    
    public List<String> getFirstDegree(String userId) {
        long startTime = System.nanoTime();
        ArrayList<String> toBeReturned = fullAdjacencyList.get(userId);
        long endTime = System.nanoTime();
        System.out.println("Time to get first degree from Adjacency List is " + (endTime - startTime) + "ns");
        return toBeReturned;
    }

    public List<String> getSecondDegree(String userId) {
        long startTime = System.nanoTime();
        List<String> list = new ArrayList<>();
        List<String> firstDegree = fullAdjacencyList.get(userId);

        for (String firstDegFriend : firstDegree) {
            Optional<User>firstDegreeFriend  = userRepository.findByUserId(firstDegFriend);
            if (firstDegreeFriend.isEmpty()){
                continue;
            }
            Set<String> secondDegree = firstDegreeFriend.get().getFriends();

            for (String secondDegFriend : secondDegree) {
                if (!firstDegree.contains(secondDegFriend) && !userId.equals(secondDegFriend)) {
                    list.add(secondDegFriend);
                }
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get second degree from Adjacency List is " + (endTime - startTime) + "ns");
        return list;
    }

    public List<String> getThirdDegree(String userId) {
        long startTime = System.nanoTime();
        List<String> list = new ArrayList<>();
        List<String> firstDegree = fullAdjacencyList.get(userId);
        for (String firstDegFriend : firstDegree) {
            List<String> secondDegree = fullAdjacencyList.get(firstDegFriend);

            for (String secondDegFriend : secondDegree) {
                List<String> thirdDegree = fullAdjacencyList.get(secondDegFriend);

                for (String thirdDegFriend : thirdDegree) {
                    if (!firstDegree.contains(thirdDegFriend) && !secondDegree.contains(thirdDegFriend) && !userId.equals(thirdDegFriend)) {
                        list.add(thirdDegFriend);
                    }
                }
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to get third degree from Adjacency List is " + (endTime - startTime) + "ns");
        return list;
    }

    // Testing
//    public static void main(String[] args) {
//        AdjacencyList testList = new AdjacencyList();
//        Map<String, ArrayList<String>> adjList = testList.adjacencyList;
//
//        adjList.put("Tom", new ArrayList<>());
//        adjList.put("John", new ArrayList<>(Arrays.asList("Jack", "Mary")));
//        adjList.put("Jack", new ArrayList<>(Arrays.asList("John")));
//        adjList.put("Mary", new ArrayList<>(Arrays.asList("John")));
//        testList.printAdjacencyList();
//        System.out.println();
//
//        System.out.println("After adding Dylan");
//        testList.addUser("Dylan");
//        testList.printAdjacencyList();
//        System.out.println();
//
//        System.out.println("After Dylan and John become friends");
//        testList.addEdge("Dylan", "John");
//        testList.printAdjacencyList();
//        System.out.println();
//
//        System.out.println("After Tom and John become friends");
//        testList.addEdge("Dylan", "Tom");
//        testList.printAdjacencyList();
//        System.out.println();
//
//        System.out.println("Third degree friends Mary has:");
//        System.out.println(testList.getThirdDegree("Mary"));
//
//        System.out.println("After removing friendship between Mary and John");
//        testList.removeEdge("Mary", "John");
//        testList.printAdjacencyList();
//        System.out.println();
//
//        System.out.println("After removing John");
//        testList.removeUser("John");
//        testList.printAdjacencyList();
//        System.out.println();
//    }
}