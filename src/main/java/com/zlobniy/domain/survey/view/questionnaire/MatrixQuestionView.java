package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.MatrixQuestion;
import com.zlobniy.domain.survey.entity.questionnaire.Option;
import com.zlobniy.domain.survey.entity.questionnaire.Scale;

import java.util.ArrayList;
import java.util.List;

public class MatrixQuestionView extends QuestionView {

    private String type = "matrix";
    private List<OptionView> options = new ArrayList<>(  );
    private List<ScaleView> scales = new ArrayList<>(  );

    public MatrixQuestionView(){

    }

    public MatrixQuestionView(MatrixQuestion question){
        setType("matrix");
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

        List<ScaleView> scales = new ArrayList<>();
        for (Scale scale : question.getScales()) {
            scales.add( new ScaleView( scale ) );
        }
        setScales( scales );
    }

    public List<OptionView> getOptions(){
        return options;
    }

    public void setOptions(List<OptionView> options){
        this.options = options;
    }

    public List<ScaleView> getScales(){
        return scales;
    }

    public void setScales(List<ScaleView> scales){
        this.scales = scales;
    }

    public String getType(){
        return type;
    }

    public void setType( String type ){
        this.type = type;
    }

}
