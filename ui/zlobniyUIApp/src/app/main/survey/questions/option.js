import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../../../services/client";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class Option extends Ui {

  item = {};

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;
  }

  activate( item ){
    this.item = item;
    this.item.name = item.type+'_'+item.qId;
  }

}
