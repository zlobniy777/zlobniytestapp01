package com.zlobniy.domain.answer.service;

import com.zlobniy.domain.answer.dao.AnsDao;
import com.zlobniy.domain.answer.dao.AnswerDAO;
import com.zlobniy.domain.answer.entity.AnswerSession;
import com.zlobniy.domain.answer.view.AnswerView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AnswerService {

    private AnswerDAO dao;
    private AnsDao answerDao;

    @Autowired
    public AnswerService( AnsDao ansDao ){
        this.dao = new AnswerDAO();
        this.answerDao = ansDao;
    }

    public void addAnswer( AnswerSession session ){
        AnswerSession answerSession = answerDao.getBy( session.getSurveyId(), session.getUserId() );
        if( answerSession == null ){
            answerSession = session;
        }else{
            answerSession.getAnswers().addAll( session.getAnswers() );
        }
        answerDao.save( answerSession );
    }

    public AnswerSession answers( Long surveyId, String userId ){
        return answerDao.getBy( surveyId, userId );
    }

    public void saveAnswer( AnswerView answer ){
        dao.save( answer );
    }

    public List<AnswerView> loadAnswers( Long surveyId ){
        return dao.find( surveyId );
    }

}
