package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Users;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface UserDao {

    List<Users> findAllUsers();

    //封装
    List<Users> findUsers(String userName,String password);

    void saveUser(Users newUser);

    void changeIdentity(Integer identity,Integer userId);

    Users findUserByName(String userName);
}
