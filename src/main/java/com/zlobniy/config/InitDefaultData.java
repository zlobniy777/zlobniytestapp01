package com.zlobniy.config;

import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.folder.entity.Folder;
import com.zlobniy.domain.folder.service.FolderService;
import com.zlobniy.domain.survey.entity.Survey;
import com.zlobniy.domain.survey.service.SurveyService;
import com.zlobniy.domain.survey.view.SurveySettingsView;
import com.zlobniy.domain.survey.view.SurveyView;
import com.zlobniy.example.DummyQuestionnaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class InitDefaultData {

    private final ClientService clientService;
    private final SurveyService surveyService;
    private final FolderService folderService;

    @Autowired
    public InitDefaultData( ClientService clientService, SurveyService surveyService, FolderService folderService ) {
        this.clientService = clientService;
        this.surveyService = surveyService;
        this.folderService = folderService;
        initData();
    }


    private void initData() {

        System.out.println( "initData " );

        final Client client = new Client();
        client.setUsername( "ans" );
        client.setPassword( "123" );
        client.setEmail( "email" );

        clientService.saveClient( client );

        final Folder homeFolder = new Folder();
        homeFolder.setClient( client );
        homeFolder.setRoot( true );
        homeFolder.setSelected( true );
        homeFolder.setTitle( client.getUsername() );

        folderService.saveFolder( homeFolder );

        final Folder subFolder = new Folder();
        subFolder.setParent( homeFolder );
        subFolder.setClient( client );
        subFolder.setTitle( "folder" );

        final Folder subFolder2 = new Folder();
        subFolder2.setParent( subFolder );
        subFolder2.setClient( client );
        subFolder2.setTitle( "folder 2" );


        folderService.saveFolder( subFolder );
        folderService.saveFolder( subFolder2 );

        generate1000Surveys( homeFolder );

    }

    private void generate1000Surveys( Folder homeFolder ){

        for( int i = 0; i < 100 ; i++ ){
            final DummyQuestionnaire dummyQuestionnaire = new DummyQuestionnaire();
            final SurveyView surveyView = new SurveyView();
            surveyView.setTitle( "Dummy survey " + i );
            surveyView.setQuestionnaire( dummyQuestionnaire.createDummyQuestionnaire( 50 ) );
            surveyView.setSurveySettings( new SurveySettingsView() );
            surveyView.setCreationDate( new Date() );

            final Survey survey = new Survey( surveyView );
            survey.setFolder( homeFolder );
            surveyService.save( survey );
        }

    }

}
