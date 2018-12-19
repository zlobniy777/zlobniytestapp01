package com.zlobniy;

import com.zlobniy.domain.folder.entity.Folder;
import com.zlobniy.domain.folder.service.FolderService;
import com.zlobniy.domain.folder.view.FolderView;
import com.zlobniy.domain.survey.view.SurveyView;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Integration tests with database.
 * */
@RunWith( SpringJUnit4ClassRunner.class )
@Transactional
@SpringBootTest
public class FolderITest {

    @Autowired
    private FolderService service;

    @Test
    public void loadAllFoldersByClient(){

        List<Folder> folders = service.findByClientId( 1L );
        Assert.assertTrue( "load folders for default user", folders.size() == 1 );

    }

    @Test
    public void loadSurveysFromFolder() {

        List<Folder> folders = service.findByClientId( 1L );
        Assert.assertTrue( "load folders for default user", folders.size() == 1 );

        Folder folder = folders.get( 0 );
        List<SurveyView> surveys = folder.getSurveys().stream().map( SurveyView::new ).collect(Collectors.toList());

        System.out.println( surveys.size() > 0 );

    }

    @Test
    public void loadFoldersAndMappingToView(){

        List<Folder> folders = service.findByClientId( 1L );
        List<FolderView> folderViews = folders.stream().map( FolderView::new ).collect( Collectors.toList());


        Assert.assertTrue( "mapping folder to folder view", folderViews.size() == 1 );

    }

}
