package com.zlobniy.controller.survey;

import com.zlobniy.domain.answer.entity.Answer;
import com.zlobniy.domain.answer.entity.AnswerSession;
import com.zlobniy.domain.answer.service.AnswerService;
import com.zlobniy.domain.answer.view.AnswerView;
import com.zlobniy.domain.client.entity.Client;
import com.zlobniy.domain.client.service.ClientService;
import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.domain.folder.entity.Folder;
import com.zlobniy.domain.folder.service.FolderService;
import com.zlobniy.domain.survey.entity.Survey;
import com.zlobniy.domain.survey.service.SurveyService;
import com.zlobniy.domain.survey.view.RespondentSurveyView;
import com.zlobniy.domain.survey.view.SurveyInfoView;
import com.zlobniy.domain.survey.view.SurveyLinkView;
import com.zlobniy.domain.survey.view.SurveyView;
import com.zlobniy.util.Checksum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SurveyController {

    private SurveyService surveyService;
    private AnswerService answerService;
    private ClientService clientService;
    private FolderService folderService;

    @Autowired
    public SurveyController( SurveyService surveyService, AnswerService answerService, ClientService clientService, FolderService folderService ) {
        this.surveyService = surveyService;
        this.answerService = answerService;
        this.clientService = clientService;
        this.folderService = folderService;
    }

    @RequestMapping( value = "/api/survey/{id}", method = RequestMethod.GET )
    public SurveyView loadSurvey( @PathVariable( "id" ) Long id, HttpServletRequest request ) {
        return surveyService.findById( id );
    }

    /**
     * Load survey with answers
     */
    @RequestMapping( value = "/api/respondentSurvey/{id}", method = RequestMethod.GET )
    public RespondentSurveyView loadRespondentSurvey( @PathVariable( "id" ) Long id, HttpServletRequest request ) {
        Long surveyId = id;
        String userId = "test";

        AnswerSession session = answerService.prepareSession( surveyId, userId );
        SurveyView surveyView = surveyService.findById( surveyId );

        List<AnswerView> answers = new ArrayList<>();
        if ( session != null ) {
            for ( Answer answer : session.getAnswers() ) {
                answers.add( new AnswerView( session.getSurveyId(), session.getUserId(), answer ) );
            }

        }

        RespondentSurveyView respondentSurveyView = new RespondentSurveyView();
        respondentSurveyView.setAnswers( answers );
        respondentSurveyView.setSurveyView( surveyService.findById( surveyId ) );
        return respondentSurveyView;
    }

    /**
     * Load survey with answers
     */
    @RequestMapping( value = "/realRespondentSurvey/{checksum}", method = RequestMethod.GET )
    public RespondentSurveyView loadRealRespondentSurvey( @PathVariable( "checksum" ) String checksum, HttpServletRequest request ) {

        //get data from checksum
        Checksum checksum1 = new Checksum( checksum );
        Long surveyId = checksum1.getSurveyId();
        String userId = checksum1.getUserId();

        //validate data
        System.out.println( surveyId );
        System.out.println( userId );

        AnswerSession session = answerService.prepareSession( surveyId, userId );
        SurveyView surveyView = surveyService.findById( surveyId );

        List<AnswerView> answers = new ArrayList<>();
        if ( session != null ) {
            for ( Answer answer : session.getAnswers() ) {
                answers.add( new AnswerView( session.getSurveyId(), session.getUserId(), answer ) );
            }

        }

        // find survey and answers if exist and load
        RespondentSurveyView respondentSurveyView = new RespondentSurveyView();
        respondentSurveyView.setAnswers( answers );
        respondentSurveyView.setSurveyView( surveyView );
        return respondentSurveyView;
    }

    @RequestMapping( value = "/api/getSurveyLink/{id}", method = RequestMethod.GET )
    public SurveyLinkView getSurveyLink( @PathVariable( "id" ) Long id, HttpServletRequest request ) {

        SurveyLinkView link = new SurveyLinkView();

        Integer port = request.getLocalPort();

        String url = "http://" + request.getLocalName() + ( port != -1 ? ":" + port : "" ) + "/survey-viewer/" + Checksum.generateChecksum( id, "test" );
        System.out.println( "Generate url: "+ request.getRequestURL() );
        link.setLink( url );

        return link;
    }

    @RequestMapping( value = "/api/surveys", method = RequestMethod.GET )
    public List<SurveyInfoView> loadSurveys( HttpServletRequest request ) {

        Folder folder = getFolder();
        List<SurveyInfoView> surveys = folder.getSurveys().stream().map( SurveyInfoView::new ).collect( Collectors.toList() );

        return surveys;
    }

    @RequestMapping( value = "/api/saveSurvey", method = RequestMethod.POST )
    public SurveyView saveSurvey( @RequestBody SurveyView surveyView, HttpServletRequest request ) {

        Folder folder = getFolder();

        surveyView.setCreationDate( new Date() );

        Survey survey = new Survey( surveyView );
        survey.setFolder( folder );

        SurveyView savedSurveyView = new SurveyView( surveyService.save( survey ) );

        return savedSurveyView;
    }

    @RequestMapping( value = "/saveAnswers", method = RequestMethod.POST )
    public String saveAnswers( @RequestBody AnswerView answerView, HttpServletRequest request ) {
        AnswerSession answerSession = new AnswerSession( answerView );

        answerService.addAnswer( answerSession );
        answerService.saveAnswer( answerView );

        System.out.println( answerView );
        return answerView.toString();
    }

    @RequestMapping( value = "/api/answers/{surveyId}", method = RequestMethod.GET )
    public List<AnswerView> loadAnswers( @PathVariable( "id" ) Long surveyId, HttpServletRequest request ) {
        return answerService.loadAnswers( surveyId );
    }

    private Folder getFolder() {
        ClientView clientView = (ClientView) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Client client = clientService.findWithFolders( clientView.getId() );
        Folder folder = client.getFolders().get( 0 );

        return folder;
    }

}
