package com.zlobniy.domain.client.service;

import com.zlobniy.domain.client.dao.ClientDao;
import com.zlobniy.domain.client.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClientService {

    private final ClientDao clientDao;


    @Autowired
    public ClientService( ClientDao clientDao ){
        this.clientDao = clientDao;
    }

    public Client login( final String username, final String password ) {
        final String uuid = UUID.randomUUID().toString();

        Client client = clientDao.findByCredentials( username, password );
        if( client != null ){
            client.setToken( uuid );
            clientDao.save( client );
            return client;
        }

        return null;
    }

    public void createClient( String data ){
        // create client here
        // and save to db
    }

    public void saveClient( Client client ){
        clientDao.save( client );
    }

    public Client findByToken(final String token) {
        return clientDao.findByToken( token );
    }

    public void logout( final Long clientId ) {
        Client client = clientDao.findOne( clientId );
        client.setToken( "" );
        clientDao.save( client );
    }
}