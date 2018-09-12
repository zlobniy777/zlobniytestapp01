package com.zlobniy.domain.survey.dao;

import com.zlobniy.domain.survey.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyDao extends JpaRepository<Survey, Long> {

    

}
