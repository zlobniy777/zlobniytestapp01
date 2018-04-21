package com.zlobniy.service;

import com.zlobniy.client.entity.Client;
import com.zlobniy.dao.ClientDAO;
import org.springframework.stereotype.Component;

@Component
public class ClientService {

    private final ClientDAO dao = new ClientDAO();

    public Client getClientByLogin( String login, String password ){
        Client client = dao.findClient( login );
        if( client == null ){
            Client nClient = new Client();
            nClient.setHasLogged( false );
            return nClient;
        }

        if( !checkPassword( client, password ) ){
            client.setHasLogged( false );
            return client;
        }

        client.setHasLogged( true );
        return client;
    }

    private boolean checkPassword( Client client, String password ){
        return client.getPassword().equalsIgnoreCase( password );
    }

}
