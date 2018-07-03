import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {ClientService} from "./services/client-service";

@inject( Element, HttpClient, Router, ClientService )
export class Ui {

  name = "ui";

  constructor( element, http, router, clientService ) {
    this.http = http;
    this.router = router;
    this.element = element;
    this.clientService = clientService;
  }

}
