import {inject} from 'aurelia-framework';
import {Client} from "../services/client";
import {Ui} from "../ui";


@inject( Client, Ui )
export class Dashboard extends Ui {
  title = 'Dashboard';

  info = "";

  constructor( client, ...rest ){
    super(...rest);
    this.client = client;
  }

  test(){
    console.log( this.client.clientInfo );
  }

}
