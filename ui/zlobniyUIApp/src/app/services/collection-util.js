import {inject} from 'aurelia-framework';
import {SurveyHelper} from './survey-helper';

@inject( SurveyHelper )
export class CollectionUtil {

  constructor( surveyHelper ) {
    this.surveyHelper = surveyHelper;
  }

  updatePositions( newIndex, oldIndex, elementsHolder, withUpdate ){
    if (newIndex != oldIndex) {
      let elements = elementsHolder.elements;

      if( oldIndex > newIndex ){
        elements[oldIndex].index = newIndex;
        for( var i = newIndex; i < oldIndex ; i++ ){
          elements[i].index = elements[i].index + 1;
        }
      }else{
        elements[oldIndex].index = newIndex;
        for( var i = newIndex; i > oldIndex ; i-- ){
          elements[i].index = elements[i].index - 1;
        }
        if( elements.length === 2 && withUpdate ){
          elementsHolder.elements = this.updateArray( elementsHolder.type, elements );
        }

      }

      this.sort( elementsHolder.elements );
      this.surveyHelper.updateIndex( elementsHolder.elements );
    }
  }

  updateArray( type, elements ){
    let that = this;
    switch ( type ){
      case 'questionnaire':
        return that.updateQuestionsArray( elements );
      case 'options':
        return that.updateOptions( elements );
      case 'scales':
        return that.updateScales( elements );
      case 'steps':
        return that.updateOptions( elements );
      default:
        console.log( 'unsupported type ' + type );
        return elements;
    }
  }

  updateScales( elements ){
    let that = this;
    let copyElements = [];
    for ( let element of elements ) {
      let newElement = that.surveyHelper.createScale(
        element.id,
        element.title,
        element.type,
        element.qId,
        element.index,
        false,
        element.options.elements,
        element.scaleId,
        element.qNumber,
      );
      this.surveyHelper.insertElement( copyElements, newElement, element.index );
    }
    return copyElements;
  }

  updateOptions( elements ){
    let that = this;
    let copyElements = [];
    for ( let element of elements ) {
      let newElement = that.surveyHelper.createOption(
        element.id,
        element.title,
        element.type,
        element.qId,
        element.index,
        false,
        element.cssClass,
        element.optionsId,
        element.scaleGroup,
        element.view,
        element.qNumber,
        element.scaleIndex,
        );
      this.surveyHelper.insertElement( copyElements, newElement, element.index );
    }
    return copyElements;
  }

  updateQuestionsArray( questions ){
    let that = this;
    let copyQuestions = [];
    for ( let question of questions ) {
      let newQuestion = that.surveyHelper.createQuestion(
        question.id,
        question.settings.questionType,
        question.title,
        question.index,
        question.options.elements,
        question.scales.elements, question.selected, false, undefined );
      this.surveyHelper.insertElement( copyQuestions, newQuestion, question.index );
    }
    return copyQuestions;
  }

  sort( elements ){
    elements.sort( function compare(a, b) {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    } );
  }

}
