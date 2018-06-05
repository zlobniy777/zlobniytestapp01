import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";
import {Router} from 'aurelia-router';

@inject( SurveyService, Router, Ui )
export class EditableItem extends Ui {

  item = {};
  isEdit = false;

  constructor( surveyService, router, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.router = router;
  }

  startEdit(){
    if( !this.isEdit ){
      this.surveyService.setEditedModel( this );
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

    if( this.item.isNew ){
      this.startEdit();
      this.item.isNew = false;
    }

  }

}
