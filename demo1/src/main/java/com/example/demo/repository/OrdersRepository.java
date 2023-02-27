package com.example.demo.repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders,Integer> {

    @Query(value = "select * from orders where order_user = :order_user",nativeQuery = true)
    List<Orders> GetOrders(@Param("order_user")Integer order_user);

    @Query(value = "SELECT users.user_id as user_id, users.username as user_name, SUM(orders.order_price) as consumption\n" +
            "FROM orders NATURAL JOIN users\n" +
            "WHERE users.user_id = orders.order_user\n" +
            "GROUP BY orders.order_user", nativeQuery = true)
    List<JSONObject> GetUserConsumption();

    @Query(value = "SELECT users.user_id as user_id, users.username as user_name, SUM(orders.order_price) as consumption\n" +
            "FROM orders NATURAL JOIN users\n" +
            "WHERE users.user_id = orders.order_user AND orders.order_date >=:date1 AND orders.order_date <=:date2\n" +
            "GROUP BY orders.order_user", nativeQuery = true)
    List<JSONObject> FilterTime(@Param("date1")Date date1, @Param("date2")Date date2);

    @Query(value = "SELECT * FROM `orders` WHERE order_date >= :date1 AND order_date <= :date2",nativeQuery = true)
    List<JSONObject> FilterAllOrderByTime(@Param("date1")Date date1,@Param("date2") Date date2);

    @Query(value = "SELECT * FROM `orders` WHERE order_date >= :date1 AND order_date <= :date2 AND order_user = :userId",nativeQuery = true)
    List<JSONObject> FilterUserOrderByTime(@Param("date1")Date date1, @Param("date2")Date date2, @Param("userId")Integer userId);
}
