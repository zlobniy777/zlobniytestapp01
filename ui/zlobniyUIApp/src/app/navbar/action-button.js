import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {NavigationService} from "../services/navigation-service";
import {Ui} from "../ui";

@inject( ClientService, NavigationService, Ui )
export class ActionButton extends Ui {

  @bindable action = {};
  @bindable title = "";
  @bindable css;

  constructor( clientService, navigationService, ...rest ) {
    super(...rest);
    this.clientService = clientService;
    this.navigationService = navigationService;
  }

  activate( button ){
    this.action = button.action;
    this.title = button.title;
  }

  doAction(){
    this.action.call();
  }

}
