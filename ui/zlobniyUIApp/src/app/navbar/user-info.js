import {inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( ClientService, Ui )
export class UserInfo extends Ui {

  constructor( clientService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
  }

  doLogOff() {
    this.clientService.logOff();
    console.log('log off action: ');
  }

}
