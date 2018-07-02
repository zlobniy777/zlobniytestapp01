package com.zlobniy.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatUtil {

    private static final SimpleDateFormat DATE_TIME = new SimpleDateFormat( "dd/MM/yyyy HH:mm" );

    public static String dateToString( Date date ){
        return DATE_TIME.format( date );
    }

}
