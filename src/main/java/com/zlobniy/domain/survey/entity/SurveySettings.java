package com.zlobniy.domain.survey.entity;

import com.zlobniy.domain.survey.view.SurveySettingsView;

import javax.persistence.*;

@Entity
public class SurveySettings {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Survey survey;

    @Column
    private boolean showQuestionNumber;

    public SurveySettings(){

    }

    public SurveySettings(SurveySettingsView surveySettingsView){
        setId( surveySettingsView.getId() );
        setShowQuestionNumber( surveySettingsView.isShowQuestionNumber() );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public boolean isShowQuestionNumber() {
        return showQuestionNumber;
    }

    public void setShowQuestionNumber(boolean showQuestionNumber) {
        this.showQuestionNumber = showQuestionNumber;
    }
}
