package com.zlobniy.domain.answer.entity;

import com.zlobniy.domain.answer.view.AnswerView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class AnswerSession {

    @Id
    @GeneratedValue
    private Long sessionId;

    @Column
    private Long surveyId;

    @Column
    private Long previousSession;

    @Column
    private String userId;

    @OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
    @JoinColumn( name = "sessionId")
    private List<Answer> answers = new ArrayList<>(  );

    @Column
    private Date date;

    public AnswerSession(){

    }

    public AnswerSession( AnswerView answerView ){
        setSurveyId( answerView.getSurveyId() );
        setSessionId( answerView.getId() );
        setUserId( answerView.getUserId() );
        setDate( new Date(  ) );

        Answer answer = new Answer( answerView );
        answers.add( answer );

    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId( Long sessionId ) {
        this.sessionId = sessionId;
    }

    public Long getSurveyId(){
        return surveyId;
    }

    public void setSurveyId( Long surveyId ){
        this.surveyId = surveyId;
    }

    public List<Answer> getAnswers(){
        return answers;
    }

    public void setAnswers( List<Answer> answers ){
        this.answers = answers;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId( String userId ){
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate( Date date ) {
        this.date = date;
    }

    public Long getPreviousSession() {
        return previousSession;
    }

    public void setPreviousSession( Long previousSession ) {
        this.previousSession = previousSession;
    }
}
