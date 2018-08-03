import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CollectionUtil} from "../../services/collection-util";
import {SurveyHelper} from "../../services/survey-helper";

import sortable from 'sortablejs';

@inject(EventAggregator, SurveyHelper, CollectionUtil)
export class Dragdrop {

  @bindable surveyModel;

  constructor( eventAggregator, surveyHelper, collectionUtil ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.collectionUtil = collectionUtil;

    this.availableItems = this.surveyHelper.getAvailableQuestionTypes();
  }

  // add new question by double click on availableItems.item
  addQuestion( item ){
      this.surveyHelper.addQuestion( undefined, item.type, item.title, this.surveyModel.questionnaire.elements.length, undefined, undefined, this.surveyModel );
  }

  selectQuestion( question ){
      this.surveyHelper.selectQuestion( question, this.surveyModel, false );
  }

  removeQuestion( index ){
    this.surveyHelper.deleteQuestion( this.surveyModel, index );
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
    this.removeQuestionSub.dispose();
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

        that.surveyHelper.addQuestion( undefined, questionType, sourceTitle, evt.newIndex, undefined, undefined, that.surveyModel );
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

      that.collectionUtil.updatePositions( newIndex, oldIndex, that.surveyModel.questionnaire, true );
    });

    this.removeQuestionSub = this.eventAggregator.subscribe( 'remove-question', index => {
      that.removeQuestion( index );
    } );

    this.removeQuestionSub = this.eventAggregator.subscribe( 'select-question', question => {
      that.selectQuestion( question );
    } );

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
      delay: 10,
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

}

