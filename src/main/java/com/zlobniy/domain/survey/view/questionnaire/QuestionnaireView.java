package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.Question;
import com.zlobniy.domain.survey.entity.questionnaire.Questionnaire;

import java.util.ArrayList;
import java.util.List;

public class QuestionnaireView {

    private Long id;

    private List<QuestionView> questions = new ArrayList<>(  );

    public QuestionnaireView(){

    }

    public QuestionnaireView(Questionnaire questionnaire){
        setId( questionnaire.getId() );

        List<QuestionView> questions = new ArrayList<>();
        for (Question question : questionnaire.getQuestions()) {
            questions.add( QuestionView.mapQuestion( question ) );
        }
        setQuestions( questions );

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<QuestionView> getQuestions(){
        return questions;
    }

    public void setQuestions(List<QuestionView> questions){
        this.questions = questions;
    }
}
