package com.zlobniy.domain.answer.entity;

import com.zlobniy.domain.answer.view.AnswerView;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @Column
    private Boolean deleted = Boolean.FALSE;

    @OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
    @JoinColumn( name = "sessionId")
    private List<Answer> answers = new ArrayList<>(  );

    @Column
    @UpdateTimestamp
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

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted( Boolean deleted ) {
        this.deleted = deleted;
    }

    public AnswerSession copy(){
        final AnswerSession answerSession = new AnswerSession(  );
        answerSession.setAnswers( getAnswers().stream().map( Answer::copy ).collect( Collectors.toList() ) );
        answerSession.setPreviousSession( getSessionId() );
        answerSession.setSurveyId( getSurveyId() );
        answerSession.setUserId( getUserId() );

        return answerSession;
    }
}
