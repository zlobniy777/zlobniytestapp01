export class SurveyHelper {

  constructor( ) {
  }

  createQuestion( id, questionType, title, qIndex, options, scales ){

    let question = {};
    let questionNumber = parseInt( qIndex ) + 1;
    question.title = title + " " + questionNumber;
    question.id =  id !== undefined ? id : questionNumber;

    switch ( questionType ){
      case 'closed':
        this.createClosedQuestion( question, options );
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

  createMatrixQuestion( question, options, scales ){
    if( !options ){
      options = this.createDefaultOptions();
    }

    if( !scales ){
      scales = this.createDefaultScales();
    }

    question.type = 'matrix';
    question.view = './../questions/subView/matrix.html';

    question.options = {};
    question.options.id = "options_"+question.id;
    question.options.type = "options";
    question.options.elements = [];
    let optionIndex = 0;
    for ( let option of options ) {
      question.options.elements.push( this.createOption( option.id, option.title, question.type, question.id, optionIndex, false, 'common-option', question ) );
      optionIndex++;
    }

    question.scales = {};
    question.scales.id = "scales_"+question.id;
    question.scales.type = "scales";
    question.scales.cssClass = "scales-view";
    question.scales.elements = [];

    let scaleIndex = 0;
    for ( let scale of scales ) {
      question.scales.elements.push( this.createScale( scale.id, scale.title, question.type, question.id, scaleIndex, false, scale.scaleSteps ) );
      scaleIndex++;
    }
  }

  createClosedQuestion( question, options ){
    if( !options ){
      options = this.createDefaultOptions();
    }

    question.type = 'closed';
    question.view = './../questions/subView/closed-question.html';

    question.options = {};
    question.options.id = "options_"+question.id;
    question.options.type = "options";
    question.options.elements = [];
    let optionIndex = 0;
    for ( let option of options ) {
      question.options.elements.push( this.createOption( option.id, option.title, question.type, question.id, optionIndex, false ) );
      optionIndex++;
    }
  }

  insertQuestion( questions, question, index ){
    questions.splice( index, 0, question );
    this.updateIndex( questions );
  }

  updateIndex( questions ){

    var i = 0;
    questions.forEach(function( question ) {
      console.log(question);
      question.index = i;
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
    scale.scaleSteps = [
      {title: 'step 1'},
      {title: 'step 2'},
      {title: 'step 3'}
    ];
    return scale;
  }

  createOption( id, title, type, qId, index, isNew, cssClass, question ){
    let option = {
      id: id,
      view: "./../common/option",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew,
      cssClass: cssClass ? cssClass : 'common-option',
      question: question
    };
    return option;
  }

  createScale( id, title, type, qId, index, isNew, scaleSteps ){
    let scale = {
      id: id,
      view: "./../common/scale",
      title: title,
      type: type,
      qId: qId,
      index: index,
      isNew: isNew
    };

    scale.scaleSteps = [];
    scale.scaleSteps.id = "steps_"+index+"_"+qId;
    scale.scaleSteps.cssClass = "scale-steps";
    scale.scaleSteps.type = "steps";
    scale.scaleSteps.elements = [];
    let stepIndex = 0;
    for ( let step of scaleSteps ) {
      scale.scaleSteps.elements.push( this.createOption( step.id, step.title, type, qId, stepIndex, false ) );
      stepIndex++;
    }

    return scale;
  }

}
