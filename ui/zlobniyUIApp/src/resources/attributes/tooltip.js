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
    $( this.element ).tooltip( {title: this.title, placement: this.placement} );
  }

  detached() {
    $( this.element ).tooltip('dispose');
  }

}
