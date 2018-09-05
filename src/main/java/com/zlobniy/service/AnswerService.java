package com.zlobniy.service;

import com.zlobniy.dao.AnswerDAO;
import com.zlobniy.view.answer.AnswerView;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AnswerService {

    private AnswerDAO dao;

    public AnswerService(){
        this.dao = new AnswerDAO();
    }

    public void saveAnswer( AnswerView answer ){
        dao.save( answer );
    }

    public List<AnswerView> loadAnswers( Long surveyId ){
        return dao.find( surveyId );
    }

}
