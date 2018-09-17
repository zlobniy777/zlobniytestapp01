package com.zlobniy.dao;

import com.zlobniy.domain.survey.view.SurveyInfoView;
import com.zlobniy.domain.survey.view.SurveySettingsView;
import com.zlobniy.domain.survey.view.SurveyView;
import com.zlobniy.example.DummyQuestionnaire;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class SurveyDAO {



    private static final ConcurrentHashMap<Long, SurveyView> surveys = new ConcurrentHashMap<>(  );
    static {
        initMap();
    }

    private static void initMap(){

        DummyQuestionnaire dummyQuestionnaire = new DummyQuestionnaire();

        SurveyView surveyView = new SurveyView();
        surveyView.setId( 1L );
        surveyView.setTitle( "Dummy survey" );
        surveyView.setQuestionnaire( dummyQuestionnaire.createDummyQuestionnaire() );
        surveyView.setSurveySettings( new SurveySettingsView() );
        surveyView.setCreationDate( new Date(  ) );


        surveys.put( 1L, surveyView);
    }

    public SurveyView find(Long id ){
        return surveys.getOrDefault( id, new SurveyView() );
    }

    public boolean save( SurveyView surveyView){
        surveys.put( System.currentTimeMillis(), surveyView);
        return true;
    }

    public List<SurveyInfoView> getAllLightSurveys(){
        final List<SurveyInfoView> surveyInfoViewList = new ArrayList<>(  );
        for( SurveyView surveyView : surveys.values() ){
            SurveyInfoView surveyInfoView = new SurveyInfoView();
            surveyInfoView.setId( surveyView.getId() );
            surveyInfoView.setCreationDate( surveyView.getCreationDate() );
            surveyInfoView.setTitle( surveyView.getTitle() );
            surveyInfoViewList.add(surveyInfoView);
        }
        return surveyInfoViewList;
    }

}
