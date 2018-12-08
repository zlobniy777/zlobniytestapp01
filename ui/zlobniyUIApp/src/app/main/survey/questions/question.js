import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {SurveyService} from "../../../services/survey-service";
import {SurveyHelper} from "../../../services/survey-helper";
import {EventSources} from "../../../services/event-sources";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Ui} from "../../../ui";
import {CssAnimator} from 'aurelia-animator-css';

@inject( SurveyService, SurveyHelper, EventAggregator, Ui, CssAnimator, EventSources, Element )
export class Question extends Ui {

  @bindable question;
  @bindable surveySettings;
  @bindable editMode;
  isEdit = false;

  constructor( surveyService, surveyHelper, eventAggregator, ui, animator, eventSource, element, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.surveyHelper = surveyHelper;
    this.eventAggregator = eventAggregator;
    this.animator = animator;
    this.eventSource = eventSource;
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
    let params = {isQuestionSelected: this.question.selected, settings: this.question.settings, editMode: this.editMode};
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
    this.eventSource.addEvent( 'remove-question', this.question.index );
  }

  showSettings(){
    this.eventSource.addEvent( 'show-settings', {settings: this.question.settings, qNumber:this.question.number, isToggle: true} );
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
