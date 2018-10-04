package com.zlobniy.domain.client.service;

import com.zlobniy.domain.client.ClientDao;
import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.view.RegistrationView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Client createClient( RegistrationView registrationView ) {
        Client clientForm = new Client( registrationView );
        final String uuid = UUID.randomUUID().toString();
        clientForm.setToken( uuid );

        Client client = null;
        try {
            client = clientDao.save( clientForm );
        } catch ( Exception e ) {
            e.printStackTrace();
        }

       return client;
    }

    public Client saveClient( Client client ){
        return clientDao.save( client );
    }

    public Client findByToken(final String token) {
        return clientDao.findByToken( token );
    }

    public Client findWithFolders( Long id ){
        return clientDao.findWithFolders( id );
    }

    public void logout( final Long clientId ) {
        Client client = clientDao.findOne( clientId );
        client.setToken( null );
        clientDao.save( client );
    }

    public Client find( Long id ) {
        return clientDao.findOne( id );
    }

    public List<Client> findAll(){
        return clientDao.findAll();
    }
}