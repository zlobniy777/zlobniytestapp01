import 'css/main.css';

export class App {

  loginPlaceholder = 'Please enter valid login';
  test = 'Test from app.js';

  constructor( http ) {
    this.message = 'Hello World 12!';
  }

  configureRouter( config, router ) {
    this.router = router;
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.map( [
      {route: '/', name: 'welcome', moduleId: PLATFORM.moduleName( "./welcome" ), nav: false, title: 'Welcome'}, // <- first page
      {route: '/registration', name: 'regForm', moduleId: PLATFORM.moduleName( "./app/registration/registration" ), nav: true, title: 'Registration Form'},
      {route: '/dashboard', name: 'loginForm', moduleId: PLATFORM.moduleName( "./app/main/dashboard" ), nav: false, title: 'Dashboard'},
      {route: '/survey', name: 'survey', moduleId: PLATFORM.moduleName( "./app/main/survey/survey" ), nav: false, title: 'Survey'},
      {route: '/survey/:id', name: 'survey', moduleId: PLATFORM.moduleName( "./app/main/survey/survey" ), nav: false, title: 'Edit survey'},
      {route: '/survey-viewer/:checksum', name: 'survey-viewer', moduleId: PLATFORM.moduleName( "./app/main/respondent/survey-viewer" ), nav: false, title: 'Open survey'},
    ] );
  }

}
