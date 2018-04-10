import 'css/main.css';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {

  loginPlaceholder = 'Please enter valid login';

  constructor( http ) {
    this.message = 'Hello World 12!';
    this.http = http;
  }

  login() {
    console.log('Login action');

    let clientData = {
      id: 9,
      name: 'vasia 2',
      email: 'Test 2'
    };

    this.http.fetch('createClient', {
      method: 'post',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
  .then(response => {
      this.apiKey = response.APIKey;
    console.log(response);
  });
  }

}
