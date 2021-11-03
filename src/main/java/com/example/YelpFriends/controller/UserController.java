package com.example.YelpFriends.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.example.YelpFriends.model.*;
import com.example.YelpFriends.repository.UserRepository;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private AdjacencyList adjacencyList;

    @Autowired
    private AdjacencyMatrix adjacencyMatrix;

    @Autowired
    private BooleanAdjacencyMatrix booleanAdjacencyMatrix;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Tree tree;

    @GetMapping("/load")
    public ResponseEntity<?> loadUserData() {
		JSONParser parser = new JSONParser();

        BufferedReader br = null;
        int count = 0;
        try {
            String sCurrentLine;
            br = new BufferedReader(new FileReader("src/main/resources/yelp_academic_dataset_user.json"));

            // size of data set to be loaded, starting from the first line
            int DATASET_SIZE = 15000;
            while ((sCurrentLine = br.readLine()) != null && count < DATASET_SIZE) {
                count += 1;
                System.out.println(count);
                
                // Parse a line in dataset to an object
                JSONObject jsonObject = (JSONObject) parser.parse(sCurrentLine);

                // Get user_id string from jsonObject
                String user_id = (String) jsonObject.get("user_id");

                // Check if user already exists
                if (userRepository.findByUserId(user_id).isPresent()) {
                    continue;
                }

                // Get friends string from jsonObject
                String friendsString = (String) jsonObject.get("friends");

                // Split friends string into array of friends
				String[] fArr = friendsString.split(", ");

                // Create new set and add all friends in
				Set<String> friends = new HashSet<>();
				for (String a : fArr) {
					friends.add(a);
				}

                // Initialise new user
                User user = new User(user_id, friends);

                // Save user to database
                userRepository.save(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
	}

    //Build Adjacency Matrix
    @GetMapping("/buildAdjMatrix")
    public ResponseEntity<?> loadAdjMat() {
       adjacencyMatrix.buildAdjacencyMatrix();
       return ResponseEntity.ok().build();
    }

    //q_QQ5kBBwlCcbL1s4NVK3g
    // Get first degree friends using Adjacency Matrix
    @GetMapping(value = "/adjMatrix/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadAdjMatFirstDegree(@PathVariable String user_id) {
        if (adjacencyMatrix.fullAdjacency == null ){
            adjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(adjacencyMatrix.getFirstDegree(user_id));
    }

    // Get second degree friends using Adjacency Matrix
    @GetMapping(value = "/adjMatrix/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadAdjMatSecondtDegree(@PathVariable String user_id) {
        if (adjacencyMatrix.fullAdjacency == null ){
            adjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(sortMap(adjacencyMatrix.getSecondDegree(user_id)));
    }


    //Build Adjacency List
    @GetMapping(value = "/buildAdjList")
    public ResponseEntity<?> loadAdjList(){
        adjacencyList.buildAdjacencyList();
        return ResponseEntity.ok().build();
    }

    // Get first degree friends using Adjacency List
    @GetMapping(value = "/adjList/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadAdjListFirstDegree(@PathVariable String user_id) {
        if (adjacencyList.fullAdjacencyList == null ){
            adjacencyList.buildAdjacencyList();
        }
        return ResponseEntity.ok(adjacencyList.getFirstDegree(user_id));
    }

    // Get second degree friends using Adjacency List
    @GetMapping(value = "/adjList/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadAdjListSecondDegree(@PathVariable String user_id) {
        if (adjacencyList.fullAdjacencyList == null ){
            adjacencyList.buildAdjacencyList();
        }
        return ResponseEntity.ok(sortMap(adjacencyList.getSecondDegree(user_id)));
    }

    //Build Tree
    @GetMapping(value = "/buildTree/{user_id}")
    public ResponseEntity<?> buildTree(@PathVariable String user_id){
        tree.buildTree(user_id);
        if (tree.getRoot() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().build();
    }

    // Get first degree friends using Tree
    @GetMapping(value = "/tree/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadTreeFirstDegree(@PathVariable String user_id) {
        // Check if tree is null or 
        if (tree == null || tree.getRoot() == null || !tree.getRoot().getUserId().equals(user_id)){
            tree.buildTree(user_id);
        }
        Set<String> firstDegreeFriends = tree.findFirstDegree();
        return ResponseEntity.ok(firstDegreeFriends);
    }

    // Get second degree friends using Tree
    @GetMapping(value = "/tree/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadTreeSecondDegree(@PathVariable String user_id) {
        if (tree.getRoot() == null || !tree.getRoot().getUserId().equals(user_id) ){
            tree.buildTree(user_id);
        }
        Map<String, Integer> secondDegreeFriends = tree.findSecondDegree();
        // return ResponseEntity.ok(secondDegreeFriends);
        return ResponseEntity.ok(sortMap(secondDegreeFriends));
    }

    //Build boolean Adj Matrix
    @GetMapping("/buildBoolAdjMatrix")
    public ResponseEntity<?> loadBoolAdjMat() {
        booleanAdjacencyMatrix.buildAdjacencyMatrix();
        return ResponseEntity.ok(booleanAdjacencyMatrix.fullAdjacency);
    }

    //q_QQ5kBBwlCcbL1s4NVK3g
    // Get first degree friends using boolean Adjacency Matrix
    @GetMapping(value = "/boolAdjMatrix/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadBoolAdjMatFirstDegree(@PathVariable String user_id) {
        if (booleanAdjacencyMatrix.fullAdjacency == null ){
            booleanAdjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(booleanAdjacencyMatrix.getFirstDegree(user_id));
    }

    // Get second degree friends using boolean Adjacency Matrix
    @GetMapping(value = "/boolAdjMatrix/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadBoolAdjMatSecondtDegree(@PathVariable String user_id) {
        if (booleanAdjacencyMatrix.fullAdjacency == null ){
            booleanAdjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(sortMap(booleanAdjacencyMatrix.getSecondDegree(user_id)));
    }

    // private sorting function to sort second degree friends map to list entries
    private List<Map.Entry<String,Integer>> sortMap(Map<String, Integer> secondDegMap) {
        // Generate list of entries in second degree friends map
        List<Map.Entry<String,Integer>> list = new ArrayList<>(secondDegMap.entrySet());

        // Sort the list based on descending value of mutual friends
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
            public int compare(Map.Entry<String, Integer> o1,Map.Entry<String, Integer> o2){
                return (o2.getValue()).compareTo(o1.getValue());
            }
        });
        return list;
    }





    

}
