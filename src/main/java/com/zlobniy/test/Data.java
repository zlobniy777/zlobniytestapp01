package com.zlobniy.test;

import java.util.ArrayList;
import java.util.List;

public class Data {

    private int folder;
    private List<Object> objects;
    private List<Data> children = new ArrayList<>(  );

    public Data( ){

    }

    public void addChild( Data data ){
        this.children.add( data );
    }

    public int getFolder(){
        return folder;
    }

    public void setFolder( int folder ){
        this.folder = folder;
    }

    public List<Object> getObjects(){
        return objects;
    }

    public void setObjects( List<Object> objects ){
        this.objects = objects;
    }

    public List<Data> getChildren(){
        return children;
    }

    public void setChildren( List<Data> children ){
        this.children = children;
    }
}
