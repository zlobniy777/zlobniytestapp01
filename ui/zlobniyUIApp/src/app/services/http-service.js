export class HttpService {

  constructor( ) {
    console.log('constructor http service: ');
  }

  attached(){
    console.log('attached http service: ');
  }

  detached() {

  }

  // url = 'api/login'
  post( url, data ){
    let promise = fetch( url, {
      method: 'POST',
      body: JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return promise;
  }

  get( url ){
    let promise = fetch( url, {
      method: 'GET'
    });

    return promise;
  }

}
