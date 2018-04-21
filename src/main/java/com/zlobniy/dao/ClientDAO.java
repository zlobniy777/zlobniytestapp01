package com.zlobniy.dao;

import com.zlobniy.client.entity.Client;

import java.util.concurrent.ConcurrentHashMap;

public class ClientDAO {

    private static final ConcurrentHashMap<String, Client> clients = new ConcurrentHashMap<>(  );
    static {
        initMap();
    }

    public ClientDAO(){

    }

    private static void initMap(){
        Client ans = new Client();
        ans.setId( 10L );
        ans.setName( "Aleksandr" );
        ans.setEmail( "puffy-q@mail.ru" );
        ans.setLogin( "ans" );
        ans.setPassword( "123" );
        clients.put( "ans", ans );
    }

    public Client findClient( String login ){
        return clients.get( login );
    }

}
