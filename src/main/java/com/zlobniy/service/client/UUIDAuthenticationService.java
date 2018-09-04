package com.zlobniy.service.client;

import com.zlobniy.dao.UserCrudService;
import com.zlobniy.entity.client.User;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static lombok.AccessLevel.PUBLIC;

@Service
@AllArgsConstructor(access = PUBLIC)
@FieldDefaults(level = PUBLIC, makeFinal = true)
final class UUIDAuthenticationService implements UserAuthenticationService {

    @NonNull
    UserCrudService users;

    @Override
    public Optional<User> login(final String username, final String password) {
        final String uuid = UUID.randomUUID().toString();

        User user = users.findByUsernameAndPassword( username, password )
                .orElseThrow( () -> new BadCredentialsException("Wrong username or password") );

        user.setToken( uuid );
        users.save(user);

        return Optional.of(user);
    }

    @Override
    public Optional<User> findByToken(final String token) {
        return users.find( token );
    }

    @Override
    public void logout( final User user ) {
        User usr = users.find( user.getToken() ).orElseThrow( () -> new NullPointerException("User not found") );
        usr.setToken( "" );
        users.save( usr );
    }
}