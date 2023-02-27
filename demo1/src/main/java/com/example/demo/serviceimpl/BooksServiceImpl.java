package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.BookDao;
import com.example.demo.entity.Books;
import com.example.demo.service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class BooksServiceImpl implements BooksService {
    @Autowired
    BookDao bookDao;

    @Override
    public List<Books> findByBookType(){
        String bookType[];
        bookType = new String[5];
        bookType[0] = "文学小说";
        bookType[1] = "社科励志";
        bookType[2] = "幼儿启蒙";
        bookType[3] = "教辅工具";
        bookType[4] = "获奖作品";
        List<Books> AllBookList = new ArrayList<Books>();
        for (int i = 0; i < 5; ++i) {
            List<Books> BookList = bookDao.findBooksByType(bookType[i]);
            for (int j = 0; j < BookList.size() && j < 10; ++j) {
                AllBookList.add(BookList.get(j));
            }
        }
        return AllBookList;
    }

    @Override
    public Books findByBookId(JSONObject id){
        Integer bookId = id.getInteger("id");
        List<Books> userList = bookDao.findBookById(bookId);
        Books book = new Books();
        for (int i=0;i<userList.size();++i){
            book = userList.get(i);
        }
        return book;
    }

    @Override
    public JSONObject deleteByBookId(JSONObject id){
        String StrId = id.getString("id");
        Integer bookId = Integer.parseInt(StrId);
        bookDao.deleteById(bookId);
        JSONObject result = new JSONObject();
        result.put("status","删除成功");
        return result;
    }

    @Override
    public JSONObject addBook(JSONObject info){
        //数据提取
        String book_name = info.getString("name");
        String book_type = info.getString("category");
        String author = info.getString("author");
        String StrPrice = info.getString("price");
        String description = info.getString("description");
        String StrInventory = info.getString("inventory");
        String imag = info.getString("imag");
        Integer inventory = Integer.parseInt(StrInventory);
        BigDecimal price = new BigDecimal(StrPrice);

        //创建新对象
        Books newBook = new Books();
        newBook.setName(book_name);
        newBook.setCategory(book_type);
        newBook.setAuthor(author);
        newBook.setDescription(description);
        newBook.setPrice(price);
        newBook.setInventory(inventory);

        //插入数据库
        bookDao.saveBook(newBook);

        //返回结果
        JSONObject result = new JSONObject();
        result.put("status","添加成功");
        return result;
    }

    @Override
    public JSONObject changeBook(JSONObject info){
        //数据提取
        String book_name = info.getString("name");
        String book_type = info.getString("category");
        String author = info.getString("author");
        String StrPrice = info.getString("price");
        String description = info.getString("description");
        String StrInventory = info.getString("inventory");
        String imag = info.getString("imag");
        String StrbookId = info.getString("book_id");
        Integer bookId = Integer.parseInt(StrbookId);
        Integer inventory = Integer.parseInt(StrInventory);
        BigDecimal price = new BigDecimal(StrPrice);


        //覆盖原对象
        bookDao.changeBook(book_name,book_type,author,price,description,inventory,imag,bookId);

        //返回结果
        JSONObject result = new JSONObject();
        result.put("status","修改成功");
        return result;
    }

    @Override
    public JSONObject findBookByTag(JSONObject info){
        String category = info.getString("category");
        List<Books> booksList = bookDao.findBookByTag(category);
        JSONObject result = new JSONObject();
        result.put("data", booksList);
        return result;
    }

}
