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

    @RequestMapping( value = "/#dashboard", method = RequestMethod.GET )
    public void dashboardCage( HttpServletRequest request, HttpServletResponse response ) {

        //SecurityContextHolder.getContext().getAuthentication().getDetails()
        //((WebAuthenticationDetails)SecurityContextHolder.getContext().getAuthentication().getDetails()).getSessionId()

        System.out.println("#dashboard");
//        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
//            try{
//                response.sendRedirect( "/" );
//                return;
//            } catch( IOException e ){
//                e.printStackTrace();
//            }
//        }
//

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

        System.out.println("survey");
//        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
//            try{
//                response.sendRedirect( "/" );
//                return;
//            } catch( IOException e ){
//                e.printStackTrace();
//            }
//        }
//
        try{
            response.sendRedirect( "/#survey" );
        } catch( IOException e ){
            e.printStackTrace();
        }

    }

    @RequestMapping( value = "/dashboard", method = RequestMethod.GET )
    public void dashboard( HttpServletRequest request, HttpServletResponse response ) {

        //SecurityContextHolder.getContext().getAuthentication().getDetails()
        //((WebAuthenticationDetails)SecurityContextHolder.getContext().getAuthentication().getDetails()).getSessionId()

        System.out.println("dashboard");
//        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
//            try{
//                response.sendRedirect( "/" );
//                return;
//            } catch( IOException e ){
//                e.printStackTrace();
//            }
//        }
//
        String longStrTest = "123123123123123123 5 123123123123  2423424242 23424234242423 4234242342342342 234234234";

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

//    @RequestMapping( value = "/api/dashboard", method = RequestMethod.POST )
//    public Dashboard dashboard( @RequestBody Client client, HttpServletRequest request, HttpServletResponse response ) {
//        System.out.println("dashboard");
////        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
////            try{
////                response.sendRedirect( "/" );
////                return null;
////            } catch( IOException e ){
////                e.printStackTrace();
////            }
////        }
//        Dashboard dashboard = new Dashboard();
//        dashboard.setTitle( "TTEEESSTT" );
//        SurveyInfo surveyInfo = new SurveyInfo();
//        surveyInfo.setId( 1L );
//        surveyInfo.setTitle( "Test survey" );
//        surveyInfo.setCreationDate( new Date(  ) );
//        dashboard.getSurveys().add( surveyInfo );
//
//        return dashboard;
//    }

//    @RequestMapping( value = "/api/login", method = RequestMethod.POST )
//    public Client login( @RequestBody Client client, HttpServletRequest request ) {
//        System.out.println("login");
//        Client nClient = clientService.getClientByLogin( client.getLogin(), client.getPassword(), request.getSession().getId() );
//
//        return nClient;
//    }
//
//
//
//    @RequestMapping( value = "/api/logout", method = RequestMethod.POST )
//    public Status logout( @RequestBody Client client, HttpServletRequest request ) {
//        System.out.println( "log out " + client.toString() );
//        Status status = new Status();
//        status.setStatus( clientService.logOut( request.getSession().getId() ) );
//        return status;
//    }


}
