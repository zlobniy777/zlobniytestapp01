package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.Option;
import com.zlobniy.domain.survey.entity.questionnaire.Scale;

import java.util.ArrayList;
import java.util.List;

public class ScaleView {

    private Long id;
    private String title;
    private List<OptionView> options = new ArrayList<>(  );

    public ScaleView(){

    }

    public ScaleView(Scale scale){
        setTitle( scale.getTitle() );
        setId( scale.getId() );
        List<OptionView> options = new ArrayList<>();
        for (Option option : scale.getOptions()) {
            options.add( new OptionView( option ) );
        }
        setOptions( options );
    }

    public Long getId(){
        return id;
    }

    public void setId( Long id ){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle( String title ){
        this.title = title;
    }

    public List<OptionView> getOptions(){
        return options;
    }

    public void setOptions(List<OptionView> options){
        this.options = options;
    }
}
