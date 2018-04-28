import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {Ui} from "../ui";

@inject( HttpClient, Router, Ui )
export class Navigation extends Ui{
  title = "navigation";


  constructor(...rest) {
    super(...rest);
    this.test('navi');
  }


}
