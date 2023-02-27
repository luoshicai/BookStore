package com.example.demo.dao;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.OrderItems;
import com.example.demo.entity.Orders;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

public interface OrderDao {

    List<Orders> GetAllOrders();

    List<JSONObject> GetOrderDetails(JSONObject info);

    List<JSONObject> GetBookSales();

    List<JSONObject> GetUserConsumption();

    //封装
    List<Orders> getOrders(Integer userId);

    void saveOrder(Orders newOrder);

    void saveOrderItem(OrderItems newItem);

    List<JSONObject> filterTime(Date Date1, Date Date2);

    List<JSONObject> filterBookByTime(Date Date1, Date Date2);

    List<JSONObject> FilterAllOrderByTime(Date Date1, Date Date2);

    List<JSONObject> FilterUserOrderByTime(Date Date1, Date Date2, Integer userId);

    List<JSONObject> GetBookSalesById(Integer userId);

    List<JSONObject> FilterUserBookByTime(Date Date1, Date Date2, Integer userId);

    void saveItemList(List<OrderItems> oi);
}
