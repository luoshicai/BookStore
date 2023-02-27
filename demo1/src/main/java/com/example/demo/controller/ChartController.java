package com.example.demo.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Books;
import com.example.demo.entity.Charts;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.ChartsRepository;
import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChartController {

    @Autowired
    ChartService chartService;

    @RequestMapping("/GetCharts")
    public List<JSONObject> GetCharts(@RequestBody JSONObject id){
        return chartService.GetCharts(id);
    }

    @RequestMapping("/AddToCharts")
    public JSONObject AddToCharts(@RequestBody JSONObject info){
        return chartService.AddToCharts(info);
    }

    @RequestMapping("/DeleteOneChart")
    public JSONObject DeleteOneChart(@RequestBody JSONObject info){
        return chartService.DeleteOneChart(info);
    }

}
