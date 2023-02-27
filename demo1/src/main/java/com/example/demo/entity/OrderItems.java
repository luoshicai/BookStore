package com.example.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "order_item")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer orderItem_id;

    @Column(name = "order_id")
    private Integer order_id;

    @Column(name = "book_id")
    private Integer book_id;

    @Column(name = "number")
    private Integer number;
}
