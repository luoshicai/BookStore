package com.example.demo.entity.Neo4j;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.HashSet;
import java.util.Set;

@Node
public class Neo4jCategory {

    @Id
    @GeneratedValue
    private Long id;

    private String category;

    public Neo4jCategory(String category){
        this.category = category;
    }

    /**
     * Neo4j doesn't REALLY have bi-directional relationships. It just means when querying
     * to ignore the direction of the relationship.
     * https://dzone.com/articles/modelling-data-neo4j
     */
    @Relationship(type = "SUBCLASS")
    public Set<Neo4jCategory> Subclasses;

    public void SubClassWith(Neo4jCategory neo4jCategory){
        if (Subclasses == null) {
            Subclasses = new HashSet<>();
        }
        Subclasses.add(neo4jCategory);
    }

    @Relationship(type = "CONTAIN")
    public Set<Neo4jBook> ContainSets;

    public void ContainWith(Neo4jBook neo4jBook){
        if (ContainSets == null) {
            ContainSets = new HashSet<>();
        }
        ContainSets.add(neo4jBook);
    }

    public Set<Neo4jCategory> getSubclasses(){
        return Subclasses;
    }

    public Set<Neo4jBook> getContainSets(){
        return ContainSets;
    }
}
