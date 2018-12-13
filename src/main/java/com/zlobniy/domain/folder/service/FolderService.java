package com.zlobniy.domain.folder.service;

import com.zlobniy.domain.folder.dao.FolderDao;
import com.zlobniy.domain.folder.entity.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService  {

    private final FolderDao folderDao;


    @Autowired
    public FolderService( FolderDao folderDao ){
        this.folderDao = folderDao;
    }

    public void saveFolder( Folder folder ){
        folderDao.save( folder );
    }

    public List<Folder> findAll(){
        return folderDao.findAll();
    }

    public List<Folder> findAllEager(){
        return folderDao.findAllEager();
    }

    public Folder findWithSurveys( Long id ){
        return folderDao.findWithSurveys( id );
    }

    public List<Folder> findByClientId( Long id ){
        return folderDao.findByClientId( id );
    }

}
