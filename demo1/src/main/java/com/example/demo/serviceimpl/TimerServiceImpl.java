package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.TimerService;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

@Service
//@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Scope(value = "session", proxyMode = ScopedProxyMode.INTERFACES)
public class TimerServiceImpl implements TimerService {

    long startTime;

    long endTime;

    @Override
    public void timeStarter(){
        startTime=System.currentTimeMillis();   //获取开始时间
    }

    @Override
    public JSONObject timeEnder(){
        endTime = System.currentTimeMillis(); //获取结束时间
        System.out.println("程序运行时间： "+(endTime-startTime)+"ms");
        System.out.println("程序运行时间： "+(endTime-startTime)/1000.0+"s");
        JSONObject result = new JSONObject();
        result.put("msg",(endTime-startTime)/1000.0);
        return result;
    }
}
