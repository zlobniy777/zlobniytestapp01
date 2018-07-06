import {inject} from 'aurelia-framework';
import {ClientService} from "./services/client-service";

@inject( Element, ClientService )
export class Ui {

  name = "ui";

  constructor( element, clientService ) {
    this.element = element;
    this.clientService = clientService;
  }

}
