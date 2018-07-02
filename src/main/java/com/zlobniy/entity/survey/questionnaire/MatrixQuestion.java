package com.zlobniy.entity.survey.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class MatrixQuestion extends Question {

    private String type = "matrix";
    private List<Option> options = new ArrayList<>(  );
    private List<Scale> scales = new ArrayList<>(  );

    public List<Option> getOptions(){
        return options;
    }

    public void setOptions( List<Option> options ){
        this.options = options;
    }

    public List<Scale> getScales(){
        return scales;
    }

    public void setScales( List<Scale> scales ){
        this.scales = scales;
    }

    public String getType(){
        return type;
    }

    public void setType( String type ){
        this.type = type;
    }

}
