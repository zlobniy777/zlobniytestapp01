import {inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( ClientService, Ui )
export class LoginForm extends Ui {

  username = "";
  password = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor( clientService, ...rest) {
    super(...rest);
    this.clientService = clientService;
  }

  doLogin() {
    console.log('Login action: ' + this.username + " " + this.password);

    let clientData = {
      username: this.username,
      password: this.password
    };

    this.clientService.loginAction( clientData );
  }

  attached(){
    console.log('attached login form: ');
  }

  detached() {

  }

}
