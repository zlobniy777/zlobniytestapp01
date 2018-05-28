import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../services/client";
import {Ui} from "../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class ActionButton extends Ui {

  action = {};
  title = "";

  availableActions = [
    {
      title: 'createSurvey', action: function () {
        this.router.navigate("/survey");
      }
    }

  ];

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;


  }

  activate( button ){
    this.action = button.action;
    this.title = button.title;
  }

  doAction(){
    this.action.call();
  }



}
