import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {Ui} from "../ui";

@inject( HttpClient, Router, Ui )
export class Registration extends Ui{
  title = 'Registration form';

  nameValue;
  surnameValue;
  loginValue;
  passwordValue;
  emailValue;

  namePlaceholder = "Name";
  surnamePlaceholder = "Surname";
  loginPlaceholder = "Login";
  passwordPlaceholder = "Password";
  emailPlaceholder = "e-mail@domain.com";

  constructor(http, router, ...rest) {
    super(...rest);
    this.http = http;
    this.router = router;
  }

  registration() {
    console.log( 'registration action: ' + this.loginValue );
    this.test('registration');

    let clientData = {
      login: this.loginValue,
      password: this.passwordValue,
      name: this.nameValue,
      surname: this.surnameValue,
      email: this.emailValue,
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
