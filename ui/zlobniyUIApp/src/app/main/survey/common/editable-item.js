import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";

@inject( SurveyService, EventAggregator, Ui )
export class EditableItem extends Ui {

  @bindable item;
  @bindable editMode;
  edit;

  constructor( surveyService, eventAggregator, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.eventAggregator = eventAggregator;
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
      if( this.item.title === '' ){
        this.removeOption( this.item.index );
      }
    }

  }

  removeOption( index ){
    this.eventAggregator.publish( this.item.optionsId + '-remove', index );
  }

  attached() {
    if( this.item && this.item.isNew ){
      this.startEdit();
      this.item.isNew = false;
    }
  }

  detached() {

  }

}
