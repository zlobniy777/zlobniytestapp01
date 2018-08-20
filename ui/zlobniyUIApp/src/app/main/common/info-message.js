import 'css/survey.css';

export class InfoMessage {


  constructor(  ) {

  }

  attached() {
    console.log( 'attached survey ' );
  }

  detached() {
    console.log( 'detached survey ' );
  }

  activate( data ) {
    console.log( 'activate ' + data );
    this.message = data.message;
  }

}
