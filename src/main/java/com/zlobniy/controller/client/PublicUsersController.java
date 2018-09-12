package com.zlobniy.controller.client;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
final class PublicUsersController {

    private final ClientService clientService;

    @Autowired
    public PublicUsersController( ClientService clientService ){
        this.clientService = clientService;
    }

    @PostMapping("/register")
    Client register(
            @RequestParam("username") final String username,
            @RequestParam("password") final String password) {

        Client client = new Client();
        client.setUsername( username );
        client.setPassword( password );

        clientService.createClient( "data" );

        return client;
    }

    @PostMapping("/login")
    Client login(
            @RequestParam("username") final String username,
            @RequestParam("password") final String password ) {
        return clientService.login(username, password);
    }

    @PostMapping("/loginByToken")
    Client loginByToken(
            @RequestParam("token") final String token ) {
        return clientService.findByToken( token );
    }

}
