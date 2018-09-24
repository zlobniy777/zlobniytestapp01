package com.zlobniy.domain.answer.service;

import com.zlobniy.domain.answer.dao.AnsDao;
import com.zlobniy.domain.answer.dao.AnswerDAO;
import com.zlobniy.domain.answer.entity.Answer;
import com.zlobniy.domain.answer.entity.AnswerSession;
import com.zlobniy.domain.answer.view.AnswerView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
            for ( Answer answer : session.getAnswers() ) {
                addOrReplaceAnswer( answerSession, answer );
            }
        }
        answerDao.save( answerSession );
    }

    private void addOrReplaceAnswer( AnswerSession answerSession, Answer answer ){
        // if answer already exist on this question we replace this answer to new one.
        if( answerSession.getAnswers().contains( answer ) ){
            List<Answer> answers = new ArrayList<>(  );
            for ( Answer answer1 : answerSession.getAnswers() ) {
                if( !Objects.equals( answer1.getQuestionNumber(), answer.getQuestionNumber() ) ){
                    answers.add( answer1 );
                }else{
                    answers.add( answer );
                }
            }
            answerSession.setAnswers( answers );
        }else{
            // answer not exist and we just add a new answer to answer session.
            answerSession.getAnswers().add( answer );
        }

    }

    /**
     * Call this method when respondent start answering on survey, or re answering
     * */
    public AnswerSession prepareSession( Long surveyId, String userId ){
        final AnswerSession answerSession = answerDao.getBy( surveyId, userId );
        if( answerSession == null ) return null;

        answerSession.setDeleted( true );
        answerDao.save( answerSession );

        final AnswerSession copySession = answerSession.copy();
        answerDao.save( copySession );

        return copySession;
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
