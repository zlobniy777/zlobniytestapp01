import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyService} from "../../services/survey-service";

import sortable from 'sortablejs';

@inject(EventAggregator, SurveyService)
export class Dragdrop {

  test = {};
  eventTargetAdd;
  eventTargetUpdate;

  availableItems = [];

  constructor( eventAggregator, surveyService ) {
    this.eventAggregator = eventAggregator;
    this.surveyService = surveyService;

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
      name: 'questions',
      pull: 'clone',
      put: false
    });

    this.setupTarget(document.getElementById('drag-target'), '.dragged-element', true, 'questions');

    this.eventListeners();
  }

  detached() {
    //clean up the subscription when app component is removed from the DOM
    this.eventTargetAdd.dispose();
    this.eventTargetUpdate.dispose();

  }

  /**
   * Event Listeners
   * This is where event listeners for drag/drop events are registered
   *
   */
  eventListeners() {

    let that = this;

    // Event triggered when item is added
    this.eventTargetAdd = this.eventAggregator.subscribe('dragTarget.onAdd', evt => {
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

        that.surveyService.addQuestion( undefined, questionType, sourceTitle, evt.newIndex );
      }
    });

    // Events for when sorting takes place, we need to update the array to let
    // Aurelia know that changes have taken place and our repeater is up-to-date
    this.eventTargetUpdate = this.eventAggregator.subscribe('dragTarget.onUpdate', evt => {
      // The item being dragged
      let el = evt.item;

      // Old index position of item
      let oldIndex = evt.oldIndex;

      // New index position of item
      let newIndex = evt.newIndex;

      // If item isn't being dropped into its original place
      that.surveyService.updatePositions( newIndex, oldIndex );
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
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 30,
      onAdd: evt => {
        that.eventAggregator.publish('dragTarget.onAdd', evt);
      },
      onStart: evt => {
        that.eventAggregator.publish('dragTarget.onStart', evt);
      },
      onUpdate: evt => {
        that.eventAggregator.publish('dragTarget.onUpdate', evt);
      }
    });
  }

  activate( data ){
  }

}

function swapArrayElements(theArray, a, b) {
  var temp = theArray[a];
  theArray[a] = theArray[b];
  theArray[b] = temp;
}
