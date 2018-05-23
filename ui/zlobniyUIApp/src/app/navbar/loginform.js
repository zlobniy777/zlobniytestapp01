import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {Client} from "../services/client";
import {Ui} from "../ui";

@inject( HttpClient, Router, Client, Ui )
export class Loginform extends Ui {

  loginValue = "";
  passwordValue = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor(http, router, client, ...rest) {
    super(...rest);
    this.http = http;
    this.router = router;
    this.client = client;
  }

  loginAction() {
    console.log('Login action: ' + this.loginValue + " " + this.passwordValue);

    let clientData = {
      login: this.loginValue,
      password: this.passwordValue
    };

    this.client.loginAction( clientData );

    this.client.clientInfo.hasLogged = true;
    this.client.clientInfo.id = "test 1";
    this.client.clientInfo.name = 'Vasia';

  }

  attached(){
    console.log('attached login form: ');
  }
}
