package com.zlobniy.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CustomValidatorImpl implements ConstraintValidator<CustomValidator, String> {

    @Override
    public void initialize( CustomValidator customValidator ) {

    }

    @Override
    public boolean isValid( String password, ConstraintValidatorContext constraintValidatorContext ) {
        return password != null && password.length() > 3;
    }
}
