import 'css/main.css';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';


@inject( HttpClient )
export class App {

  loginPlaceholder = 'Please enter valid login';
  test = 'Test from app.js';

  constructor( http ) {
    this.message = 'Hello World 12!';
    this.http = http;
  }

  goTo( route ) {
    this.router.navigate( route );
  }

  configureRouter( config, router ) {
    this.router = router;
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.map( [
      {route: '/', name: 'welcome', moduleId: PLATFORM.moduleName( "./welcome" ), nav: false, title: 'Welcome'}, // <- first page
      {route: '/login', name: 'loginForm', moduleId: PLATFORM.moduleName( "./app/loginForm" ), nav: true, title: 'Login Form'},
      {route: '/registration', name: 'loginForm', moduleId: PLATFORM.moduleName( "./app/regForm" ), nav: true, title: 'Registration Form'},
      {route: '/dashboard', name: 'loginForm', moduleId: PLATFORM.moduleName( "./app/dashboard" ), nav: false, title: 'Dashboard'},
    ] );
  }

}
