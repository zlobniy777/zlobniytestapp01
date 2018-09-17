package com.zlobniy.domain.survey.dao;

import com.zlobniy.domain.survey.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyDao extends JpaRepository<Survey, Long> {


    @Query( "select s from Survey s JOIN FETCH s.questionnaire q JOIN FETCH s.surveySettings g where s.id = :id" )
    Survey findByIdEager( @Param( "id" ) Long id );



}
