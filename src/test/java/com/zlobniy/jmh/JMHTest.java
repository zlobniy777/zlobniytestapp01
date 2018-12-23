package com.zlobniy.jmh;

import com.zlobniy.jmh.cases.SurveysCase;
import org.junit.runner.RunWith;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith( SpringJUnit4ClassRunner.class )
@Transactional
@SpringBootTest
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
