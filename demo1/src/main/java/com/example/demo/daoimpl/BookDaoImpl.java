package com.example.demo.daoimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.BookDao;
import com.example.demo.entity.BookIcon;
import com.example.demo.entity.BookInfo;
import com.example.demo.entity.Books;
import com.example.demo.entity.Neo4j.Neo4jBook;
import com.example.demo.entity.Neo4j.Neo4jCategory;
import com.example.demo.repository.BookIconRepository;
import com.example.demo.repository.BooksRepository;
import com.example.demo.repository.Neo4j.Neo4jBookRepository;
import com.example.demo.repository.Neo4j.Neo4jCategoryRepository;
import com.example.demo.utils.RedisUtil;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private BookIconRepository bookIconRepository;

    @Autowired
    private Neo4jBookRepository neo4jBookRepository;

    @Autowired
    private Neo4jCategoryRepository neo4jCategoryRepository;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public void saveBook(Books newBook){
        booksRepository.save(newBook);
        System.out.println("add new book: " + newBook.getBook_id() + " to DB");
        redisUtil.set("book" + newBook.getBook_id(), JSONArray.toJSON(newBook));
        System.out.println("add new book: " + newBook.getBook_id() + " to Redis");
    }

    @Override
    public void changeBook(String book_name, String book_type, String author, BigDecimal price,
                           String description, Integer inventory,String imag,Integer bookId){
        //修改数据库中的数据
        System.out.println("change book: " + bookId + " in DB");
        booksRepository.changeBook(book_name,book_type,author,price,description,inventory,imag,bookId);
        //修改缓存中的数据
        System.out.println("change book: " + bookId + " in Redis");
        Books book = booksRepository.findOneById(bookId);
        redisUtil.set("book" + bookId, JSONArray.toJSON(book));
//        //修改索引
//        final String collection = "bookIndex";
//        final SolrClient client = getSolrClient();
//        BookInfo bookInfo = new BookInfo(book.getBook_id().toString(),
//                book.getName(),book.getAuthor(),book.getDescription());
//        try {
//            final UpdateResponse response = client.addBean(collection,bookInfo);
//            client.commit(collection);
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
    }

    @Override
    public void deleteById(Integer bookId){
        System.out.println("delete book: " + bookId + " in DB");
        booksRepository.deleteById(bookId);
        System.out.println("delete book: " + bookId + " in Redis");
        redisUtil.del("book" + bookId);
    }

    @Override
    public List<Books> findBookById(Integer bookId){
        List<Books> userList = new ArrayList<>();
        Books book = null;
        System.out.println("Searching Book: " + bookId + " in Redis");
        Object p = redisUtil.get("book" + bookId);
        // 如果Redis中没有，则从数据库中获取数据，并且放入缓存中。否则直接从缓存中拿数据
        if (p==null){
            System.out.println("Book: " + bookId + " is not in redis");
            System.out.println("Searching Book: " + bookId + " in DB");
            book = booksRepository.findOneById(bookId);
            // 存入Redis中
            redisUtil.set("book" + bookId, JSONArray.toJSON(book));
        }
        else{
            book = JSONArray.parseObject(p.toString(), Books.class);
            System.out.println("Book: " + bookId + " is in Redis");
        }
        // 从MongoDB中查找图片
        Optional<BookIcon> icon = bookIconRepository.findById(bookId);
        if (icon.isPresent()){
            System.out.println("MongoDB Not Null " + bookId);
            book.setIcon(icon.get());
        }
        else{
            book.setIcon(null);
            System.out.println("It's Null");
        }
        userList.add(book);
        return userList;
    }

    @Override
    public List<Books> findBooksByType(String BookType){
        return booksRepository.findBooksByType(BookType);
    }

    @Override
    public Books findOneById(Integer bookId){
        Books book = null;
        System.out.println("Searching Book: " + bookId + " in Redis");
        Object p = redisUtil.get("book" + bookId);
        // 如果Redis中没有，则直接从数据库中拿数据并放入缓存中。否则直接从缓存中拿数据
        if (p == null){
            System.out.println("Book: " + bookId + " is not in redis");
            System.out.println("Searching Book: " + bookId + " in DB");
            book = booksRepository.findOneById(bookId);
            redisUtil.set("book" + bookId, JSONArray.toJSON(book));
        }
        else{
            book = JSONArray.parseObject(p.toString(), Books.class);
            System.out.println("Book: " + bookId + " is in Redis");
        }
        return book;
    }

    @Override
    public void changeInventory(Integer bookId, Integer number){
        System.out.println("change book inventory: " + bookId + " in DB");
        booksRepository.changeInventory(number, bookId);
        System.out.println("change book inventory: " + bookId + " in Redis");
        Object p = redisUtil.get("book" + bookId);
        // 如果Redis中没有，则从数据库中读取修改过的数据放入缓存中，否则直接修改Redis中的数据
        if (p == null){
            Books book = booksRepository.findOneById(bookId);
            redisUtil.set("book" + bookId, JSONArray.toJSON(book));
        }
        else{
            Books book = JSONArray.parseObject(p.toString(), Books.class);
            book.setInventory(number);
            redisUtil.set("book" + bookId, JSONArray.toJSON(book));
        }
    }

    @Override
    public Integer getInventoryById(Integer bookId){
        return booksRepository.getInventoryById(bookId);
    }

    @Override
    public List<Books> getAllBook(){
        return booksRepository.findAll();
    }

    @Override
    public Books findBookByName(String bookName){
        return booksRepository.findBooksByName(bookName);
    }

    @Override
    public List<Books> findBookByTag(String category){
        Neo4jCategory neo4jCategory = neo4jCategoryRepository.findByCategory(category);
        List<String> BookName_List = new ArrayList<>();
        List<Books> BookList = new ArrayList<>();

        // 保存一跳能到达的book
        if (neo4jCategory.getContainSets().size() > 0){
            neo4jCategory.getContainSets().forEach(Neo4jBook -> BookName_List.add(Neo4jBook.getBookName()));
        }
        // 保存两跳能到达的book
        neo4jCategory.getSubclasses().forEach(
                subCategory -> {
                    if (subCategory.getContainSets().size() > 0){
                        subCategory.getContainSets().forEach(Neo4jBook -> BookName_List.add(Neo4jBook.getBookName()));
                    }
                }
        );

        // 通过BookName去找对应的Book
        BookName_List.forEach(
                bookName -> {
                    Books book = booksRepository.findBooksByName(bookName);
                    BookList.add(book);
                }
        );

        // 返回
        return BookList;
    }
//    public static SolrClient getSolrClient() {
//        final String solrUrl = "http://localhost:8983/solr";
//        return new HttpSolrClient.Builder(solrUrl)
//                .withConnectionTimeout(10000)
//                .withSocketTimeout(60000)
//                .build();
//    }
}
