package com.zlobniy.test;

import java.util.ArrayList;
import java.util.List;

public class CollectData {

    public static void main( String[] args ){

        CollectData collectData = new CollectData();
        collectData.doWork();

    }

    public void doWork(){

        int homeFolder = 1;

        Data data = getData( homeFolder );

        doRead( data );

        System.out.println( "Done" );
    }

    private Data getData( int folder ){

        Data data = new Data(  );

        List<Object> objects = new ArrayList<>(  );
        // find data from folder
        objects.add( "data " + folder );

        data.setFolder( folder );
        data.setObjects( objects );

        List<Integer> subFolders = new ArrayList<>(  );
        subFolders.add( getSubFolders( folder ) );

        if( folder == 0 ) return data;

        for( Integer subFolder : subFolders ){
            data.addChild( getData( subFolder ) );
        }

        return data;

    }

    public void doRead( Data data ){

        System.out.println( "read from data: " + data.getFolder() );

        for( Object o : data.getObjects() ){
            System.out.println( o );
        }

        for( Data d : data.getChildren() ){
            doRead( d );
        }

    }

    private int getSubFolders( int i ){
        System.out.println( i );
        if( i < 10 ) return ++i;
        return 0;
    }

}
