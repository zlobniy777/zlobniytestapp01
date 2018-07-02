package com.zlobniy.controllers.survey;

import com.zlobniy.entity.survey.SurveyInfo;
import com.zlobniy.entity.survey.SurveyModel;
import com.zlobniy.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class SurveyController {

    private SurveyService surveyService;

    @Autowired
    public SurveyController( SurveyService surveyService ){
        this.surveyService = surveyService;
    }

    @RequestMapping( value = "/api/survey/{id}", method = RequestMethod.GET )
    public SurveyModel loadSurvey( @PathVariable("id") Long id, HttpServletRequest request ) {
        return surveyService.findById( id );
    }

    @RequestMapping( value = "/api/surveys", method = RequestMethod.GET )
    public List<SurveyInfo> loadSurveys( HttpServletRequest request ) {
        return surveyService.getAllSurveys();
    }

    @RequestMapping( value = "/api/saveSurvey", method = RequestMethod.POST )
    public String saveSurvey( @RequestBody SurveyModel surveyModel, HttpServletRequest request ) {
        return Boolean.toString( surveyService.saveSurvey( surveyModel ) );
    }

}
