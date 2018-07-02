package com.zlobniy.client.controller;

import com.zlobniy.client.entity.Client;
import com.zlobniy.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.*;

@Path("/")
@Component
public class ClientEndpoint {

    private ClientService clientService;

    @Autowired
    public ClientEndpoint( ClientService clientService ){
        this.clientService = clientService;
    }

    @GET
    @Path("/findClient")
    @Produces("application/json")
    public Client findClient( @QueryParam("id") Long id ){
        Client client = new Client();
        client.setId( id );
        client.setName( "TEST" );

        return client;
    }

    @Path("/createClient")
    @POST
    @Produces("application/json")
    public Client createClient( @RequestBody Client client ) {

        return client;
    }

//    @Path("/login")
//    @POST
//    @Produces("application/json")
//    public Client login( @RequestBody Client client ) {
//        System.out.println("login");
//        Client nClient = clientService.getClientByLogin( client.getLogin(), client.getPassword() );
//        //nClient.setSessionId( request.getSession().getId() );
//
//        return nClient;
//    }

//    @Path("/login")
//    @POST
//    @Produces("application/json")
//    public Client login( @RequestBody Client client, HttpServletRequest request ) {
//
//        Client nClient = clientService.getClientByLogin( client.getLogin(), client.getPassword() );
//
//        return nClient;
//    }

}
