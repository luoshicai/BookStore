package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.constant.Constant;
import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.TimerService;
import com.example.demo.service.UserService;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgCode;
import com.example.demo.utils.msgutils.MsgUtil;
import org.apache.catalina.User;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private TimerService timerService;

    @RequestMapping("/LogIn")
    public JSONObject LoginValidate(@RequestBody JSONObject info){
        System.out.println(timerService);
        timerService.timeStarter();
        return userService.LoginValidate(info);
    }

    @RequestMapping("/SignIn")
    public JSONObject SignIn(@RequestBody JSONObject info){
        return userService.SignIn(info);
    }

    @RequestMapping("/RootUsers")
    public List<Users> FindAllUser() { return userService.findAllUsers();}

    @RequestMapping("/changeIdentity")
    public JSONObject blockUser(@RequestBody JSONObject info){ return userService.blockUser(info);}

    @RequestMapping("/Logout")
    public JSONObject Logout(@RequestBody JSONObject info){
        System.out.println(timerService);
        return timerService.timeEnder();
    }
}
