import {inject} from 'aurelia-framework';
import {Client} from "../../services/client";
import {Ui} from "../../ui";
import {Router} from 'aurelia-router';

@inject( Client, Router,  Ui )
export class Overview extends Ui {

  constructor( client, router, ...rest ) {
    super(...rest);
    this.client = client;
    this.router = router;
  }

  createSurvey(){
    console.log('call add something ');
    this.router.navigate("/survey");
  }

}
