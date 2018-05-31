import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import sortable from 'sortablejs';

@inject(EventAggregator)
export class SortableComponent {

  elements = [];
  id = "";
  nameOnUpdate = "";
  nameOnAdd = "";

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    this.test = "test";
    // this.elements = [
    //   {path:"./../questions/option", title:'Test 1'},
    //   {path:"./../questions/option", title:'Test 2'},
    //   {path:"./../questions/option", title:'Test 3'},
    // ];

  }

  /**
   * Attached
   * Called when view is attached
   *
   */
  attached() {

    this.setupTarget(document.getElementById('sortable-list_'+this.id), '.sorted-element_'+this.id, true, 'elements_'+this.id);


  }

  sort(){
    this.elements.sort( function compare(a, b) {
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

  activate( item ){
    this.elements = item.options;
    this.id = item.id;

    this.nameOnUpdate = 'sortedList_'+this.id+'.onUpdate';
    this.nameOnAdd = 'sortedList_'+this.id+'.onAdd';

    this.eventListeners();
  }

  /**
   * Event Listeners
   * This is where event listeners for drag/drop events are registered
   *
   */
  eventListeners() {

    let that = this;

    // this.eventAggregator.subscribe('dragSource.onClone', evt => {
    //   var origEl = evt.item;
    //
    //   var cloneEl = evt.clone;
    //
    //   //origEl.innerHTML = "<div>TEST</div>";
    //
    // });
    //
    // this.eventAggregator.subscribe('dragTarget.onStart', evt => {
    //   var origEl = evt.item;
    //
    //   var cloneEl = evt.clone;
    //
    //   cloneEl.innerHTML = "<div>TEST</div>";
    //
    // });


    // Event triggered when item is added
    this.onAddSubscribe = this.eventAggregator.subscribe( that.nameOnAdd, evt => {
      let src = evt.from;
      let dest = evt.to;
      let item = evt.item;

      // When actual dragged item is dropped, we remove it and handle
      // updating the array for our repeater ourselves
      //evt.item.parentElement.removeChild(evt.item);

      // Dragging widget into new page
      if (item.dataset.type) {
        let type = item.dataset.type;
        let qId = item.dataset.value;
        let path = item.dataset.html;

        let itemInstance = {};
        itemInstance.type = type;
        itemInstance.qId = qId;
        itemInstance.path = path;
        itemInstance.name = type+'_'+qId;

        that.elements.splice(evt.newIndex, 0, itemInstance);

        var i = 0;
        that.elements.forEach(function(element) {
          console.log(element);
          element.index = i;
          i++;
        });

      }
    });


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
      if (newIndex != oldIndex) {

        if( oldIndex > newIndex ){
          that.elements[oldIndex].index = newIndex;
          for( var i = newIndex; i < oldIndex ; i++ ){
            that.elements[i].index = that.elements[i].index + 1;
          }
        }else{
          that.elements[oldIndex].index = newIndex;
          for( var i = newIndex; i > oldIndex ; i-- ){
            that.elements[i].index = that.elements[i].index - 1;
          }
        }

        that.sort();
      }
    });
  }

  /**
   * Setup Target
   * Handles setting the drag target destination for dragged items
   *
   * @param el (string)
   * @param sort (boolean)
   * @param group (object)
   */
  setupTarget(el, sort = true, group = 'group_'+this.id) {
    let that = this;
    let name = "sorted_"+that.id;
    new sortable(el, {
      name: name,
      sort: sort,
      group: false,

      onAdd: evt => {
        that.eventAggregator.publish( that.nameOnAdd, evt);
      },
      onUpdate: evt => {
        that.eventAggregator.publish( that.nameOnUpdate, evt);
      }
    });
  }

  detached(){
    //clean up the subscription when app component is removed from the DOM
    this.onUpdateSubscribe.dispose();
    this.onAddSubscribe.dispose();

  }
}
