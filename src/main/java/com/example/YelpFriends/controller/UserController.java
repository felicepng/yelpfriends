package com.example.YelpFriends.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.HashSet;
import java.util.Set;

import com.example.YelpFriends.model.AdjacencyMatrix;
import com.example.YelpFriends.model.User;
import com.example.YelpFriends.repository.UserRepository;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserRepository userRepository;

    // private AdjacencyMatrix adjacencyMatrix;

    public UserController(UserRepository users) {
        this.userRepository = users;
        // this.adjacencyMatrix = adjacencyMatrix;
    }

    @GetMapping("/load")
    public void loadUserData() {
		JSONParser parser = new JSONParser();

        BufferedReader br = null;
        int count = 0;
        try {
            String sCurrentLine;
            br = new BufferedReader(new FileReader("src/main/resources/yelp_academic_dataset_user.json"));

            while ((sCurrentLine = br.readLine()) != null) {
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
        System.out.println(count);
	}

    // public ResponseEntity<HttpStatus> buildMatrix() {
    //     adjacencyMatrix.buildAdjacencyMatrix();
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }



    

}
