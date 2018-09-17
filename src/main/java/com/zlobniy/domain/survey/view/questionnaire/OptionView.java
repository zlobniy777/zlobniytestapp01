package com.zlobniy.domain.survey.view.questionnaire;

import com.zlobniy.domain.survey.entity.questionnaire.Option;

public class OptionView {

    private Long id;
    private String title;

    public OptionView() {

    }

    public OptionView(Option option) {
        setTitle(option.getTitle());
        setId(option.getId());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}