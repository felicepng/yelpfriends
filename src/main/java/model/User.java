package model;

import java.util.List;

public class User {

    private String user_id;

    private List<String> friends;

    public User(String user_id, List<String> friends) {
        this.user_id = user_id;
        this.friends = friends;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

}