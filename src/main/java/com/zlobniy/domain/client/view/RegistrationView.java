package com.zlobniy.domain.client.view;

import com.zlobniy.validators.CustomValidator;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Size;

public class RegistrationView {

    @Size( min = 3, max = 20 )
    private String username;

    @CustomValidator
    private String password;

    @Email
    private String email;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
