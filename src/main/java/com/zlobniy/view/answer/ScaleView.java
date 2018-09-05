package com.zlobniy.view.answer;

import java.util.List;

public class ScaleView {

    private Integer index;
    private String name;
    private List<OptionView> options;

    public Integer getIndex(){
        return index;
    }

    public void setIndex( Integer index ){
        this.index = index;
    }

    public List<OptionView> getOptions(){
        return options;
    }

    public void setOptions( List<OptionView> options ){
        this.options = options;
    }

    public String getName(){
        return name;
    }

    public void setName( String name ){
        this.name = name;
    }
}
