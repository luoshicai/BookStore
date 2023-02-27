package com.example.demo.repository.Neo4j;

import com.example.demo.entity.Neo4j.Neo4jBook;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface Neo4jBookRepository extends Neo4jRepository<Neo4jBook, Long> {

}
