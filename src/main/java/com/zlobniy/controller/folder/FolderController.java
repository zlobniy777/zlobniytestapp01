package com.zlobniy.controller.folder;

import com.zlobniy.domain.client.view.ClientView;
import com.zlobniy.domain.folder.entity.Folder;
import com.zlobniy.domain.folder.service.FolderService;
import com.zlobniy.domain.folder.view.FolderView;
import com.zlobniy.domain.survey.view.SurveyView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FolderController {

    private FolderService folderService;

    @Autowired
    public FolderController( FolderService folderService ){
        this.folderService = folderService;
    }

    @RequestMapping( value = "/api/folder/loadAll", method = RequestMethod.GET )
    public List<FolderView> loadFolders( HttpServletRequest request ) {

        ClientView clientView = (ClientView) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Folder> folders = folderService.findByClientId( clientView.getId() );
        List<FolderView> folderViews = folders.stream().map( FolderView::new ).collect( Collectors.toList());

        return folderViews;
    }

    // load all data in folder, currently only surveys but then...
    @RequestMapping( value = "/api/folder/load/{id}", method = RequestMethod.GET )
    public List<SurveyView> loadData( @PathVariable Long id ){
        Folder folder = folderService.findById( id );
        List<SurveyView> surveys = folder.getSurveys().stream().map( SurveyView::new ).collect(Collectors.toList());
        return surveys;
    }

}
