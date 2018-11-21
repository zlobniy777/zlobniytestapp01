import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class options {

  @bindable question;
  @bindable params; // question selected and we show controls (like add, remove buttons)

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  addItem( event ) {
    let scaleGroup = this.surveyHelper.createScaleGroup( this.question.scales.elements );

    let option = this.surveyHelper.createOption(
      undefined,
      '',
      'closed-option',
      this.question.id,
      this.question.options.elements.length,
      true,
      undefined,
      this.question.options.id,
      scaleGroup,
      "./../common/opts/option"
    );

    this.question.options.elements.push( option );

    event.stopImmediatePropagation();
    //e.stopPropagation();
  }

  removeItem( index ){
    // delete item
    this.surveyHelper.deleteItem( this.question.options.elements, index );
  }

  addScaleSubGroupItem( scaleStepIndex ){
    // add new item in scale index = this.item.index
    this.question.options.elements.forEach( function ( element ) {
      let scaleGroup = element.scaleGroup[scaleStepIndex];
      scaleGroup.options.push( {index:scaleGroup.options.length, selected:false} );
    } );
  }

  removeScaleSubGroupItem( scaleIndex, scaleStepIndex ){
    this.question.options.elements.forEach( function ( element ) {
      let scaleGroup = element.scaleGroup[scaleIndex];
      scaleGroup.options.splice( scaleStepIndex, 1 );

      var i = 0;
      scaleGroup.options.forEach(function( element ) {
        element.index = i;
        i++;
      });

    } );
  }

  changeOption( data ){
    for ( let element of this.question.options.elements ) {
      if( element.index === data.item.index ){
        if( data.checked ){
          element.selected = true;
        }else{
          element.selected = false;
        }
      }else{
        element.selected = false;
      }
    }
  }

  changeMatrixOption( data ){
    this.question.options.selected = data;
  }

  activate( model ) {

    this.params = model.params;
    this.question = model.question;

    let that = this;

    this.removeOptionSub = this.eventAggregator.subscribe( this.question.options.id + '-remove', index => {
      that.removeItem( index );
    } );
    this.changeOptionSub = this.eventAggregator.subscribe( this.question.options.id + '-change', data => {
      that.changeOption( data );
    } );
    this.changeOptionMatrixSub = this.eventAggregator.subscribe( this.question.options.id + '-change-matrix', data => {
      that.changeMatrixOption( data );
    } );
    this.removeFromScaleGroupEvent = this.eventAggregator.subscribe( this.question.options.id + '-remove-scale-sub-group', data => {
      that.removeScaleSubGroupItem( data.scaleIndex, data.scaleStepIndex );
    } );
    this.addToScaleGroupEvent = this.eventAggregator.subscribe( this.question.options.id + '-add-scale-sub-group', index => {
      that.addScaleSubGroupItem( index );
    } );

  }

  detached() {
    this.removeOptionSub.dispose();
    this.changeOptionSub.dispose();
    this.changeOptionMatrixSub.dispose();
    this.removeFromScaleGroupEvent.dispose();
    this.addToScaleGroupEvent.dispose();
  }

}
