import 'css/survey.css';

import {computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {EventSources} from "../../../../services/event-sources";

@inject( EventAggregator, EventSources, Element )
export class Settings {

  QUESTION_TYPE = 'questionType';
  QUESTION_LAYOUT = 'questionLayout';

  settings;

  constructor( eventAggregator, eventSource, element ) {
    this.eventAggregator = eventAggregator;
    this.eventSource = eventSource;
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
        that.qNumber = data.qNumber;
      }else{
        that.hideView();
      }
    } );
  }


  DropdownChanged( dropDownType, objectType ){

    let object, params, data;

    switch ( dropDownType ){
      case this.QUESTION_TYPE:

        object = this.getAvailableType( objectType );

        params = [
          {key: 'questionType', value: object.type},
          {key: 'view', value: object.viewPath},
        ];

        data = {
          questionNumber: this.qNumber,
          parameters: params,
        };

        this.eventSource.addEvent( 'update.question', data );
        break;
      case this.QUESTION_LAYOUT:

        object = this.getAvailableType( this.settings.questionType );

        let result = {};
        object.availableLayout.forEach( value => {
          if( value.type === objectType ){
            result = value;
          }
        } );

        params = [
          {key: 'layout', value: result.type},
        ];

        data = {
          questionNumber: this.qNumber,
          parameters: params,
        };

        this.eventSource.addEvent( 'update.question', data );
        break;
      default:
        console.log('Not supported object type');
    }

  }

  showTextOption( event ){

    let params = [
      {key: 'freeTextOption', value: event.target.checked},
    ];

    let data = {
      questionNumber: this.qNumber,
      parameters: params,
    };

    this.eventSource.addEvent( 'update.question', data );
  }

  changeOtherText( event ){


    let params = [
      {key: 'otherValue', value: event.target.value},
    ];

    let data = {
      questionNumber: this.qNumber,
      parameters: params,
    };

    this.eventSource.addEvent( 'update.question', data );
  }

  changeLength( event ){

    let params = [
      {key: 'lengthValue', value: event.target.value},
    ];

    let data = {
      questionNumber: this.qNumber,
      parameters: params,
    };

    this.eventSource.addEvent( 'update.question', data );
  }

  changeWidth( event ){

    let params = [
      {key: 'widthValue', value: event.target.value},
    ];

    let data = {
      questionNumber: this.qNumber,
      parameters: params,
    };

    this.eventSource.addEvent( 'update.question', data );
  }

  changeLines( event ){

    let params = [
      {key: 'rowsValue', value: event.target.value},
    ];

    let data = {
      questionNumber: this.qNumber,
      parameters: params,
    };

    this.eventSource.addEvent( 'update.question', data );
  }

  @computedFrom( 'settings.questionType' )
  get availableLayouts(){
    if( this.settings ){
      let object = this.getAvailableType( this.settings.questionType );
      return object.availableLayout;
    }
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
