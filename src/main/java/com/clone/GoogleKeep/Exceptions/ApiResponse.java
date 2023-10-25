package com.clone.GoogleKeep.Exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class ApiResponse {

    private HttpStatus statusCode;

    private String message;

    private LocalDateTime timeStamp;

    public ApiResponse(HttpStatus statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
