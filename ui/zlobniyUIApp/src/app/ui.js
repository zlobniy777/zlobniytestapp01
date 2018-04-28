import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject( HttpClient, Router )
export class Ui {
  client = {};


  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  test( value ){
    console.log('test from ui class ' + value);
  }


}
