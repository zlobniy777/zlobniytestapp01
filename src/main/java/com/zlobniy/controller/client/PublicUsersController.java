package com.zlobniy.controller.client;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.domain.client.view.RegistrationView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
final class PublicUsersController {

    private final ClientService clientService;

    @Autowired
    public PublicUsersController( ClientService clientService ) {
        this.clientService = clientService;
    }

    @PostMapping( "/register" )
    ClientView register( @RequestBody RegistrationView registrationView ) {
        Client client = clientService.createClient( registrationView );

        return new ClientView( client );
    }

    @PostMapping( "/login" )
    ClientView login(
            @RequestParam( "username" ) final String username,
            @RequestParam( "password" ) final String password ) {
        ClientView clientView = new ClientView( clientService.login( username, password ) );
        return clientView;
    }

    @PostMapping( "/loginByToken" )
    ClientView loginByToken(
            @RequestParam( "token" ) final String token ) {
        ClientView clientView = new ClientView( clientService.findByToken( token ) );
        return clientView;
    }

}
