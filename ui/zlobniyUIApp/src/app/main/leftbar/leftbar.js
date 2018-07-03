import {inject} from 'aurelia-framework';
import {ClientService} from "../../services/client-service";
import {Ui} from "../../ui";

@inject( ClientService, Ui )
export class Leftbar extends Ui {

  constructor( clientService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
  }

}
