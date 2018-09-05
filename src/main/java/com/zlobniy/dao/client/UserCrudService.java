package com.zlobniy.dao.client;

import com.zlobniy.view.client.User;

import java.util.Optional;

public interface UserCrudService {

    User save( User user);

    Optional<User> find( String token );

    Optional<User> findByUsernameAndPassword( String username, String password );

}
