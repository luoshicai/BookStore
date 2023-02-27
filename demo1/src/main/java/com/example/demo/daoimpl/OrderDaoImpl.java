package com.example.demo.daoimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.OrderDao;
import com.example.demo.entity.Books;
import com.example.demo.entity.Charts;
import com.example.demo.entity.OrderItems;
import com.example.demo.entity.Orders;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.ChartsRepository;
import com.example.demo.repository.OrderItemsRepository;
import com.example.demo.repository.OrdersRepository;
import com.fasterxml.jackson.databind.jsonschema.JsonSchema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;


@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private ChartsRepository chartsRepository;

    @Autowired
    private BooksRepository booksRepository;

    @Override
    public List<Orders> GetAllOrders(){
        List<Orders> ordersList = ordersRepository.findAll();
        return ordersList;
    }

    @Override
    public List<JSONObject> GetOrderDetails(JSONObject info){
        String StrOrderId = info.getString("orderId");
        Integer orderId = Integer.parseInt(StrOrderId);

        List<OrderItems> orders = orderItemsRepository.GetOrderItems(orderId);

        OrderItems tmp;
        List<JSONObject> result = new ArrayList<JSONObject>();
        for (Integer i=0; i<orders.size(); ++i){
            tmp = orders.get(i);
            Books book = booksRepository.findOneById(tmp.getBook_id());
            JSONObject newObject = new JSONObject();
            newObject.put("bookName",book.getName());
            newObject.put("bookImg",book.getImag());
            newObject.put("bookAuthor",book.getAuthor());
            newObject.put("bookPrice",book.getPrice());
            newObject.put("bookNum",tmp.getNumber());
            result.add(newObject);
        }
        return result;
    }

    @Override
    public List<JSONObject> GetBookSales(){
        List<JSONObject> objectList = orderItemsRepository.GetBookSales();
        return objectList;
    }

    @Override
    public List<JSONObject> GetUserConsumption(){
        List<JSONObject> objectList = ordersRepository.GetUserConsumption();
        return objectList;
    }

    //封装
    @Override
    public List<Orders> getOrders(Integer userId){
        return ordersRepository.GetOrders(userId);
    }

    @Override
    @Transactional
    public void saveOrder(Orders newOrder){
        ordersRepository.save(newOrder);
    }

    @Override
    @Transactional
    public void saveOrderItem(OrderItems newItem){
        orderItemsRepository.save(newItem);
    }

    @Override
    @Transactional
    public void saveItemList(List<OrderItems> oi){
        orderItemsRepository.saveAll(oi);
    }

    @Override
    public List<JSONObject> filterTime(Date Date1, Date Date2){
        return ordersRepository.FilterTime(Date1, Date2);
    }

    @Override
    public List<JSONObject> filterBookByTime(Date Date1, Date Date2){
        return orderItemsRepository.FilterBookByTime(Date1,Date2);
    }

    @Override
    public List<JSONObject> FilterAllOrderByTime(Date Date1, Date Date2){
        return ordersRepository.FilterAllOrderByTime(Date1, Date2);
    }

    @Override
    public List<JSONObject> FilterUserOrderByTime(Date Date1, Date Date2, Integer userId){
        return ordersRepository.FilterUserOrderByTime(Date1,Date2,userId);
    }

    @Override
    public List<JSONObject> GetBookSalesById(Integer userId){
        return orderItemsRepository.GetBookSalesById(userId);
    }

    @Override
    public List<JSONObject> FilterUserBookByTime(Date Date1, Date Date2, Integer userId){
        return orderItemsRepository.FilterUserBookByTime(userId,Date1,Date2);
    }
}
