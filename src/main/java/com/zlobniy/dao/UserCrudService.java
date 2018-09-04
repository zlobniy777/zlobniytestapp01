package com.zlobniy.dao;

import com.zlobniy.entity.client.User;

import java.util.Optional;

public interface UserCrudService {

    User save( User user);

    Optional<User> find( String token );

    Optional<User> findByUsernameAndPassword( String username, String password );

}
