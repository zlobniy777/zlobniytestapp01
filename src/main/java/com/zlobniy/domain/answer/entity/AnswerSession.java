package com.zlobniy.domain.answer.entity;

import java.util.List;

public class AnswerSession {

    private Long id;
    private Long surveyId;
    private String userId;
    private List<Answer> answers;

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public Long getSurveyId(){
        return surveyId;
    }

    public void setSurveyId( Long surveyId ){
        this.surveyId = surveyId;
    }

    public List<Answer> getAnswers(){
        return answers;
    }

    public void setAnswers( List<Answer> answers ){
        this.answers = answers;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId( String userId ){
        this.userId = userId;
    }
}
