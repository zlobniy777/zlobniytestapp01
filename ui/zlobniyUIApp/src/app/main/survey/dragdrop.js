import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import sortable from 'sortablejs';

@inject(EventAggregator)
export class Dragdrop {

  droppedItems = [];

  availableItems = [];

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    this.availableItems = [
      {'title':'Only one answer', 'type':'closed'},
      {'title':'Matrix', 'type':'matrix'}
    ];
  }

  /**
   * Attached
   * Called when view is attached
   *
   */
  attached() {
    this.setupSource(document.getElementById('drag-source'), false, {
      name: 'catsAndDogs',
      pull: 'clone',
      put: false
    });

    this.setupTarget(document.getElementById('drag-target'), '.dragged-element', true, 'catsAndDogs');

    this.eventListeners();
  }

  test(){
    console.log( this.droppedItems.length );
  }

  sort(){
    this.droppedItems.sort( function compare(a, b) {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      // a должно быть равным b
      return 0;
    } );
  }

  /**
   * Event Listeners
   * This is where event listeners for drag/drop events are registered
   *
   */
  eventListeners() {

    let that = this;

    // Event triggered when item is added
    this.eventAggregator.subscribe('dragTarget.onAdd', evt => {
      let src = evt.from;
      let dest = evt.to;
      let item = evt.item;

      // When actual dragged item is dropped, we remove it and handle
      // updating the array for our repeater ourselves
      evt.item.parentElement.removeChild(evt.item);

      // Dragging widget into new page
      if (item.dataset.type) {
        let questionType = item.dataset.type;
        let sourceTitle = item.dataset.value;

        let itemInstance = {};
        let questionNumber = parseInt( that.droppedItems.length ) + 1;
        itemInstance.title = sourceTitle + " " + questionNumber;


        if ( questionType === 'closed' ) {
          itemInstance.type = 'closed';
        } else {
          itemInstance.type = 'matrix';
        }

        that.droppedItems.splice(evt.newIndex, 0, itemInstance);

        var i = 0;
        that.droppedItems.forEach(function(element) {
          console.log(element);
          element.index = i;
          i++;
        });

      }
    });

    // Events for when sorting takes place, we need to update the array to let
    // Aurelia know that changes have taken place and our repeater is up-to-date
    this.eventAggregator.subscribe('dragTarget.onUpdate', evt => {
      // The item being dragged
      let el = evt.item;

      // Old index position of item
      let oldIndex = evt.oldIndex;

      // New index position of item
      let newIndex = evt.newIndex;

      // If item isn't being dropped into its original place
      if (newIndex != oldIndex) {

        if( oldIndex > newIndex ){
          that.droppedItems[oldIndex].index = newIndex;
          for( var i = newIndex; i < oldIndex ; i++ ){
            that.droppedItems[i].index = that.droppedItems[i].index + 1;
          }
        }else{
          that.droppedItems[oldIndex].index = newIndex;
          for( var i = newIndex; i > oldIndex ; i-- ){
            that.droppedItems[i].index = that.droppedItems[i].index - 1;
          }
        }

        that.sort();
      }
    });
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
      group: group,
      onStart: evt => {
        that.eventAggregator.publish('dragSource.onStart', evt);
      },
      onEnd: evt => {
        that.eventAggregator.publish('dragSource.onEnd', evt);
      }
    });
  }

  /**
   * Setup Target
   * Handles setting the drag target destination for dragged items
   *
   * @param el (string)
   * @param draggable (string)
   * @param sort (boolean)
   * @param group (object)
   */
  setupTarget(el, draggable = '.element', sort = true, group = 'somegroup') {
    let that = this;
    new sortable(el, {
      draggable: draggable,
      sort: sort,
      group: group,
      onAdd: evt => {
        that.eventAggregator.publish('dragTarget.onAdd', evt);
      },
      onUpdate: evt => {
        that.eventAggregator.publish('dragTarget.onUpdate', evt);
      }
    });
  }
}

function swapArrayElements(theArray, a, b) {
  var temp = theArray[a];
  theArray[a] = theArray[b];
  theArray[b] = temp;
}
