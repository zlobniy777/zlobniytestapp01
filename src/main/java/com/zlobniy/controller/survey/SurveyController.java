package com.zlobniy.controller.survey;

import com.zlobniy.domain.answer.service.AnswerService;
import com.zlobniy.domain.answer.view.AnswerView;
import com.zlobniy.domain.survey.service.SurveyService;
import com.zlobniy.domain.survey.view.RespondentSurveyView;
import com.zlobniy.domain.survey.view.SurveyInfoView;
import com.zlobniy.domain.survey.view.SurveyLinkView;
import com.zlobniy.domain.survey.view.SurveyView;
import com.zlobniy.util.Checksum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
public class SurveyController {

    private SurveyService surveyService;
    private AnswerService answerService;

    @Autowired
    public SurveyController( SurveyService surveyService, AnswerService answerService ){
        this.surveyService = surveyService;
        this.answerService = answerService;
    }

    @RequestMapping( value = "/api/survey/{id}", method = RequestMethod.GET )
    public SurveyView loadSurvey(@PathVariable("id") Long id, HttpServletRequest request ) {
        return surveyService.findById( id );
    }

    /**
     * Load survey with answers
     * */
    @RequestMapping( value = "/api/respondentSurvey/{id}", method = RequestMethod.GET )
    public RespondentSurveyView loadRespondentSurvey(@PathVariable("id") Long id, HttpServletRequest request ) {
        RespondentSurveyView respondentSurveyView = new RespondentSurveyView();
        respondentSurveyView.setAnswers( answerService.loadAnswers( id ) );
        respondentSurveyView.setSurveyView( surveyService.findById( id ) );
        return respondentSurveyView;
    }

    /**
     * Load survey with answers
     * */
    @RequestMapping( value = "/api/realRespondentSurvey/{checksum}", method = RequestMethod.GET )
    public RespondentSurveyView loadRealRespondentSurvey(@PathVariable("checksum") String checksum, HttpServletRequest request ) {

        //get data from checksum
        Checksum checksum1 = new Checksum( checksum );
        Long surveyId = checksum1.getSurveyId();
        String userId = checksum1.getUserId();

        //validate data
        System.out.println( surveyId );
        System.out.println( userId );

        // find survey and answers if exist and load
        RespondentSurveyView respondentSurveyView = new RespondentSurveyView();
        respondentSurveyView.setAnswers( answerService.loadAnswers( surveyId ) );
        respondentSurveyView.setSurveyView( surveyService.findById( surveyId ) );
        return respondentSurveyView;
    }

    @RequestMapping( value = "/api/getSurveyLink/{id}", method = RequestMethod.GET )
    public SurveyLinkView getSurveyLink(@PathVariable("id") Long id, HttpServletRequest request ) {

        SurveyLinkView link = new SurveyLinkView();

        link.setLink( "/survey-viewer/" + Checksum.generateChecksum( id, "Test" ) );

        return link;
    }

    @RequestMapping( value = "/api/surveys", method = RequestMethod.GET )
    public List<SurveyInfoView> loadSurveys(HttpServletRequest request ) {
        return surveyService.getAllSurveys();
    }

    @RequestMapping( value = "/api/saveSurvey", method = RequestMethod.POST )
    public String saveSurvey(@RequestBody SurveyView surveyView, HttpServletRequest request ) {
        surveyView.setCreationDate( new Date(  ) );
        SurveyView surveyView1 = surveyService.save(surveyView);
        return Boolean.toString( true );
    }

    @RequestMapping( value = "/api/saveAnswers", method = RequestMethod.POST )
    public String saveAnswers( @RequestBody AnswerView answerView, HttpServletRequest request ) {
        answerService.saveAnswer( answerView );
        System.out.println( answerView );
        return answerView.toString();
    }

    @RequestMapping( value = "/api/answers/{surveyId}", method = RequestMethod.GET )
    public List<AnswerView> loadAnswers( @PathVariable("id") Long surveyId, HttpServletRequest request ) {
        return answerService.loadAnswers( surveyId );
    }

}
