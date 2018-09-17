package com.zlobniy.config;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.survey.entity.Survey;
import com.zlobniy.domain.survey.service.SurveyService;
import com.zlobniy.domain.survey.view.SurveySettingsView;
import com.zlobniy.domain.survey.view.SurveyView;
import com.zlobniy.example.DummyQuestionnaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class InitDefaultData {

    private final ClientService clientService;
    private final SurveyService surveyService;

    @Autowired
    public InitDefaultData( ClientService clientService, SurveyService surveyService ) {
        this.clientService = clientService;
        this.surveyService = surveyService;
        initData();
    }


    private void initData() {

        System.out.println( "initData " );
        Client client = new Client();

        client.setUsername( "ans" );
        client.setPassword( "123" );
        client.setEmail( "email" );

        clientService.saveClient( client );

        DummyQuestionnaire dummyQuestionnaire = new DummyQuestionnaire();

        SurveyView surveyView = new SurveyView();
//        surveyView.setId( 1L );
        surveyView.setTitle( "Dummy survey" );
        surveyView.setQuestionnaire( dummyQuestionnaire.createDummyQuestionnaire() );
        surveyView.setSurveySettings( new SurveySettingsView() );
        surveyView.setCreationDate( new Date() );

        Survey survey = new Survey( surveyView );
        surveyService.save( survey );


        List<Survey> storedSurveys = surveyService.findAll();

        System.out.println( storedSurveys );

    }

}
