import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject( Router )
export class loginForm {
  title = 'Login form';
  succes = true;

  constructor( router ) {
    console.log('constructor');
    this.message = 'Hello World 12!';
    this.router = router;

  }

  activate(){
    console.log('activate');
  }

  attached(){
    console.log('attached');
  }


  login() {
    console.log( 'Login action' );

    let clientData = {
      id: 9,
      name: 'vasia 2',
      email: 'Test 2'
    };

    // this.http.fetch( 'createClient', {
    //   method: 'post',
    //   body: JSON.stringify( clientData ),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // } )
    //   .then( response => response.json() )
    //   .then( response => {
    //     this.apiKey = response.APIKey;
    //     console.log( response );
    //   } );

    if( this.succes ){
      this.router.navigate( 'dashboard' );
    }else{
      this.router.navigate( '' );
    }

  }

}
