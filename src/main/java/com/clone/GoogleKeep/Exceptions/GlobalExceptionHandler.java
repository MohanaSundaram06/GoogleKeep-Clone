package com.clone.GoogleKeep.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiErrorResponse> userExistsExceptionHandler(RuntimeException ex){
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(400, ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> userNotFoundExceptionHandler(RuntimeException ex){
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(404, ex.getMessage());
        return new ResponseEntity<>(apiErrorResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
        List<String> errors = new ArrayList<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.add(String.format("%s : %s",fieldName,errorMessage));
        });
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(404, errors.toString());
        return new ResponseEntity<>(apiErrorResponse,HttpStatus.BAD_REQUEST);
    }
}
