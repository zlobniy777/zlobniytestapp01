package com.zlobniy.controller.client;

import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.view.SimpleResponse;
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
    ClientService authentication;

    @GetMapping("/current")
    ClientView getCurrent( @RequestBody ClientView clientView ) {
        return clientView;
    }

    @RequestMapping( value = "/logout", method = RequestMethod.POST )
    SimpleResponse logout( @RequestBody ClientView clientView ) {

        authentication.logout( clientView.getId() );
        SimpleResponse response = new SimpleResponse();
        response.setMessage( "logout" );

        return response;
    }

}