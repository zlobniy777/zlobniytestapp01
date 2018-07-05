package com.zlobniy.controllers;

import com.zlobniy.client.entity.Client;
import com.zlobniy.entity.Dashboard;
import com.zlobniy.entity.Status;
import com.zlobniy.entity.survey.SurveyInfo;
import com.zlobniy.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


@RestController
public class SimpleController {

    private ClientService clientService;

    @Autowired
    public SimpleController( ClientService clientService ){
        this.clientService = clientService;
    }

    @RequestMapping( value = "/dashboard", method = RequestMethod.GET )
    public void dashboard( HttpServletRequest request, HttpServletResponse response ) {
        System.out.println("dashboard");
        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
            try{
                response.sendRedirect( "/" );
                return;
            } catch( IOException e ){
                e.printStackTrace();
            }
        }

        try{
            response.sendRedirect( "/#dashboard" );
        } catch( IOException e ){
            e.printStackTrace();
        }

    }

    @RequestMapping( value = "/api/dashboard", method = RequestMethod.POST )
    public Dashboard dashboard( @RequestBody Client client, HttpServletRequest request, HttpServletResponse response ) {
        System.out.println("dashboard");
        if( !clientService.hasLoggedIn( request.getSession().getId() ) ){
            try{
                response.sendRedirect( "/" );
                return null;
            } catch( IOException e ){
                e.printStackTrace();
            }
        }
        Dashboard dashboard = new Dashboard();
        dashboard.setTitle( "TTEEESSTT" );
        SurveyInfo surveyInfo = new SurveyInfo();
        surveyInfo.setId( 1L );
        surveyInfo.setTitle( "Test survey" );
        surveyInfo.setCreationDate( new Date(  ) );
        dashboard.getSurveys().add( surveyInfo );

        return dashboard;
    }

    @RequestMapping( value = "/api/login", method = RequestMethod.POST )
    public Client login( @RequestBody Client client, HttpServletRequest request ) {
        System.out.println("login");
        Client nClient = clientService.getClientByLogin( client.getLogin(), client.getPassword(), request.getSession().getId() );

        return nClient;
    }

    @RequestMapping( value = "/api/logout", method = RequestMethod.POST )
    public Status logout( @RequestBody Client client, HttpServletRequest request ) {
        System.out.println( "log out " + client.toString() );
        Status status = new Status();
        status.setStatus( clientService.logOut( request.getSession().getId() ) );
        return status;
    }


}
