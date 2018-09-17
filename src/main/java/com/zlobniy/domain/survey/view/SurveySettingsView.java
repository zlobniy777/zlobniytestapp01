package com.zlobniy.domain.survey.view;

import com.zlobniy.domain.survey.entity.SurveySettings;

public class SurveySettingsView {

    private Long id;

    private boolean showQuestionNumber = true;

    public SurveySettingsView(){

    }

    public SurveySettingsView(SurveySettings surveySettings){
        setId( surveySettings.getId() );
        setShowQuestionNumber( surveySettings.isShowQuestionNumber() );
    }

    public boolean isShowQuestionNumber(){
        return showQuestionNumber;
    }

    public void setShowQuestionNumber( boolean showQuestionNumber ){
        this.showQuestionNumber = showQuestionNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
