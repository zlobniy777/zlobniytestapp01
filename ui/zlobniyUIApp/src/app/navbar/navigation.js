import {inject} from 'aurelia-framework';
import {Ui} from "../ui";
import {ClientService} from "../services/client-service";
import {NavigationService} from "../services/navigation-service";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( ClientService, NavigationService, EventAggregator, Ui )
export class Navigation extends Ui{
  title = "navigation";

  constructor( clientService, navigationService, eventAggregator, ...rest ) {
    super(...rest);
    this.clientService = clientService;
    this.navigationService = navigationService;
    this.eventAggregator = eventAggregator;

  }

  attached(){
    console.log('attached navigation ');
  }



}
