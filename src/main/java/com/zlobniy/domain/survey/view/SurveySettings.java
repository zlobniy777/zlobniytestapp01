package com.zlobniy.domain.survey.view;

public class SurveySettings {

    private boolean showQuestionNumber = true;

    public boolean isShowQuestionNumber(){
        return showQuestionNumber;
    }

    public void setShowQuestionNumber( boolean showQuestionNumber ){
        this.showQuestionNumber = showQuestionNumber;
    }
}
