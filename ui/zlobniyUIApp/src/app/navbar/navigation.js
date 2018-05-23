import {inject} from 'aurelia-framework';
import {Ui} from "../ui";
import {Client} from "../services/client";


@inject( Client, Ui )
export class Navigation extends Ui{
  title = "navigation";

  constructor( client, ...rest ) {
    super(...rest);
    this.test('navi');
    this.client = client;
  }

  attached(){
    console.log('attached navigation ');
  }



}
