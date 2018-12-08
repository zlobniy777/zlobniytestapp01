import {inject} from 'aurelia-framework';
import {SurveyHelper} from "../services/survey-helper";

@inject( SurveyHelper )
export class SurveyModelTransformer {

  constructor( surveyHelper ) {
    this.surveyHelper = surveyHelper;
  }

  serialize( surveyModel ){
    let data = this.clone( surveyModel );

    data.questionnaire.questions = [];

    for ( let question of data.questionnaire.elements ) {

      question.type = question.settings.questionType;

      if( question.options ){

        let options = [];
        for ( let option of question.options.elements ) {
          let opt = option;
          options.push( opt );
        }
        question.options = options;

      }

      if( question.scales ){
        let scales = [];
        for ( let scale of question.scales.elements ) {
          let nScale = scale;
          let scaleSteps = [];
          delete nScale.question;
          for ( let scaleStep of scale.options.elements ) {
            let nScaleStep = scaleStep;
            scaleSteps.push( nScaleStep );
          }

          nScale.options = scaleSteps;
          scales.push( nScale );
        }
        question.scales = scales;
      }

    }

    data.questionnaire.questions = data.questionnaire.elements;
    delete data.questionnaire.elements;

    return data;
  }

  deSerialize( data ){
    let that = this;
    let questions = data.questionnaire.questions;

    data.questionnaire.elements = [];
    let qIndex = 0;
    for ( let question of questions ) {
      let scales;
      if( question.scales ){
        scales = [];
        let index = 0;
        for ( let scale of question.scales ) {
          let nScale = Object.assign({}, scale);
          nScale.id = scale.id;
          nScale.title = scale.title;
          nScale.name = "scale_" + index;
          nScale.options = {};
          nScale.options.elements = scale.options;
          scales.push( nScale );
          index++;
        }
      }

      let newQuestion = that.surveyHelper.createQuestion( question.id, question.type, question.title, qIndex, question.options, scales, false, false, question.settings );
      this.surveyHelper.insertElement( data.questionnaire.elements, newQuestion, qIndex );
      qIndex++;
    }

    data.questionnaire.elements[data.questionnaire.elements.length-1].isLast = true;
    data.type = "SurveyModel";

    delete data.questionnaire.questions;

    return data;
  }

  clone(obj) {
    let that = this;
    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
    else
      var temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = that.clone(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

}
