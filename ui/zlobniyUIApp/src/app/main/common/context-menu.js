import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {DialogController} from "aurelia-dialog";

@inject( DialogController )
export class ContextMenu {

  constructor( dialogController ) {
    let that = this;
    this.dialogController = dialogController;
    this.dialogController.settings.position = (modalContainer, modalOverlay ) => {
      let container = modalContainer;
      // set position of popup under mouse
      container.firstElementChild.style.position = "absolute";
      container.firstElementChild.style.top = that.model.position.y;
      container.firstElementChild.style.left = that.model.position.x;
      let overlay = modalOverlay;
    };
  }

  open( element ){
    element.action.call();
    this.dialogController.close();
  }

  activate( model ) {
    this.model = model;
  }

}
