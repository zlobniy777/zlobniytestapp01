package com.zlobniy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
public class UIController {


    @Autowired
    public UIController( ){

    }

    @RequestMapping( value = "/survey/{id}", method = RequestMethod.GET )
    public void toSurvey( @PathVariable("id") Long id,  HttpServletRequest request, HttpServletResponse response ) {
        try{
            response.sendRedirect( "/#survey/"+id );
        } catch( IOException e ){
            e.printStackTrace();
        }
    }

    @RequestMapping( value = "/survey", method = RequestMethod.GET )
    public void survey( HttpServletRequest request, HttpServletResponse response ) {

        //SecurityContextHolder.getContext().getAuthentication().getDetails()
        //((WebAuthenticationDetails)SecurityContextHolder.getContext().getAuthentication().getDetails()).getSessionId()

        try{
            response.sendRedirect( "/#survey" );
        } catch( IOException e ){
            e.printStackTrace();
        }

    }

    @RequestMapping( value = "/dashboard", method = RequestMethod.GET )
    public void dashboard( HttpServletRequest request, HttpServletResponse response ) {

        try{
            response.sendRedirect( "/#dashboard" );
        } catch( IOException e ){
            e.printStackTrace();
        }

    }

    @RequestMapping( value = "/survey-viewer/{checksum}", method = RequestMethod.GET )
    public void surveyViewer( @PathVariable("checksum") String checksum, HttpServletRequest request, HttpServletResponse response ) {
        System.out.println("survey-viewer");

        try{
            response.sendRedirect( "/#survey-viewer/" + checksum );
        } catch( IOException e ){
            e.printStackTrace();
        }

    }

}
