import 'css/main.css';

import {inject} from 'aurelia-framework';
import 'jquery.fancytree/dist/skin-lion/ui.fancytree.css'; // CSS or LESS
import {createTree} from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
import {FolderService} from "../../services/folder-service";
import {SurveyService} from "../../services/survey-service";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject( FolderService, SurveyService, EventAggregator )
export class FolderTree {

  constructor( folderService, surveyService, eventAggregator ) {
    this.folderService = folderService;
    this.surveyService = surveyService;
    this.eventAggregator = eventAggregator;
  }


  attached() {
    console.log( 'attached FolderTree ' );
    let that = this;

    let data = [];

    const tree = createTree( '#tree', {
      extensions: ['dnd5', 'edit', 'filter'],
      source: data,
      // source: [
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
      //   ]}
      // ],
      dnd5: {
        // autoExpandMS: 400,
        // preventForeignNodes: true,
        // preventNonNodes: true,
        // preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
        // preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
        // scroll: true,
        // scrollSpeed: 7,
        // scrollSensitivity: 10,

        // --- Drag-support:

        dragStart: function ( node, data ) {
          /* This function MUST be defined to enable dragging for the tree.
           *
           * Return false to cancel dragging of node.
           * data.dataTransfer.setData() and .setDragImage() is available
           * here.
           */
//          data.dataTransfer.setDragImage($("<div>hurz</div>").appendTo("body")[0], -10, -10);
          return true;
        },
        dragDrag: function ( node, data ) {
          data.dataTransfer.dropEffect = "move";
        },
        dragEnd: function ( node, data ) {
        },

        // --- Drop-support:

        dragEnter: function ( node, data ) {
          // node.debug("dragEnter", data);
          data.dataTransfer.dropEffect = "move";
          // data.dataTransfer.effectAllowed = "copy";
          return true;
        },
        dragOver: function ( node, data ) {
          data.dataTransfer.dropEffect = "move";
          // data.dataTransfer.effectAllowed = "copy";
        },
        dragLeave: function ( node, data ) {
        },
        dragDrop: function ( node, data ) {
          /* This function MUST be defined to enable dropping of items on
           * the tree.
           */
          var transfer = data.dataTransfer;

          node.debug( "drop", data );

          // alert("Drop on " + node + ":\n"
          //   + "source:" + JSON.stringify(data.otherNodeData) + "\n"
          //   + "hitMode:" + data.hitMode
          //   + ", dropEffect:" + transfer.dropEffect
          //   + ", effectAllowed:" + transfer.effectAllowed);

          if ( data.otherNode ) {
            // Drop another Fancytree node from same frame
            // (maybe from another tree however)
            var sameTree = (data.otherNode.tree === data.tree);

            data.otherNode.moveTo( node, data.hitMode );
          } else if ( data.otherNodeData ) {
            // Drop Fancytree node from different frame or window, so we only have
            // JSON representation available
            node.addChild( data.otherNodeData, data.hitMode );
          } else {
            // Drop a non-node
            node.addNode( {
              title: transfer.getData( "text" )
            }, data.hitMode );
          }
          node.setExpanded();
        }
      },
      activate: function ( event, data ) {
//        alert("activate " + data.node);

      },
      lazyLoad: function ( event, data ) {
        data.result = [{"title": "Sub item", "lazy": false}, {"title": "Sub folder", "folder": true, "lazy": true}];
      },
      click: function ( event, data ) {
        if( event.toElement.className === 'fancytree-expander' ) return true;

        let id = data.node.data.id;
        console.log( 'click on folderId: ' + id );

        that.eventAggregator.publish( 'overview.update', id );
        //that.surveyService.loadSurveysInFolder( id, this.surveyInfoList );
        // return false to prevent default behavior (i.e. activation, ...)
        return true;
      },

    } );

    let rootNode = tree.rootNode;
    this.folderService.loadData( data, rootNode );

    console.log('tree');

  }

  detached() {
    console.log( 'detached FolderTree ' );
  }

  activate( data ) {
    console.log( 'activate ' + data );
  }

}
