import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {Client} from "./services/client";

@inject( Element, HttpClient, Router, Client )
export class Ui {

  name = "ui";

  constructor( element, http, router, client ) {
    this.http = http;
    this.router = router;
    this.element = element;
    this.client = client;
    //this.handler = event => this.value.dispatchEvent(event);
    // let that = this;
    // this.handleBodyClick = e => {
    //   if( e.target.dataset.type === 'editable' ){
    //     console.log( that.name + " " + e.target );
    //   }else{
    //     console.log('not editable');
    //   }
    //
    // };


  }

  test( value ){
    console.log('test from ui class ' + value);
  }

  cardClicked(e) {
    console.log("clicked event");
  }

  commonClick( event ){
    console.log( this ); //e.target
    this.client.setEditedModel( this );
  }

  // attached() {
  //   console.log( this.viewRef );
  //   document.addEventListener('click', this.handleBodyClick ); //handleBodyClick
  // }
  //
  // detached() {
  //   document.removeEventListener('click', this.handleBodyClick );
  // }

  //
  //
  // handleBodyClick( e ) {
  //
  //   console.log( e.target ); //e.target
  // }

}
