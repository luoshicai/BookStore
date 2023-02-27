package com.example.demo.serviceimpl;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.Users;
import com.example.demo.service.UserService;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgCode;
import com.example.demo.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public JSONObject LoginValidate(JSONObject info){
        String userName=info.getString("userName");
        String password=info.getString("password");

        List<Users> user = userDao.findUsers(userName,password);

        Users result = null;
        for (int i=0; i<user.size();++i){
            result = user.get(i);
        }

        //找到了而且没被封禁
        if (result!=null&&result.getIdentity()!=0){
            Integer identity = result.getIdentity();
            JSONObject object=new JSONObject();
            object.put("msg","登录成功");
            object.put("userId",result.getUser_id());
            object.put("userName",result.getUserName());
            object.put("identity",identity);
            return object;
        }
        else if (result==null){
            JSONObject object=new JSONObject();
            object.put("msg","用户名或密码错误！");
            return object;
        }
        else {
            JSONObject object=new JSONObject();
            object.put("msg","账号封禁中！");
            return object;
        }
    }

    @Override
    public JSONObject SignIn(@RequestBody JSONObject info){
        String userName= info.getString("userName");
        String password= info.getString("password");
        String email = info.getString("email");

        Users user = userDao.findUserByName(userName);
        if (user!=null){
            JSONObject result =new JSONObject();
            result.put("msg","注册失败，用户名重复！");
            return result;
        }
        else{
            Users newUser = new Users();
            newUser.setUserName(userName);
            newUser.setPassword(password);
            newUser.setEmail(email);
            newUser.setIdentity(1);
            userDao.saveUser(newUser);

            JSONObject result =new JSONObject();
            result.put("msg","注册成功");
            return result;
        }
    }

    @Override
    public List<Users> findAllUsers(){
        return userDao.findAllUsers();
    }

    @Override
    public JSONObject blockUser(@RequestBody JSONObject info){
        //接受参数
        String StrId = info.getString("id");
        String StrIdentity = info.getString("identity");
        Integer userId = Integer.parseInt(StrId);
        Integer identity = Integer.parseInt(StrIdentity);

        //修改数据
        userDao.changeIdentity(identity, userId);

        //返回结果
        JSONObject result =new JSONObject();
        result.put("msg","操作成功");
        return result;
    }

    @Override
    public JSONObject Logout(@RequestBody JSONObject info){
        //接收参数
        Integer userId = info.getInteger("userId");

        //返回结果
        JSONObject result = new JSONObject();
        result.put("msg","操作成功");
        return result;
    }
}
