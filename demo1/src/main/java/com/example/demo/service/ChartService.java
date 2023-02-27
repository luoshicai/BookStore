package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ChartService {

    List<JSONObject> GetCharts(JSONObject id);

    JSONObject AddToCharts(JSONObject info);

    JSONObject DeleteOneChart(JSONObject info);
}
