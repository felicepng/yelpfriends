package com.example.YelpFriends.model;

import java.util.*;

public class AdjacencyMatrix {
    // 0th row of Adjacency will be UserID and 0th column will be UserID
    // Depends on buffer reader of DB, can use String[][] fullAdjacency will be
    // easier
    public ArrayList<ArrayList<String>> fullAdjacency;

    public void buildAdjacency() {
        // Takes in all users, populates the matrix
        // Add string in [0][n] and [n][0] and fill up all [n][m] connections where m is
        // the
        // hashed version of the friend list
    }

    public int getIndexOfUser(String user_id) {
        // Binary search on rows to check for user_id
        // fullAdjacency[0][n/2] == user_id?
        int top = fullAdjacency.size();
        int bottom = 0;
        int middle = (top + bottom) / 2;
        while (!(fullAdjacency.get(0).get(middle).equals(user_id))) {
            String current = fullAdjacency.get(0).get(middle);
            if (user_id.compareTo(current) < 0) {
                top = middle - 1;
            } else {
                bottom = middle + 1;
            }
            middle = (top + bottom) / 2;
        }
        return middle;
    }

    public Set<String> secondDegree(String user_id) {
        // Get column for user_id
        int indexOfUser = getIndexOfUser(user_id);
        Set<Integer> firstDegree = new HashSet<Integer>();
        Set<String> secondDegree = new HashSet<String>();
        for (int i = 0; i < fullAdjacency.size(); i++) {
            if (fullAdjacency.get(indexOfUser).get(i).equals("1")) {
                firstDegree.add(i);
            }
        }
        for (Integer i : firstDegree) {
            for (int index = 0; index < fullAdjacency.size(); index++) {
                if (fullAdjacency.get(indexOfUser).get(i).equals("1")
                        && !firstDegree.contains(indexOfUser)) {
                    secondDegree.add(fullAdjacency.get(indexOfUser).get(0));
                }
            }
        }
        return secondDegree;
    }
}
