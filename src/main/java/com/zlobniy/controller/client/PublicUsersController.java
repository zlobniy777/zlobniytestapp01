package com.zlobniy.controller.client;

import com.zlobniy.dao.client.UserCrudService;
import com.zlobniy.service.client.UserAuthenticationService;
import com.zlobniy.view.client.User;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
//@RequestMapping("/public")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class PublicUsersController {
    @NonNull
    UserAuthenticationService authentication;
    @NonNull
    UserCrudService users;

    @PostMapping("/register")
    User register(
            @RequestParam("username") final String username,
            @RequestParam("password") final String password) {
        User user = new User( username, username, password );
        users.save( user );

        return login(username, password);
    }

    @PostMapping("/login")
    User login(
            @RequestParam("username") final String username,
            @RequestParam("password") final String password ) {
        User user = authentication.login(username, password).orElseThrow(() -> new RuntimeException("invalid login and/or password"));
        return user;
    }

    @PostMapping("/loginByToken")
    User loginByToken(
            @RequestParam("token") final String token ) {
        User user = authentication.findByToken( token ).orElseThrow(() -> new RuntimeException("invalid token"));
        return user;
    }

}
