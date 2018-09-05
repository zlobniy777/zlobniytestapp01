package com.zlobniy.view.survey.questionnaire;

public class Option {

    private Long id;
    private String title;

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
}
