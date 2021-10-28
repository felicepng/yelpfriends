package com.example.YelpFriends.repository;

import com.example.YelpFriends.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    // Optional<User> findByUser_id(String user_id);
    // Optional<User> findByUserId(String userId);

    List<User> findByUserId(String userId);

}
