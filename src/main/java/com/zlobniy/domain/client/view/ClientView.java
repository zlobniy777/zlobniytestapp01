package com.zlobniy.domain.client.view;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zlobniy.domain.client.entity.Client;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

import static java.util.Objects.requireNonNull;


//@FieldDefaults(level = PRIVATE)
public class ClientView implements UserDetails {
    private static final long serialVersionUID = 2396654715019746670L;

    private String token;
    private Long id;
    private String username;
    private String password;
    private String email;

    public ClientView(){
        super();
        this.token = requireNonNull( "" );
        this.username = requireNonNull( "" );
        this.password = requireNonNull( "" );
    }

    public ClientView( final String token, final String username, final String password ) {
        super();
        this.token = requireNonNull( token );
        this.username = requireNonNull( username );
        this.password = requireNonNull( password );
    }

    public ClientView( final Client client ) {
        super();
        this.setId( client.getId() );
        this.setEmail( client.getEmail() );
        this.token = requireNonNull( client.getToken() );
        this.username = requireNonNull( client.getUsername() );
        this.password = requireNonNull( client.getPassword() );
    }

    @JsonIgnore
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername(){
        return username;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getToken(){
        return token;
    }

    public void setToken( String token ){
        this.token = token;
    }

    public void setUsername( String username ){
        this.username = username;
    }

    public void setPassword( String password ){
        this.password = password;
    }

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail( String email ){
        this.email = email;
    }
}