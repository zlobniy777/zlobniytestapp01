import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {Client} from "../../../services/client";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router, Ui )
export class EditableItem extends Ui {

  item = {};
  isEdit = false;

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;
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
