import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CollectionUtil} from "../../services/collection-util";
import {SurveyHelper} from "../../services/survey-helper";
import {EventSources} from "../../services/event-sources";

import sortable from 'sortablejs';

@inject(EventAggregator, SurveyHelper, CollectionUtil, EventSources)
export class Dragdrop {

  @bindable surveyModel;

  constructor( eventAggregator, surveyHelper, collectionUtil, eventSources ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.collectionUtil = collectionUtil;
    this.eventSources = eventSources;

    this.availableItems = this.surveyHelper.getAvailableQuestionTypes();
  }

  addByDoubleClick( event ){
    //this.eventSources.addEvent( 'dragTarget.onAdd', event );
    //this.addQuestion( item );
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

  findObject( obj, key, path ){
    let that = this;

    if (typeof obj !== 'object') {
      return;
    }

    for ( let k in obj ) {
      if (obj.hasOwnProperty(k)) {

        let t = path;
        let v = obj[k];
        if (!path) {
          path = k;
        }
        else {
          path = path + '.' + k;
        }

        if ( obj[k] && obj[k].type && obj[k].type === key ) {
          return obj[k];
        }
        else {
          path = t;
        }

        if (typeof v !== 'object') {
          path = t;
        }
        let res = that.findObject(v, key, path);
        if (res) {
          return res;
        }
      }
    }

  }

  initSubscribers(){
    this.initQuestionUpdateSubscriber();
    this.addOptionToQuestionSubscriber();
    this.removeOptionFromQuestionSubscriber();
    this.addScaleSubscriber();
    this.removeScaleSubscriber();
    this.addScaleOptionSubscriber();
    this.removeScaleOptionSubscriber();
    this.updateSortableSubscriber();
  }

  updateSortableSubscriber(){

    let that = this;

    // Events for when sorting takes place, we need to update the array to let
    // Aurelia know that changes have taken place and our repeater is up-to-date
    this.updateSortableSub = this.eventAggregator.subscribe( 'sortable.update', data => {

      let qNumber = data.qNumber;
      let scaleIndex = data.scaleIndex;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, qNumber );
      let object;

      if( data.type === 'steps' ){
        object = that.surveyHelper.findScaleByIndex( question, scaleIndex ).options;
      }else{
        object = that.findObject( question, data.type, '' );
      }

      // Old index position of item
      let oldIndex = data.oldIndex;

      // New index position of item
      let newIndex = data.newIndex;

      that.collectionUtil.updatePositions( newIndex, oldIndex, object, true );

      if( object.type === 'scales' ){
        // changeScalesGroup( oldIndex, newIndex )
        for ( let element of question.options.elements ) {
          let elementsHolder = {};
          elementsHolder.elements = element.scaleGroup;
          that.collectionUtil.updatePositions( newIndex, oldIndex, elementsHolder, false );
        }
      }

    } );

  }

  initQuestionUpdateSubscriber(){

    let that = this;

    this.questionUpdateSub = this.eventAggregator.subscribe('update.question', event => {

      let questionNumber = event.questionNumber;
      let parameters = event.parameters;

      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );

      for (const parameter of parameters) {
        that.updateParameter( question, parameter.key, '', parameter.value );
      }

    });

  }

  removeScaleOptionSubscriber(){

    let that = this;
    this.removeScaleOptionSub = this.eventAggregator.subscribe( 'scaleOption.remove', event => {

      let questionNumber = event.questionNumber;
      let scaleIndex = event.scaleIndex;
      let scaleOptionIndex = event.optionIndex;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );
      let scale = that.surveyHelper.findScaleByIndex( question, scaleIndex );

      // delete item
      this.surveyHelper.deleteItem( scale.options.elements, scaleOptionIndex );
      // when we delete scale step we need update scaleGroup in question.options (row)
      question.options.elements.forEach( function ( element ) {
        let scaleGroup = element.scaleGroup[scaleIndex];
        scaleGroup.options.splice( scaleOptionIndex, 1 );

        var i = 0;
        scaleGroup.options.forEach(function( element ) {
          element.index = i;
          i++;
        });

      } );

    } );

  }

  addScaleOptionSubscriber(){

    let that = this;

    this.addScaleOptionSub = this.eventAggregator.subscribe('scaleOption.add', event => {

      let questionNumber = event.questionNumber;
      let scaleIndex = event.scaleIndex;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );
      let scale = that.surveyHelper.findScaleByIndex( question, scaleIndex );

      let option = this.surveyHelper.createOption(
        undefined,
        '',
        'scale-option',
        scale.id,
        scale.options.elements.length,
        true,
        'justify-content-center',
        scale.options.id,
        [],
        "./../common/opts/scale-option",
        scale.qNumber,
        scale.index,
      );

      scale.options.elements.push( option );

      question.options.elements.forEach( function ( element ) {
        let scaleGroup = element.scaleGroup[scaleIndex];
        scaleGroup.options.push( {index:scaleGroup.options.length, selected:false} );
      } );

    });

  }

  addScaleSubscriber(){

    let that = this;

    this.scalesAddSub = this.eventAggregator.subscribe('scales.add', event => {

      let questionNumber = event.questionNumber;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );

      let scale = this.surveyHelper.createScale(
        undefined,
        'new scale',
        question.settings.questionType,
        question.id,
        question.scales.elements.length,
        false,
        that.surveyHelper.createDefaultScaleSteps(),
        question.scales.id,
        question.number,
      );
      let groupIndex = question.scales.elements.length;

      question.scales.elements.push( scale );

      question.options.elements.forEach( function ( element ) {
        let group = that.surveyHelper.createGroup( scale, groupIndex, scale.name, element.name );
        element.scaleGroup.push( group );
      } );

    });

  }

  removeScaleSubscriber(){

    let that = this;

    this.scalesRemoveSub = this.eventAggregator.subscribe('scales.remove', event => {

      let questionNumber = event.questionNumber;
      let index = event.index;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );

      this.surveyHelper.deleteItem( question.scales.elements, index );

      question.options.elements.forEach( function ( element ) {
        element.scaleGroup.splice( index, 1 );

        var i = 0;
        element.scaleGroup.forEach(function( element ) {
          element.index = i;
          i++;
        });

      } );

    });

  }

  addOptionToQuestionSubscriber(){

    let that = this;

    this.addOptionToQuestionSub = this.eventAggregator.subscribe('option.add', event => {

      let questionNumber = event.questionNumber;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );
      let scaleGroup = this.surveyHelper.createScaleGroup( question.scales.elements );

      let option = this.surveyHelper.createOption(
        undefined,
        '',
        'closed-option',
        question.id,
        question.options.elements.length,
        true,
        undefined,
        question.options.id,
        scaleGroup,
        "./../common/opts/option",
        question.number,
      );

      question.options.elements.push( option );

    });

  }

  removeOptionFromQuestionSubscriber(){
    let that = this;

    this.optionRemoveSub = this.eventAggregator.subscribe('option.remove', event => {

      let questionNumber = event.questionNumber;
      let value = event.index;
      let question = that.surveyHelper.findQuestionByNumber( that.surveyModel, questionNumber );

      this.surveyHelper.deleteItem( question.options.elements, value );

    });
  }

  updateParameter(obj, key, path, newValue) {

    let that = this;

    if (typeof obj !== 'object') {
      return;
    }

    for ( let k in obj ) {
      if (obj.hasOwnProperty(k)) {

        let t = path;
        let v = obj[k];
        if (!path) {
          path = k;
        }
        else {
          path = path + '.' + k;
        }

        if (key === k) {
          obj[k] = newValue;
          return path;
        }
        else {
          path = t;
        }

        if (typeof v !== 'object') {
          path = t;
        }
        let res = that.updateParameter(v, key, path, newValue);
        if (res) {
          return res;
        }
      }
    }

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
    this.initSubscribers();
  }

  detached() {
    //clean up the subscription when app component is removed from the DOM
    this.eventTargetAdd.dispose();
    this.eventTargetUpdate.dispose();
    this.removeQuestionSub.dispose();
    this.selectQuestionSub.dispose();
    this.questionUpdateSub.dispose();
    this.addOptionToQuestionSub.dispose();
    this.scalesAddSub.dispose();
    this.scalesRemoveSub.dispose();
    this.optionRemoveSub.dispose();
    this.addScaleOptionSub.dispose();
    this.removeScaleOptionSub.dispose();
    this.updateSortableSub.dispose();
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
      if( evt.item.parentElement ){
        evt.item.parentElement.removeChild(evt.item);
      }

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

    this.selectQuestionSub = this.eventAggregator.subscribe( 'select-question', question => {
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
        that.eventSources.addEvent( 'dragTarget.onAdd', evt );
      },
      onStart: evt => {
        // that.eventAggregator.publish('dragTarget.onStart', evt);
      },
      onUpdate: evt => {
        that.eventSources.addEvent( 'dragTarget.onUpdate', evt );
      }
    });
  }

}

