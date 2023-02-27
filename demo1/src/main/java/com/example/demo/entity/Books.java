package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.print.Book;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "books")
//@Entity
//@Table(name = "books", schema = "bookstore3_database")
//@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "book_id")
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer book_id;

    @Column(name = "book_name")
    private String name;

    @Column(name = "book_type")
    private String category;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "description")
    private String description;

    @Column(name = "inventory")
    private Integer inventory;

    @Column(name = "imag")
    private String imag;

    @Transient
    private BookIcon icon;

    public BookIcon getBookIcon() { return icon; }

    public void setIcon(BookIcon icon) {this.icon = icon; }

//    private Integer book_id;
//    private String name;
//    private String category;
//    private String author;
//    private BigDecimal price;
//    private String description;
//    private Integer inventory;
//    private String imag;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "id")
//    public Integer getBook_id(){
//        return book_id;
//    }
//
//    public void setBook_id(int book_id){
//        this.book_id = book_id;
//    }
//
//    @Basic
//    @Column(name = "name")
//    public String getName(){
//        return name;
//    }
//
//    public void setName(String name){
//        this.name = name;
//    }
//
//    @Basic
//    @Column(name = "category")
//    public String getCategory(){
//        return category;
//    }
//
//    public void setCategory(String category){
//        this.category = category;
//    }
//
//    @Basic
//    @Column(name = "author")
//    public String getAuthor(){
//        return author;
//    }
//
//    public void setAuthor(String author){
//        this.author = author;
//    }
//
//    @Basic
//    @Column(name = "price")
//    public BigDecimal getPrice(){
//        return price;
//    }
//
//    public void setPrice(BigDecimal price){
//        this.price = price;
//    }
//
//    @Basic
//    @Column(name = "description")
//    public String getDescription(){
//        return description;
//    }
//
//    public void setDescription(String description){
//        this.description = description;
//    }
//
//    @Basic
//    @Column(name = "inventory")
//    public Integer getInventory(){
//        return inventory;
//    }
//
//    public void setInventory(Integer inventory){
//        this.inventory = inventory;
//    }
//
//    @Basic
//    @Column(name = "imag")
//    public String getImag(){
//        return imag;
//    }
//
//    public void setImag(String imag){
//        this.imag = imag;
//    }
//    private BookIcon icon;
//    @Transient
//    public BookIcon getBookIcon() { return icon; }
//
//    public void setIcon(BookIcon icon) {this.icon = icon; }
}
