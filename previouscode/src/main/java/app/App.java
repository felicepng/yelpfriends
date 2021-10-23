package app;

import model.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;


public class App {

    static Map<String, User> userIdMap = new HashMap<>();

//    static String FILE_NAME = "data/test.json";
    static String FILE_NAME = "test.json";

    public static void main(String[] args) {
        populateUserIdMap();
//        userIdMap.toString();
        System.out.println(userIdMap.toString());
    }

    public static void populateUserIdMap() {
//        JSONParser parser = new JSONParser();
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
            br = new BufferedReader(new FileReader("test.json"));

            while ((sCurrentLine = br.readLine()) != null) {
                JSONObject jsonobject = (JSONObject) new JSONParser().parse(sCurrentLine);
                count += 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(count);
    }



}
