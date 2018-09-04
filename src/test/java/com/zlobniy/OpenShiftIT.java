package com.zlobniy;

import com.zlobniy.greetings.GreetingProperties;

//import org.arquillian.cube.openshift.impl.enricher.AwaitRoute;
//import org.arquillian.cube.openshift.impl.enricher.RouteURL;
//import org.jboss.arquillian.junit.Arquillian;

//@RunWith(Arquillian.class)
public class OpenShiftIT extends AbstractBoosterApplicationTest {
//
//    @AwaitRoute(path = "/health")
//    @RouteURL("${app.name}")
//    private URL baseURL;
//
//    @Before
//    public void setup() throws Exception {
//        RestAssured.baseURI = baseURL + "api/greeting";
//    }

    protected GreetingProperties getProperties() {
        return new GreetingProperties();
    }

}
