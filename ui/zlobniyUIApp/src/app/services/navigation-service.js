import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';


@inject( Router )
export class NavigationService {

  NAV_DASHBOARD = "/dashboard";
  NAV_SURVEY = "/survey";
  NAV_START_PAGE = "/";

  objectTitle;
  buttons = [];

  constructor( router ) {
    this.router = router;
    this.objectTitle = {};
  }

  goTo( path ) {
    this.router.navigate( path );
  }

  setButtons( buttons ){
    this.buttons = buttons;
  }

  setTitle( title, editMode ){
    this.objectTitle = title;
    this.editMode = editMode;
  }

}
