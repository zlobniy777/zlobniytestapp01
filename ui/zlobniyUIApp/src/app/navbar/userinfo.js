import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {Client} from "../services/client";
import {Ui} from "../ui";

@inject( HttpClient, Router, Client, Ui )
export class Userinfo extends Ui {

  constructor(http, router, client, ...rest) {
    super(...rest);
    this.http = http;
    this.router = router;
    this.client = client;
  }

  logOff() {
    console.log('log off action: ');
  }

}
