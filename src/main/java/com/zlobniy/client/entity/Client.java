package com.zlobniy.client.entity;

public class Client {

    private Long id;
    private String name;
    private String email;
    private String login;
    private String password;
    private boolean hasLogged;

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName( String name ){
        this.name = name;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail( String email ){
        this.email = email;
    }

    public String getLogin(){
        return login;
    }

    public void setLogin( String login ){
        this.login = login;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword( String password ){
        this.password = password;
    }

    public boolean isHasLogged(){
        return hasLogged;
    }

    public void setHasLogged( boolean hasLogged ){
        this.hasLogged = hasLogged;
    }

    @Override
    public String toString(){
        return this.id + " " + this.name;
    }
}
