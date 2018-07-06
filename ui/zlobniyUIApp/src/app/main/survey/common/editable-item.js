import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";

@inject( SurveyService, Ui )
export class EditableItem extends Ui {

  item = {};
  isEdit = false;

  constructor( surveyService, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
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

    if(  this.item && this.item.isNew ){
      this.startEdit();
      this.item.isNew = false;
    }

  }

}
