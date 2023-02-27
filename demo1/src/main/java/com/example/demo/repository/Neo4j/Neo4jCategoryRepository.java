package com.example.demo.repository.Neo4j;

import com.example.demo.entity.Neo4j.Neo4jBook;
import com.example.demo.entity.Neo4j.Neo4jCategory;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface Neo4jCategoryRepository extends Neo4jRepository<Neo4jCategory, Long> {
   Neo4jCategory findByCategory(String category);
}
