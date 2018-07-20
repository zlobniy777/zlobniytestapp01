import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( EventAggregator )
export class scales {

  @bindable scales;

  constructor( eventAggregator ) {
    this.eventAggregator = eventAggregator;
  }

  attached() {
    let that = this;
    this.removeScaleSub = this.eventAggregator.subscribe( that.scales.id + '-remove', index => {
      that.scales.elements.splice( index, 1 );
    } );
  }

  detached() {
    this.removeScaleSub.dispose();
  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
