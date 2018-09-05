package com.zlobniy.entity.answer;

import java.util.List;

public class Answer {

    private Long id;
    private Long questionId;
    private Integer questionNumber;
    private List<Element> elements;

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public Long getQuestionId(){
        return questionId;
    }

    public void setQuestionId( Long questionId ){
        this.questionId = questionId;
    }

    public List<Element> getElements(){
        return elements;
    }

    public void setElements( List<Element> elements ){
        this.elements = elements;
    }

    public Integer getQuestionNumber(){
        return questionNumber;
    }

    public void setQuestionNumber( Integer questionNumber ){
        this.questionNumber = questionNumber;
    }
}
