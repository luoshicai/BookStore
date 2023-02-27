package com.example.demo.entity;
import lombok.Data;
import org.apache.solr.client.solrj.beans.Field;

public class BookInfo {
    @Field("id")
    public String book_id;

    @Field("bookName")
    public String name;

    @Field("author")
    public String author;

    @Field("info")
    public String description;

    public BookInfo(String id, String bookName, String author, String info) {
        this.book_id = id;
        this.name = bookName;
        this.author = author;
        this.description = info;
    }

    public BookInfo() {
    }

    public String getId(){
        return this.book_id;
    }

    public String getBookName(){
        return this.name;
    }

    public String getAuthor(){
        return this.author;
    }

    public String getInfo(){
        return this.description;
    }
}
