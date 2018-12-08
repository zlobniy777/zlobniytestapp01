import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyService} from "../../../services/survey-service";
import {CollectionUtil} from "../../../services/collection-util";
import {EventSources} from "../../../services/event-sources";

import sortable from 'sortablejs';

@inject( EventAggregator, SurveyService, CollectionUtil, EventSources )
export class SortableComponent {

  @bindable object;
  @bindable params;

  nameOnUpdate = "";
  nameOnAdd = "";

  constructor( eventAggregator, surveyService, collectionUtil, eventSources ) {
    this.eventAggregator = eventAggregator;
    this.surveyService = surveyService;
    this.collectionUtil = collectionUtil;
    this.eventSources = eventSources;
    this.test = "test";
  }

  /**
   * Attached
   * Called when view is attached
   *
   */
  attached() {
    if( !this.params.editMode ) return;

    this.nameOnUpdate = 'sortedList_' + this.object.id + '.onUpdate';
    this.nameOnAdd = 'sortedList_' + this.object.id + '.onAdd';

    this.setupTarget( document.getElementById( 'sortable-list_' + this.object.id ), '.sorted-element_' + this.object.id, true, 'elements_' + this.object.id );

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

        that.object.elements.splice( evt.newIndex, 0, itemInstance );

        var i = 0;
        that.object.elements.forEach( function ( element ) {
          console.log( element );
          element.index = i;
          i++;
        } );

      }
    } );


    // // Events for when sorting takes place, we need to update the array to let
    // // Aurelia know that changes have taken place and our repeater is up-to-date
    // this.onUpdateSubscribe = this.eventAggregator.subscribe( that.nameOnUpdate, evt => {
    //   // The item being dragged
    //   let el = evt.item;
    //
    //   // Old index position of item
    //   let oldIndex = evt.oldIndex;
    //
    //   // New index position of item
    //   let newIndex = evt.newIndex;
    //
    //   that.collectionUtil.updatePositions( newIndex, oldIndex, that.object, true );
    //
    //   if( that.object.type === 'scales' ){
    //     let data = {oldIndex:oldIndex, newIndex:newIndex};
    //     this.eventAggregator.publish( that.object.id + '-swap-scales', data );
    //   }
    //
    // } );
  }

  /**
   * Setup Target
   * Handles setting the drag target destination for dragged items
   *
   * @param el (string)
   * @param sort (boolean)
   * @param group (object)
   */
  setupTarget( el, sort = true, group = 'group_' + this.object.id ) {
    let that = this;
    let name = "sorted_" + that.object.id;
    new sortable( el, {
      name: name,
      sort: sort,
      group: false,

      onAdd: evt => {
        that.eventAggregator.publish( that.nameOnAdd, evt );
      },
      onUpdate: evt => {

        let oldIndex = evt.oldIndex;
        let newIndex = evt.newIndex;
        let scaleIndex;

        if( that.object.type === 'steps' ){
          scaleIndex = that.object.elements[0].scaleIndex;
        }

        let data = {
          oldIndex: oldIndex,
          newIndex: newIndex,
          qNumber: that.object.elements[0].qNumber,
          type: that.object.type, //sortable list identificator
          scaleIndex: scaleIndex,
        };

        that.eventSources.addEvent( 'sortable.update', data );
        // that.eventAggregator.publish( that.nameOnUpdate, evt );
      }
    } );
  }

  detached() {
    if( !this.params.editMode ) return;
    //clean up the subscription when app component is removed from the DOM
    // this.onUpdateSubscribe.dispose();
    this.onAddSubscribe.dispose();

  }
}
