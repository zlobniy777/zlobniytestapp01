package com.zlobniy.controller.client;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.domain.client.view.RegistrationView;
import com.zlobniy.domain.folder.entity.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
final class PublicUsersController {

    private final ClientService clientService;

    @Autowired
    public PublicUsersController( ClientService clientService ) {
        this.clientService = clientService;
    }

    @PostMapping( value = "/register" )
    public ClientView register( @RequestBody RegistrationView registrationView ) {
        Client client = clientService.createClient( registrationView );

        if( client != null ){
            List<Folder> folders = client.getFolders().stream().filter( Folder::getRoot ).collect(Collectors.toList());
            long rootFolderId = Optional.of( folders.get( 0 )
                    .getId() )
                    .orElseThrow( () -> new NullPointerException( "Root folder not found" ));
            ClientView clientView = new ClientView( client );
            clientView.setRootFolderId( rootFolderId );
            return clientView;
        }

        return null;
    }

    @PostMapping( value = "/loggedIn" )
    public ClientView loggedIn(
            @RequestParam( "username" ) final String username,
            @RequestParam( "password" ) final String password )
    {
        Client client = clientService.login( username, password );
        List<Folder> folders = client.getFolders().stream().filter( f -> f.isSelected() || f.getRoot() ).collect(Collectors.toList());
        long rootFolderId = Optional.of( folders.get( 0 )
                .getId() )
                .orElseThrow( () -> new NullPointerException( "Root folder not found" ));
        ClientView clientView = new ClientView( client );
        clientView.setRootFolderId( rootFolderId );
        return clientView;
    }

    @PostMapping( value = "/loginByToken" )
    public ClientView loginByToken( @RequestParam( "token" ) final String token ) {

        Client client = clientService.findByToken( token );
        if( client == null ) return null;

        List<Folder> folders = client.getFolders().stream().filter( Folder::isSelected ).collect(Collectors.toList());
        long rootFolderId = Optional.of( folders.get( 0 )
                .getId() )
                .orElseThrow( () -> new NullPointerException( "Root folder not found" ));

        ClientView clientView = new ClientView( client );
        clientView.setRootFolderId( rootFolderId );
        return clientView;
    }

}
