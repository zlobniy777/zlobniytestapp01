import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";

@inject( SurveyService, SurveyHelper, EventAggregator, Ui, Element )
export class Question extends Ui {

  @bindable question;
  @bindable surveySettings;
  isEdit = false;

  constructor( surveyService, surveyHelper, eventAggregator, ui, element, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
    this.element = element;

    this.selectQuestionHandler = e => {
      this.selectQuestion();
      // e.stopImmediatePropagation();
      //e.stopPropagation();
    };

  }

  attached(){
    this.element.parentElement.addEventListener( 'click', this.selectQuestionHandler );
  }

  detached() {
    this.element.parentElement.removeEventListener( 'click', this.selectQuestionHandler );
  }

  /**
   * Select question, this is strange behavior because of click.delegate or trigger problem on upper div block.
   * Other actions is not applied, like check radio button inside this div block.
   * */
  selectQuestion(){
    this.eventAggregator.publish( 'select-question', this.question );
  }

  removeQuestion(){
    this.eventAggregator.publish( 'remove-question', this.question.index );
  }

  showSettings(){
    this.eventAggregator.publish( 'show-settings', {settings: this.question.settings, isToggle: true} );
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


}
