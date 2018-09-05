package com.zlobniy.view.survey;

import com.zlobniy.util.DateFormatUtil;

import java.util.Date;

public class SurveyInfo {

    private Long id;
    private String title;
    private Date creationDate;

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

    public String getCreationDate(){
        return DateFormatUtil.dateToString( this.creationDate );
    }

    public void setCreationDate( Date creationDate ){
        this.creationDate = creationDate;
    }
}
