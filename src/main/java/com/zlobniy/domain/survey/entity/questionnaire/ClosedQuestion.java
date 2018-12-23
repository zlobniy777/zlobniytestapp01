package com.zlobniy.domain.survey.entity.questionnaire;

import com.zlobniy.domain.survey.view.questionnaire.ClosedQuestionView;
import com.zlobniy.domain.survey.view.questionnaire.OptionView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class ClosedQuestion extends Question {


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>();

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


    public ClosedQuestion(){

    }

    public ClosedQuestion( ClosedQuestionView closedQuestionView ){
        super( closedQuestionView );

        setFreeTextOption( closedQuestionView.getSettings().isFreeTextOption() );
        setLayout( closedQuestionView.getSettings().getLayout() );
        setLengthValue( closedQuestionView.getSettings().getLengthValue() );
        setOtherValue( closedQuestionView.getSettings().getOtherValue() );
        setRowsValue( closedQuestionView.getSettings().getRowsValue() );
        setWidthValue( closedQuestionView.getSettings().getWidthValue() );

        final List<Option> options = new ArrayList<>();
        for (OptionView optionView : closedQuestionView.getOptions()) {
            options.add( new Option( optionView ) );
        }

        setOptions( options );
    }

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
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
