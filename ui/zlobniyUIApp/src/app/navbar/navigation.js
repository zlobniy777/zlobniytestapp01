import {inject} from 'aurelia-framework';
import {Ui} from "../ui";
import {Client} from "../services/client";
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( Client, Router, EventAggregator, Ui )
export class Navigation extends Ui{
  title = "navigation";

  buttons = [];

  isWiz = false;

  constructor( client, router, eventAggregator, ...rest ) {
    super(...rest);
    this.test('navi');
    this.client = client;
    this.router = router;
    this.eventAggregator = eventAggregator;





  }

  updateButtons(){
    console.log('update buttons');
    var that = this;

    if( that.isWiz ){

      this.buttons = [
        {
          title: 'Exit', action: function () {
          that.router.navigate( "/dashboard" );
          that.isWiz = false;
          that.updateButtons();
        }
        }
      ];

    }else{

      this.buttons = [
        {
          title: 'createSurvey', action: function () {
          that.router.navigate( "/survey" );
          that.isWiz = true;
          that.updateButtons();
        }
        }
      ];

    }
  }

  test(){
    console.log('test');
  }

  attached(){
    console.log('attached navigation ');
    this.updateButtons();
  }



}
