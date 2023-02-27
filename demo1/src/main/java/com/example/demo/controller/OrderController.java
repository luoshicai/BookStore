package com.example.demo.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.OrderItems;
import com.example.demo.entity.Orders;
import com.example.demo.repository.ChartsRepository;
import com.example.demo.repository.OrderItemsRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.omg.CORBA.Object;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @RequestMapping("/AddOneOrder")
    public JSONObject AddOneOrder(@RequestBody JSONObject info){
        String data = info.toString();
        kafkaTemplate.send("addOneOrderTopic","key",data);
        System.out.println(data);
        JSONObject result = new JSONObject();
        result.put("status","操作成功,等待处理！");
        return result;
//        return orderService.AddOneOrder(info);
    }

    @RequestMapping("/GetOrders")
    public List<Orders> GetOrders(@RequestBody JSONObject info){
        return orderService.GetOrders(info);
    }

    @RequestMapping("/GetAllOrders")
    public List<Orders> GetAllOrders(){ return orderService.GetAllOrders(); }

    @RequestMapping("/GetOrderDetails")
    public List<JSONObject> GetOrderDetails(@RequestBody JSONObject info){ return orderService.GetOrderDetails(info); }

    @RequestMapping("/GetBookSales")
    public List<JSONObject> GetBookSales(){ return orderService.GetBookSales(); }

    @RequestMapping("/GetUserConsumption")
    public List<JSONObject> GetUserConsumption(){ return orderService.GetUserConsumption(); }

    @RequestMapping("/FilterTime")
    public List<JSONObject> FilterTime(@RequestBody JSONObject info){ return orderService.FilterTime(info);}

    @RequestMapping("/FilterBookByTime")
    public List<JSONObject> FilterBookByTime(@RequestBody JSONObject info){ return orderService.FilterBookByTime(info);}

    @RequestMapping("/addToOrder")
    public JSONObject addToOrder(@RequestBody JSONObject info){
//        String data = info.toString();
//        kafkaTemplate.send("addOneOrderTopic","key",data);
//        System.out.println(data);
//        JSONObject result = new JSONObject();
//        result.put("status","操作成功,等待处理！");
//        return result;
        String data = info.toString();
        kafkaTemplate.send("addToOrderTopic","key",data);
        System.out.println(data);
        JSONObject result = new JSONObject();
        result.put("status","操作成功,等待处理!");
        return result;
    }

    @RequestMapping("/FilterAllOrderByTime")
    public List<JSONObject> FilterAllOrderByTime(@RequestBody JSONObject info){
        return orderService.FilterAllOrderByTime(info);
    }

    @RequestMapping("/FilterUserOrderByTime")
    public List<JSONObject> FilterUserOrderByTime(@RequestBody JSONObject info){
        return orderService.FilterUserOrderByTime(info);
    }

    @RequestMapping("/GetBookSalesById")
    public JSONObject GetBookSalesById(@RequestBody JSONObject info){
        return orderService.GetBookSalesById(info);
    }

    @RequestMapping("/FilterUserBookByTime")
    public JSONObject FilterUserBookByTime(@RequestBody JSONObject info){
        return orderService.FilterUserBookByTime(info);
    }
}
