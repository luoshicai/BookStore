package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Charts;
import org.springframework.web.bind.annotation.RequestBody;


import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface ChartDao {

    //封装
    List<Charts> getCharts(Integer userId);

    void addToCharts(Charts newChart);

    void deleteById(Integer chartId);

    Charts findByCartId(Integer cartId);

    Charts InUserCart(Integer userId, Integer bookId);

    void updateCartNumber(Integer number,Integer cartId);
}
