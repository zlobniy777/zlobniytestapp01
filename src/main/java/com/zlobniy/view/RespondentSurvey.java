package com.zlobniy.view;

import com.zlobniy.view.answer.AnswerView;
import com.zlobniy.view.survey.SurveyModel;

import java.util.List;

public class RespondentSurvey {

    private SurveyModel surveyModel;
    private List<AnswerView> answers;

    public SurveyModel getSurveyModel(){
        return surveyModel;
    }

    public void setSurveyModel( SurveyModel surveyModel ){
        this.surveyModel = surveyModel;
    }

    public List<AnswerView> getAnswers(){
        return answers;
    }

    public void setAnswers( List<AnswerView> answers ){
        this.answers = answers;
    }
}
