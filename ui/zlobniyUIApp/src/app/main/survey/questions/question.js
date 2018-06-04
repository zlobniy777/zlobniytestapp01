import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../../../services/client";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class Question extends Ui {

  item = {};
  name;
  isEdit = false;

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;
    this.name = 'Question';

    // this.handleBodyClick = e => {
    //   console.log("Question " + e.target);
    // };

  }

  startEdit(){
    if( !this.isEdit ){
      this.client.setEditedModel( this );
      this.isEdit = true;
    }
  }

  finishEdit(){
    if( this.isEdit ){
      this.isEdit = false;
    }
  }

  activate( item ){
    this.item = item;
  }

}
