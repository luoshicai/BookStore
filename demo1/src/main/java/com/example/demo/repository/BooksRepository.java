package com.example.demo.repository;

import com.example.demo.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.awt.print.Book;
import java.math.BigDecimal;
import java.util.List;

@Transactional
public interface BooksRepository extends JpaRepository<Books,Integer> {

    @Query(value = "select * from books where book_name = :bookName " +
            " and book_type= :bookType", nativeQuery = true)
    List<Books> findBooksByNameAndType(
            @Param("bookName")String bookName, @Param("bookType")String bookType);

    @Query(value = "select * from books where book_type = :bookType",nativeQuery = true)
    List<Books> findBooksByType(@Param("bookType")String bookType);

    @Query(value = "select * from books where book_name = :bookName",nativeQuery = true)
    Books findBooksByName(@Param("bookName")String bookName);

    @Query(value = "select * from books where book_id = :bookId",nativeQuery = true)
    List<Books> findBookById(@Param("bookId")Integer bookId);

    @Query(value = "select * from books where book_id = :bookId",nativeQuery = true)
    Books findOneById(@Param("bookId")Integer bookId);

    @Modifying
    @Query(value = "update books set book_name = :name,book_type =:category, author =:author, price =:price, description =:description, inventory =:inventory, imag =:imag where book_id =:bookId",nativeQuery = true)
    void changeBook(@Param("name")String name, @Param("category")String category, @Param("author")String author,
                           @Param("price")BigDecimal price, @Param("description")String description, @Param("inventory")Integer inventory,
                           @Param("imag")String imag, @Param("bookId")Integer bookId);

    @Modifying
    @Query(value = "update books set inventory =:number where book_id = :bookId",nativeQuery = true)
    void changeInventory(@Param("number")Integer number, @Param("bookId")Integer bookId);

    @Query(value = "select inventory from books where book_id =:bookId",nativeQuery = true)
    Integer getInventoryById(@Param("bookId")Integer bookId);
}
