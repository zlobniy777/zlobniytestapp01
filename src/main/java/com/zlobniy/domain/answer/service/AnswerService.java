package com.zlobniy.domain.answer.service;

import com.zlobniy.domain.answer.dao.AnswerDAO;
import com.zlobniy.domain.answer.view.AnswerView;
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
