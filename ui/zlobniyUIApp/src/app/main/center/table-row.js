import {bindable, inject} from 'aurelia-framework';
import {ClientService} from "../../services/client-service";
import {Ui} from "../../ui";

@inject( ClientService,  Ui )
export class TableRow extends Ui {

  @bindable data = {};

  constructor( clientService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
  }

}
