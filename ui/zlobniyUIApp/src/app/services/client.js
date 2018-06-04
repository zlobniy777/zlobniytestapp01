import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject( HttpClient, Router )
export class Client {

  test = false;
  clientInfo = {};
  isWizard = false;
  surveySettings = {};
  editedModel;

  constructor( http, router ) {
    this.http = http;
    this.router = router;
    this.initSurveySettings();
  }

  initSurveySettings() {
    this.surveySettings.showQuestionNumber = true;
  }

  setEditedModel( model ){
    console.log( 'start editing ' + model.name );
    if( this.editedModel ){
      this.editedModel.finishEdit();
    }
    this.editedModel = model;
  }

  unsetEditedModel(){
    if( this.editedModel ){
      this.editedModel.finishEdit();
      this.editedModel = undefined;
    }
  }

  isEditedModel(){
    return this.editedModel !== undefined;
  }

  loginAction( clientData ) {
    console.log('Login action: ' + clientData );

    var _this = this;

    this.clientInfo = {login:'test'};

    this.http.fetch('api/login', {
      method: 'post',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.apiKey = response.APIKey;
        _this.clientInfo = response;
        console.log(response);
        if (response.hasLogged) {
          console.log("success");
          this.router.navigate("/dashboard");
        }
      });

  }
}
