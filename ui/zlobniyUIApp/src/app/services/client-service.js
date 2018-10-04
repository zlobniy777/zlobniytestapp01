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

  detached() {

  }

  logOff(){
    let that = this;
    let clientData = this.clientInfo;

    let promis = this.http.post( 'logout', clientData );
    promis.then(function(response) {
      console.log('response', response);
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json);
      if( json.message === 'logout' ){
        that.clientInfo = {};
        that.clientInfo.hasLogged = false;
        window.localStorage.removeItem( 'token' );
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
    let promise = this.http.postLogin( clientData );
    promise.then(function( response ) {
      return response.json()
    }).then(function(json){
      console.log('json', json);
      if( json.token ){
        that.clientInfo = json;
        that.clientInfo.hasLogged = true;
        that.hasLogged = true;
        window.localStorage.setItem( 'token', json.token );
        if( that.navigationService.router.currentInstruction.config.name === 'welcome' ){
          that.navigationService.goTo( that.navigationService.NAV_DASHBOARD );
        }
      }
    }).catch(function(ex) {
      that.navigationService.setButtons( [] );
      that.navigationService.setTitle( {} );
      that.navigationService.goTo( that.navigationService.NAV_START_PAGE );
      console.log('failed', ex)
    });

  }

  registrationAction( data ){
    let that = this;
    let promise = this.http.registrationPost( data );
    promise.then(function( response ) {
      return response.json()
    }).then(function(json){
      console.log('json', json);
      if( json.token ){
        that.clientInfo = json;
        that.clientInfo.hasLogged = true;
        that.hasLogged = true;
        window.localStorage.setItem( 'token', json.token );
        if( that.navigationService.router.currentInstruction.config.name === 'regForm' ){
          that.navigationService.goTo( that.navigationService.NAV_DASHBOARD );
        }
      }
    }).catch(function(ex) {
      that.navigationService.setButtons( [] );
      that.navigationService.setTitle( {} );
      that.navigationService.goTo( that.navigationService.NAV_START_PAGE );
      console.log('failed', ex)
    });
  }

  ifTest( clientData ){
    if( clientData.username === 'test' ){
      this.clientInfo = { id:'0', username:'test', hasLogged: true, name: 'Test'};
      this.hasLogged = true;
      this.navigationService.goTo( this.navigationService.NAV_DASHBOARD );
      return true;
    }
    return false;
  }

}
