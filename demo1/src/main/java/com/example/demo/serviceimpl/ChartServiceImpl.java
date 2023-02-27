package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.BookDao;
import com.example.demo.dao.ChartDao;
import com.example.demo.entity.Books;
import com.example.demo.entity.Charts;
import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChartServiceImpl implements ChartService {

    @Autowired
    ChartDao chartDao;

    @Autowired
    BookDao bookDao;

    @Override
    public List<JSONObject> GetCharts(@RequestBody JSONObject id){
        Integer userId = id.getInteger("userId");
        List<Charts> UserChart = chartDao.getCharts(userId);
        List<JSONObject> resultList = new ArrayList<JSONObject>();
        for (int i=0;i<UserChart.size();++i){
            Books book = bookDao.findOneById(UserChart.get(i).getBookId());
            Integer ChartId = UserChart.get(i).getChart_id();
            Integer number = UserChart.get(i).getNumber();
            JSONObject newObject = new JSONObject();
            newObject.put("bookName",book.getName());
            newObject.put("author",book.getAuthor());
            newObject.put("unitPrice",book.getPrice());
            newObject.put("imag",book.getImag());
            newObject.put("bookId",book.getBook_id());
            newObject.put("chartId",ChartId);
            newObject.put("number",number);
            resultList.add(newObject);
        }
        return resultList;
    }

    @Override
    public JSONObject AddToCharts(JSONObject info){
        Integer userId = info.getInteger("userId");
        Integer bookId = info.getInteger("bookId");
        Integer number = info.getInteger("number");

        //验证书的库存
        Integer inventory = bookDao.getInventoryById(bookId);
        if (inventory<number){
            JSONObject result = new JSONObject();
            result.put("status","加入购物车失败，书的库存不足!");
            return result;
        }
        else{
            Charts existCart = chartDao.InUserCart(userId,bookId);
            if (existCart==null){
                Charts chart = new Charts();
                chart.setUserId(userId);
                chart.setBookId(bookId);
                chart.setNumber(number);
                chartDao.addToCharts(chart);
                JSONObject result = new JSONObject();
                result.put("status","加入购物车成功!");
                return result;
            }
            else{
                Integer NewNumber = existCart.getNumber()+number;
                chartDao.updateCartNumber(NewNumber,existCart.getChart_id());
                JSONObject result = new JSONObject();
                result.put("status","加入购物车成功!");
                return result;
            }
        }
    }

    @Override
    public JSONObject DeleteOneChart(JSONObject info){
        String StrChartId = info.getString("chartId");
        Integer chartId = Integer.parseInt(StrChartId);
        chartDao.deleteById(chartId);
        JSONObject result = new JSONObject();
        result.put("status","删除成功");
        return result;
    }
}
