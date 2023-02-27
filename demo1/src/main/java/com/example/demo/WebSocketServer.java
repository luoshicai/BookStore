package com.example.demo;

import com.oracle.jrockit.jfr.UseConstantPool;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/websocket/{userId}")
@Component
public class WebSocketServer {

    public WebSocketServer(){
        //每当有一个连接，都会执行一次构造方法
        System.out.println("新的连接。。。");
    }

    private static final AtomicInteger COUNT = new AtomicInteger();

    private static final ConcurrentHashMap<Integer, Session> SESSIONS = new ConcurrentHashMap<>();

    public void sendMessage(Session toSession, String message) {
        if (toSession != null) {
            try {
                toSession.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("对方不在线");
        }
    }

    public void sendMessageToUser(Integer userId, String message){
        System.out.println(userId);
        Session toSession = SESSIONS.get(userId);
        sendMessage(toSession, message);
        System.out.println(message);
    }

    @OnMessage
    public void onMessage(String message){
        System.out.println("服务器收到消息：" + message);
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") Integer userId){
        if (SESSIONS.get(userId) != null){
            return;
        }
        SESSIONS.put(userId, session);
        COUNT.incrementAndGet();
        System.out.println(userId + "上线了，当前在线人数：" + COUNT);
    }

    @OnClose
    public void onClose(@PathParam("userId") Integer userId){
        if (SESSIONS.remove(userId)!=null){
            COUNT.decrementAndGet();
            System.out.println(userId + "下线了，当前在线人数：" + COUNT);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable){
        System.out.println("发生错误");
        throwable.printStackTrace();
    }
}
