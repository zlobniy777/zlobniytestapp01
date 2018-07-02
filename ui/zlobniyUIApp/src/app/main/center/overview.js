import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {Ui} from "../../ui";

@inject( SurveyService, Ui )
export class Overview extends Ui {

  title = "-";
  surveyInfoList = [];

  constructor( surveyService, router, http, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.router = router;
    this.http = http;
  }

  activate(){

    var that = this;

    // var data = [
    //   {id:1, title:'Test mock', creationDate:"21.06.2018 00:18"},
    //   {id:2, title:'Test mock 2', creationDate:"22.06.2018 00:18"},
    // ];

    this.surveyService.loadSurveys( this.surveyInfoList );

    // this.http.fetch( 'api/dashboard', {
    //   method: 'post',
    //   body: JSON.stringify( that.client.clientInfo ),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     this.apiKey = response.APIKey;
    //     that.surveyInfoList = response.surveys;
    //     that.title = response.title;
    //     console.log(response);
    //
    //   });

  }

}
