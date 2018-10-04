import {inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( ClientService, Ui )
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

  constructor( clientService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
  }

  registration() {
    console.log( 'registration action: ' + this.loginValue );

    let clientData = {
      username: this.loginValue,
      password: this.passwordValue,
      name: this.nameValue,
      surname: this.surnameValue,
      email: this.emailValue,
    };

    this.clientService.registrationAction( clientData );

  }
}
