package com.zlobniy.util;

import org.apache.tomcat.util.codec.binary.Base64;

public class Checksum {

    private static Base64 codec = new Base64();

    private Long surveyId;
    private String userId;

    public Checksum( String checksum ){
        String decodedChecksum = new String( codec.decode( checksum ) );
        parseString( decodedChecksum );
    }

    public static String generateChecksum( Long surveyId, String userId ){
        String data = surveyId.toString()+","+userId;
        return codec.encodeAsString( data.getBytes() );
    }

    private void parseString( String value ){
        String[] elements = value.split( "," );
        this.surveyId = Long.parseLong( elements[0] );
        this.userId = elements[1];
    }

    public Long getSurveyId(){
        return surveyId;
    }

    public String getUserId(){
        return userId;
    }

}
