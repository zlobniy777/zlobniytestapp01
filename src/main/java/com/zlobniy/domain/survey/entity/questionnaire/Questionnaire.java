package com.zlobniy.domain.survey.entity.questionnaire;

import com.zlobniy.domain.survey.entity.Survey;
import com.zlobniy.domain.survey.view.questionnaire.QuestionView;
import com.zlobniy.domain.survey.view.questionnaire.QuestionnaireView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Questionnaire {

    @Id
    @GeneratedValue
    @Column( name= "questionnaire_id" )
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Survey survey;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn( name = "questionnaire_id")
    @OrderBy(value = "number ASC")
    private List<Question> questions = new ArrayList<>();

    public Questionnaire(){

    }

    public Questionnaire( QuestionnaireView questionnaireView ){
        setId( questionnaireView.getId() );

        List<Question> questions = new ArrayList<>();
        for (QuestionView questionView : questionnaireView.getQuestions()) {
            Question question = Question.mapQuestion( questionView );
            questions.add( question );
        }

        setQuestions( questions );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }



}
