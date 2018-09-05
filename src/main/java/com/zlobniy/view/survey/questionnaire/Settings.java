package com.zlobniy.view.survey.questionnaire;

public class Settings {

    private String layout;
    private boolean freeTextOption;
    private String otherValue;
    private Integer lengthValue;
    private String widthValue;
    private Integer rowsValue;


    public String getLayout(){
        return layout;
    }

    public void setLayout( String layout ){
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
