import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {ClientService} from "../services/client-service";
import {HttpClient} from 'aurelia-fetch-client';
import {NavigationService} from "../services/navigation-service";
import {Ui} from "../ui";


@inject( ClientService, HttpClient, NavigationService, Ui )
export class Dashboard extends Ui {
  title = 'Dashboard';

  info = "";

  constructor( clientService, http, navigationService, ...rest ){
    super(...rest);
    this.clientService = clientService;
    this.http = http;
    this.navigationService = navigationService;
  }

  activate(){
    let that = this;
    let buttons = [
      {
        title: 'createSurvey', action: function () {
        that.navigationService.goTo( that.navigationService.NAV_SURVEY );
      }
      }
    ];

    this.navigationService.setButtons( buttons );
  }

}
