package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.BookInfo;
import com.example.demo.entity.Books;
import com.example.demo.service.SolrService;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.params.SolrParams;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.management.Query;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
public class SolrController {

//@RestController
//public class SolrController implements InitializingBean {
//
//    @Autowired
//    SolrService solrService;
//
//    /**
//     * 系统初始化的时候建立书籍的索引
//     */
//    @Override
//    public void afterPropertiesSet() throws Exception {
//        final String collection = "bookIndex";
//        final SolrClient client = getSolrClient();
//        final List<BookInfo> bookInfoList = solrService.getAllBookInfo();
//        //建立索引
//        for (int i=0; i<bookInfoList.size(); ++i){
//            final BookInfo bookInfo = bookInfoList.get(i);
//            final UpdateResponse response = client.addBean(collection,bookInfo);
//        }
//        client.commit(collection);
//    }
//
//    @RequestMapping("/Solr")
//    public List<BookInfo> IndexSearch(@RequestBody JSONObject info) throws IOException, SolrServerException {
//        final String collection = "bookIndex";
//        final SolrClient client = getSolrClient();
//        final String index = info.getString("index");
//        final SolrQuery query = new SolrQuery("info:*"+index+"*");
//        query.addField("id");
//        query.addField("bookName");
//        query.addField("author");
//        query.addField("info");
//        query.setSort("id", SolrQuery.ORDER.asc);
//
//        final QueryResponse responseOne = client.query(collection,query);
//        final List<BookInfo> bookInfoList = responseOne.getBeans(BookInfo.class);
//        return bookInfoList;
//    }
//
//    public static SolrClient getSolrClient() {
//        final String solrUrl = "http://localhost:8983/solr";
//        return new HttpSolrClient.Builder(solrUrl)
//                .withConnectionTimeout(10000)
//                .withSocketTimeout(60000)
//                .build();
//    }
//
//}
}
