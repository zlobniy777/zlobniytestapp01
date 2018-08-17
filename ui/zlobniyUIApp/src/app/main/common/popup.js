import {inject} from 'aurelia-framework';
import {DialogController} from "aurelia-dialog";

@inject( DialogController, Element )
export class Popup {

  constructor( dialogController, element ) {
    this.dialogController = dialogController;
    this.element = element;
  }

  close(){
    this.dialogController.close();
  }

  activate( data ) {
    //set width 100% for correct behaviour.
    this.element.style.width = "100%";
    // set real width of popup
    this.width = data.width;

    // register close action and set it to child view
    let that = this;
    data.closeAction = function () {
      that.dialogController.close();
    };
    this.model = data;
    this.view = data.view;
  }

}
