import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import sortable from 'sortablejs';

@inject( EventAggregator )
export class SortableComponent {

  elements = [];
  identifier = "";
  nameOnUpdate = "";
  nameOnAdd = "";

  constructor( eventAggregator ) {
    this.eventAggregator = eventAggregator;

    this.test = "test";

  }

  /**
   * Attached
   * Called when view is attached
   *
   */
  attached() {
    this.setupTarget( document.getElementById( 'sortable-list_' + this.identifier ), '.sorted-element_' + this.identifier, true, 'elements_' + this.identifier );
  }

  sort() {
    this.elements.sort( function compare( a, b ) {
      if ( a.index < b.index ) {
        return -1;
      }
      if ( a.index > b.index ) {
        return 1;
      }
      return 0;
    } );
  }

  activate( item ) {
    this.elements = item.options;
    this.identifier = item.id;

    this.nameOnUpdate = 'sortedList_' + this.identifier + '.onUpdate';
    this.nameOnAdd = 'sortedList_' + this.identifier + '.onAdd';

    this.eventListeners();
  }

  /**
   * Event Listeners
   * This is where event listeners for drag/drop events are registered
   *
   */
  eventListeners() {

    let that = this;

    // Event triggered when item is added
    this.onAddSubscribe = this.eventAggregator.subscribe( that.nameOnAdd, evt => {
      let src = evt.from;
      let dest = evt.to;
      let item = evt.item;

      // Dragging widget into new page
      if ( item.dataset.type ) {
        let type = item.dataset.type;
        let qId = item.dataset.value;
        let path = item.dataset.html;

        let itemInstance = {};
        itemInstance.type = type;
        itemInstance.qId = qId;
        itemInstance.path = path;
        itemInstance.name = type + '_' + qId;

        that.elements.splice( evt.newIndex, 0, itemInstance );

        var i = 0;
        that.elements.forEach( function ( element ) {
          console.log( element );
          element.index = i;
          i++;
        } );

      }
    } );


    // Events for when sorting takes place, we need to update the array to let
    // Aurelia know that changes have taken place and our repeater is up-to-date
    this.onUpdateSubscribe = this.eventAggregator.subscribe( that.nameOnUpdate, evt => {
      // The item being dragged
      let el = evt.item;

      // Old index position of item
      let oldIndex = evt.oldIndex;

      // New index position of item
      let newIndex = evt.newIndex;

      // If item isn't being dropped into its original place
      if ( newIndex != oldIndex ) {

        if ( oldIndex > newIndex ) {
          that.elements[oldIndex].index = newIndex;
          for ( var i = newIndex; i < oldIndex; i++ ) {
            that.elements[i].index = that.elements[i].index + 1;
          }
        } else {
          that.elements[oldIndex].index = newIndex;
          for ( var i = newIndex; i > oldIndex; i-- ) {
            that.elements[i].index = that.elements[i].index - 1;
          }
        }

        that.sort();
      }
    } );
  }

  /**
   * Setup Target
   * Handles setting the drag target destination for dragged items
   *
   * @param el (string)
   * @param sort (boolean)
   * @param group (object)
   */
  setupTarget( el, sort = true, group = 'group_' + this.identifier ) {
    let that = this;
    let name = "sorted_" + that.identifier;
    new sortable( el, {
      name: name,
      sort: sort,
      group: false,

      onAdd: evt => {
        that.eventAggregator.publish( that.nameOnAdd, evt );
      },
      onUpdate: evt => {
        that.eventAggregator.publish( that.nameOnUpdate, evt );
      }
    } );
  }

  detached() {
    //clean up the subscription when app component is removed from the DOM
    this.onUpdateSubscribe.dispose();
    this.onAddSubscribe.dispose();

  }
}
