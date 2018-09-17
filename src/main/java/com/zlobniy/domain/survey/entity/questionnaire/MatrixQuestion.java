package com.zlobniy.domain.survey.entity.questionnaire;

import com.zlobniy.domain.survey.view.questionnaire.MatrixQuestionView;
import com.zlobniy.domain.survey.view.questionnaire.OptionView;
import com.zlobniy.domain.survey.view.questionnaire.ScaleView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MatrixQuestion extends Question {

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Scale> scales = new ArrayList<>();

    @Column
    private String layout;

    @Column
    private boolean freeTextOption;

    @Column
    private String otherValue;

    @Column
    private Integer lengthValue;

    @Column
    private String widthValue;

    @Column
    private Integer rowsValue;



    public MatrixQuestion(){

    }

    public MatrixQuestion( MatrixQuestionView matrixQuestionView ){
        setId( matrixQuestionView.getId() );
        setFreeTextOption( matrixQuestionView.getSettings().isFreeTextOption() );
        setLayout( matrixQuestionView.getSettings().getLayout() );
        setLengthValue( matrixQuestionView.getSettings().getLengthValue() );
        setOtherValue( matrixQuestionView.getSettings().getOtherValue() );
        setRowsValue( matrixQuestionView.getSettings().getRowsValue() );
        setWidthValue( matrixQuestionView.getSettings().getWidthValue() );

        List<Option> options = new ArrayList<>();
        for (OptionView optionView : matrixQuestionView.getOptions()) {
            options.add( new Option( optionView ) );
        }
        setOptions( options );

        List<Scale> scales = new ArrayList<>();
        for (ScaleView scaleView : matrixQuestionView.getScales()) {
            scales.add( new Scale( scaleView ) );
        }
        setScales( scales );

    }


    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }

    public List<Scale> getScales() {
        return scales;
    }

    public void setScales(List<Scale> scales) {
        this.scales = scales;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public boolean isFreeTextOption() {
        return freeTextOption;
    }

    public void setFreeTextOption(boolean freeTextOption) {
        this.freeTextOption = freeTextOption;
    }

    public String getOtherValue() {
        return otherValue;
    }

    public void setOtherValue(String otherValue) {
        this.otherValue = otherValue;
    }

    public Integer getLengthValue() {
        return lengthValue;
    }

    public void setLengthValue(Integer lengthValue) {
        this.lengthValue = lengthValue;
    }

    public String getWidthValue() {
        return widthValue;
    }

    public void setWidthValue(String widthValue) {
        this.widthValue = widthValue;
    }

    public Integer getRowsValue() {
        return rowsValue;
    }

    public void setRowsValue(Integer rowsValue) {
        this.rowsValue = rowsValue;
    }
}
