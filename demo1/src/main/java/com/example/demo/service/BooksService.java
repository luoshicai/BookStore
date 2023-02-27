package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Books;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface BooksService {

    List<Books> findByBookType();

    Books findByBookId(JSONObject id);

    JSONObject deleteByBookId(JSONObject id);

    JSONObject addBook(JSONObject info);

    JSONObject changeBook(JSONObject info);

    JSONObject findBookByTag(JSONObject info);
}
