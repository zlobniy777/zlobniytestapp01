import 'css/survey.css';

import {inject} from 'aurelia-framework';
import {HttpService} from "./http-service";

@inject( HttpService )
export class FolderService {


  constructor( httpService ) {
    this.http = httpService;
  }

  loadData( data, rootNode ){

    //rootNode.addChildren( {title:'test folder', id: 123} );

    // let prepared =
    //   {"title": "/", "expanded": true, "folder": true, "children": [
    //     {"title": "dev", "folder": true},
    //     {"title": "etc", "folder": true, "children": [
    //       {"title": "cups"},
    //       {"title": "httpd"},
    //       {"title": "init.d"}
    //     ]},
    //     {"title": "sbin", "folder": true},
    //     {"title": "tmp", "folder": true},
    //     {"title": "Users", "expanded": true, "folder": true, "children": [
    //       {"title": "jdoe", "folder": true},
    //       {"title": "jmiller", "folder": true},
    //       {"title": "mysql", "folder": true}
    //     ]},
    //     {"title": "usr", "expanded": true, "folder": true, "children": [
    //       {"title": "bin", "folder": true},
    //       {"title": "lib", "folder": true},
    //       {"title": "local", "folder": true}
    //     ]},
    //     {"title": "var", "expanded": true, "folder": true, "children": [
    //       {"title": "log", "folder": true},
    //       {"title": "spool", "folder": true},
    //       {"title": "yp", "folder": true}
    //     ]}
    //   ]};
    //
    // data.push( prepared );

    let promis = this.http.get( 'api/folder/loadAll' );
    promis.then(function(response) {
      console.log('response', response);
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json);

      for ( let obj of json ) {
        rootNode.addChildren( obj );
      }

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  attached() {
    console.log( 'attached FolderService ' );
  }

  detached() {
    console.log( 'detached FolderService ' );
  }


}
