import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {Client} from "../services/client";
import {HttpClient} from 'aurelia-fetch-client';
import {NavigationService} from "../services/navigation-service";
import {Ui} from "../ui";


@inject( Client, HttpClient, NavigationService, Ui )
export class Dashboard extends Ui {
  title = 'Dashboard';

  info = "";

  constructor( client, http, navigationService, ...rest ){
    super(...rest);
    this.client = client;
    this.http = http;
    this.navigationService = navigationService;

    var that = this;



    // this.data = [
    //   {id:1, title:'Test mock', date:"21.06.2018 00:18"},
    // ];
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

  test(){
    console.log( this.client.clientInfo );
  }

}
