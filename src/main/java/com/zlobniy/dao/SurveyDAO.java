package com.zlobniy.dao;

import com.zlobniy.domain.survey.view.SurveyInfo;
import com.zlobniy.domain.survey.view.SurveyModel;
import com.zlobniy.domain.survey.view.SurveySettings;
import com.zlobniy.example.DummyQuestionnaire;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class SurveyDAO {

    private static final ConcurrentHashMap<Long, SurveyModel> surveys = new ConcurrentHashMap<>(  );
    static {
        initMap();
    }

    private static void initMap(){

        DummyQuestionnaire dummyQuestionnaire = new DummyQuestionnaire();

        SurveyModel surveyModel = new SurveyModel();
        surveyModel.setId( 1L );
        surveyModel.setTitle( "Dummy survey" );
        surveyModel.setQuestionnaire( dummyQuestionnaire.createDummyQuestionnaire() );
        surveyModel.setSurveySettings( new SurveySettings() );
        surveyModel.setCreationDate( new Date(  ) );

        surveys.put( 1L, surveyModel );
    }

    public SurveyModel find( Long id ){
        return surveys.getOrDefault( id, new SurveyModel() );
    }

    public boolean save( SurveyModel surveyModel ){
        surveys.put( System.currentTimeMillis(), surveyModel );
        return true;
    }

    public List<SurveyInfo> getAllLightSurveys(){
        final List<SurveyInfo> surveyInfoList = new ArrayList<>(  );
        for( SurveyModel surveyModel : surveys.values() ){
            SurveyInfo surveyInfo = new SurveyInfo();
            surveyInfo.setId( surveyModel.getId() );
            surveyInfo.setCreationDate( surveyModel.getCreationDate() );
            surveyInfo.setTitle( surveyModel.getTitle() );
            surveyInfoList.add( surveyInfo );
        }
        return surveyInfoList;
    }

}
