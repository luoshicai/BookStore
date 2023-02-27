package com.example.demo.daoimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgCode;
import com.example.demo.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<Users> findAllUsers(){
        List<Users> usersList = usersRepository.findAll();
        return usersList;
    }

    //封装
    @Override
    public List<Users> findUsers(String userName,String password){
        return usersRepository.findUsers(userName,password);
    }

    @Override
    public void saveUser(Users newUser){
        usersRepository.save(newUser);
    }

    @Override
    public void changeIdentity(Integer identity,Integer userId){
        usersRepository.changeIdentity(identity, userId);
    }

    @Override
    public Users findUserByName(String userName){
        return usersRepository.findUserByName(userName);
    }
}
