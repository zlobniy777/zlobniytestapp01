package com.zlobniy.controller.survey;

import com.zlobniy.service.AnswerService;
import com.zlobniy.service.SurveyService;
import com.zlobniy.util.Checksum;
import com.zlobniy.view.RespondentSurvey;
import com.zlobniy.view.SurveyLink;
import com.zlobniy.view.answer.AnswerView;
import com.zlobniy.view.survey.SurveyInfo;
import com.zlobniy.view.survey.SurveyModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public SurveyModel loadSurvey( @PathVariable("id") Long id, HttpServletRequest request ) {
        return surveyService.findById( id );
    }

    /**
     * Load survey with answers
     * */
    @RequestMapping( value = "/api/respondentSurvey/{id}", method = RequestMethod.GET )
    public RespondentSurvey loadRespondentSurvey( @PathVariable("id") Long id, HttpServletRequest request ) {
        RespondentSurvey respondentSurvey = new RespondentSurvey();
        respondentSurvey.setAnswers( answerService.loadAnswers( id ) );
        respondentSurvey.setSurveyModel( surveyService.findById( id ) );
        return respondentSurvey;
    }

    /**
     * Load survey with answers
     * */
    @RequestMapping( value = "/api/realRespondentSurvey/{checksum}", method = RequestMethod.GET )
    public RespondentSurvey loadRealRespondentSurvey( @PathVariable("checksum") String checksum, HttpServletRequest request ) {

        //get data from checksum
        Checksum checksum1 = new Checksum( checksum );
        Long surveyId = checksum1.getSurveyId();
        String userId = checksum1.getUserId();

        //validate data
        System.out.println( surveyId );
        System.out.println( userId );

        // find survey and answers if exist and load
        RespondentSurvey respondentSurvey = new RespondentSurvey();
        respondentSurvey.setAnswers( answerService.loadAnswers( surveyId ) );
        respondentSurvey.setSurveyModel( surveyService.findById( surveyId ) );
        return respondentSurvey;
    }

    @RequestMapping( value = "/api/getSurveyLink/{id}", method = RequestMethod.GET )
    public SurveyLink getSurveyLink( @PathVariable("id") Long id, HttpServletRequest request ) {

        SurveyLink link = new SurveyLink();

        link.setLink( "/survey-viewer/" + Checksum.generateChecksum( id, "Test" ) );

        return link;
    }

    @RequestMapping( value = "/api/surveys", method = RequestMethod.GET )
    public List<SurveyInfo> loadSurveys( HttpServletRequest request ) {
        return surveyService.getAllSurveys();
    }

    @RequestMapping( value = "/api/saveSurvey", method = RequestMethod.POST )
    public String saveSurvey( @RequestBody SurveyModel surveyModel, HttpServletRequest request ) {
        return Boolean.toString( surveyService.saveSurvey( surveyModel ) );
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
