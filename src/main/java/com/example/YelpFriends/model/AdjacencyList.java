package com.example.YelpFriends.model;

import java.util.*;

import com.example.YelpFriends.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class AdjacencyList {
    // @Autowired
    public UserRepository userRepository;

    private Map<String, ArrayList<String>> adjacencyList = new HashMap<>();

    // TODO: Populate list with user data from db
    public void buildAdjacencyList() {
        List<User> users = userRepository.findAll();
        
        // int lenOfUsers = users.size();

        // for (User user : users) {
        //     ArrayList<String> friends = user.getFriends();

        // }
    }

    public void printAdjacencyList() {
        System.out.println("Adjacency List:");
        for (Map.Entry<String, ArrayList<String>> entry : adjacencyList.entrySet()) {
            System.out.print(entry.getKey() + " -> ");

            for (String friend : entry.getValue()) {
                System.out.print(friend + " ");
            }
            System.out.println();
        }
    }

    public void addUser(String userId) {
        adjacencyList.put(userId, new ArrayList<>());
    }

    public void removeUser(String userId) {
        adjacencyList.remove(userId);

        for (Map.Entry<String, ArrayList<String>> entry : adjacencyList.entrySet()) {
            if (entry.getValue().contains(userId)) {
                entry.getValue().remove(userId);
            }
        }
    }

    public void addEdge(String user1Id, String user2Id) {
        adjacencyList.get(user1Id).add(user2Id);
        adjacencyList.get(user2Id).add(user1Id);
    }

    public void removeEdge(String user1Id, String user2Id) {
        adjacencyList.get(user1Id).remove(user2Id);
        adjacencyList.get(user2Id).remove(user1Id);
    }
    
    public List<String> getFirstDegree(String userId) {
        return adjacencyList.get(userId);
    }

    public List<String> getSecondDegree(String userId) {
        List<String> list = new ArrayList<>();
        List<String> firstDegree = adjacencyList.get(userId);

        for (String firstDegFriend : firstDegree) {
            List<String> secondDegree = adjacencyList.get(firstDegFriend);

            for (String secondDegFriend : secondDegree) {
                if (!firstDegree.contains(secondDegFriend) && !userId.equals(secondDegFriend)) {
                    list.add(secondDegFriend);
                }
            }
        }
        return list;
    }

    // Testing
    public static void main(String[] args) {
        AdjacencyList testList = new AdjacencyList();
        Map<String, ArrayList<String>> adjList = testList.adjacencyList; 

        adjList.put("Tom", new ArrayList<>());
        adjList.put("John", new ArrayList<>(Arrays.asList("Jack", "Mary")));
        adjList.put("Jack", new ArrayList<>(Arrays.asList("John")));
        adjList.put("Mary", new ArrayList<>(Arrays.asList("John")));

        testList.printAdjacencyList();
    }
}