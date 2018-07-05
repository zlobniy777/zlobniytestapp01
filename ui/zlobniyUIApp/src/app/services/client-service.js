import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {NavigationService} from "./navigation-service";

@inject( HttpClient, NavigationService )
export class ClientService {

  test = false;
  clientInfo = {};
  hasLogged;

  constructor( http, navigationService ) {
    this.http = http;
    this.navigationService = navigationService;
    this.loginAction();
  }

  logOff(){
    let that = this;
    let clientData = this.clientInfo;

    this.http.fetch('api/logout', {
      method: 'post',
      body: JSON.stringify( clientData ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json() )
      .then(response => {
        if( response.status ){
          that.clientInfo = {};
          that.hasLogged = false;
          that.navigationService.setButtons( [] );
          that.navigationService.setTitle( {} );
          that.navigationService.goTo( this.navigationService.NAV_START_PAGE );
        }
      });

  }

  loginAction( clientData ) {
    if( clientData === undefined ){
      clientData = {};
    }
    let that = this;
    console.log('Login action: ' + clientData );

    if( clientData.login === 'test' ){
      this.clientInfo = { id:'0', login:'test', hasLogged: true, name: 'Test'};
      this.hasLogged = true;

      this.navigationService.goTo( this.navigationService.NAV_DASHBOARD );
    }

    this.http.fetch('api/login', {
      method: 'post',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json() )
      .then(response => {
        this.apiKey = response.APIKey;
        that.clientInfo = response;
        that.hasLogged = response.hasLogged;
        console.log(response);
        if (response.hasLogged) {
          console.log("login success");
          this.navigationService.goTo( this.navigationService.NAV_DASHBOARD );
        }
      });

  }
}
