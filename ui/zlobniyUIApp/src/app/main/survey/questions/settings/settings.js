import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( EventAggregator, Element )
export class Settings {

  settings;

  constructor( eventAggregator, element ) {
    this.eventAggregator = eventAggregator;
    this.element = element;
    this.show = false;
    //this.css = 'hide-settings';
  }

  attached() {
    let that = this;
    this.showMeSub = this.eventAggregator.subscribe( 'show-settings', data => {
      if( data ){
        that.settings = data.settings;
        if( !data.isToggle && !that.show ){
          that.showView();
        }else if( data.isToggle ){
          that.toggleView();
        }
      }else{
        that.hideView();
      }
    } );
  }

  DropdownChanged( type ){
    let object = this.getAvailableType( type );
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
    this.element.style.width = '30%';
  }

  hideView(){
    this.show = false;
    this.element.style.width = '0';
  }


  detached() {
    this.showMeSub.dispose();
  }

}
