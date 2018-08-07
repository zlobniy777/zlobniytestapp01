import 'css/survey.css';

import {bindable, computedFrom, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SurveyHelper} from "../../../../services/survey-helper";
import {CollectionUtil} from "../../../../services/collection-util";

@inject( EventAggregator, SurveyHelper, CollectionUtil )
export class scales {

  @bindable question;
  @bindable params; // question selected and we show controls (like add, remove buttons)

  constructor( eventAggregator, surveyHelper, collectionUtil ) {
    this.eventAggregator = eventAggregator;
    this.surveyHelper = surveyHelper;
    this.collectionUtil = collectionUtil;
  }

  // change scales in option for matrix.
  changeScalesGroup( oldIndex, newIndex ){
    let that = this;

    for ( let element of this.question.options.elements ) {
      let elementsHolder = {};
      elementsHolder.elements = element.scaleGroup;
      that.collectionUtil.updatePositions( newIndex, oldIndex, elementsHolder, false );
    }

  }

  attached() {
    let that = this;
    this.removeScaleSub = this.eventAggregator.subscribe( that.question.scales.id + '-remove', index => {
      that.removeScale( index );
    } );

    console.log( this.question.scales.id );
    this.changeScalesSub = this.eventAggregator.subscribe( this.question.scales.id + '-swap-scales', data => {
      that.changeScalesGroup( data.oldIndex, data.newIndex );
    } );
  }

  @computedFrom( 'question.scales.elements.length' )
  get canAdd(){
    return this.question.scales.elements.length <= 2;
  }

  addScale(){
    let that = this;
    let scale = this.surveyHelper.createScale(
      undefined,
      'new scale',
      this.question.settings.questionType,
      this.question.id,
      this.question.scales.elements.length,
      false,
      this.surveyHelper.createDefaultScaleSteps(),
      this.question.scales.id
    );
    let groupIndex = this.question.scales.elements.length;

    this.question.scales.elements.push( scale );

    this.question.options.elements.forEach( function ( element ) {
      let group = that.surveyHelper.createGroup( scale, groupIndex, scale.name, element.name );
      element.scaleGroup.push( group );
    } );

  }

  removeScale( index ){
    this.surveyHelper.deleteItem( this.question.scales.elements, index );

    this.question.options.elements.forEach( function ( element ) {
      element.scaleGroup.splice( index, 1 );

      var i = 0;
      element.scaleGroup.forEach(function( element ) {
        element.index = i;
        i++;
      });

    } );

  }

  detached() {
    this.removeScaleSub.dispose();
    this.changeScalesSub.dispose();
  }


}
