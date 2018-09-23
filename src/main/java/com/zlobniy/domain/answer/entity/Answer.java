package com.zlobniy.domain.answer.entity;

import com.zlobniy.domain.answer.view.AnswerView;
import com.zlobniy.domain.answer.view.OptionView;
import com.zlobniy.domain.answer.view.ScaleView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Answer {

    @Id
    @GeneratedValue
    private Long answerId;

    @Column
    private Long questionId;

    @Column
    private Integer questionNumber;

    @OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
    @JoinColumn( name = "answerId")
    private List<Element> elements;

    public Answer(){

    }

    public Answer( AnswerView answerView ){
        setAnswerId( answerView.getId() );
        setQuestionId( answerView.getQuestionId() );
        setQuestionNumber( answerView.getQuestionNumber() );

        List<Element> elements = new ArrayList<>(  );
        // sub question (answer alternative)
        for ( OptionView optionView : answerView.getOptions() ) {
            if( optionView.getSelected() ){
                Element element = new Element(  );
                element.setAnswerOrder( optionView.getIndex() );
                element.setValue( optionView.getValue() );
                elements.add( element );
            }else{
                // scales
                for ( ScaleView scaleView : optionView.getScaleGroup() ) {
                    // scale steps
                    for ( OptionView view : scaleView.getOptions() ) {
                        if( view.getSelected() ){
                            Element element = new Element( );
                            element.setAnswerOrder( optionView.getIndex() );
                            element.setValue( view.getValue() );
                            element.setScaleGroupOrder( view.getIndex() );
                            element.setScaleOrder( scaleView.getIndex() );
                            elements.add( element );
                        }
                    }
                }
            }

        }

        OptionView otherField = answerView.getFreeTextOption();
        if( otherField.getValue() != null && !otherField.getValue().isEmpty() ){
            Element element = new Element( );
            element.setAnswerOrder( -1 );
            element.setValue( otherField.getValue() );
            element.setName( otherField.getName() );
            elements.add( element );
        }

        setElements( elements );

    }

    public Long getAnswerId(){
        return answerId;
    }

    public void setAnswerId( Long answerId ){
        this.answerId = answerId;
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
