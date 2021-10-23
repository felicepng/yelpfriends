package com.example.YelpFriends.controller;

import com.example.YelpFriends.model.User;
import com.example.YelpFriends.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
//import model.User;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;

@RestController
public class DataLoad {
    @Autowired
    private UserRepository userRepository;
//    static Map<String, User> userIdMap = new HashMap<>();
//
//    //    static String FILE_NAME = "data/test.json";
//    static String FILE_NAME = "data/test.json";
//
//    public static void main(String[] args) {
//        populateUserIdMap();
////        userIdMap.toString();
//        System.out.println(userIdMap.toString());
//    }
    @GetMapping("/load")
    public void populateUserIdMap() {
        JSONParser parser = new JSONParser();
//
//        try ( BufferedReader br = new BufferedReader(new FileReader(FILE_NAME))){
//            String line = br.readLine();
//
//            while (line != null) {
//                JSONObject jsonObject = (JSONObject) parser.parse(line);
//                String user_id = (String) jsonObject.get("user_id");
//
//                String friendsString = (String) jsonObject.get("friends");
//
//                List<String> friends = new ArrayList<>(Arrays.asList(friendsString.split(", ")));
//
//                User user = new User(user_id, friends);
//                userIdMap.put(user_id, user);
//                line = br.readLine();
//            }
//        } catch (IOException | ParseException e) {
//            e.printStackTrace();
//        }
        BufferedReader br = null;
        int count = 0;
        try {
            String sCurrentLine;
            br = new BufferedReader(new FileReader("src/main/resources/test.json"));

            while ((sCurrentLine = br.readLine()) != null) {
                JSONObject jsonobject = (JSONObject) new JSONParser().parse(sCurrentLine);
                JSONObject jsonObject = (JSONObject) parser.parse(sCurrentLine);
                String user_id = (String) jsonObject.get("user_id");

                String friendsString = (String) jsonObject.get("friends");

                List<String> friends = new ArrayList<>(Arrays.asList(friendsString.split(", ")));

                User user = new User(user_id, friends);
                userRepository.save(user);
                sCurrentLine = br.readLine();
                count += 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(count);
    }

}
