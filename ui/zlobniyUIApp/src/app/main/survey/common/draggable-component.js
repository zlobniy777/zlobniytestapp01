import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import sortable from 'sortablejs';

@inject( EventAggregator )
export class draggableComponent {

  @bindable data = [];

  constructor( eventAggregator ) {
    this.eventAggregator = eventAggregator;
  }


  attached() {
    console.log( 'attached survey ' );
    this.setupSource( document.getElementById('drag-source'), false, {
      name: 'questions',
      pull: 'clone',
      put: false
    });

  }

  detached() {
    console.log( 'detached survey ' );
  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

  /**
   * Setup Source
   * Handles setting the drag source
   *
   * @param el (string)
   * @param sort (boolean)
   * @param group (object)
   */
  setupSource(el, sort = false, group = {}) {
    let that = this;
    new sortable(el, {
      sort: sort,
      ghostClass: "ghost",
      group: group,
      onStart: evt => {
        that.eventAggregator.publish('dragSource.onStart', evt);
      },
      onClone: evt => {
        that.eventAggregator.publish('dragSource.onClone', evt);
      },
      onEnd: evt => {
        that.eventAggregator.publish('dragSource.onEnd', evt);
      }
    });
  }

}
