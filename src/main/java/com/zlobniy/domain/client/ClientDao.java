package com.zlobniy.domain.client;

import com.zlobniy.domain.client.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientDao extends JpaRepository<Client, Long> {

    @Query( "select c from Client c where c.username = :username and c.password = :password" )
    Client findByCredentials( @Param( "username" ) String username, @Param( "password" ) String password );

    @Query( "select c from Client c where c.username = :username" )
    Client findByLogin( @Param( "username" ) String username );

    @Query( "select c from Client c where c.token = :token" )
    Client findByToken( @Param( "token" ) String token );

    @Query( "select c from Client c JOIN FETCH c.folders f where c.id = :id" )
    Client findWithFolders( @Param( "id" ) Long id );

}
