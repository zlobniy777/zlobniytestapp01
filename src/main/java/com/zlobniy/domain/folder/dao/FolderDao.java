package com.zlobniy.domain.folder.dao;

import com.zlobniy.domain.folder.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderDao extends JpaRepository<Folder, Long> {

    @Query( "select f from Folder f JOIN FETCH f.client" )
    List<Folder> findAllEager();

    @Query( "select f from Folder f JOIN FETCH f.surveys s where f.id = :id" )
    Folder findWithSurveys( @Param( "id" ) Long id );

    @Query( "select f from Folder f JOIN FETCH f.client c where c.id = :id" )
    List<Folder> findByClientId( @Param( "id" ) Long id );

}
