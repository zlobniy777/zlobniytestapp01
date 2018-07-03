import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( HttpClient, Router, ClientService, Ui )
export class Loginform extends Ui {

  loginValue = "";
  passwordValue = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor(http, router, clientService, ...rest) {
    super(...rest);
    this.http = http;
    this.router = router;
    this.clientService = clientService;
  }

  doLogin() {
    console.log('Login action: ' + this.loginValue + " " + this.passwordValue);

    let clientData = {
      login: this.loginValue,
      password: this.passwordValue
    };

    this.clientService.loginAction( clientData );
  }

  attached(){
    console.log('attached login form: ');
  }
}
