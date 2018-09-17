package com.zlobniy.domain.survey.entity.questionnaire;

import com.zlobniy.domain.survey.view.questionnaire.OptionView;
import com.zlobniy.domain.survey.view.questionnaire.ScaleView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Scale {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String title;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Option> options = new ArrayList<>(  );

    public Scale(){

    }

    public Scale( ScaleView scaleView ){
        setId( scaleView.getId() );
        setTitle( scaleView.getTitle() );

        List<Option> options = new ArrayList<>();
        for (OptionView optionView : scaleView.getOptions()) {
            options.add( new Option( optionView ) );
        }
        setOptions( options );
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

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
