import {inject} from 'aurelia-framework';
import {SurveyHelper} from "../services/survey-helper";

@inject( SurveyHelper )
export class SurveyModelTransformer {

  constructor( surveyHelper ) {
    this.surveyHelper = surveyHelper;
  }

  serialize( surveyModel ){
    // let data = JSON.parse(JSON.stringify( surveyModel ));
    let data = this.clone( surveyModel );
    // let data = Object.assign( {}, surveyModel );

    for ( let question of data.questionnaire.questions ) {

      if( question.options ){
        let options = [];
        for ( let option of question.options.elements ) {
          let opt = option;
          opt.question = undefined;
          options.push( opt );
        }
        question.options = options;
      }

      if( question.scales ){
        let scales = [];
        for ( let scale of question.scales.elements ) {
          let nScale = scale;
          let scaleSteps = [];
          for ( let scaleStep of scale.scaleSteps.elements ) {
            let nScaleStep = scaleStep;
            nScaleStep.question = undefined;
            scaleSteps.push( nScaleStep );
          }

          nScale.scaleSteps = scaleSteps;
          scales.push( nScale );
        }
        question.scales = scales;
      }

    }

    return data;
  }

  deSerialize( data ){
    let that = this;

    let questions = data.questionnaire.questions;

    data.questionnaire.questions = [];
    let qIndex = 0;
    for ( let question of questions ) {
      let newQuestion = that.surveyHelper.createQuestion( question.id, question.type, question.title, qIndex, question.options, question.scales );
      this.surveyHelper.insertQuestion( data.questionnaire.questions, newQuestion, qIndex );
      qIndex++;
    }

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
