import {inject} from 'aurelia-framework';
import {Ui} from "../ui";


@inject( Ui )
export class Dashboard extends Ui {
  title = 'Dashboard';

  info = this.client.login;

  constructor( ...rest ){
    super(...rest);
  }

}
