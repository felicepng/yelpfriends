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

import com.example.YelpFriends.model.AdjacencyList;
import com.example.YelpFriends.model.AdjacencyMatrix;
import com.example.YelpFriends.model.Tree;
import com.example.YelpFriends.model.User;
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

    //To be removed if we dont need /load anymore
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

            while ((sCurrentLine = br.readLine()) != null && count < 15000) {
                // JSONObject jsonobject = (JSONObject) new JSONParser().parse(sCurrentLine);
                count += 1;
                System.out.println(count);
                
                JSONObject jsonObject = (JSONObject) parser.parse(sCurrentLine);
                String user_id = (String) jsonObject.get("user_id");

                // Check if user already exists
                if (userRepository.findByUserId(user_id).isPresent()) {
                    continue;
                }

                String friendsString = (String) jsonObject.get("friends");

				String[] fArr = friendsString.split(", ");
                // Set<String> friends = new ArrayList<>(Arrays.asList(friendsString.split(", ")));
				Set<String> friends = new HashSet<>();
				for (String a : fArr) {
					friends.add(a);
				}
                User user = new User(user_id, friends);

                userRepository.save(user);
                // sCurrentLine = br.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().build();
	}

    //Adj Matrix
    @GetMapping("/buildAdjMatrix")
    public ResponseEntity<?> loadAdjMat() {
       adjacencyMatrix.buildAdjacencyMatrix();
       return ResponseEntity.ok(adjacencyMatrix.fullAdjacency);
    }

    //q_QQ5kBBwlCcbL1s4NVK3g
    @GetMapping(value = "/adjMatrix/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadAdjMatFirstDegree(@PathVariable String user_id) {
        if (adjacencyMatrix.fullAdjacency == null ){
            adjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(adjacencyMatrix.getFirstDegree(user_id));
    }

    @GetMapping(value = "/adjMatrix/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadAdjMatSecondtDegree(@PathVariable String user_id) {
        if (adjacencyMatrix.fullAdjacency == null ){
            adjacencyMatrix.buildAdjacencyMatrix();
        }
        return ResponseEntity.ok(sortMap(adjacencyMatrix.getSecondDegree(user_id)));
    }


    //Adjacency List
    @GetMapping(value = "/buildAdjList")
    public ResponseEntity<?> loadAdjList(){
        adjacencyList.buildAdjacencyList();
        return ResponseEntity.ok(adjacencyList.fullAdjacencyList);
    }

    @GetMapping(value = "/adjList/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadAdjListFirstDegree(@PathVariable String user_id) {
        if (adjacencyList.fullAdjacencyList == null ){
            adjacencyList.buildAdjacencyList();
        }
        return ResponseEntity.ok(adjacencyList.getFirstDegree(user_id));
    }

    @GetMapping(value = "/adjList/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadAdjListSecondDegree(@PathVariable String user_id) {
        if (adjacencyList.fullAdjacencyList == null ){
            adjacencyList.buildAdjacencyList();
        }
        return ResponseEntity.ok(sortMap(adjacencyList.getSecondDegree(user_id)));
    }

    //Adjacency List
    @GetMapping(value = "/buildTree/{user_id}")
    public ResponseEntity<?> buildTree(@PathVariable String user_id){
        tree.buildTree(user_id);
        if (tree.getRoot() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(tree);
    }

    @GetMapping(value = "/tree/getFirstDegree/{user_id}")
    public ResponseEntity<?> loadTreeFirstDegree(@PathVariable String user_id) {
        // Check if tree is null or 
        if (tree == null || tree.getRoot() == null || !tree.getRoot().getUserId().equals(user_id)){
            tree.buildTree(user_id);
        }
        Set<String> firstDegreeFriends = tree.findFirstDegree();
        return ResponseEntity.ok(firstDegreeFriends);
    }

    @GetMapping(value = "/tree/getSecondDegree/{user_id}")
    public ResponseEntity<?> loadTreeSecondDegree(@PathVariable String user_id) {
        if (tree.getRoot() == null || !tree.getRoot().getUserId().equals(user_id) ){
            tree.buildTree(user_id);
        }
        Map<String, Integer> secondDegreeFriends = tree.findSecondDegree();
        // return ResponseEntity.ok(secondDegreeFriends);
        return ResponseEntity.ok(sortMap(secondDegreeFriends));
    }

    private List<Map.Entry<String,Integer>> sortMap(Map<String, Integer> secondDegMap) {
        List<Map.Entry<String,Integer>> list = new ArrayList<>(secondDegMap.entrySet());

        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
            public int compare(Map.Entry<String, Integer> o1,Map.Entry<String, Integer> o2){
                return (o2.getValue()).compareTo(o1.getValue()); 
            }
        });

        return list;
    }


    // public ResponseEntity<HttpStatus> buildMatrix() {
    //     adjacencyMatrix.buildAdjacencyMatrix();
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }



    

}
