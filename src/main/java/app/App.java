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

    public static void main(String[] args) {
        populateUserIdMap();
    }

    public static void populateUserIdMap() {
        JSONParser parser = new JSONParser();

        try ( BufferedReader br = new BufferedReader(new FileReader("data/yelp_academic_dataset_user.json"))){
            String line = br.readLine();
            while (line != null) {
                JSONObject jsonObject = (JSONObject) parser.parse(line);
                String user_id = (String) jsonObject.get("user_id");
                List<String> friends = new ArrayList<>();

                String friendsString = (String) jsonObject.get("friends");

                for (String friend: friendsString.split(",")) {
                    friends.add(friend.strip());
                }
                User user = new User(user_id, friends);

                userIdMap.put(user_id, user);
                line = br.readLine();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }



}
