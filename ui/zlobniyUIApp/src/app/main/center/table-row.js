import {inject} from 'aurelia-framework';
import {ClientService} from "../../services/client-service";
import {NavigationService} from "../../services/navigation-service";
import {Ui} from "../../ui";

@inject( ClientService, NavigationService,  Ui )
export class TableRow extends Ui {

  rowData = {};

  constructor( clientService, navigationService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
    this.navigationService = navigationService;
  }

  open(){
    this.navigationService.goTo( this.navigationService.NAV_SURVEY + "/" + this.rowData.id );
  }

  activate( rowData ){
    this.rowData = rowData;
  }

}
