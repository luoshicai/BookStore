package com.example.demo.repository;

import com.example.demo.entity.Charts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ChartsRepository extends JpaRepository<Charts,Integer> {

    @Query(value = "select book_id from charts where user_id = :userId",nativeQuery = true)
    List<Integer> findByUserId(@Param("userId")Integer userId);

    @Query(value = "select * from charts where user_id = :userId",nativeQuery = true)
    List<Charts> getCharts(@Param("userId") Integer userId);

    @Query(value = "select book_id from charts where chart_id = :chart_id",nativeQuery = true)
    Integer findByChartId(@Param("chart_id")Integer chart_id);

    @Query(value = "select * from charts where chart_id = :chart_id",nativeQuery = true)
    Charts findByCartId(@Param("chart_id")Integer chart_id);

    @Query(value = "select * from charts where user_id =:userId and book_id =:bookId",nativeQuery = true)
    Charts InUserCarts(@Param("userId")Integer userId, @Param("bookId")Integer bookId);

    @Transactional
    @Modifying
    @Query(value = "update charts set number =:number where chart_id = :CartId",nativeQuery = true)
    void updateCartNumber(@Param("number")Integer number,@Param("CartId")Integer CartId);
}
