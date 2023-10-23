package com.clone.GoogleKeep.Exceptions;

public class LabelNotFoundException extends RuntimeException{
    public LabelNotFoundException(String message) {
        super(message);
    }
}
