package com.zlobniy.controller.client;

import com.zlobniy.service.client.UserAuthenticationService;
import com.zlobniy.view.SimpleResponse;
import com.zlobniy.view.client.User;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
//@RequestMapping("/users")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class SecuredUsersController {
    @NonNull
    UserAuthenticationService authentication;

    @GetMapping("/current")
    User getCurrent( @RequestBody User user) {
        return user;
    }

    @RequestMapping( value = "/logout", method = RequestMethod.POST )
    SimpleResponse logout( @RequestBody User user) {
        authentication.logout(user);
        SimpleResponse response = new SimpleResponse();
        response.setMessage( "logout" );
        return response;
    }

}