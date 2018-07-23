import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( EventAggregator, Element )
export class Settings {

  @bindable settings;

  constructor( eventAggregator, element ) {
    this.eventAggregator = eventAggregator;
    this.element = element;
    this.show = false;
    //this.css = 'hide-settings';
  }

  attached() {
    let that = this;
    this.showMeSub = this.eventAggregator.subscribe( 'show-settings', index => {

      console.log('show settings ' + that.element );
      that.toggleView();
      //that.css = 'show-settings';
    } );
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

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
