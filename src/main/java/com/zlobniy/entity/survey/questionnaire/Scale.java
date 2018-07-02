package com.zlobniy.entity.survey.questionnaire;

import java.util.ArrayList;
import java.util.List;

public class Scale {

    private Long id;
    private String title;
    private List<ScaleStep> scaleSteps = new ArrayList<>(  );

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

    public List<ScaleStep> getScaleSteps(){
        return scaleSteps;
    }

    public void setScaleSteps( List<ScaleStep> scaleSteps ){
        this.scaleSteps = scaleSteps;
    }
}
