package com.example.demo.dao;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Books;

import java.math.BigDecimal;
import java.util.List;

public interface BookDao {

    void saveBook(Books newBook);

    void changeBook(String book_name, String book_type, String author, BigDecimal price,
                    String description, Integer inventory,String imag,Integer bookId);

    void deleteById(Integer bookId);

    List<Books> findBookById(Integer bookId);

    List<Books> findBooksByType(String BookType);

    Books findOneById(Integer bookId);

    void changeInventory(Integer bookId, Integer number);

    Integer getInventoryById(Integer bookId);

    List<Books> getAllBook();

    List<Books> findBookByTag(String category);

    Books findBookByName(String bookName);
}
