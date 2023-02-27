package com.example.demo.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.OrderItems;
import com.example.demo.entity.Orders;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface OrderService {

    JSONObject AddOneOrder(JSONObject info);

    List<Orders> GetOrders(JSONObject info);

    List<Orders> GetAllOrders();

    List<JSONObject> GetOrderDetails(JSONObject info);

    List<JSONObject> GetBookSales();

    List<JSONObject> GetUserConsumption();

    List<JSONObject> FilterTime(JSONObject info);

    List<JSONObject> FilterBookByTime(JSONObject info);

    JSONObject addToOrder(JSONObject info);

    List<JSONObject> FilterAllOrderByTime(JSONObject info);

    List<JSONObject> FilterUserOrderByTime(JSONObject info);

    JSONObject GetBookSalesById(JSONObject info);

    JSONObject FilterUserBookByTime(JSONObject info);

    void createOneOrder(Orders order, OrderItems orderItems);

    void createOrders(Orders order, List<OrderItems> oi);
}
