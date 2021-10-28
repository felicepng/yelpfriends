package com.example.YelpFriends.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.YelpFriends.model.User;
import com.example.YelpFriends.repository.UserRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository users) {
        this.userRepository = users;
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
                JSONObject jsonObject = (JSONObject) parser.parse(sCurrentLine);
                String user_id = (String) jsonObject.get("user_id");

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
                System.out.println(count);
                count += 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(count);
	}

}
