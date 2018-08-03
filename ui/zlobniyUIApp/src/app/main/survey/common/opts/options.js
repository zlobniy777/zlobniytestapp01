import 'css/survey.css';

import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";

@inject( EventAggregator, SurveyHelper )
export class options {

  @bindable item;

  constructor( eventAggregator, surveyHelper ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
  }

  addItem(  ){
    let option;
    if( this.item.type === 'scale' ){
      option = this.surveyHelper.createOption(
        undefined,
        'new option',
        'scale-option',
        this.item.id,
        this.item.options.elements.length,
        true,
        undefined,
        this.item.question,
        this.item.options.id,
        [],
      );
    } else {
      let scaleGroup = this.surveyHelper.createScaleGroup( this.item.scales.elements );

      option = this.surveyHelper.createOption(
        undefined,
        'new option',
        'closed-option',
        this.item.id,
        this.item.options.elements.length,
        true,
        undefined,
        this.item,
        this.item.options.id,
        scaleGroup,
      );
    }

    this.item.options.elements.push( option );

    if( this.item.type === 'scale' ){
      // add new item in scale index = this.item.index
      console.log('add item to scale ' + this.item.index );
      let itemIndex = this.item.index;

      this.item.question.options.elements.forEach( function ( element ) {
        let scaleGroup = element.scaleGroup[itemIndex];
        scaleGroup.options.push( {index:scaleGroup.options.length, selected:false} );
      } );
    }
  }

  removeItem( index ){
    this.surveyHelper.deleteItem( this.item.options.elements, index );

    if( this.item.type === 'scale' ){
      let itemIndex = this.item.index;

      this.item.question.options.elements.forEach( function ( element ) {
        let scaleGroup = element.scaleGroup[itemIndex];
        scaleGroup.options.splice( index, 1 );

        var i = 0;
        scaleGroup.options.forEach(function( element ) {
          element.index = i;
          i++;
        });

      } );
    }

  }

  changeOption( data ){
    for ( let element of this.item.options.elements ) {
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
    this.item.options.selected = data;
  }

  attached() {
    let that = this;
    this.removeOptionSub = this.eventAggregator.subscribe( this.item.options.id + '-remove', index => {
      that.removeItem( index );
    } );
    this.changeOptionSub = this.eventAggregator.subscribe( this.item.options.id + '-change', data => {
      that.changeOption( data );
    } );
    this.changeOptionMatrixSub = this.eventAggregator.subscribe( this.item.options.id + '-change-matrix', data => {
      that.changeMatrixOption( data );
    } );

  }

  detached() {
    this.removeOptionSub.dispose();
    this.changeOptionSub.dispose();
    this.changeOptionMatrixSub.dispose();
  }

}
