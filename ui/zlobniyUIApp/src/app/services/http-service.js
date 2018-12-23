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
    let token = window.localStorage.getItem( 'token' );
    let promise = fetch( url, {
      method: 'POST',
      body: JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': `bearer ${token}`,
      }
    });

    return promise;
  }

  put( url ){
    let token = window.localStorage.getItem( 'token' );
    let promise = fetch( url, {
      method: 'PUT',
      //body: JSON.stringify( data ),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': `bearer ${token}`,
      }
    });

    return promise;
  }

  postLogin( credentials ){

    let username = credentials.username ? credentials.username : '';
    let password = credentials.password ? credentials.password : '';

    if( credentials.username ){

      return fetch( 'loggedIn', {
        method: 'POST',
        body: 'username='+username+'&password='+password+'&submit=Login',
        headers: {
          'content-type' : 'application/x-www-form-urlencoded'
        }
      });

    }else{

      let token = window.localStorage.getItem( 'token' );
      if( token ){
        return fetch( 'loginByToken', {
          method: 'POST',
          body: 'token='+token,
          headers: {
            'content-type' : 'application/x-www-form-urlencoded'
          }
        });
      }

    }

  }

  registrationPost( data ){

      return fetch( 'register', {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

  }

  get( url ){
    let token = window.localStorage.getItem( 'token' );
    let promise = fetch( url, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${token}`,
      }
    });

    return promise;
  }

  // getToken(){
  //   return window.localStorage.getItem( 'token' );
  // }

  // get tokenInterceptor(){
  //   let auth = this;
  //
  //   return {
  //     request( request ){
  //       let token = auth.getToken();
  //       if( token ){
  //         request.headers.append( 'authorization', `bearer ${token}` );
  //       }
  //       return request;
  //     }
  //   }
  //
  // }

}
