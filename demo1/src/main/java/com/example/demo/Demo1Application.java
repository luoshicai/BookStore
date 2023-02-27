package com.example.demo;

import com.example.demo.entity.Neo4j.Neo4jBook;
import com.example.demo.entity.Neo4j.Neo4jCategory;
import com.example.demo.repository.Neo4j.Neo4jBookRepository;
import com.example.demo.repository.Neo4j.Neo4jCategoryRepository;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableNeo4jRepositories
public class Demo1Application {

    @Bean
    public Connector connector(){
        Connector connector=new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(8092);
        connector.setSecure(false);
        connector.setRedirectPort(8453);
        return connector;
    }

    @Bean
    public TomcatServletWebServerFactory tomcatServletWebServerFactory(Connector connector){
        TomcatServletWebServerFactory tomcat=new TomcatServletWebServerFactory(){
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint securityConstraint=new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection=new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(connector);
        return tomcat;
    }

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

    @Bean
    CommandLineRunner BuildNeo4jGraph(Neo4jBookRepository neo4jBookRepository, Neo4jCategoryRepository neo4jCategoryRepository){
        return args -> {

            // 清空原有的图
            neo4jBookRepository.deleteAll();
            neo4jCategoryRepository.deleteAll();

            // 创建category
            Neo4jCategory Literary_Novel = new Neo4jCategory("文学小说");
            Neo4jCategory Award_Work = new Neo4jCategory("获奖作品");
            Neo4jCategory Social_Inspiration = new Neo4jCategory("社科励志");
            Neo4jCategory Infant_Enlightenment = new Neo4jCategory("幼儿启蒙");
            Neo4jCategory Teaching_Assistant = new Neo4jCategory("教辅工具");

            // 创建subclass
            Neo4jCategory Award_Literature = new Neo4jCategory("获奖文学");
            Neo4jCategory Childhood_Classics = new Neo4jCategory("童年经典");
            Neo4jCategory Required_Books = new Neo4jCategory("必看书目");

            // 创建Book
            Neo4jBook book1 = new Neo4jBook("哈利波特与魔法石");
            Neo4jBook book2 = new Neo4jBook("哈利·波特与死亡圣器");
            Neo4jBook book3 = new Neo4jBook("我不怕这漫长黑夜");
            Neo4jBook book4 = new Neo4jBook("追风筝的人");
            Neo4jBook book5 = new Neo4jBook("小王子");
            Neo4jBook book6 = new Neo4jBook("探索月球");
            Neo4jBook book7 = new Neo4jBook("高考英语 五年高考三年模拟");
            Neo4jBook book8 = new Neo4jBook("Java核心技术卷II");
            Neo4jBook book9 = new Neo4jBook("老人与海");
            Neo4jBook book10 = new Neo4jBook("三体：全三册");

            // 构建SubClass关系
            Literary_Novel.SubClassWith(Award_Literature);
            Award_Work.SubClassWith(Award_Literature);
            Social_Inspiration.SubClassWith(Childhood_Classics);
            Infant_Enlightenment.SubClassWith(Childhood_Classics);
            Award_Literature.SubClassWith(Required_Books);
            Childhood_Classics.SubClassWith(Required_Books);

            // 构建Contain关系
            Literary_Novel.ContainWith(book1);
            Award_Literature.ContainWith(book9);
            Award_Work.ContainWith(book10);
            Required_Books.ContainWith(book2);
            Social_Inspiration.ContainWith(book3);
            Social_Inspiration.ContainWith(book4);
            Childhood_Classics.ContainWith(book5);
            Infant_Enlightenment.ContainWith(book6);
            Teaching_Assistant.ContainWith(book7);
            Teaching_Assistant.ContainWith(book8);

            // 保存这些节点和关系
            List<Neo4jCategory> categoryList = Arrays.asList(Literary_Novel, Award_Work, Social_Inspiration, Infant_Enlightenment,
              Teaching_Assistant, Award_Literature, Childhood_Classics, Required_Books);

            List<Neo4jBook> bookList = Arrays.asList(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10);

            neo4jCategoryRepository.saveAll(categoryList);
            neo4jBookRepository.saveAll(bookList);
        };
    }
}
