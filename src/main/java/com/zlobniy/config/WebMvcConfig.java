package com.zlobniy.config;

import com.zlobniy.interceptor.MainInterceptor;
import com.zlobniy.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    private ClientService clientService;

    @Autowired
    public WebMvcConfig( ClientService clientService ){
        this.clientService = clientService;
    }
    //
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // LogInterceptor apply to all URLs.
        registry.addInterceptor(new MainInterceptor( this.clientService ));

        // examples!!!
        // Old Login url, no longer use.
        // Use OldURLInterceptor to redirect to a new URL.
//        registry.addInterceptor(new OldLoginInterceptor())//
//                .addPathPatterns("/admin/oldLogin");
//
//        // This interceptor apply to URL like /admin/*
//        // Exclude /admin/oldLogin
//        registry.addInterceptor(new AdminInterceptor())//
//                .addPathPatterns("/admin/*")//
//                .excludePathPatterns("/admin/oldLogin");
    }

}
