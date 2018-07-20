package com.zlobniy.test;

import com.zlobniy.entity.survey.questionnaire.*;

public class DummyQuestionnaire {

    public Questionnaire createDummyQuestionnaire(){
        Questionnaire questionnaire = new Questionnaire();
        questionnaire.getQuestions().add( createDummyClosedQuestion( 1L ) );
        questionnaire.getQuestions().add( createDummyMatrixQuestion( 2L ) );

        return questionnaire;
    }


    public Question createDummyClosedQuestion( Long id ){
        ClosedQuestion question = new ClosedQuestion();
        question.setId( id );
        question.setLayout( "radio" );
        question.setTitle( "dummy closed question " + id );

        question.getOptions().add( createDummyOption( 1L ) );
        question.getOptions().add( createDummyOption( 2L ) );
        question.getOptions().add( createDummyOption( 3L ) );

        return question;
    }

    public Question createDummyMatrixQuestion( Long id ){
        MatrixQuestion question = new MatrixQuestion();
        question.setId( id );
        question.setLayout( "radio" );
        question.setTitle( "Dummy matrix question " + id );

        question.getOptions().add( createDummyOption( 1L ) );
        question.getOptions().add( createDummyOption( 2L ) );
        question.getOptions().add( createDummyOption( 3L ) );

        question.getScales().add( createDummyScale( 1L ) );

        return question;
    }

    public Option createDummyOption( Long id ){
        Option option = new Option();
        option.setId( id );
        option.setTitle( "Dummy option " + id );

        return option;
    }

    public Scale createDummyScale( Long id ){
        Scale scale = new Scale();
        scale.setId( id );
        scale.setTitle( "Dummy scale " + id );

        scale.getOptions().add( createDummyScaleStep( 1L ) );
        scale.getOptions().add( createDummyScaleStep( 2L ) );
        scale.getOptions().add( createDummyScaleStep( 3L ) );

        return scale;
    }

    public Option createDummyScaleStep( Long id ){
        Option scaleStep = new Option();
        scaleStep.setId( id );
        scaleStep.setTitle( "Dummy scale step " + id );

        return scaleStep;
    }

}
