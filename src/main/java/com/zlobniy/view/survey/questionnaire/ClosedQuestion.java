package com.zlobniy.view.survey.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class ClosedQuestion extends Question {

    private String type = "closed";
    private List<Option> options = new ArrayList<>(  );

    public List<Option> getOptions(){
        return options;
    }

    public void setOptions( List<Option> options ){
        this.options = options;
    }

    public String getType(){
        return type;
    }

    public void setType( String type ){
        this.type = type;
    }
}
