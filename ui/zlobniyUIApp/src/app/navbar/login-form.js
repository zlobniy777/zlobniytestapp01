import {inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( ClientService, Ui )
export class LoginForm extends Ui {

  loginValue = "";
  passwordValue = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor( clientService, ...rest) {
    super(...rest);
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
