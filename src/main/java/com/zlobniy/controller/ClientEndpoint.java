package com.zlobniy.controller;

import com.zlobniy.entity.Client;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;

@Path("/")
@Component
public class ClientEndpoint {


    @GET
    @Path("/findClient")
    @Produces("application/json")
    public Client findClient( @QueryParam("id") Long id ){
        Client client = new Client();
        client.setId( id );
        client.setName( "TEST" );

        return client;
    }

}
