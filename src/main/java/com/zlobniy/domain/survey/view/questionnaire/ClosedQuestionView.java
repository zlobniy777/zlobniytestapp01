package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.ClosedQuestion;
import com.zlobniy.domain.survey.entity.questionnaire.Option;

import java.util.ArrayList;
import java.util.List;

public class ClosedQuestionView extends QuestionView {

    private static final String TYPE = "closed";
    private List<OptionView> options = new ArrayList<>(  );

    public ClosedQuestionView(){

    }

    public ClosedQuestionView(ClosedQuestion question){
        super( question, TYPE );

        final QuestionSettingsView questionSettings = new QuestionSettingsView();
        questionSettings.setLayout( question.getLayout() );
        questionSettings.setFreeTextOption( question.isFreeTextOption() );
        questionSettings.setLengthValue( question.getLengthValue() );
        questionSettings.setOtherValue( question.getOtherValue() );
        questionSettings.setRowsValue( question.getRowsValue() );
        questionSettings.setWidthValue( question.getWidthValue() );

        setSettings( questionSettings );

        final List<OptionView> options = new ArrayList<>();
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
        return TYPE;
    }

}
