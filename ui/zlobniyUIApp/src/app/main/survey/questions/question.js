import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";

@inject( SurveyService, SurveyHelper, EventAggregator, Ui, Element )
export class Question extends Ui {

  @bindable question;
  @bindable surveySettings;
  @bindable editMode;
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
    this.element.parentNode.addEventListener( 'click', this.selectQuestionHandler );
  }

  detached() {
    this.element.parentNode.removeEventListener( 'click', this.selectQuestionHandler );
  }

  @computedFrom( 'question.isLast' )
  get nextButtonTitle(){
    if( this.question && this.question.isLast ){
      return 'Finish';
    }else{
      return 'Next';
    }
  }

  @computedFrom( 'question.selected' )
  get params(){
    let params = {isQuestionSelected: this.question.selected, questionType: this.question.settings.questionType, editMode: this.editMode};
    return params;
  }

  buttonNext(){
    this.eventAggregator.publish( 'next-question', this.question );
  }

  buttonBack(){
    this.eventAggregator.publish( 'prev-question', this.question );
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
