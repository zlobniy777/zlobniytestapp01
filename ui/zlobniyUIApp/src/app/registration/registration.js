import {inject, NewInstance} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {BootstrapFormRenderer} from '../renderers/bootstrap-form-renderer';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {Ui} from "../ui";

@inject( ClientService, NewInstance.of(ValidationController), Ui )
export class Registration extends Ui{
  title = 'Registration form';

  nameValue;
  surnameValue;
  login;
  password;
  email;

  namePlaceholder = "Name";
  surnamePlaceholder = "Surname";
  loginPlaceholder = "Login";
  passwordPlaceholder = "Password";
  emailPlaceholder = "e-mail@domain.com";

  constructor( clientService, validation, ...rest ) {
    super(...rest);
    this.clientService = clientService;
    this.validation = validation ;
    this.validation.addRenderer(new BootstrapFormRenderer());
  }

  registration() {
    console.log( 'registration action: ' + this.login );

    this.validation.validate()
      .then( result => {
        if ( result.valid ) {

          let clientData = {
            username: this.login,
            password: this.password,
            name: this.nameValue,
            surname: this.surnameValue,
            email: this.email,
          };

          this.clientService.registrationAction( clientData );
        }
      } );

  }
}


ValidationRules
  .ensure( a => a.login ).required()
  .ensure( a => a.password ).required()
  .ensure( a => a.email ).required()
  .on( Registration );
