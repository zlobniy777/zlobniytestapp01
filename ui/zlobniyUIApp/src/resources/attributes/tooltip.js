import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import $ from 'jquery';

@inject( Element )
export class TooltipCustomAttribute {

  @bindable title;
  @bindable placement;

  constructor( element ) {
    this.element = element;
  }

  attached() {
    let value;
    if( this.element.dataset.value ){
      value = this.element.dataset.value;
    }else{
      value = this.title;
    }

    $( this.element ).tooltip( {title: value, placement: this.placement} );
  }

  detached() {
    $( this.element ).tooltip('dispose');
  }

}
