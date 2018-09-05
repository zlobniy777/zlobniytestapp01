package com.zlobniy.view.survey.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class Scale {

    private Long id;
    private String title;
    private List<Option> options = new ArrayList<>(  );

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

    public List<Option> getOptions(){
        return options;
    }

    public void setOptions( List<Option> options ){
        this.options = options;
    }
}
