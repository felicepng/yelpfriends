package model;

import java.util.List;

public class User {

    private String user_id;

    private List<String> friends;

    public User(String user_id, List<String> friends) {
        this.user_id = user_id;
        this.friends = friends;
    }

}