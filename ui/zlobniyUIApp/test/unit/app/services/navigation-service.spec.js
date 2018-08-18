import {NavigationService} from "../../../../src/app/services/navigation-service";
import {TestHelper} from "../main/test-helper";

describe( "The client service", () => {

  let router, sut;
  let data = {};

  let buttonsTest = beforeEach( () => {
    router = jasmine.createSpyObj( "router", ["navigate"] );
    sut = new NavigationService( router );
  });

  it( "Navigate to dashboard", done => {

    router.navigate.and.returnValue( "hz" );

  } );

  sut.goTo( sut.NAV_DASHBOARD )
    .then( result => console.log( result ) );

} );
