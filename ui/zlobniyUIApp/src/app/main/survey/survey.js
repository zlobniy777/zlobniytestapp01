import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../../services/client";
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class Survey extends Ui {

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;
  }

  exit(){
    this.router.navigate("/dashboard");
  }

}