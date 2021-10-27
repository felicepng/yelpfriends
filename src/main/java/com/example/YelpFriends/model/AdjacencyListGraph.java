package com.example.YelpFriends.model;
import java.util.*;

public class AdjacencyListGraph {
    private Map<String, ArrayList<AdjacencyListNode>> adjacencyList = new HashMap<>();;

    public void addUser(String userId) {
        adjacencyList.put(userId, new ArrayList<>());
    }
    
}