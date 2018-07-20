import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {Ui} from "../../../ui";

@inject( SurveyService, Ui )
export class EditableItem extends Ui {

  @bindable item;
  edit;

  constructor( surveyService, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.edit = false;
  }

  startEdit(){
    if( !this.edit ){
      this.surveyService.setEditedModel( this );
      this.edit = true;
    }
  }

  finishEdit(){
    if ( this.edit ) {
      this.edit = false;
    }
  }

  attached() {
    console.log('EditableItem attached');
    if( this.item && this.item.isNew ){
      this.startEdit();
      this.item.isNew = false;
    }
  }

  bind(bindingContext, overrideContext) {
    console.log('EditableItem bind');

  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
