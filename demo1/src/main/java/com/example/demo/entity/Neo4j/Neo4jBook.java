package com.example.demo.entity.Neo4j;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.awt.print.Book;

@Node
public class Neo4jBook {
    @Id
    @GeneratedValue
    private Long id;

    private String BookName;

    public Neo4jBook(String BookName){
        this.BookName = BookName;
    }

    public String getBookName(){
        return BookName;
    }
}
