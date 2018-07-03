import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {ClientService} from "../services/client-service";
import {Ui} from "../ui";

@inject( HttpClient, Router, ClientService, Ui )
export class UserInfo extends Ui {

  constructor(http, router, clientService, ...rest) {
    super(...rest);
    this.http = http;
    this.router = router;
    this.clientService = clientService;
  }

  doLogOff() {
    this.clientService.logOff();
    console.log('log off action: ');
  }

}
