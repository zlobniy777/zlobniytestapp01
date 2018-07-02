import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../services/client";
import {NavigationService} from "../services/navigation-service";
import {Ui} from "../ui";

@inject( Client, NavigationService, Ui )
export class ActionButton extends Ui {

  action = {};
  title = "";

  // availableActions = [
  //   {
  //     title: 'createSurvey', action: function () {
  //       this.router.navigate("/survey");
  //     }
  //   }
  //
  // ];

  constructor( client, navigationService, ...rest ) {
    super(...rest);
    this.client = client;
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
