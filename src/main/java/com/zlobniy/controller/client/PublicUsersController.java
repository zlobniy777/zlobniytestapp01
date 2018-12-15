package com.zlobniy.controller.client;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.domain.client.view.RegistrationView;
import com.zlobniy.domain.folder.entity.Folder;
import com.zlobniy.domain.folder.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
final class PublicUsersController {

    private final ClientService clientService;
    private final FolderService folderService;

    @Autowired
    public PublicUsersController( ClientService clientService, FolderService folderService ) {
        this.clientService = clientService;
        this.folderService = folderService;
    }

    @PostMapping( value = "/register" )
    public ClientView register( @RequestBody RegistrationView registrationView ) {
        Client client = clientService.createClient( registrationView );

        if( client != null ){
            final Folder homeFolder = new Folder();
            homeFolder.setClient( client );
            homeFolder.setTitle( client.getUsername() );

            folderService.saveFolder( homeFolder );

            return new ClientView( client );
        }

        return null;
    }

    @PostMapping( value = "/loggedIn" )
    public ClientView loggedIn(
            @RequestParam( "username" ) final String username,
            @RequestParam( "password" ) final String password ) {
        ClientView clientView = new ClientView( clientService.login( username, password ) );
        return clientView;
    }

    @PostMapping( value = "/loginByToken" )
    public ClientView loginByToken(
            @RequestParam( "token" ) final String token ) {
        ClientView clientView = new ClientView( clientService.findByToken( token ) );
        return clientView;
    }

}
