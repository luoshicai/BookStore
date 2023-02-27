package com.example.demo.Listener;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.WebSocketServer;
import com.example.demo.service.OrderService;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Objects;

@Component
public class OrderListener {
    @Autowired
    private OrderService orderService;

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @Autowired
    private WebSocketServer ws;

    @KafkaListener(topics = "addOneOrderTopic", groupId = "groupId1")
    public void AddOneOrderListener(ConsumerRecord<String,String> record){
//        System.out.println(record.value());
        //接受消息
        String data = record.value();
        JSONObject info = JSONObject.parseObject(data);
        //调用Service层
        JSONObject result = orderService.AddOneOrder(info);
        String resultStr = result.getString("status");
        Integer userId = result.getInteger("userId");
        //返回结果
//        if (Objects.equals(resultStr, "下单成功！")){
//            kafkaTemplate.send("addOneOrderResult","key","下单成功");
//        }
//        else{
//            kafkaTemplate.send("addOneOrderResult","key","下单失败");
//        }
        ws.sendMessageToUser(userId,resultStr);
//        System.out.println(info);
    }

    @KafkaListener(topics = "addToOrderTopic", groupId = "groupId1")
    public void addToOrderListener(ConsumerRecord<String,String> record){
        //接受消息
        String data = record.value();
        JSONObject info = JSONObject.parseObject(data);
        //调用Service层
        JSONObject result = orderService.addToOrder(info);
        String resultStr = result.getString("status");
        Integer userId = result.getInteger("userId");

        try {

            Thread.sleep(2000);

        } catch (InterruptedException e) {

            e.printStackTrace();

        }
        //返回结果
//        if (Objects.equals(resultStr, "下单成功!")){
//            kafkaTemplate.send("addOneOrderResult","key","下单成功");
//        }
//        else{
//            kafkaTemplate.send("addOneOrderResult","key","下单失败");
//        }
        ws.sendMessageToUser(userId,resultStr);
    }

    @KafkaListener(topics = "addOneOrderResult", groupId = "groupId1")
    public void addOneOrderResult(ConsumerRecord<String,String> record) {
        System.out.println(record.value());
    }
}
