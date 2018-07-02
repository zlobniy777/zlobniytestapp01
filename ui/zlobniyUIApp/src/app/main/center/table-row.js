import {inject} from 'aurelia-framework';
import {Client} from "../../services/client";
import {NavigationService} from "../../services/navigation-service";
import {Ui} from "../../ui";

@inject( Client, NavigationService,  Ui )
export class TableRow extends Ui {

  rowData = {};

  constructor( client, navigationService, ...rest ) {
    super(...rest);
    this.client = client;
    this.navigationService = navigationService;
  }

  open(){
    this.navigationService.goTo( this.navigationService.NAV_SURVEY + "/" + this.rowData.id );
  }

  activate( rowData ){
    this.rowData = rowData;
  }

}
