package com.zlobniy.domain.survey.view;

import com.zlobniy.domain.survey.entity.Survey;
import com.zlobniy.domain.survey.view.questionnaire.QuestionnaireView;

import java.util.Date;

public class SurveyView {

    private Long id;
    private String title;
    private QuestionnaireView questionnaire;
    private SurveySettingsView surveySettings;
    private Date creationDate;

    public SurveyView(){

    }

    public SurveyView( Survey survey ){
        setTitle( survey.getTitle() );
        setSurveySettings( new SurveySettingsView( survey.getSurveySettings() ) );
        setQuestionnaire( new QuestionnaireView( survey.getQuestionnaire() ) );
        setCreationDate( survey.getCreationDate() );
        setId( survey.getId() );
    }

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

    public QuestionnaireView getQuestionnaire(){
        return questionnaire;
    }

    public void setQuestionnaire(QuestionnaireView questionnaire){
        this.questionnaire = questionnaire;
    }

    public SurveySettingsView getSurveySettings(){
        return surveySettings;
    }

    public void setSurveySettings(SurveySettingsView surveySettingsView){
        this.surveySettings = surveySettingsView;
    }

    public Date getCreationDate(){
        return creationDate;
    }

    public void setCreationDate( Date creationDate ){
        this.creationDate = creationDate;
    }
}
