package com.example.YelpFriends.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.transaction.annotation.EnableTransactionManagement;


@Entity
@Table(name = "USER")
@EnableTransactionManagement
public class User {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY) 
    @Column(name = "id")
    private  Long id;

    @Column(name = "userId", nullable=false, unique=true)
    private String userId;

    @Column(name = "friends")
    @ElementCollection
    private Set<String> friends = new HashSet<>();


    public User () {

    }

    public User(String user_id, Set<String> friends) {
        this.userId = user_id;
        this.friends = friends;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String user_id) {
        this.userId = user_id;
    }

    public Long getId() {
        return id;
    }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    public Set<String> getFriends() {
        return friends;
    }

    public void setFriends(Set<String> friends) {
        this.friends = friends;
    }
    
}
