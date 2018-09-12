package com.zlobniy.domain.answer.view;

import java.util.List;

public class AnswerView {

    private Long id;
    private String userId;
    private Long surveyId;
    private Long questionId;
    private Integer questionNumber;
    private String questionType;
    private List<OptionView> options;
    private OptionView freeTextOption;

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId( String userId ){
        this.userId = userId;
    }

    public Long getSurveyId(){
        return surveyId;
    }

    public void setSurveyId( Long surveyId ){
        this.surveyId = surveyId;
    }

    public List<OptionView> getOptions(){
        return options;
    }

    public void setOptions( List<OptionView> options ){
        this.options = options;
    }

    public Long getQuestionId(){
        return questionId;
    }

    public void setQuestionId( Long questionId ){
        this.questionId = questionId;
    }

    public Integer getQuestionNumber(){
        return questionNumber;
    }

    public void setQuestionNumber( Integer questionNumber ){
        this.questionNumber = questionNumber;
    }

    public String getQuestionType(){
        return questionType;
    }

    public void setQuestionType( String questionType ){
        this.questionType = questionType;
    }

    public OptionView getFreeTextOption() {
        return freeTextOption;
    }

    public void setFreeTextOption(OptionView freeTextOption) {
        this.freeTextOption = freeTextOption;
    }

    public String toString(){
        return this.id + " " + this.userId + " "+ this.surveyId;
    }

}
