package com.example.demo.serviceimpl;

import com.example.demo.dao.BookDao;
import com.example.demo.entity.BookInfo;
import com.example.demo.entity.Books;
import com.example.demo.service.SolrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SolrServiceImpl implements SolrService {

    @Autowired
    BookDao bookDao;

//    @Override
//    public List<BookInfo> getAllBookInfo(){
//        List<Books> BookList = bookDao.getAllBook();
//        List<BookInfo> BookInfoList = new ArrayList<>();
//        for (int i=0; i<BookList.size(); ++i){
//            Books book = BookList.get(i);
//            BookInfo bookInfo = new BookInfo(book.getBook_id().toString(),
//                    book.getName(),book.getAuthor(),book.getDescription());
//            BookInfoList.add(bookInfo);
//        }
//        return BookInfoList;
//    }
}
