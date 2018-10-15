import {inject, NewInstance} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {BootstrapFormRenderer} from '../renderers/bootstrap-form-renderer';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {Ui} from "../ui";

@inject( ClientService, NewInstance.of(ValidationController), Ui )
export class LoginForm extends Ui {

  login = "";
  password = "";
  loginPlaceholder = "login";
  passwordPlaceholder = "password";

  constructor( clientService, validation, ...rest) {
    super(...rest);
    this.clientService = clientService;

    this.validation = validation ;
    this.validation.addRenderer(new BootstrapFormRenderer());
  }

  doLogin() {
    console.log('Login action: ' + this.username + " " + this.password);

    this.validation.validate()
      .then( result => {
        if ( result.valid ) {

          let clientData = {
            username: this.login,
            password: this.password
          };

          this.clientService.loginAction( clientData );
        }
      } );

  }

}

// simple example
ValidationRules.customRule(
  'moreThenOne',
  (value, obj) => value === null || value === undefined
    || value.length >= 2,
  `length should be more`
);

ValidationRules
  .ensure( a => a.login ).required()
  .satisfiesRule('moreThenOne')
  .ensure( a => a.password ).required()
  .on( LoginForm );
