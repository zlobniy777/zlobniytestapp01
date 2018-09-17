package com.zlobniy.domain.survey.entity.questionnaire;

import com.zlobniy.domain.survey.view.questionnaire.OptionView;

import javax.persistence.*;

@Entity
public class Option {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Question question;

    @Column
    private String title;

    public Option(){

    }

    public Option( OptionView optionView ){
        setId( optionView.getId() );
        setTitle( optionView.getTitle() );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
