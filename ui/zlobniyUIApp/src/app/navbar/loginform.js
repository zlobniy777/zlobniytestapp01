import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject( HttpClient, Router )
export class Loginform {

  loginValue = "";
  passwordValue = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor() {

  }

  loginAction() {
    console.log('Login action: ' + this.loginValue + " " + this.passwordValue);

    let clientData = {
      login: this.loginValue,
      password: this.passwordValue
    };

    this.http.fetch('api/login', {
      method: 'post',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.apiKey = response.APIKey;
        console.log(response);
        if (response.hasLogged) {
          console.log("success");
          this.router.navigate("/dashboard");
        }
      });

  }
}
