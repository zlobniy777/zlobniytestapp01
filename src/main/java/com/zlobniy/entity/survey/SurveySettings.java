package com.zlobniy.entity.survey;

public class SurveySettings {

    private boolean showQuestionNumber = true;

    public boolean isShowQuestionNumber(){
        return showQuestionNumber;
    }

    public void setShowQuestionNumber( boolean showQuestionNumber ){
        this.showQuestionNumber = showQuestionNumber;
    }
}
