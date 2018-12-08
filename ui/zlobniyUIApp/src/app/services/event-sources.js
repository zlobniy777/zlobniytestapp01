import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class EventSources {

  events = [];
  position;

  constructor( eventAggregator ) {
    this.eventAggregator = eventAggregator;
  }

  addEvent( name, data ){

    if( this.position < this.events.length ){
      this.events.splice( this.position, this.events.length );
    }

    let event = {index: this.events.length, name: name, data: data};
    this.events.push( event );

    this.eventAggregator.publish( name, data );
    this.position = this.events.length;

    this.showEvents();
  }

  showEvents(){

    for (const event of this.events) {
      console.log( event );
    }

  }

  isPossibleUndo(){
    return this.position > 0;
  }

  isPossibleRedo(){
    return this.position < this.events.length;
  }

  executeNextFromPosition(){
    if( this.position >= this.events.length ) return;

    let that = this;
    this.position++;
    let lastElement = this.position;
    for (const event of this.events) {
      if( event.index < lastElement ){
        console.log( 'execute events from store', event );
        that.eventAggregator.publish( event.name, event.data );
      }
    }

  }

  executeAllExceptLast(){
    if( this.position <= 0 ) return;

    let that = this;
    this.position--;
    let lastElement = this.position;
    for (const event of this.events) {
      if( event.index < lastElement ){
        console.log( 'execute events from store', event );
        that.eventAggregator.publish( event.name, event.data );
      }
    }

  }


}
