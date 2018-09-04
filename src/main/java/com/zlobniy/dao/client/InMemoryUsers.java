package com.zlobniy.dao.client;

import com.zlobniy.dao.UserCrudService;
import com.zlobniy.entity.client.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
final class InMemoryUsers implements UserCrudService {

    private static final List<User> users = new ArrayList<>();
    static {
        // init first super user.
        users.add( new User( "", "ans", "123" ) );
    }

    @Override
    public User save( final User user ) {
        users.add( user );
        return user;
    }

    @Override
    public Optional<User> find( final String token ) {
        return getFromList( token );
    }

    private Optional<User> getFromList( String token ){
        return users.stream().filter( u -> u.getToken().equalsIgnoreCase( token ) ).findFirst();
    }

    @Override
    public Optional<User> findByUsernameAndPassword( final String username, final String password ) {
        return users
                .stream()
                .filter( u -> Objects.equals(username, u.getUsername()) && Objects.equals(password, u.getPassword()) )
                .findFirst();
    }


}
