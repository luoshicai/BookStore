package com.example.demo.repository;

import com.example.demo.entity.Books;
import com.example.demo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UsersRepository extends JpaRepository<Users,Integer> {

    @Query(value = "select * from users where userName = :userName " +
            " and password= :password", nativeQuery = true)
    List<Users> findUsers(
            @Param("userName")String userName, @Param("password")String password);

    @Query(value = "select * from users where userName = :userName", nativeQuery = true)
    Users findUserByName(@Param("userName")String userName);

    @Modifying
    @Query(value = "update users set identity =:identity where user_id =:userId",nativeQuery = true)
    void changeIdentity(@Param("identity")Integer identity, @Param("userId")Integer userId);
}
