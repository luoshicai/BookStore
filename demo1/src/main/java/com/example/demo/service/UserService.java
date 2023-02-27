package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Books;
import com.example.demo.entity.Users;
import com.example.demo.utils.msgutils.Msg;
import com.fasterxml.jackson.databind.jsonschema.JsonSchema;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

import java.util.Map;

public interface UserService {

    JSONObject LoginValidate(@RequestBody JSONObject info);

    JSONObject SignIn(@RequestBody JSONObject info);

    List<Users> findAllUsers();

    JSONObject blockUser(@RequestBody JSONObject info);

    JSONObject Logout(@RequestBody JSONObject info);
}
