package com.zlobniy.domain.survey.view;

import com.zlobniy.domain.answer.view.AnswerView;

import java.util.List;

public class RespondentSurveyView {

    private SurveyView surveyView;
    private List<AnswerView> answers;

    public SurveyView getSurveyView(){
        return surveyView;
    }

    public void setSurveyView(SurveyView surveyView){
        this.surveyView = surveyView;
    }

    public List<AnswerView> getAnswers(){
        return answers;
    }

    public void setAnswers( List<AnswerView> answers ){
        this.answers = answers;
    }
}
