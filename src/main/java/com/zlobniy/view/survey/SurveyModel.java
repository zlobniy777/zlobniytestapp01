package com.zlobniy.view.survey;

import com.zlobniy.view.survey.questionnaire.Questionnaire;

import java.util.Date;

public class SurveyModel {

    private Long id;
    private String title;
    private Questionnaire questionnaire;
    private SurveySettings surveySettings;
    private Date creationDate;

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle( String title ){
        this.title = title;
    }

    public Questionnaire getQuestionnaire(){
        return questionnaire;
    }

    public void setQuestionnaire( Questionnaire questionnaire ){
        this.questionnaire = questionnaire;
    }

    public SurveySettings getSurveySettings(){
        return surveySettings;
    }

    public void setSurveySettings( SurveySettings surveySettings ){
        this.surveySettings = surveySettings;
    }

    public Date getCreationDate(){
        return creationDate;
    }

    public void setCreationDate( Date creationDate ){
        this.creationDate = creationDate;
    }
}
