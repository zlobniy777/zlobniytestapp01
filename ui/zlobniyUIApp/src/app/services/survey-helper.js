import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( EventAggregator )
export class SurveyHelper {

  constructor( eventAggregator ) {
    this.eventAggregator = eventAggregator;
  }

  deleteItem( listOfItems, index ){
    listOfItems.splice( index, 1 );
    this.updateIndex( listOfItems );
  }

  deleteQuestion( surveyModel, index ){
    let deletedQuestion = surveyModel.questionnaire.elements[index];
    surveyModel.questionnaire.elements.splice( index, 1 );
    this.updateIndex( surveyModel.questionnaire.elements );
    if( deletedQuestion.selected ){
      if( surveyModel.questionnaire.elements.length > 0 ){
        let question = surveyModel.questionnaire.elements[index];
        this.selectQuestion( question, surveyModel, true );
      }else{
        this.eventAggregator.publish( 'show-settings', undefined );
      }
    }
  }

  selectQuestion( question, surveyModel, isNew ){
    let that = this;
    if( isNew || !question.selected ){
      that.doSelect( question, surveyModel );
    }else if( isNew ){
      that.doSelect( question, surveyModel );
    }
  }

  doSelect( question, surveyModel ){
    // deselect all question
    for ( let quest of surveyModel.questionnaire.elements ) {
      quest.selected = false;
    }
    // select current question, on clicked
    question.selected = true;
    // update settings, set question settings from selected question, isToggle false = not hide settings
    // window if it has opened, and open if closed.
    this.eventAggregator.publish( 'show-settings', {settings: question.settings, isToggle: false} );
  }

  addQuestion( id, questionType, title, index, options, scales, surveyModel ){
    let questionNumber = surveyModel.questionnaire.elements.length;

    let question = this.createQuestion( id, questionType, title, questionNumber, options, scales, false, true );
    // select new question
    this.selectQuestion( question, surveyModel, true );

    this.insertElement( surveyModel.questionnaire.elements, question, index );
  }

  createQuestion( id, questionType, title, qIndex, options, scales, isSelected, isNew ){

    let question = {};
    let questionNumber = parseInt( qIndex ) + 1;
    question.title = isNew ? this.createNewTitle( title, questionNumber ) : title;
    question.id =  id !== undefined ? id : questionNumber;
    question.settings = this.createQuestionSettings( questionType );
    question.selected = isSelected;

    switch ( questionType ){
      case 'closed':
        this.createClosedQuestion( question, options, scales );
        break;
      case 'matrix':
        this.createMatrixQuestion( question, options, scales );
        break;
      default:
        console.log( 'unsupported question type ' + questionType );
        break;
    }

    return question;
  }

  createNewTitle( title, questionNumber ){
    return title + " " + questionNumber;
  }

  createMatrixQuestion( question, options, scales ){
    if( !options ){
      options = this.createDefaultOptions();
    }

    if( !scales ){
      scales = this.createDefaultScales();
    }

    question.settings.view = './../questions/subView/matrix.html';

    question.options = {};
    question.options.id = "options_"+question.id;
    question.options.type = "options";
    question.options.elements = [];
    let optionIndex = 0;
    for ( let option of options ) {
      question.options.elements.push( this.createOption( option.id, option.title, 'closed-option', question.id, optionIndex, false, 'common-option', question, question.options.id ) );
      optionIndex++;
    }

    question.scales = {};
    question.scales.id = "scales_"+question.id;
    question.scales.type = "scales";
    question.scales.cssClass = "scales-view";
    question.scales.elements = [];

    let scaleIndex = 0;
    for ( let scale of scales ) {
      question.scales.elements.push( this.createScale( scale.id, scale.title, 'scale-option', question.id, scaleIndex, false, scale.options.elements, question.scales.id, question ) );
      scaleIndex++;
    }
  }

  createClosedQuestion( question, options, scales ){
    if( !options ){
      options = this.createDefaultOptions();
    }

    if( !scales ){
      scales = this.createDefaultScales();
    }

    question.settings.view = './../questions/subView/closed-question.html';

    question.options = {};
    question.options.id = "options_"+question.id;
    question.options.type = "options";
    question.options.elements = [];
    let optionIndex = 0;
    for ( let option of options ) {
      question.options.elements.push( this.createOption( option.id, option.title, 'closed-option', question.id, optionIndex, false,'common-option', question, question.options.id ) );
      optionIndex++;
    }

    question.scales = {};
    question.scales.id = "scales_"+question.id;
    question.scales.type = "scales";
    question.scales.cssClass = "scales-view";
    question.scales.elements = [];

    let scaleIndex = 0;
    for ( let scale of scales ) {
      question.scales.elements.push( this.createScale( scale.id, scale.title, 'scale-option', question.id, scaleIndex, false, scale.options.elements, question.scales.id, question ) );
      scaleIndex++;
    }

  }

  insertElement( elements, element, index ){
    elements.splice( index, 0, element );
    this.updateIndex( elements );
  }

  updateIndex( elements ){
    var i = 0;
    elements.forEach(function( element ) {
      element.index = i;
      i++;
    });

  }

  createDefaultOptions(){
    let options = [
      {title: 'Option 1'},
      {title: 'Option 2'},
      {title: 'Option 3'}
    ];
    return options;
  }

  createDefaultScales(){

    let scales = [];
    scales.push( this.createDefaultScale( 'scale 1' ) );
    scales.push( this.createDefaultScale( 'scale 2' ) );
    scales.push( this.createDefaultScale( 'scale 3' ) );

    return scales;
  }

  createDefaultScale( title ){
    let scale = {};
    scale.title = title;
    scale.options = {};
    scale.options.elements = this.createDefaultScaleSteps();
    return scale;
  }

  createDefaultScaleSteps(){
    let scaleSteps = [
      {title: 'step 1'},
      {title: 'step 2'},
      {title: 'step 3'}
    ];
    return scaleSteps;
  }

  createOption( id, title, type, qId, index, isNew, cssClass, question, optionsId ){
    let option = {
      id: id,
      view: "./../common/option",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew,
      cssClass: cssClass ? cssClass : 'common-option',
      question: question,
      optionsId: optionsId,
    };
    return option;
  }

  createScale( id, title, type, qId, index, isNew, scaleSteps, scaleId, question ){
    let scale = {
      id: id,
      view: "./../common/scale",
      title: title,
      type: 'scale',
      qId: qId,
      index: index,
      isNew: isNew,
      scaleId: scaleId,
      question: question,
    };

    scale.options = [];
    scale.options.id = "steps_"+index+"_"+qId;
    scale.options.cssClass = "scale-steps";
    scale.options.type = "steps";
    scale.options.elements = [];
    let stepIndex = 0;
    for ( let step of scaleSteps ) {
      scale.options.elements.push( this.createOption( step.id, step.title, type, qId, stepIndex, false, undefined, question, scale.options.id ) );
      stepIndex++;
    }

    return scale;
  }

  createQuestionSettings( type ){
    let settings = {};
    settings.availableQuestionTypes = this.getAvailableQuestionTypes();
    settings.questionType = type;
    settings.layout = 'radio';

    return settings;
  }

  getAvailableQuestionTypes(){

    let available = [
      {type:'closed', title:'Only one answer', view: './../questions/subView/closed-question.html'},
      {type:'matrix', title:'Matrix', view: './../questions/subView/matrix.html'},
    ];

    return available;
  }



}
