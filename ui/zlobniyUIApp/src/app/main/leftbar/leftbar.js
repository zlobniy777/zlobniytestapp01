import {inject} from 'aurelia-framework';
import {Client} from "../../services/client";
import {Ui} from "../../ui";

@inject( Client, Ui )
export class Leftbar extends Ui {

  constructor( client, ...rest ) {
    super(...rest);
    this.client = client;
  }

}
