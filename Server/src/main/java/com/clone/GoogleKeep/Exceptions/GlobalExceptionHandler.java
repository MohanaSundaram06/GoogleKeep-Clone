package com.clone.GoogleKeep.Exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({UserAlreadyExistsException.class,LabelOverFlowException.class})
    public ResponseEntity<ApiResponse> userExistsExceptionHandler(RuntimeException ex){
        ApiResponse apiResponse = new ApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
        System.out.println("throwing");
        return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UserNotFoundException.class, LabelNotFoundException.class, NoteNotFoundException.class})
    public ResponseEntity<ApiResponse> userNotFoundExceptionHandler(RuntimeException ex){
        ApiResponse apiResponse = new ApiResponse(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(apiResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
        List<String> errors = new ArrayList<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.add(String.format("%s : %s",fieldName,errorMessage));
        });
        ApiResponse apiResponse = new ApiResponse(HttpStatus.BAD_REQUEST, errors.toString());
        return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> securityExceptionHandler(Exception ex) {
        ApiResponse apiResponse = null;
        if (ex instanceof BadCredentialsException) {
            apiResponse = new ApiResponse(HttpStatus.UNAUTHORIZED,
                    "Enter valid credentials");
        }
        else if (ex instanceof AccessDeniedException) {
            System.out.println(ex.getMessage());
            apiResponse = new ApiResponse(HttpStatus.FORBIDDEN,
                    "Access denied");

        }

        else if (ex instanceof SignatureException) {
            apiResponse = new ApiResponse(HttpStatus.FORBIDDEN,
                    "Invalid JWT Signature");
        }
        else if (ex instanceof ExpiredJwtException) {
            apiResponse = new ApiResponse(HttpStatus.FORBIDDEN,
                    "JWT Token expired ");
        }

        else if (ex instanceof MalformedJwtException) {
            apiResponse = new ApiResponse(HttpStatus.FORBIDDEN,
                    "Invalid JWT Token");
        }
        else{
            apiResponse = new ApiResponse(HttpStatus.FORBIDDEN,
                    ex.getLocalizedMessage());
        }
        return new ResponseEntity<>(apiResponse,apiResponse.getStatusCode());
    }
}
