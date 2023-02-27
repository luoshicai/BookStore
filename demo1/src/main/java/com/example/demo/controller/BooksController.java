package com.example.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Books;
import com.example.demo.repository.BooksRepository;
import com.example.demo.service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BooksController {

     @Autowired
     BooksService booksService;

    @RequestMapping("/")
    public List<Books> findByBookType() {
        return booksService.findByBookType();
    }


    @RequestMapping("/BookDetails")
    public Books findByBookId(@RequestBody JSONObject id) {
        return booksService.findByBookId(id);
    }

    @RequestMapping("/DeleteById")
    public JSON deleteByBookId(@RequestBody JSONObject id){ return booksService.deleteByBookId(id);}

    @RequestMapping("/addBook")
    public JSON addBook(@RequestBody JSONObject info){ return booksService.addBook(info);}

    @RequestMapping("/changeBook")
    public JSON changeBook(@RequestBody JSONObject info){return booksService.changeBook(info);}

    @RequestMapping("/findBookByTag")
    public JSON findBookByTag(@RequestBody JSONObject info){
        return booksService.findBookByTag(info);
    }
}
