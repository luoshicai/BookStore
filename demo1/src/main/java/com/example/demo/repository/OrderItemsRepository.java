package com.example.demo.repository;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems,Integer> {

    @Query(value= "select * from order_item where order_id =:orderId", nativeQuery = true)
    List<OrderItems> GetOrderItems(@Param("orderId")Integer orderId);

    @Query(value = "SELECT book_id,book_name,SUM(number) as number\n" +
            "FROM order_item natural join books\n" +
            "WHERE order_item.book_id = books.book_id\n" +
            "GROUP BY book_id",nativeQuery = true)
    List<JSONObject> GetBookSales();

    @Query(value ="SELECT book_id,book_name,SUM(number) as number\n" +
            "FROM order_item natural join books natural join orders\n" +
            "WHERE order_item.book_id = books.book_id and orders.order_date>=:date1 and orders.order_date<=:date2\n" +
            "GROUP BY book_id", nativeQuery = true)
    List<JSONObject> FilterBookByTime(@Param("date1")Date date1, @Param("date2")Date date2);

    @Query(value = "SELECT book_id,book_name,books.price,SUM(number) as number\n" +
            "FROM order_item NATURAL JOIN books NATURAL JOIN orders\n" +
            "WHERE order_item.book_id = books.book_id AND orders.order_user = :userId\n" +
            "GROUP BY book_id",nativeQuery = true)
    List<JSONObject> GetBookSalesById(@Param("userId")Integer userId);

    @Query(value = "SELECT book_id,book_name,books.price,SUM(number) as number\n" +
            "FROM order_item NATURAL JOIN books NATURAL JOIN orders\n" +
            "WHERE order_item.book_id = books.book_id AND orders.order_user = :userId AND orders.order_date>=:date1 AND orders.order_date<=:date2\n" +
            "GROUP BY book_id",nativeQuery = true)
    List<JSONObject> FilterUserBookByTime(@Param("userId")Integer userId,@Param("date1")Date date1,@Param("date2")Date date2);
}
