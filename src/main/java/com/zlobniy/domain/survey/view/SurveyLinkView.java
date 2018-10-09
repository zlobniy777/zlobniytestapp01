package com.zlobniy.domain.survey.view;

import java.util.ArrayList;
import java.util.List;

public class SurveyLinkView {

    private List<String> links = new ArrayList<>(  );

    public List<String> getLinks(){
        return links;
    }

    public void setLinks( List<String> links ){
        this.links = links;
    }

    public void addLink( String link ){
        this.links.add( link );
    }

}
