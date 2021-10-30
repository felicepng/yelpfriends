package com.example.YelpFriends.repository;

import com.example.YelpFriends.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByUserId(String userId);
    Boolean existsByUserId(String userId);
}
