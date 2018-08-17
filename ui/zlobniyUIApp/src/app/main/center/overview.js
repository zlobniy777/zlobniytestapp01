import 'css/dashboard.css';

import {inject} from 'aurelia-framework';
import {SurveyService} from "../../services/survey-service";
import {NavigationService} from "../../services/navigation-service";
import {ContextMenu} from "../common/context-menu";
import {Popup} from "../common/popup";
import {DialogService} from "aurelia-dialog";
import {Ui} from "../../ui";

@inject( SurveyService, NavigationService, DialogService, Ui )
export class Overview extends Ui {

  title = "-";
  surveyInfoList = [];

  constructor( surveyService, navigationService, dialogService, ...rest ) {
    super(...rest);
    this.surveyService = surveyService;
    this.navigationService = navigationService;
    this.dialogService = dialogService;
    // this.surveyInfoList.push({title:'test', id:2, creationDate:'09/08/2018 17:46'});
    // this.surveyInfoList.push({title:'test 2', id:3, creationDate:'09/08/2018 17:46'});
  }

  contextMenu( id, event ){
    let contextMenu = this.getContextMenu( id, event );
    // show context menu
    this.dialogService.open({
      viewModel: ContextMenu,
      model: contextMenu,
      lock: false
    })
    .whenClosed( data => {}  );
  }

  activate(){
    this.surveyService.loadSurveys( this.surveyInfoList );
  }

  getContextMenu( id, event ){
    let that = this;

    // get mouse position
    let position = {x:(event.clientX-30)+"px", y:(event.clientY-30)+"px"};

    let contextMenu = {id:'contextMenu', position: position, elements:[
      {index:0, title:'edit', action: function () {
        that.navigationService.goTo( that.navigationService.NAV_SURVEY + "/" + id )
      } },
      {index:1, title:'open', action: function () {
        let data = {};
        data.id = id;
        data.width = "70%";
        data.view = "app/main/respondent/survey-viewer";
        that.dialogService.open({
          viewModel: Popup,
          model: data,
          lock: false
        })
          .whenClosed( resp => {}  );
      } }
    ]};

    return contextMenu;
  }

}
