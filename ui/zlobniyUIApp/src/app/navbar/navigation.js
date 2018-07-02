import {inject} from 'aurelia-framework';
import {Ui} from "../ui";
import {Client} from "../services/client";
import {NavigationService} from "../services/navigation-service";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( Client, NavigationService, EventAggregator, Ui )
export class Navigation extends Ui{
  title = "navigation";

  constructor( client, navigationService, eventAggregator, ...rest ) {
    super(...rest);
    this.client = client;
    this.navigationService = navigationService;
    this.eventAggregator = eventAggregator;

  }

  attached(){
    console.log('attached navigation ');
  }



}
