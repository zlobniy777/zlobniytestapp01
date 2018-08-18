import 'css/survey.css';

import {inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( EventAggregator, Element )
export class Settings {

  QUESTION_TYPE = 'questionType';
  QUESTION_LAYOUT = 'questionLayout';

  settings;

  constructor( eventAggregator, element ) {
    this.eventAggregator = eventAggregator;
    this.element = element;
    this.show = false;
    this.width = 0;
  }

  attached() {
    let that = this;
    this.showMeSub = this.eventAggregator.subscribe( 'show-settings', data => {
      if( data ){
        // show settings if it first time. After added first question.
        // then if settings was closed we didn't open it, only if it is toggle view
        if( !data.isToggle && !that.show && !that.settings ){
          that.showView();
        }else if( data.isToggle ){
          that.toggleView();
        }
        that.settings = data.settings;
      }else{
        that.hideView();
      }
    } );
  }

  DropdownChanged( dropDawnType, objectType ){

    switch ( dropDawnType ){
      case this.QUESTION_TYPE:
        this.changeQuestionType( objectType );
        break;
      case this.QUESTION_LAYOUT:
        this.changeQuestionLayout( objectType );
        break;
      default:
        console.log('Not supported object type');
    }

  }

  changeQuestionLayout( objectType ){
    let object = this.getAvailableType( this.settings.questionType );

    let result = {};
    object.availableLayout.forEach( value => {
      if( value.type === objectType ){
        result = value;
      }
    } );

    this.settings.layout = result.type;
  }

  @computedFrom( 'settings.questionType' )
  get availableLayouts(){
    if( this.settings ){
      let object = this.getAvailableType( this.settings.questionType );
      return object.availableLayout;
    }
  }

  changeQuestionType( objectType ){
    let object = this.getAvailableType( objectType );
    this.settings.questionType = object.type;
    this.settings.view = object.view;
  }

  getAvailableType( type ){
    let result;
    this.settings.availableQuestionTypes.forEach( value => {
      if( value.type === type ){
        result = value;
      }
    } );
    return result;
  }

  toggleView(){
    if ( !this.show ){
      this.showView();
    }else{
      this.hideView();
    }
  }

  showView(){
    this.show = true;
    this.width = '30%';
  }

  hideView(){
    this.show = false;
    this.width = '0';
  }


  detached() {
    this.showMeSub.dispose();
  }

}
