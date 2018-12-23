package com.zlobniy.jmh;

import com.zlobniy.jmh.cases.SurveysCase;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

public class JMHTest {

    public static void main( String[] args ) throws RunnerException {

        Options opt = new OptionsBuilder()
                .include( SurveysCase.class.getSimpleName() )
                .forks( 1 )
                .warmupIterations( 5 )
                .measurementIterations( 5 )
                .resultFormat( ResultFormatType.TEXT )
                .threads( 1 )
                .build();

        new Runner( opt ).run();
    }

}
