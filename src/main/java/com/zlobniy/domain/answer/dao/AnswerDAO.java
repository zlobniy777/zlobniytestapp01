package com.zlobniy.domain.answer.dao;

import com.zlobniy.domain.answer.view.AnswerView;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class AnswerDAO {

    private static final ConcurrentHashMap<Long, List<AnswerView>> answers = new ConcurrentHashMap<>(  );
    static {
        initMap();
    }

    public AnswerDAO(){
        System.out.println( "create answer dao" );
    }

    private static void initMap(){

//        AnswerView answer = new AnswerView();
//
//        answers.put( 1L, answer );
    }

    public List<AnswerView> find( Long surveyId ){
        return answers.getOrDefault( surveyId, new ArrayList<>(  ) );
    }

    public boolean save( AnswerView answerView ){

        List<AnswerView> answersData = answers.get( answerView.getSurveyId() );

        if( answersData != null ){
            answersData.add( answerView );
        }else{
            answersData = new ArrayList<>(  );
            answersData.add( answerView );
            answers.put( answerView.getSurveyId(), answersData );
        }

        return true;
    }

}
