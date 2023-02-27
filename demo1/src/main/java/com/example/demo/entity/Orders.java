package com.example.demo.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer order_id;

    @Column(name = "order_user")
    private Integer order_user;

    @Column(name = "order_price")
    private BigDecimal order_price;

    @Column(name = "order_state")
    private String order_state;

    @Column(name = "order_date")
    private Date order_date;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    public List<OrderItems> orderItemsList;
}
