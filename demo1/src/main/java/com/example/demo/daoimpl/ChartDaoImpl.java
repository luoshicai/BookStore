package com.example.demo.daoimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.ChartDao;
import com.example.demo.entity.Books;
import com.example.demo.entity.Charts;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.ChartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ChartDaoImpl implements ChartDao {

    @Autowired
    private ChartsRepository chartsRepository;

    //封装
    @Override
    public List<Charts> getCharts(Integer userId){
        return chartsRepository.getCharts(userId);
    }

    @Override
    public void addToCharts(Charts newChart){
        chartsRepository.save(newChart);
    }

    @Override
    public void deleteById(Integer chartId){
        chartsRepository.deleteById(chartId);
    }

    @Override
    public Charts findByCartId(Integer cartId){
        return chartsRepository.findByCartId(cartId);
    }

    @Override
    public Charts InUserCart(Integer userId, Integer bookId){
        return chartsRepository.InUserCarts(userId,bookId);
    }

    @Override
    public void updateCartNumber(Integer number,Integer cartId){
        chartsRepository.updateCartNumber(number,cartId);
    }
}
