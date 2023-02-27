package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

/**
 * @from fhadmin.cn
 * @version 1.0
 * @since 2022/5/5 7:59
 */
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //1,允许任何来源
        corsConfiguration.setAllowedOriginPatterns(Collections.singletonList("*"));
        //2,允许任何请求头
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        //3,允许任何方法
        //放行哪些请求方式
        corsConfiguration.addAllowedMethod("GET");     //get
        corsConfiguration.addAllowedMethod("PUT");     //put
        corsConfiguration.addAllowedMethod("POST");    //post
        corsConfiguration.addAllowedMethod("DELETE");  //delete
        //corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);     //放行全部请求
        //4,允许凭证
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
