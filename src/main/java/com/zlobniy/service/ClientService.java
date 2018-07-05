package com.zlobniy.service;

import com.zlobniy.client.entity.Client;
import com.zlobniy.dao.ClientDAO;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ClientService {

    private final ClientDAO dao = new ClientDAO();

    private static final Map<String,Client> loggedClients = new ConcurrentHashMap<>(  );

    public Client getClientByLogin( String login, String password, String sessionId ){
        // check cache for logged clients
        if( loggedClients.containsKey( sessionId ) ) return loggedClients.get( sessionId );

        // if no login data, return empty client model
        if( login == null ) return new Client();

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
        putToLoggedIn( client, sessionId );
        System.out.println( client.toString() );
        return client;
    }

    public boolean logOut( String sessionId ){
        if( loggedClients.containsKey( sessionId ) ){
            loggedClients.remove( sessionId );
            return true;
        }
        return false;
    }

    public void putToLoggedIn( Client client, String sessionId ){
        loggedClients.putIfAbsent( sessionId, client );
    }

    private boolean checkPassword( Client client, String password ){
        return client.getPassword().equalsIgnoreCase( password );
    }

    public boolean hasLoggedIn( String sessionId ){
        return loggedClients.containsKey( sessionId );
    }

}
