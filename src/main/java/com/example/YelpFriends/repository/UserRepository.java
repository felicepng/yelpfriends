package com.example.YelpFriends.repository;

import com.example.YelpFriends.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User,String> {


    @Query("insert into USERDATA(user_id,friends) VALUES (:user_id,:friends)")
    public User save(@Param("user_id") String id,@Param("friends") String friends);


}
