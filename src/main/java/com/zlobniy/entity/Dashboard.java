package com.zlobniy.entity;

import com.zlobniy.entity.survey.SurveyInfo;

import java.util.ArrayList;
import java.util.List;

public class Dashboard {

    private String title = "";
    private List<SurveyInfo> surveys = new ArrayList<>(  );

    public String getTitle(){
        return title;
    }

    public void setTitle( String title ){
        this.title = title;
    }

    public List<SurveyInfo> getSurveys(){
        return surveys;
    }

    public void setSurveys( List<SurveyInfo> surveys ){
        this.surveys = surveys;
    }
}
