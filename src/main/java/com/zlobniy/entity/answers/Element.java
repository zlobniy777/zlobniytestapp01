package com.zlobniy.entity.answers;

public class Element {

    private String name;
    private String value;
    private Integer answerOrder;
    private Integer scaleOrder = -1;
    private Integer scaleGroupOrder = -1;

    public String getName(){
        return name;
    }

    public void setName( String name ){
        this.name = name;
    }

    public String getValue(){
        return value;
    }

    public void setValue( String value ){
        this.value = value;
    }

    public Integer getAnswerOrder(){
        return answerOrder;
    }

    public void setAnswerOrder( Integer answerOrder ){
        this.answerOrder = answerOrder;
    }

    public Integer getScaleOrder(){
        return scaleOrder;
    }

    public void setScaleOrder( Integer scaleOrder ){
        this.scaleOrder = scaleOrder;
    }

    public Integer getScaleGroupOrder(){
        return scaleGroupOrder;
    }

    public void setScaleGroupOrder( Integer scaleGroupOrder ){
        this.scaleGroupOrder = scaleGroupOrder;
    }
}
