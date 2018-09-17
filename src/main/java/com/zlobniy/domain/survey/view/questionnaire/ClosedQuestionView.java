package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.ClosedQuestion;
import com.zlobniy.domain.survey.entity.questionnaire.Option;

import java.util.ArrayList;
import java.util.List;

public class ClosedQuestionView extends QuestionView {

    private String type = "closed";
    private List<OptionView> options = new ArrayList<>(  );

    public ClosedQuestionView(){

    }

    public ClosedQuestionView(ClosedQuestion question){
        setType("closed");
        setId( question.getId() );
        setTitle( question.getTitle() );
        QuestionSettingsView questionSettings = new QuestionSettingsView();
        questionSettings.setLayout( question.getLayout() );
        questionSettings.setFreeTextOption( question.isFreeTextOption() );
        questionSettings.setLengthValue( question.getLengthValue() );
        questionSettings.setOtherValue( question.getOtherValue() );
        questionSettings.setRowsValue( question.getRowsValue() );
        questionSettings.setWidthValue( question.getWidthValue() );

        setSettings( questionSettings );

        List<OptionView> options = new ArrayList<>();
        for (Option option : question.getOptions()) {
            options.add( new OptionView( option ) );
        }
        setOptions( options );
    }

    public List<OptionView> getOptions(){
        return options;
    }

    public void setOptions(List<OptionView> options){
        this.options = options;
    }

    public String getType(){
        return type;
    }

    public void setType( String type ){
        this.type = type;
    }
}
