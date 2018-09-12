package com.zlobniy.domain.survey.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Survey {

    @Id
    @GeneratedValue
    private Long id;

}
