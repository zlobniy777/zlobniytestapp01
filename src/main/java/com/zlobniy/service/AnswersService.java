package com.zlobniy.service;

import com.zlobniy.dao.AnswersDAO;
import com.zlobniy.entity.answers.AnswerView;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AnswersService {

    private AnswersDAO dao;

    public AnswersService(){
        this.dao = new AnswersDAO();
    }

    public void saveAnswer( AnswerView answer ){
        dao.save( answer );
    }

    public List<AnswerView> loadAnswers( Long surveyId ){
        return dao.find( surveyId );
    }

}
