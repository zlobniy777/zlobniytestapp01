package com.zlobniy.service;

import com.zlobniy.dao.SurveyDAO;
import com.zlobniy.view.survey.SurveyInfo;
import com.zlobniy.view.survey.SurveyModel;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class SurveyService {

    private final SurveyDAO dao = new SurveyDAO();


    public SurveyModel findById( Long id ){
        return dao.find( id );
    }

    public List<SurveyInfo> getAllSurveys(){
        return dao.getAllLightSurveys();
    }

    public boolean saveSurvey( SurveyModel surveyModel ){
        surveyModel.setId( System.currentTimeMillis() );
        surveyModel.setCreationDate( new Date(  ) );
        return dao.save( surveyModel );
    }
}
