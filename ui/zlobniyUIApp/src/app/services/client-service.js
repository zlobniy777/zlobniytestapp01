import {inject} from 'aurelia-framework';
import {NavigationService} from "./navigation-service";
import {HttpService} from "./http-service";

@inject( NavigationService, HttpService )
export class ClientService {

  test = false;
  clientInfo = {};
  hasLogged;

  constructor(  navigationService, httpService ) {
    console.log('constructor client service: ');
    this.navigationService = navigationService;
    this.http = httpService;
    this.loginAction();
  }

  attached(){
    console.log('attached client service: ');
  }

  logOff(){
    let that = this;
    let clientData = this.clientInfo;

    let promis = this.http.post( 'api/logout', clientData );
    promis.then(function(response) {
      console.log('response', response)
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      if( json.status ){
        that.clientInfo = {};
        that.hasLogged = false;
        that.navigationService.setButtons( [] );
        that.navigationService.setTitle( {} );
        that.navigationService.goTo( that.navigationService.NAV_START_PAGE );
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });

  }

  loginAction( clientData ) {
    if( clientData === undefined ){
      clientData = {};
    }

    if( this.ifTest( clientData ) ) return;

    let that = this;

    console.log('Login action: ' + clientData );
    let promise = this.http.post( 'api/login', clientData );
    promise.then(function(response) {
      console.log('response', response)
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      that.clientInfo = json;
      that.hasLogged = json.hasLogged;
      if ( json.hasLogged ) {
        console.log( "login success" );
        that.navigationService.goTo( that.navigationService.NAV_DASHBOARD );
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });

  }

  ifTest( clientData ){
    if( clientData.login === 'test' ){
      this.clientInfo = { id:'0', login:'test', hasLogged: true, name: 'Test'};
      this.hasLogged = true;
      this.navigationService.goTo( this.navigationService.NAV_DASHBOARD );
      return true;
    }
    return false;
  }

}
